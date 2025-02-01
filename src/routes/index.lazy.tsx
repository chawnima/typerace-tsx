import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { generateSlug } from "random-word-slugs";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

interface TextProps {
  text: string[];
  isFilled?: boolean;
  isCorrect?: boolean;
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

function Index() {
  const navigate = useNavigate();
  const [gameInput, setGameInput] = useState<string>("");
  const [gameInputArray, setGameInputArray] = useState<string[]>([]);
  const [gameText, setGameText] = useState<TextProps[]>(
    new Text(generateSlug(5, { format: "lower" })).getText
  );
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  useEffect(() => {
    setGameInputArray(gameInput.toLocaleLowerCase().split(""));
  }, [gameInput]);

  const inputChangeHandler = (value: string) => {
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

  return (
    <div className="p-2 w-full max-w-5xl mx-auto flex flex-col justify-center">
      {/* game and leaderboard */}
      <div className="flex flex-col lg:flex-row h-96">
        <div className="w-full lg:w-1/3 flex flex-col h-full items-center justify-center gap-8">
          <p className="text-xl text-center text-nowrap">
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
          <div className="w-auto">
            <input
              type="text"
              value={gameInput}
              placeholder="Copy text from above"
              onChange={(e) => inputChangeHandler(e.target.value)}
              className="text-center py-2 px-4 focus:outline-none border-b"
            />
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          <h1 className="text-center text-xl border-b">Leaderboard</h1>
        </div>
      </div>
    </div>
  );
}
