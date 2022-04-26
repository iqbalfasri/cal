import React from "react";
import { evaluate } from "mathjs";

const calcOperators = ["+", "-", "×", "/"];

export default function Calculator() {
  const [input1, setInput1] = React.useState<string>("");
  const [input2, setInput2] = React.useState<string>("");
  const [input3, setInput3] = React.useState<string>("");

  const [activeInput1, setActiveInput1] = React.useState<boolean>(false);
  const [activeInput2, setActiveInput2] = React.useState<boolean>(false);
  const [activeInput3, setActiveInput3] = React.useState<boolean>(false);

  const [error, setError] = React.useState("");

  const [result, setResult] = React.useState("");

  const calculate = (expression: string) => {
    setError("");
    const mulRegex = /×/g;

    let toEvaluate = expression.replace(mulRegex, "*");

    // Jika semua input di ceklist
    let expressionToString = "";
    if (activeInput1 && activeInput2 && activeInput3) {
      expressionToString = `${input1}${toEvaluate}${input2}${toEvaluate}${input3}`;
      // Jika input 1 dan 2 active
    } else if (activeInput1 && activeInput2) {
      expressionToString = `${input1}${toEvaluate}${input2}`;
    } else if (activeInput1 && activeInput3) {
      expressionToString = `${input1}${toEvaluate}${input3}`;
    } else if (activeInput2 && activeInput3) {
      expressionToString = `${input2}${toEvaluate}${input3}`;
    } else {
      setError("Minimal pilih 2 input");
    }

    const result = evaluate(expressionToString);
    setResult(result);
  };

  return (
    <div>
      <div>
        <div className="input">
          <input
            className="input__number"
            type="number"
            placeholder="Input 1"
            onChange={({ target }) => setInput1(target.value)}
          />
          <input
            className="input__checkbox"
            type="checkbox"
            onChange={({ target }) => setActiveInput1(target.checked)}
          />
        </div>

        <div className="input">
          <input
            className="input__number"
            type="number"
            placeholder="Input 2"
            onChange={({ target }) => setInput2(target.value)}
          />
          <input
            type="checkbox"
            className="input__checkbox"
            onChange={({ target }) => setActiveInput2(target.checked)}
          />
        </div>

        <div className="input">
          <input
            className="input__number"
            type="number"
            placeholder="Input 3"
            onChange={({ target }) => setInput3(target.value)}
          />
          <input
            className="input__checkbox"
            type="checkbox"
            onChange={({ target }) => setActiveInput3(target.checked)}
          />
        </div>
      </div>

      <div className="operator">
        {calcOperators.map((c) => {
          return (
            <button
              className="operator__button"
              key={c}
              onClick={() => calculate(c)}
            >
              {c.toString()}
            </button>
          );
        })}
      </div>

      <p>Hasil: {result}</p>
      {error ? <span style={{ color: "red" }}>{error}</span> : null}
    </div>
  );
}
