import React from "react";
import Cell from "./Cell";

function Board({ board, duck, handleCellClick, moveDuck, gameOver }) {
  return (
    <table>
      <tbody>
        {board.map((rowArr, r) => (
          <tr key={r}>
            {rowArr.map((cell, c) => (
              <Cell
                key={c}
                row={r}
                col={c}
                value={cell}
                duck={duck}
                handleCellClick={handleCellClick}
                moveDuck={moveDuck}
                gameOver={gameOver}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
