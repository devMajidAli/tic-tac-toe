import { Dispatch, SetStateAction } from "react";
import produce from "immer";
import { setLocalStorage } from "../helper/util";

type Props = {
  matrixState: Array<Array<number | null>>;
  setMatrixState: Dispatch<SetStateAction<null[][] | number[][]>>;
  setTurn: Dispatch<SetStateAction<number>>;
  setWinner: Dispatch<SetStateAction<number | null>>;
};

export default function Footer({
  matrixState,
  setMatrixState,
  setWinner,
  setTurn,
}: Props) {
  const onSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let arraySize = parseInt(event.target.value);
    if (arraySize !== matrixState[0].length) {
      let newArray = new Array(arraySize).fill(new Array(arraySize).fill(null));
      setMatrixState(newArray);
      setLocalStorage(newArray, 0, null);
      setWinner(null);
      setTurn(0);
    }
  };

  const onHandleReset = () => {
    setWinner(null);
    setTurn(0);
    setMatrixState(
      produce((draft: Array<Array<number | null>>) => {
        draft.map((boxArray: Array<number | null>) => boxArray.fill(null));
        setLocalStorage(draft, 0, null);
      })
    );
  };

  return (
    <div className="p-1 d-flex justify-content-between">
      <select value={matrixState.length} onChange={onSizeChange}>
        <option value={3}>3x3</option>
        <option value={4}>4x4</option>
        <option value={5}>5x5</option>
        <option value={6}>6x6</option>
      </select>
      <button onClick={onHandleReset}>Reset</button>
    </div>
  );
}
