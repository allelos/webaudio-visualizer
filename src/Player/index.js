import React, { useState, useRef, useEffect } from "react";

const Player = ({ audio, isPlaying, children }) => {
  const [audioData, setAudioData] = useState(() => []);

  const analyzer = useRef();
  const dataArray = useRef();
  const raf = useRef();

  useEffect(() => {
    const audioContext =
      new window.AudioContext() || new window.webkitAudioContext();
    const source = audioContext.createMediaElementSource(audio.current);
    analyzer.current = audioContext.createAnalyser();

    source.connect(analyzer.current);
    analyzer.current.connect(audioContext.destination);
    analyzer.current.fftSize = 256;
    dataArray.current = new Uint8Array(analyzer.current.frequencyBinCount);

    return () => {
      cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      raf.current = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(raf.current);
    }
  }, [isPlaying]);

  const update = () => {
    analyzer.current.getByteFrequencyData(dataArray.current);
    setAudioData(new Uint8Array(dataArray.current));
    raf.current = requestAnimationFrame(update);
  };

  return children(audioData);
};

export default Player;
