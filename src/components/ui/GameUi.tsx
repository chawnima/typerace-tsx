import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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
interface GameInputProps {
  gameInput: string;
  inputChangeHandler: (value: string) => void;
}
interface GameResultProps {
  keystrokes: number;
  keystrokesMissed: number;
  wordCorrect: number;
  wordMissed: number;
  wpm: number;
  accuracy:number;
}

const GameText = ({
  gameText,
  currentWordIndex,
  gameInputArray,
}: gameTextProps) => {
  return (
    <p className="text-xl text-center text-wrap text-primary">
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

const GameInput = ({ gameInput, inputChangeHandler }: GameInputProps) => {
  return (
    <input
      type="text"
      value={gameInput}
      placeholder="Copy text from above"
      onChange={(e) => inputChangeHandler(e.target.value)}
      className="text-center py-2 px-4 focus:outline-none border-b w-full"
    />
  );
};

const GameResult = ({
  keystrokes,
  keystrokesMissed,
  wordCorrect,
  wordMissed,
  wpm,
  accuracy,
}: GameResultProps) => {
  return (
    <div className="flex flex-col gap-8">
      {/*stats*/}
      <div className="flex gap-8">
        <div>
          <h2>Keystrokes</h2>
          <div className="flex gap-2">
            <CheckBoxIcon sx={{ color: "#4CAF50" }} />
            <span className="text-green-500">{keystrokes}</span>
          </div>
          <div className="flex gap-2 just">
            <DisabledByDefaultIcon sx={{ color: "#FB2C36" }} />
            <span className="text-red-500">{keystrokesMissed}</span>
          </div>
        </div>
        <div>
          <h2>Total Words</h2>
          <div className="flex gap-2">
            <CheckBoxIcon sx={{ color: "#4CAF50" }} />
            <span className="text-green-500">{wordCorrect}</span>
          </div>
          <div className="flex gap-2">
            <DisabledByDefaultIcon sx={{ color: "#FB2C36" }} />
            <span className="text-red-500">{wordMissed}</span>
          </div>
        </div>
      </div>
      {/* overall score */}
      <div className="flex gap-8">
        <div>
          <h2>Score</h2>
          <p>WPM: {wpm}</p>
        </div>
        <div>
          <h2>Accuracy</h2>
          <p >{accuracy}%</p>
        </div>
      </div>
      {/* reset button */}
    </div>
  );
};

export { GameText, GameInput, GameResult };
