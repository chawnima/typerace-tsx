interface TextProps {
  text: string[];
  isFilled?: boolean;
  isCorrect?: boolean;
}
interface gameTextProps {
  gameText: TextProps[];
  currentWordIndex: number;
  gameInputArray: string[];
}

const GameText = ({
  gameText,
  currentWordIndex,
  gameInputArray,
}: gameTextProps) => {
  return (
    <p className="text-xl text-center text-wrap">
      {gameText.map((textArray: TextProps, wordIndex: number) => (
        <span key={wordIndex}>
          {" "}
          {textArray.text.map((text: string, index: number) => (
            <span
              key={index}
              className={`
                    ${currentWordIndex == wordIndex && gameInputArray[index] == text.toLocaleLowerCase() ? "text-green-500" : "text-white"} 
                    ${textArray?.isFilled ? (textArray?.isCorrect ? "bg-green-600" : "bg-red-500") : ""}`}
            >
              {text}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
};

interface GameInputProps {
  gameInput: string;
  inputChangeHandler: (value: string) => void;
}
const GameInput = ({ gameInput, inputChangeHandler }: GameInputProps) => {
  return (
    <input
      type="text"
      value={gameInput}
      placeholder="Copy text from above"
      onChange={(e) => inputChangeHandler(e.target.value)}
      className="text-center py-2 px-4 focus:outline-none border-b"
    />
  );
};

export { GameText, GameInput };
