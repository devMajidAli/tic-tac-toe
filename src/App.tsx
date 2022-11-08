import { useEffect, useState } from "react";
import "./App.css";
import PlayGround from "./component/Playground";
import Footer from "./component/Footer";
import DeclareWinner from "./component/DeclareWinner";

function App() {
  const [matrixState, setMatrixState] = useState<null[][] | number[][]>(
    new Array(3).fill(new Array(3).fill(null))
  );
  const [turn, setTurn] = useState<number>(0);
  const [winner, setWinner] = useState<null | number>(null);

  useEffect(() => {
    let local = JSON.parse(String(localStorage.getItem("tic-tac-toe")));
    if (local) {
      setMatrixState(local.matrixState);
      setTurn(local.turn);
      setWinner(local.winner);
    }
  }, []);

  return (
    <div className="tic-tac-toe col-12 d-flex justify-content-center">
      <div>
        <DeclareWinner winner={winner} />
        <PlayGround
          matrixState={matrixState}
          winner={winner}
          setWinner={setWinner}
          setTurn={setTurn}
          turn={turn}
          setMatrixState={setMatrixState}
        />
        <Footer
          setWinner={setWinner}
          setTurn={setTurn}
          setMatrixState={setMatrixState}
          matrixState={matrixState}
        />
      </div>
    </div>
  );
}

export default App;
