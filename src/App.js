import React, { useState, useRef} from "react";
import Controls from "./Controls";
import Player from "./player";
import VizSelector from "./VizSelector";
import Dots from "./Dots";

export default () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualization, setVisualization] = useState(() => "lines");

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
      />
      <Player audio={audio} isPlaying={isPlaying}>
        {(audioData) => (
          <Dots audioData={audioData} visualization={visualization} />
        )}
      </Player>
      <VizSelector value={visualization} onChange={setVisualization} />
    </div>
  );
};
