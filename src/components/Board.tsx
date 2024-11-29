import React from 'react';
import { Player } from '../utils/gameLogic';
import { motion, AnimatePresence } from 'framer-motion';

interface BoardProps {
  board: Player[];
  onCellClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  const cellVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 180 },
    tap: { scale: 0.95, backgroundColor: "#4A5568" },
  };

  const symbolVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: [1.5, 1], opacity: 1, rotate: [0, 360] },
  };

  const clickAnimation = (index: number) => {
    if (board[index] === null) {
      onCellClick(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-3 gap-4 w-[350px] h-[300px] md:w-96 md:h-96 flex-1"
    >
      {board.map((cell, index) => (
        <motion.button
          key={index}
          variants={cellVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(59, 130, 246)" }}
          whileTap="tap"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-gray-700 hover:bg-gray-600 text-6xl font-bold rounded-xl shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center  h-32 overflow-hidden"
          onClick={() => clickAnimation(index)}
          disabled={cell !== null}
        >
          <AnimatePresence mode="wait">
            {cell && (
              <motion.span
                key={cell}
                variants={symbolVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`${cell === 'X' ? 'text-blue-400' : 'text-purple-400'}`}
              >
                {cell}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default Board;

