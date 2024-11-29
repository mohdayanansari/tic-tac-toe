export type Player = "X" | "O" | null;
export type Board = Player[];

export const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = (board: Board): Player => {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export const isBoardFull = (board: Board): boolean => {
  return board.every((cell) => cell !== null);
};

export const getComputerMove = (board: Board): number => {
  const emptyCells = board.reduce((acc, cell, index) => {
    if (cell === null) acc.push(index);
    return acc;
  }, [] as number[]);

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};
