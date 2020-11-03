import React, { useState } from "react";
import ReactDOM from "react-dom";
import Layout from './Layout';
import { PlayButton } from "./Controls/buttons";
import "./styles.css";

const App = () => {
  const [shouldStart, setShouldStart] = useState(false);
  if (shouldStart) {
    return <Layout />;
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
