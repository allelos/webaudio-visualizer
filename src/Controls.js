import React from "react";

import { PlayButton, PauseButton } from "./Buttons";

const Controls = ({ play, pause, isPlaying }) => (
  <div className="controls">
    <div className="controls-header">
      <h2 className="station-title">Best 92.6</h2>
      <div className="station-image">
        <img src="http://best926.gr/Content/assets/media/large-logo.jpg" />
      </div>
    </div>
    <button
      className={"controls-button" + " " + (isPlaying && "hide")}
      onClick={play}
    >
      <PlayButton />
    </button>
    <button
      className={"controls-button" + " " + (!isPlaying && "hide")}
      onClick={pause}
    >
      <PauseButton />
    </button>
  </div>
);

export default Controls;
