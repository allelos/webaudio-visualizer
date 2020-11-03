import { getInnerWidth, getInnerHeight, getCanvas } from './utilities'

const makeLines = (el, audioData) => {
  const { ctx, clearCanvas } = getCanvas(el);

  const width = getInnerWidth();
  const height = getInnerHeight();
  const rectWidth = (width - 20) / audioData.length;

  clearCanvas();
  audioData.forEach((value, index) => {
    ctx.save();
    ctx.strokeStyle = `rgba(${value}, ${255 - value}, 255, ${0.75})`;
    ctx.translate(10 + index * (rectWidth + 10), 5);
    ctx.strokeRect(0, 0, rectWidth, (value / 255) * height * 0.5);
    ctx.restore();
  });
};

export default makeLines;
