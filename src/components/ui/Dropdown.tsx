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
    <div className="relative text-primary">
      <button
        className={`text-center py-2 px-4 bg-background-primary hover:bg-background-primary/70 cursor-pointer rounded-t-lg ${showOptions ? "rounded-b-none" : "rounded-b-lg"} flex items-center justify-center w-20`}
        onClick={() => setShowOptions(!showOptions)}
      >
        <span>{content}</span>
        <ArrowDropDownIcon />
      </button>
      {showOptions && (
        <div className="absolute w-full flex flex-col">
          {options.map((item: string | number) => (
            <button
              key={item}
              className="py-1 bg-background-primary hover:bg-background-primary/70 active:bg-background-primary/80 cursor-pointer text-primary"
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
