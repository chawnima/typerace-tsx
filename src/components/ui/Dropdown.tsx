import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface DropdownProps {
  content: string;
  options: string[] | number[];
  setOptions: (item: number | string)=> void;
}
const Dropdown = ({ content, options, setOptions }: DropdownProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  return (
    <div className="relative">
      <button
        className={`text-center py-2 px-4 bg-neutral-700 cursor-pointer rounded-t-lg ${showOptions ? "rounded-b-none" : "rounded-b-lg"} flex items-center justify-center w-20`}
        onClick={() => setShowOptions(!showOptions)}
      >
        <span>{content}</span>
        <ArrowDropDownIcon />
      </button>
      {showOptions && (
        <div className="absolute w-full bg-neutral-700 flex flex-col">
          {options.map((item: string | number) => (
            <button
              key={item}
              className="py-1 hover:bg-neutral-800/60 active:bg-neutral-800/80 border-neutral-400"
              onClick={() => {
                setOptions(item);
                setShowOptions(false);
              }}
            >
              {item}s
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { Dropdown };
