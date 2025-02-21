import React, { useState } from 'react';

function BgChanger() {
    const [backgroundColor, setBackgroundColor] = useState('');

    return (
        <main className="App-main">
            <div className="counter-container" style={{ border: '1px solid black', backgroundColor: backgroundColor }}>
                <h2>BG-CHANGER</h2>
                <label htmlFor="color">Color: </label>
                <input 
                    type="text" 
                    id="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    placeholder="Enter color name or code"
                />
            </div>
        </main>
    );      
}

export default BgChanger;