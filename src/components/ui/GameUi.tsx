import React from "react";

interface TextProps {
    text: string[];
    isFilled?: boolean;
    isCorrect?: boolean;
  }

const GameText = ({gameText, currentWordIndex, gameInputArray}) => {
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

export { GameText };
