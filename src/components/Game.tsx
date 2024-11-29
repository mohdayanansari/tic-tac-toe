import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Board from "./Board";
import {
  Player,
  Board as BoardType,
  checkWinner,
  isBoardFull,
  getComputerMove,
} from "../utils/gameLogic";
import Confetti from "react-confetti";

interface GameProps {
  rounds?: number;
  gameMode: "singleplayer" | "multiplayer";
  onGameEnd: (winner: Player) => void;
  playerXName: string;
  playerOName: string;
}

const Game: React.FC<GameProps> = ({ 
//   rounds,
  gameMode,
  onGameEnd,
  playerXName,
  playerOName,
}) => {
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (gameMode === "singleplayer" && currentPlayer === "O" && !winner) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, winner, gameMode]);

  useEffect(() => {
    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
    {/* @ts-expect-error */}
    if (winner && winner !== "draw") {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  const makeComputerMove = () => {
    const computerMove = getComputerMove(board);
    const newBoard = [...board];
    newBoard[computerMove] = "O";
    setBoard(newBoard);
    checkGameState(newBoard);
    setCurrentPlayer("X");
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkGameState(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkGameState = (currentBoard: BoardType) => {
    const gameWinner = checkWinner(currentBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      onGameEnd(gameWinner);
    } else if (isBoardFull(currentBoard)) {
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      setWinner("draw");
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      onGameEnd("draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row w-full items-center gap-6"
    >
      <Board board={board} onCellClick={handleCellClick} />
      <div className="flex flex-row md:flex-col gap-4 items-center justify-between md:items-end md:justify-end  w-full  md:w-[30%]">
        <AnimatePresence mode="wait">
          {winner && (
            <motion.div
              key="winner"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="text-xl font-bold text-green-400  capitalize"
            >
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-expect-error */}
              {winner === "draw"
                ? "It's a draw!"
                : `${winner === "X" ? playerXName : playerOName} wins!`}
            </motion.div>
          )}
          {!winner && (
            <motion.div
              key="current-player"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-blue-300 md:mt-4 "
            >
              Current Player:{" "}
              <span className="font-bold text-blue-400 capitalize">
                {currentPlayer === "X" ? playerXName : playerOName}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
          onClick={resetGame}
        >
          Reset Game
        </motion.button>
      </div>
      {showConfetti && <Confetti />}
    </motion.div>
  );
};

export default Game;
