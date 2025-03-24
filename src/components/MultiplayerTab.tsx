import Button from "./ui/Button";
import { useEffect, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "@tanstack/react-router";
import { setSocketId } from "../redux/slices/userInfo";

const socket = io("http://localhost:4000", { autoConnect: false });

const MultiplayerTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [roomType, setRoomType] = useState<"public" | "private">("public");
  
  const username =
    useSelector((state: RootState) => state.userInfo.username) || "anonymous";
  useEffect(() => {
    if (username) {
      socket.auth = { username };
      socket.connect();
    }
  }, [username]);
  const createRoomHandler = () => {
    const id = Math.floor(Math.random() * 9000).toString();
    socket.emit("room-id", id, "room-master");
    dispatch(setSocketId(socket.id));
    navigate({to: `/multiplayer/${id}`})
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Multiplayer Mode</h1>
      <div>
        <h1 className="text-lg font-semibold mb-4">
          Create new multiplayer room
        </h1>
        <div className="flex-col sm:flex-row flex gap-4 border-b border-background-primary pb-4">
          {/* room type */}
          <div className="flex gap-4 items-center">
            <span>Room Type :</span>
            <div className="bg-background-primary rounded-md flex items-center overflow-hidden text-white max-w-fit">
              <button
                className={`px-3 py-2 cursor-pointer ${roomType === "public" ? "bg-black/10 inset-shadow-sm" : ""} w-full h-full`}
                onClick={() => setRoomType("public")}
              >
                <PublicIcon />
                <p>Public</p>
              </button>
              <button
                className={`px-3 py-2 cursor-pointer ${roomType === "private" ? "bg-black/10 inset-shadow-sm" : ""} w-full h-full`}
                onClick={() => setRoomType("private")}
              >
                <LockIcon />
                <p>Private</p>
              </button>
            </div>
          </div>
          <Button func={() => {createRoomHandler()}} text="Create Multiplayer Room" />
        </div>
      </div>
      <div>
        <h1 className="text-lg font-semibold">Available Public Room</h1>
      </div>
    </div>
  );
};

export default MultiplayerTab;
