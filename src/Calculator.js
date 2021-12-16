import "./Calculator.css";
import { useState } from "react";

const Calculator = () => {
  const [displayText, setDisplayText] = useState("0");
  const [mathFunctions, setMathFunctions] = useState(["*", "/", "+", "-"]);
  const [keyDigits, setKeyDigits] = useState([
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    ".",
    "AC",
  ]);

  const keyDownHandler = (event) => {
    if (keyDigits.includes(event.key)) {
      const newArray = [...displayText];
      newArray.push(event.key);
      setDisplayText(newArray);
    }
  };

  const enterDigitHandler = (index) => {
    const newArray = [...displayText];
    newArray.push(keyDigits[index]);
    setDisplayText(newArray);
  };

  return (
    <div className="container" onKeyDown={keyDownHandler}>
      <>
        <h1>{displayText}</h1>
      </>
      {mathFunctions.map((mathFunc, index) => {
        return <FuncItem key={index} item={mathFunc} />;
      })}

      {keyDigits.map((digit, index) => {
        return (
          <Digit
            key={index}
            digit={digit}
            enterDigit={() => enterDigitHandler(index)}
          />
        );
      })}

      <>
        <h2>=</h2>
      </>
    </div>
  );
};

const FuncItem = (props) => {
  return (
    <div className="func-item-container">
      <div className="func-item">
        <h2>{props.item}</h2>
      </div>
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
