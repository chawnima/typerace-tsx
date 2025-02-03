import { useEffect, useState } from "react";
import { generateSlug } from "random-word-slugs";
import Countdown from "react-countdown";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { GameText } from "./ui/GameUi";

interface TextProps {
  text: string[];
  isFilled?: boolean;
  isCorrect?: boolean;
}

interface CountdownProps {
  hours?: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

class Text {
  protected textArray: TextProps[] = [];
  constructor(protected text: string) {
    this.text = text;
  }
  set arrayConvert(text: string) {
    const splitText = text.split(" ");
    this.textArray = splitText.map((text: string) => {
      return { text: text.split("") };
    });
  }
  get getText(): TextProps[] {
    this.arrayConvert = this.text;
    return this.textArray;
  }
}

const gameTimeOptions: number[] = [60, 120, 180];

const Game = () => {
  const [gameInput, setGameInput] = useState<string>("");
  const [gameInputArray, setGameInputArray] = useState<string[]>([]);
  const [gameTime, setGameTime] = useState<number>(60);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameText, setGameText] = useState<TextProps[]>(
    new Text(generateSlug(5, { format: "lower" })).getText
  );
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [showTimeOptions, setShowTimeOptions] = useState<boolean>(false);
  const [initialTime, setInitialTime] = useState<number>(
    Date.now() + gameTime * 1000
  );

  useEffect(() => {
    setGameInputArray(gameInput.toLocaleLowerCase().split(""));
  }, [gameInput]);

  const inputChangeHandler = (value: string) => {
    if (!gameStart) {
      setGameStart(true);
    }
    if (value.includes(" ") && currentWordIndex < gameText.length) {
      const updateTextStatus = gameText;
      updateTextStatus[currentWordIndex].isFilled = true;
      if (
        gameInput.toLocaleLowerCase() ===
        gameText[currentWordIndex].text.join("").toLocaleLowerCase()
      ) {
        updateTextStatus[currentWordIndex].isCorrect = true;
      } else updateTextStatus[currentWordIndex].isCorrect = false;

      if (currentWordIndex + 1 >= gameText.length) {
        setGameText(new Text(generateSlug(5, { format: "lower" })).getText);
        setCurrentWordIndex(0);
      } else {
        setCurrentWordIndex(currentWordIndex + 1);
      }
      setGameInput("");
    } else {
      setGameInput(value);
    }
  };

  // Update when game starts or time changes
  useEffect(() => {
    if (gameStart) {
      setInitialTime(Date.now() + gameTime * 1000);
    }
  }, [gameStart, gameTime]);

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }: CountdownProps) => {
    if (completed) {
      setGameOver(true);
      return <></>;
    } else {
      return (
        <span>
          {minutes}:{seconds <= 9 ? "0" + seconds : seconds}
        </span>
      );
    }
  };

  return (
    <div className="w-full lg:w-2/3 flex flex-col h-full items-center justify-center gap-8">
      <GameText gameText={gameText} currentWordIndex={currentWordIndex} gameInputArray={gameInputArray} />
      <div className="w-auto flex items-center gap-4">
        <input
          type="text"
          value={gameInput}
          placeholder="Copy text from above"
          onChange={(e) => inputChangeHandler(e.target.value)}
          className="text-center py-2 px-4 focus:outline-none border-b"
        />
        {gameStart ? (
          <Countdown date={initialTime} renderer={renderer} />
        ) : (
          <div className="relative">
            <button
              className={`text-center py-2 px-4 bg-neutral-700 cursor-pointer rounded-t-lg ${showTimeOptions ? "rounded-b-none" : "rounded-b-lg"} flex items-center justify-center w-20`}
              onClick={() => setShowTimeOptions(!showTimeOptions)}
            >
              <span>{gameTime}s</span>
              <ArrowDropDownIcon />
            </button>
            {showTimeOptions && (
              <div className="absolute w-full bg-neutral-700 flex flex-col">
                {gameTimeOptions.map((item: number) => (
                  <button
                    key={item}
                    className="py-1 hover:bg-neutral-800/60 active:bg-neutral-800/80 border-neutral-400"
                    onClick={() => {
                      setGameTime(item);
                      setShowTimeOptions(false);
                    }}
                  >
                    {item}s
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
