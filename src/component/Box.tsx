import React from "react";
type Props = {
  state: number | null;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  key: number;
};

export default function Box({ state, handleClick }: Props) {
  return (
    <div onClick={handleClick} className="box-css m-1 text-center">
      <div className="center-text">{state === 1 ? "X" : state}</div>
    </div>
  );
}
