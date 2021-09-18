import { useState, useRef, useEffect, useCallback } from "react";
import { getData } from "./helpers";

const usePlayer = (audio, { isPlaying }) => {
  const [audioData, setAudioData] = useState([]);

  const analyzer = useRef();
  const data = useRef();
  const raf = useRef();

  const update = useCallback(() => {
    analyzer.current.getByteFrequencyData(data.current);
    setAudioData(new Uint8Array(data.current));
    raf.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => getData(audio.current, analyzer, data), []);
  useEffect(() => () => cancelAnimationFrame(raf.current), [isPlaying]);

  useEffect(() => {
    if (isPlaying) requestAnimationFrame(update);
    else cancelAnimationFrame(raf.current);
  }, [isPlaying]);

  return audioData;
};

export default usePlayer;
