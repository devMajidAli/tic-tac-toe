interface Props {
  winner: number | null;
}

export default function DeclareWinner({ winner }: Props) {
  return (
    <div className="text-center">
      {winner !== null && `Winner is ${winner === 1 ? "X" : winner}`}
    </div>
  );
}
