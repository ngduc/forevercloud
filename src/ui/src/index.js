import * as React from "react";
import * as ReactDOM from "react-dom";

import Main from './app/Main'
import './index.css';

import LogRocket from 'logrocket';
LogRocket.init('h4tpg3/forevercloud');

function App() {
  return (
    <Main />
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
