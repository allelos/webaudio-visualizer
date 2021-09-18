import React, { useState, useRef } from "react";
import Controls from "../Controls";
import Player from "../Player";
import VizSelector from "../Selector";
import Visualization from "../Visualization";

export default () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualization, setVisualization] = useState("sphere");

  const audio = useRef();

  const play = () => {
    audio.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audio.current.pause();
    setIsPlaying(false);
  };

  return (
    <div>
      <Controls play={play} pause={pause} isPlaying={isPlaying} />
      <audio
        ref={audio}
        src="//best.live24.gr/best1222"
        crossOrigin="anonymous"
        // muted
      />
      <Player audio={audio} isPlaying={isPlaying}>
        {(audioData) => isPlaying && <Visualization audioData={audioData} />}
      </Player>
    </div>
  );
};
