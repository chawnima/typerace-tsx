import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { RootState } from "../../redux/store";

const socket = io("http://localhost:4000",{autoConnect:false});

export const Route = createLazyFileRoute("/multiplayer/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [message, setMessage] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const token = useSelector((state:RootState)=>state.userInfo.socketId);
  const username =
    useSelector((state: RootState) => state.userInfo.username) || "anonymous";
  useEffect(() => {
    if (username) {
      socket.auth = { username,token };
      socket.connect();
    }
  }, [username,token]);

  useEffect(() => {
    socket.emit("room-id", id, username);
  }, [id, username]);

  socket.on(id, (msg) => setMessage([...message, msg]));

  const submitHandler = () => {
    socket.emit(`message-${id}`, messageInput);
    setMessageInput("");
  };

  return (
    <div>
      <div>
        <p className="text-xl font-semibold">Messages</p>
        {message.map((msg) => (
          <p>{msg}</p>
        ))}
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          className="border"
          placeholder="Enter message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          className="bg-background-primary hover:bg-background-primary/70 active:bg-background-primary/50 text-white rounded-md cursor-pointer px-2 py-1"
          onClick={() => submitHandler()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
