import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = { DUCK: "duck" };

function Cell({ row, col, value, duck, handleCellClick, moveDuck, gameOver }) {
  const isDuckHere = duck && duck[0] === row && duck[1] === col;

  const [, drag] = useDrag({
    type: ItemTypes.DUCK,
    item: { row, col },
    canDrag: () => isDuckHere && !gameOver,
  });

    const [, drop] = useDrop({
    accept: ItemTypes.DUCK,
    drop: () => {
        if (!gameOver && isDuckHere === false) moveDuck(row, col);
    },
    });


  return (
    <td
      ref={drop}
      onClick={() => handleCellClick(row, col)}
      className={isDuckHere ? "duck" : ""}
      style={{
        width: "60px",
        height: "60px",
        textAlign: "center",
        fontSize: "32px",
        border: "2px solid black",
        cursor: "pointer",
      }}
    >
      {isDuckHere ? <div ref={drag} style={{ cursor: "grab" }}>🦆</div> : value}
    </td>
  );
}

export default Cell;