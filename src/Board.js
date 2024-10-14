import React, {useState} from 'react'
import './Board.css';

function Board() {
  const [labels, setLabels] = useState(Array(9).fill("")); // Array of 9 empty strings for 9 buttons
  const [boardCondition, setBoardCondition] = useState(Array(9).fill(0)); // Array of 9 empty strings for 9 buttons
  const [turn, setTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [xCounter, setXCounter] = useState(0);
  const [oCounter, setOCounter] = useState(0);
  const [tieCounter, setTieCounter] = useState(0);

  const [winner, setWinner] = useState(null)



  const handleClick = (index) => {
    if (!boardCondition[index] && !gameOver) {
      const newLabels = [...labels];
      const newCondition = [...boardCondition];
  
      newLabels[index] = turn ? "X" : "O";
      newCondition[index] = turn ? 1 : 2;
  
      setLabels(newLabels);
      setBoardCondition(newCondition);
      setClicks(prev => prev + 1);
  
      if (checkIfGameOver(index, newCondition)) {
        setWinner(turn ? "X" : "O");
        document.querySelector('.endGameScreen').style.display = 'flex';
        turn ? setXCounter(prev => prev + 1) : setOCounter(prev => prev + 1);
        setGameOver(true);
      } 
      else if (clicks === 8) {  // If all spots are filled and no winner
        setGameOver(true);
        setTieCounter(prev => prev + 1)
        document.querySelector('.endGameScreen').style.display = 'flex';
      }
      else {
        setTurn(!turn); // Toggle turn only if no win or draw
      }
    }
  };
  



  const checkIfGameOver = (index, boardCondition) => {
    const column = index % 3;
    const rowStart = Math.floor(index / 3) * 3;

    // Check column (same column index across different rows)
    if (
      boardCondition[column] === boardCondition[column + 3] &&
      boardCondition[column + 3] === boardCondition[column + 6] &&
      boardCondition[column] !== 0
    ) {
      setGameOver(true);
      return true;
    }

    // Check row (same row index across different columns)
    if (
      boardCondition[rowStart] === boardCondition[rowStart + 1] &&
      boardCondition[rowStart + 1] === boardCondition[rowStart + 2] &&
      boardCondition[rowStart] !== 0
    ) {
      setGameOver(true);
      return true;
    }

    // Check diagonals using dynamic logic
    if (
      (index % 4 === 0 && // Main diagonal: 0, 4, 8 (i.e., index % 4 === 0)
        boardCondition[0] === boardCondition[4] &&
        boardCondition[4] === boardCondition[8] &&
        boardCondition[0] !== 0) ||
      (index % 2 === 0 && index !== 4 && // Anti-diagonal: 2, 4, 6 (i.e., index % 2 === 0 but not index 4)
        boardCondition[2] === boardCondition[4] &&
        boardCondition[4] === boardCondition[6] &&
        boardCondition[2] !== 0)
    ) {
      setGameOver(true);
      return true;
    }

    return false;
  };



  const handleReset = () => {
    setLabels(Array(9).fill(""));
    setBoardCondition(Array(9).fill(0));
    setTurn(true);
    setGameOver(false);
    setClicks(0);
    setWinner(null);
    document.querySelector('.endGameScreen').style.display = 'none';

  }
 

  return (
    <>
      <div className='endGameScreen'>
        <div className='seperate'>
          <h2>{winner ? winner + ' wins!!!!': "It is a tie" }  </h2>
          <button className='resetButton endScreenBtn' onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div className="board">
        {labels.map((label, index) => (
          <button
            key={index}
            className="box"
            onClick={() => handleClick(index)}
          >
            {label ? label : ""}
          </button>
        ))}
      </div>
      <div className='dashboard'>
        <h3>X Wins counter: {xCounter}</h3>
        <h3>O Wins Counter: {oCounter}</h3>
        <h3>Tie Counter: {tieCounter}</h3>

        <button className='resetButton' onClick={handleReset}>Reset</button>
      </div>
    
    </>
  );
}

export default Board;


