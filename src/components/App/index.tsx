import React, { useEffect, useState } from "react";
import NumberDisplay from "../NumberDisplay";
import "./App.scss";
import { generateCells } from "../../utils";
import Button from "../Button";
import { CellState } from "../../types";
import { Face, Cell } from "../../types";

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [time, setTime] = useState<number>(0);
  const [face, setFace] = useState<Face>(Face.smile);
  const [live, setLive] = useState<boolean>(false);

  useEffect(() => {
    const handleMousedown = () => {
      setFace(Face.oh);
    };
    const handleMouseup = () => {
      setFace(Face.smile);
    };
    window.addEventListener("mousedown", handleMousedown);
    window.addEventListener("mouseup", handleMouseup);

    return () => {
      window.removeEventListener("mousedown", handleMousedown);
      window.removeEventListener("mouseup", handleMouseup);
    };
  }, []);

  useEffect(() => {
    if (live) {
      const timer = setInterval(() => setTime(time + 1), 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    //start
    if (!live) {
      setLive(true);
    }
  };

  const onFaceClick = (): void => {
    if (live) {
      setLive(false);
      setTime(0);
      setCells(generateCells());
    }
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          state={cell.state}
          value={cell.value}
          row={rowIndex}
          col={colIndex}
          onClick={handleCellClick}
        />
      ))
    );
  };

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face" onClick={onFaceClick}>
          <span role="img" aria-label="face">
            {face}
          </span>
        </div>
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
