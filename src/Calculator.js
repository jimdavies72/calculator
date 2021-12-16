import "./Calculator.css";
import { useState } from "react";
import { evaluate } from "mathjs";
import { useRef } from "react";

const Calculator = () => {
  const [displayText, setDisplayText] = useState("");
  const [keyDigits, setKeyDigits] = useState([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "AC",
    "*",
    "/",
    "+",
    "-",
    "=",
  ]);

  const mainRef = useRef(null);

  const keyDownHandler = (e) => {
    if (keyDigits.includes(e.key)) {
      let newString = displayText + e.key;
      setDisplayText(newString);
    } else if (e.key === "Enter") {
      setDisplayText(evaluateMath(displayText));
    } else if (e.key === "Escape") {
      setDisplayText("0");
    }
  };

  const enterDigitHandler = (index) => {
    if (keyDigits[index] !== "=" && keyDigits[index] !== "AC") {
      let newString = displayText + keyDigits[index];
      setDisplayText(newString);
    } else if (keyDigits[index] === "=") {
      //evaluate maths
      setDisplayText(evaluateMath(displayText));
    } else {
      //clear
      setDisplayText("0");
    }
  };

  const evaluateMath = (mathString) => {
    console.log(evaluate(3 / 0));
    let evaluation = evaluate(mathString);
    if (evaluation === Infinity) {
      return "Err";
    }
    return evaluation;
  };

  return (
    <div
      ref={mainRef}
      tabIndex="-1"
      onKeyDown={keyDownHandler}
      className="container"
    >
      <>
        <h1>{displayText}</h1>
      </>

      {keyDigits.map((digit, index) => {
        return (
          <Digit
            key={index}
            digit={digit}
            enterDigit={() => enterDigitHandler(index)}
          />
        );
      })}
    </div>
  );
};

const Digit = (props) => {
  return (
    <>
      <h2 onClick={props.enterDigit}>{props.digit}</h2>
    </>
  );
};

export default Calculator;
