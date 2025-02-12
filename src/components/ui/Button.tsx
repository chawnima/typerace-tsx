interface ButtonProps {
  func: () => void;
  text: string;
}

const Button = ({ func, text }: ButtonProps) => {
  return (
    <button
      className="text-center py-2 px-4 bg-background-primary hover:bg-background-primary/70 active:bg-background-primary/50 text-white rounded-md cursor-pointer"
      onClick={() => func()}
    >
      {text}
    </button>
  );
};

export default Button;
