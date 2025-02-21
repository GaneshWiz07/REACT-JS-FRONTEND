import React, { useState } from 'react';

function GreeterBox() {
  const [greet, setGreet] = useState('');
  
  function greetUser() {
    const greetings = [
      'Hello',
      'Hi',
      'Hey',
      'Welcome',
      'Good Day',
      'Good Morning',
      'Good Afternoon',
      'Thank you',
      'Thanks',
      'Thanks a lot'
    ];
    const index = Math.floor(Math.random() * greetings.length);
    setGreet(greetings[index]); 
  }

  return (
    <main className="App-main">
      <div className="counter-container" style={{ border: '1px solid black',backgroundColor:'grey' }}>
        <h2>GREETER-BOX</h2>
        <button type="button" onClick={greetUser}>Greet</button>
        <h3>{greet} Ganesh!</h3>
      </div>
    </main>
  );      
} 

export default GreeterBox;
