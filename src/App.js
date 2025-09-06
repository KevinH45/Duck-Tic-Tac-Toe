import React, { useState } from "react";
import Board from "./Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(4).fill(null).map(() => Array(4).fill(" ")));
  const [duck, setDuck] = useState(null); // duck off-board initially
  const [phase, setPhase] = useState("place");
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [turn, setTurn] = useState(0);
  const [placingDuck, setPlacingDuck] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("Player X's turn");

  const checkLoss = (board, player) => {
    const directions = [
      [1, 0], [0, 1], [1, 1], [1, -1]
    ];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] === player) {
          for (let [dr, dc] of directions) {
            let count = 1, nr = r + dr, nc = c + dc;
            while (nr >= 0 && nr < 4 && nc >= 0 && nc < 4 && board[nr][nc] === player) {
              count++;
              nr += dr;
              nc += dc;
            }
            if (count >= 3) return true;
          }
        }
      }
    }
    return false;
  };

  const checkTie = (board) => {
  // If any empty cell exists, it's not a tie
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
    if (board[r][c] === " "  && !(duck && (duck[0] === r && duck[1] === c))) return false;
    }
  }
  return true; // all cells filled
};


  const placeMark = (r, c) => {
    if (gameOver || board[r][c] !== " " || (duck && duck[0] === r && duck[1] === c)) return;
    if (phase !== "place") return;

    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = currentPlayer;
    setBoard(newBoard);

    if (checkLoss(newBoard, currentPlayer)) {
      setGameOver(true);
      setMessage(`Player ${currentPlayer} made 3 in a row and LOSES!`);
      return;
    }

    if (checkTie(newBoard)) {
      setGameOver(true);
      setMessage("It's a tie! No moves left.");
      return;
    }

    if (turn === 0){
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      setTurn(turn + 1);
      setMessage(`Player ${currentPlayer === "X" ? "O" : "X"}'s turn.`);
      return;
    }

    if (!duck) {
      setPlacingDuck(true);
      setMessage(`Player ${currentPlayer}, place the duck on any empty square.`);
    } else {
      setMessage(`Player ${currentPlayer}, drag and drop the duck on any empty square.`);
    }
    setPhase("duck");
  };

  const moveDuck = (r, c) => {
    if (gameOver || board[r][c] !== " " || (duck && duck[0] === r && duck[1] === c)) return;

    if (phase !== "duck") return;

    setDuck([r, c]);
    setPlacingDuck(false);

    // Switch player turn
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setTurn(turn + 1);
    setMessage(`Player ${currentPlayer === "X" ? "O" : "X"}'s turn.`);
    setPhase("place");
  };

  const handleCellClick = (r, c) => {
    if (placingDuck) moveDuck(r, c);
    else placeMark(r, c);
  };

  const resetGame = () => {
    setBoard(Array(4).fill(null).map(() => Array(4).fill(" ")));
    setDuck(null);
    setCurrentPlayer("X");
    setTurn(0);
    setPlacingDuck(false);
    setGameOver(false);
    setMessage("Player X's turn");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Duck Tic Tac Toe</h1>
        <div id="message">{message}</div>
        <Board
          board={board}
          duck={duck}
          handleCellClick={handleCellClick}
          moveDuck={moveDuck}
          gameOver={gameOver}
        />
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </DndProvider>
  );
}

export default App;
