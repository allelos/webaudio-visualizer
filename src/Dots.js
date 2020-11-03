import React, { useRef, useEffect, useState } from "react";

import { max, avg } from "./utilities";

const getInnerWidth = () => window.innerWidth;
const getInnerHeight = () => window.innerHeight;

const draw = (el, audioData, value) => {
  if (!audioData) return;
  const canvas = el.current;

  const ctx = canvas.getContext("2d");

  canvas.width = getInnerWidth();
  canvas.height = getInnerHeight();

  const width = canvas.width;
  const height = canvas.height;

  const halfArray = Math.floor(audioData.length / 2);
  const lowerHalf = audioData.slice(0, halfArray);
  const upperHalf = audioData.slice(halfArray, audioData.length);

  const circleArray = [
    max(lowerHalf),
    max(upperHalf),
    avg(lowerHalf),
    avg(upperHalf),
  ];

  // clear the canvas
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ffffff";
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();

  if (value === "circles") {
    const startAngle = 0;
    const endAngle = Math.PI * 2;
    const maxRadius = height * 0.25;

    circleArray.forEach((circle, index) => {
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
  }

  if (value === "lines") {
    const rectWidth = (width - 20) / audioData.length;

    for (let i = 0; i < audioData.length; i++) {
      ctx.save();
      ctx.strokeStyle = `rgba(${audioData[i]}, ${
        255 - audioData[i]
      }, 255, ${0.75})`;
      ctx.translate(10 + i * (rectWidth + 10), 5);
      ctx.strokeRect(0, 0, rectWidth, (audioData[i] / 255) * height * 0.5);
      ctx.restore();
    }
  }
};

const Dots = ({ audioData, visualization }) => {
  const el = useRef();

  useEffect(() => {
    draw(el, audioData, visualization);
  }, [audioData]);

  return <canvas ref={el} className="dots" />;
};

export default Dots;
