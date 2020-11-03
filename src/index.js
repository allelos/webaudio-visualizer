import React, { useState } from "react";
import ReactDOM from "react-dom";
import AudioComponent from './App';
import { PlayButton } from "./Buttons";
import "./styles.css";

const App = () => {
  const [shouldStart, setShouldStart] = useState(false);
  if (shouldStart) {
    return <AudioComponent />;
  } else {
    return (
      <div className="container">
        <button className="start-button" onClick={() => setShouldStart(true)}>
          <PlayButton />
        </button>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById("app"));
