import "./Calculator.css";
import { useState } from "react";
import { evaluate } from "mathjs";
import { useRef } from "react";

const Calculator = () => {
  const [displayText, setDisplayText] = useState("0");
  const [keyDigits, setKeyDigits] = useState([
    {
      digit: "1",
      id: "one",
      lz: false,
    },
    {
      digit: "2",
      id: "two",
      lz: false,
    },
    {
      digit: "3",
      id: "three",
      lz: false,
    },
    {
      digit: "+",
      id: "plus",
      lz: false,
    },
    {
      digit: "4",
      id: "four",
      lz: false,
    },
    {
      digit: "5",
      id: "five",
      lz: false,
    },
    {
      digit: "6",
      id: "six",
      lz: false,
    },
    {
      digit: "-",
      id: "minus",
      lz: false,
    },
    {
      digit: "7",
      id: "seven",
      lz: false,
    },
    {
      digit: "8",
      id: "eight",
      lz: false,
    },
    {
      digit: "9",
      id: "nine",
      lz: false,
    },
    {
      digit: "*",
      id: "times",
      lz: false,
    },
    {
      digit: "0",
      id: "zero",
      lz: false,
    },
    {
      digit: ".",
      id: "point",
      lz: true,
    },
    {
      digit: "AC",
      id: "clear",
      lz: false,
    },
    {
      digit: "/",
      id: "divide",
      lz: false,
    },
    {
      digit: "=",
      id: "equals",
      lz: false,
    },
  ]);

  const mainRef = useRef(null);

  const keyDownHandler = (e) => {
    if (keyDigits.digit.includes(e.key)) {
      let newString = displayText + e.key;
      setDisplayText(newString);
    } else if (e.key === "Enter") {
      setDisplayText(evaluateMath(displayText));
    } else if (e.key === "Escape") {
      setDisplayText("0");
    }
  };

  const enterDigitHandler = (index) => {
    if (keyDigits[index].digit !== "=" && keyDigits[index].digit !== "AC") {
      let newString = displayText + keyDigits[index].digit;
      setDisplayText(newString);
    } else if (keyDigits[index].digit === "=") {
      //evaluate maths
      setDisplayText(evaluateMath(displayText));
    } else {
      //clear
      setDisplayText("0");
    }
  };

  const evaluateMath = (mathString) => {
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
      <div className="manu">
        <h2>CASIO</h2>
        <h5>MS-120BM</h5>
      </div>
      <div className="display">
        <h1>{displayText}</h1>
      </div>
      <div className="digits">
        {keyDigits.map((digit, index) => {
          return (
            <Digit
              key={index}
              digit={digit.digit}
              id={digit.id}
              enterDigit={() => enterDigitHandler(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

const Digit = (props) => {
  return (
    <div className="button">
      <h2 id={props.id} onClick={props.enterDigit}>
        {props.digit}
      </h2>
    </div>
  );
};

export default Calculator;
