import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

interface AppProps {}

function App({}: AppProps) {
  // Create the count state.
  // const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  // useEffect(() => {
  //   const timer = setTimeout(() => setCount(count + 1), 1000);
  //   return () => clearTimeout(timer);
  // }, [count, setCount]);

  // Return the App component.
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p className="p-4 border-blue-300 border rounded">
          Web3
        </p>

        <p>
          Content
        </p>
        
      </header>
    </div>
  );
}

export default App;
