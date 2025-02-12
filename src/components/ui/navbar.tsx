import { useState } from "react";
import logo from "../../assets/logo.png";
import { TextInput } from "./Input";

const Navbar = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="w-full h-12 bg-background-primary flex border-b-background-secondary border-b fixed top-0">
      <div className="w-full max-w-5xl mx-auto flex gap-2 justify-between">
        <div className="bg-background-secondary flex items-center justify-center px-2 lg:px-8">
          <img src={logo} className="h-2/3 w-auto" />
        </div>
        <div className="flex items-center gap-4 px-2">
          <span className="text-white font-bold text-lg text-nowrap hidden lg:inline-block">
            Username :
          </span>
          <TextInput
            value={username}
            onChange={setUsername}
            placeholder="your username"
          />
        </div>
      </div>
    </div>
  );
};

export { Navbar };
