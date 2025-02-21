import React from 'react';

function Board({ squares, onClick, winningLine }) {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <button 
          key={index} 
          className={`square ${winningLine && winningLine.includes(index) ? 'winning-square' : ''}`}
          onClick={() => onClick(index)}
        >
          {square}
        </button>
      ))}
    </div>
  );
}

export default Board;