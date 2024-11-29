import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Game from "./components/Game";
import { Player } from "./utils/gameLogic";

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<
    "singleplayer" | "multiplayer" | null
  >(null);
  const [rounds, setRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });
  const [gameState, setGameState] = useState<"setup" | "playing" | "ended">(
    "setup"
  );
  const [playerXName, setPlayerXName] = useState("");
  const [playerOName, setPlayerOName] = useState("");

  const handleGameEnd = (winner: Player) => {
    setScores((prevScores) => ({
      ...prevScores,
      [winner || "draw"]: prevScores[winner || "draw"] + 1,
    }));

    if (currentRound < rounds) {
      setCurrentRound((prevRound) => prevRound + 1);
    } else {
      setGameState("ended");
    }
  };

  const startNewGame = () => {
    setScores({ X: 0, O: 0, draw: 0 });
    setCurrentRound(1);
    setGameState("playing");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-3xl shadow-2xl space-y-4 max-w-2xl w-full border border-blue-500"
      >
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-4xl font-bold text-center text-blue-400 mb-2 tracking-wider"
        >
          Tic Tac Toe
        </motion.h1>
        <AnimatePresence mode="wait">
          {gameState === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-col space-y-4">
                <motion.input
                  whileFocus={{ scale: 1.05 }}
                  type="text"
                  placeholder="Player X Name"
                  value={playerXName}
                  onChange={(e) => setPlayerXName(e.target.value)}
                  className="bg-gray-700 text-white border-2 border-blue-500 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400"
                />
                <motion.input
                  whileFocus={{ scale: 1.05 }}
                  type="text"
                  placeholder="Player O Name"
                  value={playerOName}
                  onChange={(e) => setPlayerOName(e.target.value)}
                  className="bg-gray-700 text-white border-2 border-blue-500 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="flex justify-center space-x-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out ${
                    gameMode === "singleplayer"
                      ? "bg-blue-600 ring-4 ring-blue-300"
                      : "bg-blue-500"
                  }`}
                  onClick={() => setGameMode("singleplayer")}
                >
                  vs Computer
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out ${
                    gameMode === "multiplayer"
                      ? "bg-purple-600 ring-4 ring-purple-300"
                      : "bg-purple-500"
                  }`}
                  onClick={() => setGameMode("multiplayer")}
                >
                  Multiplayer
                </motion.button>
              </div>
              {gameMode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-2xl font-semibold text-blue-400 mb-4"
                >
                  Selected Mode:{" "}
                  {gameMode === "singleplayer"
                    ? "Single Player"
                    : "Multiplayer"}
                </motion.div>
              )}
              <div className="flex items-center justify-center space-x-4">
                <label htmlFor="rounds" className="text-blue-300 text-lg">
                  Rounds:
                </label>
                <motion.input
                  whileFocus={{ scale: 1.05 }}
                  type="number"
                  id="rounds"
                  min="1"
                  value={rounds}
                  onChange={(e) => setRounds(parseInt(e.target.value))}
                  className="bg-gray-700 text-white border-2 border-blue-500 rounded-lg px-4 py-2 w-20 text-center focus:outline-none focus:border-blue-400"
                />
              </div>
              {gameMode && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                  onClick={() => {
                    if (
                      playerXName &&
                      (gameMode === "singleplayer" || playerOName)
                    ) {
                      startNewGame();
                    } else {
                      alert(
                        "Please enter player name(s) before starting the game."
                      );
                    }
                  }}
                >
                  Start Game
                </motion.button>
              )}
            </motion.div>
          )}
          {gameState === "playing" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="flex w-full justify-between">
                <div className="text-center text-lg font-semibold text-blue-400">
                  {gameMode === "singleplayer"
                    ? "Single Player"
                    : "Multiplayer"}{" "}
                  Mode
                </div>
                <div className="text-center text-lg font-semibold text-blue-300">
                  Round{" "}
                  <span className="text-green-500 font-black animate-pulse">
                    {currentRound}
                  </span>{" "}
                  of{" "}
                  <span className="text-blue-600 font-black">{rounds}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-medium text-blue-200">
                <div className="capitalize">
                  {playerXName}: {scores.X}
                </div>
                <div className="capitalize">
                  {gameMode === "singleplayer" ? "Computer" : playerOName}:{" "}
                  {scores.O}
                </div>
                <div>Draws: {scores.draw}</div>
              </div>
              <Game
                rounds={rounds}
                gameMode={gameMode!}
                onGameEnd={handleGameEnd}
                playerXName={playerXName}
                playerOName={
                  gameMode === "singleplayer" ? "Computer" : playerOName
                }
              />
              <div className="flex justify-center space-x-6 w-full ">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out mt-10"
                  onClick={() => setGameState("setup")}
                >
                  Back to Setup
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out mt-10"
                  onClick={() => setGameState("ended")}
                >
                  Exit Game
                </motion.button>
              </div>
            </motion.div>
          )}
          {gameState === "ended" && (
            <motion.div
              key="ended"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-6"
            >
              <h2 className="text-3xl font-bold text-blue-400 mb-4">
                Final Scores
              </h2>
              <div className="text-xl text-blue-200">
                {playerXName}: {scores.X} |{" "}
                {gameMode === "singleplayer" ? "Computer" : playerOName}:{" "}
                {scores.O} | Draws: {scores.draw}
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="text-3xl font-bold text-green-400"
              >
                {scores.X > scores.O
                  ? `${playerXName} wins!`
                  : scores.O > scores.X
                  ? `${
                      gameMode === "singleplayer" ? "Computer" : playerOName
                    } wins!`
                  : "It's a tie!"}
              </motion.div>
              <div className="mt-8 space-x-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                  onClick={() => setGameState("setup")}
                >
                  New Game
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                  onClick={() => window.location.reload()}
                >
                  Exit
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;
