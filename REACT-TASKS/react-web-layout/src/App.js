import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import GreeterBox from './Tasks/GreeterBox';
import BgChanger from './Tasks/BgChanger';
import TicTacToe from './Tasks/Tic-Tac-Toe';
 
function Home() {
  return (
    <div className="counter-container" style={{ border: '1px solid black' }}>
      <h1>Welcome to my React Web Layout</h1>
      <h4>Explore the tasks by clicking on the navigation links above</h4>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>REACT TASK MANAGER</h1>
        </header>
        <nav className="App-nav">
          <ul>
            <li><NavLink to="/" end>TASKS✨</NavLink></li>
            <li><NavLink to="/task1">BG-CHANGER🎨</NavLink></li>
            <li><NavLink to="/task2">GREETER-BOX👋</NavLink></li>
            <li><NavLink to="/task3">TIC-TAC-TOE🎰</NavLink></li>
          </ul>
        </nav>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task1" element={<BgChanger />} />
            <Route path="/task2" element={<GreeterBox />} />
            <Route path="/task3" element={<TicTacToe />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>&copy; 2025 React Web Layout</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
