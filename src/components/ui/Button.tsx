interface ButtonProps {
  func: () => void;
  text: string;
}

const Button = ({ func, text }: ButtonProps) => {
  return (
    <button
      className="text-center py-2 px-4 bg-neutral-700 hover:bg-neutral-700/70 active:bg-neutral-700/50 rounded-md cursor-pointer"
      onClick={() => func()}
    >
      {text}
    </button>
  );
};

export default Button;
