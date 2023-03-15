import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [formula, setFormula] = useState([]);
  const [result, setResult] = useState(0);
  const [tempResult, setTempResult] = useState([]);
  const [stateResult, setStateResult] = useState(false);

  const onClick = (e) => {
    const { value } = e.target;

    if (stateResult) {
      if (Number(value)) {
        setFormula([value]);
        setTempResult([value]);
      } else if (value === ".") {
        setFormula([0, value]);
        setTempResult([0, value]);
      } else {
        setFormula([result, value]);
        setTempResult([value]);
      }
      setStateResult(false);
      return;
    }

    let last = formula[formula.length - 1];
    let first = formula[0];

    if (value === ".") {
      if (tempResult.includes(".")) return;
      if (!Number(last) && last != 0) {
        console.log("d", last);
        setTempResult([0, value]);
        setFormula([0, value]);
        return;
      }
    }

    if (first == 0 && value != "." && !tempResult.includes(".")) {
      return;
    }
    if (value === "." && Number(last)) {
      setTempResult([...tempResult, value]);
      setFormula([...formula, value]);
      return;
    }

    setFormula([...formula, value]);

    if (Number(value) || value == 0) {
      if (last === "+" || last === "-" || last === "⋅" || last === "/") {
        setTempResult([value]);
      } else {
        setTempResult([...tempResult, value]);
      }
    } else if (value == ".") {
      setTempResult([...tempResult, value]);
    } else {
      setTempResult([value]);
    }
  };

  const onClear = () => {
    setFormula([]);
    setTempResult([]);
    setResult(0);
  };

  const onResult = () => {
    const newFormula = formula.map((item) => {
      if (item === "⋅") {
        return "*";
      }
      return item;
    });
    const newResult = eval(newFormula.join(""));
    setResult(newResult);
    setFormula([...formula, "=", newResult]);
    setStateResult(true);
  };

  return (
    <div className="container">
      <div className="main">
        <div className="main-result">
          <div className="formula">{formula.join("")}</div>
          <div id="display" className="output">
            {stateResult ? result : tempResult.join("") || 0}
          </div>
        </div>
        <div className="grid">
          <div className="col-2">
            <button id="clear" onClick={onClear} className="bg-secondary">
              AC
            </button>
          </div>

          <div className="">
            <button id="divide" onClick={onClick} value="/">
              /
            </button>
          </div>
          <div id="multiply" className="">
            <button onClick={onClick} value="⋅">
              x
            </button>
          </div>

          <div className="">
            <button id="seven" onClick={onClick} value="7">
              7
            </button>
          </div>
          <div id="eight" className="">
            <button onClick={onClick} value="8">
              8
            </button>
          </div>
          <div className="">
            <button id="nine" onClick={onClick} value="9">
              9
            </button>
          </div>
          <div className="">
            <button id="subtract" onClick={onClick} value="-">
              -
            </button>
          </div>

          <div className="">
            <button id="four" onClick={onClick} value="4">
              4
            </button>
          </div>
          <div className="">
            <button id="five" onClick={onClick} value="5">
              5
            </button>
          </div>
          <div className="">
            <button id="six" onClick={onClick} value="6">
              6
            </button>
          </div>
          <div className="">
            <button id="add" onClick={onClick} value="+">
              +
            </button>
          </div>

          <div className="">
            <button id="one" onClick={onClick} value="1">
              1
            </button>
          </div>
          <div className="">
            <button id="two" onClick={onClick} value="2">
              2
            </button>
          </div>
          <div className="">
            <button id="three" onClick={onClick} value="3">
              3
            </button>
          </div>
          <div className="row-2 ">
            <button
              id="equals"
              onClick={onResult}
              className="bg-primary"
              value="="
            >
              =
            </button>
          </div>

          <div className="col-2">
            <button id="zero" onClick={onClick} value="0">
              0
            </button>
          </div>

          <div className="">
            <button id="decimal" onClick={onClick} value=".">
              .
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
