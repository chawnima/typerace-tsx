import { useEffect, useState } from "react";
import { generateSlug } from "random-word-slugs";
import Countdown from "react-countdown";

import { GameText, GameInput, GameResult } from "./ui/GameUi";
import { Dropdown } from "./ui/Dropdown";
import Button from "./ui/Button";

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

class GameStats {
  constructor(
    public wordCorrect: number = 0,
    public wordMissed: number = 0,
    public keystrokes: number = 0,
    public keystrokesMissed: number = 0,
    public totalCharacters: number = 0,
    public wpm: number = 0,
    public accuracy: number = 0
  ) {}
}

const gameTimeOptions: number[] = [10, 120, 180];

const Game = () => {
  const [gameInput, setGameInput] = useState<string>("");
  const [gameInputArray, setGameInputArray] = useState<string[]>([]);
  const [gameTime, setGameTime] = useState<number>(60);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStatistic, setGameStatistic] = useState<GameStats>(
    new GameStats(0, 0, 0, 0, 0)
  );
  const [gameText, setGameText] = useState<TextProps[]>(
    new Text(generateSlug(5, { format: "lower" })).getText
  );
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
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
    //moving into next word
    if (value.includes(" ") && currentWordIndex < gameText.length) {
      const updateTextStatus = gameText;
      updateTextStatus[currentWordIndex].isFilled = true;
      //word checker
      if (
        gameInput.toLocaleLowerCase() ===
        gameText[currentWordIndex].text.join("").toLocaleLowerCase()
      ) {
        updateTextStatus[currentWordIndex].isCorrect = true;
        gameStatistic.wordCorrect++;
        gameStatistic.totalCharacters += gameInput.length;
      } else {
        updateTextStatus[currentWordIndex].isCorrect = false;
        gameStatistic.wordMissed++;
      }
      //moving to next word
      if (currentWordIndex + 1 >= gameText.length) {
        setGameText(new Text(generateSlug(5, { format: "lower" })).getText);
        setCurrentWordIndex(0);
      } else {
        setCurrentWordIndex(currentWordIndex + 1);
      }
      setGameInput("");
    } else {
      setGameInput(value);
      if (gameInput.length < value.length) {
        // backspace inputted
        gameStatistic.keystrokes++;
      } else {
        gameStatistic.keystrokesMissed++;
      }
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setGameStart(false);
    setGameInput("");
    setGameText(new Text(generateSlug(5, { format: "lower" })).getText);
    setCurrentWordIndex(0);
    setInitialTime(Date.now() + gameTime * 1000);
    setGameStatistic(new GameStats());
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
      gameStatistic.wpm = Math.round(
        gameStatistic.keystrokes / 5 / (gameTime / 60)
      );
      gameStatistic.accuracy = Math.round(
        (gameStatistic.wordCorrect /
          (gameStatistic.wordMissed + gameStatistic.wordCorrect)) *
          100
      );
    } else {
      return (
        <span>
          {minutes}:{seconds <= 9 ? "0" + seconds : seconds}
        </span>
      );
    }
  };

  const dropdownHandler = (selectedItem: number | string): void => {
    if (typeof selectedItem === "number") setGameTime(selectedItem);
  };

  return (
    <div className="w-full lg:w-2/3 flex flex-col h-full items-center justify-center gap-8">
      {gameOver ? (
        <>
          <GameResult {...gameStatistic} />
          <Button func={resetGame} text="Reset" />
        </>
      ) : (
        <>
          {" "}
          <GameText
            gameText={gameText}
            currentWordIndex={currentWordIndex}
            gameInputArray={gameInputArray}
          />
          <div className="w-auto flex items-center gap-4">
            <GameInput
              gameInput={gameInput}
              inputChangeHandler={inputChangeHandler}
            />
            {gameStart ? (
              <Countdown date={initialTime} renderer={renderer} />
            ) : (
              <Dropdown
                content={`${gameTime}s`}
                options={gameTimeOptions}
                setOptions={dropdownHandler}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
