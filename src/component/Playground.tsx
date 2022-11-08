import { Dispatch, SetStateAction } from "react";
import produce from "immer";
import { setLocalStorage } from "../helper/util";
import Box from "./Box";

const verticalCheck = (
  matrix: Array<Array<number | null>>,
  index: number,
  turn: number | null
): Boolean => {
  return matrix.find(
    (item: Array<number | null>) =>
      item[index] === null || item[index] === Number(!turn)
  ) === undefined
    ? true
    : false;
};

const horizontalCheck = (
  matrix: Array<Array<number | null>>,
  arrayNumber: number,
  turn: number
): Boolean => {
  return matrix[arrayNumber].find(
    (item) => item === null || item === Number(!turn)
  ) === undefined
    ? true
    : false;
};

const diagonalRightCheck = (
  matrix: Array<Array<number | null>>,
  turn: number
): Boolean => {
  return matrix.find(
    (item: Array<number | null>, index: number) =>
      item[index] === null || item[index] === Number(!turn)
  ) === undefined
    ? true
    : false;
};

const diagonalLeftCheck = (
  matrix: Array<Array<number | null>>,
  turn: number
): Boolean => {
  return matrix.find(
    (item: Array<number | null>, index: number) =>
      item[matrix.length - 1 - index] === null ||
      item[matrix.length - 1 - index] === Number(!turn)
  ) === undefined
    ? true
    : false;
};

type Props = {
  matrixState: Array<Array<number | null>>;
  setMatrixState: Dispatch<SetStateAction<null[][] | number[][]>>;
  winner: number | null;
  turn: number;
  setTurn: Dispatch<SetStateAction<number>>;
  setWinner: Dispatch<SetStateAction<number | null>>;
};

export default function PlayGround({
  matrixState,
  setMatrixState,
  winner,
  turn,
  setTurn,
  setWinner,
}: Props) {
  const handleBoxClick = (arrayNumber: number, index: number) => {
    if (matrixState[arrayNumber][index] === null) {
      setMatrixState(
        produce((draft: Array<Array<number | null>>) => {
          draft[arrayNumber][index] = turn;
          checkForWinner(draft, arrayNumber, index);
        })
      );
      setTurn(Number(!turn));
    }
  };

  const toSetWinner = (matrix: Array<Array<number | null>>) => {
    setWinner(turn);
    setLocalStorage(matrix, Number(!turn), turn);
  };

  const checkForWinner = (
    draftMatrixState: Array<Array<number | null>>,
    arrayNumber: number,
    index: number
  ) => {
    if (horizontalCheck(draftMatrixState, arrayNumber, turn)) {
      return toSetWinner(draftMatrixState);
    } else if (
      arrayNumber === index &&
      diagonalRightCheck(draftMatrixState, turn)
    ) {
      return toSetWinner(draftMatrixState);
    } else if (
      draftMatrixState.length - 1 - arrayNumber === index &&
      diagonalLeftCheck(draftMatrixState, turn)
    ) {
      return toSetWinner(draftMatrixState);
    } else if (verticalCheck(draftMatrixState, index, turn)) {
      return toSetWinner(draftMatrixState);
    } else {
      setLocalStorage(draftMatrixState, Number(!turn), winner);
    }
  };

  return (
    <>
      {matrixState.map(
        (matrixArray: Array<number | null>, matrixArrayIndex: number) => (
          <div className="d-flex">
            {matrixArray.map(
              (singleBox: number | null, singleBoxIndex: number) => (
                <Box
                  key={matrixArrayIndex + singleBoxIndex}
                  handleClick={() => {
                    if (winner === null) {
                      handleBoxClick(matrixArrayIndex, singleBoxIndex);
                    }
                  }}
                  state={singleBox}
                />
              )
            )}
          </div>
        )
      )}
    </>
  );
}
