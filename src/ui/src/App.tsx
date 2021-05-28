import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

interface AppProps {}

function App({}: AppProps) {
  const [content, setContent] = React.useState('')
  // Create the count state.
  // const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  // useEffect(() => {
  //   const timer = setTimeout(() => setCount(count + 1), 1000);
  //   return () => clearTimeout(timer);
  // }, [count, setCount]);

  const onPublishClick = async () => {
    const res = await fetch('http://209.182.218.3:5000/api/publish', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content
      }),
    })
    console.log('res', res)
  }

  // Return the App component.
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p className="p-4 border-blue-300 border rounded">
          Web3
        </p>

        <p>
          <button onClick={onPublishClick} className="p-2 border-gray-100 border rounded text-sm bg-gray-700 hover:bg-gray-600">Publish This Content</button>
        </p>

        <p className="w-full">
          <textarea defaultValue="Hello World" onChange={(ev) => setContent(ev.target.value)} className="text-sm text-gray-700 p-2" />
        </p>
        
      </header>
    </div>
  );
}

export default App;
