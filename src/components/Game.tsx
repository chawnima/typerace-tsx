import { useEffect, useState } from "react";
import { generateSlug } from "random-word-slugs";
import Countdown from "react-countdown";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {io} from "socket.io-client";


import { GameText, GameInput, GameResult } from "./ui/GameUi";
import { Dropdown } from "./ui/Dropdown";
import Button from "./ui/Button";
import { postSingleRank } from "../services/rank";
import { RootState } from "../redux/store";

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

const gameTimeOptions: number[] = [60, 120, 180];
const socket = io("http://localhost:4000");

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
  const username = useSelector((state: RootState) => state.userInfo.username);

  useEffect(() => {
    setGameInputArray(gameInput.toLocaleLowerCase().split(""));
  }, [gameInput]);

  const inputChangeHandler = (value: string): void => {
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
      };
      socket.emit("message",gameInput);
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

  const resetGame = (): void => {
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

  //post game stats
  const { mutate: createSingleRank } = useMutation({
    mutationFn: () => postSingleRank(username || "anonymous", gameStatistic.wpm),
    onSuccess:()=>{
      console.log("new rank posted")
    }
  });

  useEffect(()=>{
    if (gameOver){createSingleRank();
      
    };
  },[gameOver,createSingleRank])

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
    <div className="w-full flex flex-col items-center justify-center gap-8">
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
          <div className="w-full flex items-center gap-4 px-8">
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

const GameTips = () => {
  return (
    <ul className="flex flex-col items-start mx-auto lg:mx-8 justify-center text-secondary list-disc">
      <li>Start typing to start the timer</li>
      <li>Press space to move into next word</li>
    </ul>
  );
};
export { Game, GameTips };
