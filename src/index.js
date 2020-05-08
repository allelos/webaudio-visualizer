import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import Dots from "./Dots";
import { PlayButton, PauseButton } from "./Buttons";

import "./styles.css";

const AudioComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState([]);

  const audio = useRef();
  const analyzer = useRef();
  const dataArray = useRef();
  const raf = useRef();

  useEffect(() => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audio.current);
    analyzer.current = audioContext.createAnalyser();

    source.connect(analyzer.current);
    analyzer.current.connect(audioContext.destination);
    analyzer.current.fftSize = 256;
    dataArray.current = new Uint8Array(analyzer.current.frequencyBinCount);
  }, []);

  const update = () => {
    analyzer.current.getByteFrequencyData(dataArray.current);
    setAudioData(new Uint8Array(dataArray.current))
    raf.current = requestAnimationFrame(update);
  };

  const play = () => {
    audio.current.play();
    setIsPlaying(true);
    raf.current = requestAnimationFrame(update);
  };

  const pause = () => {
    audio.current.pause();
    setIsPlaying(false);
    cancelAnimationFrame(raf.current);
  };

  console.log(audioData);

  return (
    <div>
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
        <audio
          ref={audio}
          src="http://best.live24.gr/best1222"
          crossOrigin="anonymous"
        />
      </div>
      <Dots audioData={audioData} />
    </div>
  );
};

const App = () => {
  const [shouldStart, setShouldStart] = useState(false);
  if (shouldStart) {
    return <AudioComponent />;
  } else {
    return <button onClick={() => setShouldStart(true)}>Start</button>;
  }
};

ReactDOM.render(<App />, document.getElementById("app"));
