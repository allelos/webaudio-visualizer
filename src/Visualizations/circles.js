import {
  getCanvas,
  getInnerWidth,
  getInnerHeight,
  max,
  avg,
} from "./utilities";

const makeCircles = (el, audioData) => {
  const { ctx, clearCanvas } = getCanvas(el);

  const height = getInnerHeight();
  const width = getInnerWidth();
  const startAngle = 0;
  const endAngle = Math.PI * 2;
  const maxRadius = height * 0.25;

  const halfArray = Math.floor(audioData.length / 2);
  const lowerHalf = audioData.slice(0, halfArray);
  const upperHalf = audioData.slice(halfArray, audioData.length);

  const circleArray = [
    max(lowerHalf),
    max(upperHalf),
    avg(lowerHalf),
    avg(upperHalf),
  ];

  clearCanvas();
  circleArray.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(
      width / 2,
      height / 2,
      (circle / 255) * maxRadius,
      startAngle,
      endAngle,
      true
    );
    ctx.strokeStyle = `rgba(${circle}, ${255 - circle}, 255, ${0.5})`;
    ctx.shadowColor = `rgba(${circle}, ${255 - circle}, 255 , 1)`;
    ctx.shadowBlur = 8;
    ctx.stroke();
  });
};

export default makeCircles;
