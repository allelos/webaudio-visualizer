import usePlayer from "./usePlayer";

const Player = ({ audio, isPlaying, children }) => {
  const audioData = usePlayer(audio, { isPlaying });
  return children(audioData);
};

export default Player;
