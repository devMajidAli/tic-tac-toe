export const setLocalStorage = (storeMatrixState: Array<Array<number | null>>, storeTurn: number, storeWinner: number | null) => {
  localStorage.setItem(
    "tic-tac-toe",
    JSON.stringify({
      matrixState: storeMatrixState,
      turn: storeTurn,
      winner: storeWinner,
    })
  );
};
