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
      lzAllowed: false,
    },
    {
      digit: "2",
      id: "two",
      lzAllowed: false,
    },
    {
      digit: "3",
      id: "three",
      lzAllowed: false,
    },
    {
      digit: "+",
      id: "plus",
      lzAllowed: false,
    },
    {
      digit: "4",
      id: "four",
      lzAllowed: false,
    },
    {
      digit: "5",
      id: "five",
      lzAllowed: false,
    },
    {
      digit: "6",
      id: "six",
      lzAllowed: false,
    },
    {
      digit: "-",
      id: "minus",
      lzAllowed: false,
    },
    {
      digit: "7",
      id: "seven",
      lzAllowed: false,
    },
    {
      digit: "8",
      id: "eight",
      lzAllowed: false,
    },
    {
      digit: "9",
      id: "nine",
      lzAllowed: false,
    },
    {
      digit: "*",
      id: "times",
      lzAllowed: false,
    },
    {
      digit: "0",
      id: "zero",
      lzAllowed: false,
    },
    {
      digit: ".",
      id: "point",
      lzAllowed: true,
    },
    {
      digit: "AC",
      id: "clear",
      lzAllowed: false,
    },
    {
      digit: "/",
      id: "divide",
      lzAllowed: false,
    },
    {
      digit: "=",
      id: "equals",
      lzAllowed: false,
    },
  ]);

  const mainRef = useRef(null);

  //TODO: keydown only works when container has focus.
  const keyDownHandler = (e) => {
    if (keyDigits.some((obj) => obj.digit === e.key)) {
      let newString = "";
      //find the keyDigits index
      const keyIndex = keyDigits
        .map((d) => {
          return d.digit;
        })
        .indexOf(e.key);
      if (canHaveLeadingZero(keyIndex)) {
        newString = displayText + e.key;
      } else {
        newString = e.key;
      }
      setDisplayText(newString);
    } else if (e.key === "Enter") {
      setDisplayText(evaluateMath(displayText));
    } else if (e.key === "Escape") {
      setDisplayText("0");
    }
  };

  const enterDigitHandler = (index) => {
    if (keyDigits[index].digit !== "=" && keyDigits[index].digit !== "AC") {
      let newString = "";
      if (canHaveLeadingZero(index)) {
        newString = displayText + keyDigits[index].digit;
      } else {
        newString = keyDigits[index].digit;
      }
      setDisplayText(newString);
    } else if (keyDigits[index].digit === "=") {
      //evaluate maths
      setDisplayText(evaluateMath(displayText));
    } else {
      //clear
      setDisplayText("0");
    }
  };

  const canHaveLeadingZero = (index) => {
    //Remove the leading '0' if keypress is not a '.'
    if (displayText === "0") {
      if (keyDigits[index].lzAllowed === false) {
        return false;
      }
    }
    return true;
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
              lzAllowed={digit.lzAllowed}
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
