const createAudioCtx = () =>
  new window.AudioContext() || new window.webkitAudioContext();

export const getData = (audio, analyzer, data) => {
  const audioCtx = createAudioCtx();
  const source = audioCtx.createMediaElementSource(audio);
  analyzer.current = audioCtx.createAnalyser();
  source.connect(analyzer.current);
  analyzer.current.connect(audioCtx.destination);
  analyzer.current.fftSize = 256;
  data.current = new Uint8Array(analyzer.current.frequencyBinCount);
};
