import React, { useState, useEffect } from 'react';
import Board from './Tic-Tac-sources/Board';
import './Tic-Tac-sources/TicTacToe.css';

function TicTacToe() {
  const [board, setBoard] = useState(() => {
    const savedBoard = localStorage.getItem('ticTacToeBoard');
    return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null);
  });
  
  const [xIsNext, setXIsNext] = useState(() => {
    const savedXIsNext = localStorage.getItem('ticTacToeXIsNext');
    return savedXIsNext !== null ? JSON.parse(savedXIsNext) : true;
  });
  
  const [winner, setWinner] = useState(() => {
    const savedWinner = localStorage.getItem('ticTacToeWinner');
    return savedWinner || null;
  });

  const [winningLine, setWinningLine] = useState(() => {
    const savedWinningLine = localStorage.getItem('ticTacToeWinningLine');
    return savedWinningLine ? JSON.parse(savedWinningLine) : null;
  });

  useEffect(() => {
    localStorage.setItem('ticTacToeBoard', JSON.stringify(board));
    localStorage.setItem('ticTacToeXIsNext', JSON.stringify(xIsNext));
    localStorage.setItem('ticTacToeWinner', winner || '');
    localStorage.setItem('ticTacToeWinningLine', JSON.stringify(winningLine));
  }, [board, xIsNext, winner, winningLine]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);

    const winResult = calculateWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
    }

    setXIsNext(!xIsNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine(null);
    
    localStorage.removeItem('ticTacToeBoard');
    localStorage.removeItem('ticTacToeXIsNext');
    localStorage.removeItem('ticTacToeWinner');
    localStorage.removeItem('ticTacToeWinningLine');
  };

  return (
    <div className="tic-tac-toe-container">
      <h2>TIC-TAC-TOE GAME</h2>
      <Board 
        squares={board} 
        onClick={handleClick}
        winningLine={winningLine}
      />
      <div className="game-info">
        {winner ? (
          <p className="winner">Winner: {winner}! 🎉</p>
        ) : (
          <p className="turn">Next Player: {xIsNext ? 'X' : 'O'}</p>
        )}
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}

export default TicTacToe;
