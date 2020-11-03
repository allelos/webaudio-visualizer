export const getInnerWidth = () => window.innerWidth;
export const getInnerHeight = () => window.innerHeight;

export const max = (arr) => arr.reduce((a, b) => Math.max(a, b), []);
export const avg = (arr) =>
  arr.length && arr.reduce((sum, b) => sum + b, 0) / arr.legnth;

export const getCanvas = (el) => {
  const canvas = el.current;
  canvas.width = getInnerWidth();
  canvas.height = getInnerHeight();

  const ctx = canvas.getContext("2d");

  const clearCanvas = () => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffffff";
    ctx.clearRect(0, 0, getInnerWidth(), getInnerHeight());
    ctx.beginPath();
  };

  return {
    ctx,
    canvas,
    clearCanvas,
  };
};
