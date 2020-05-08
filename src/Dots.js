import React, { useRef, useEffect, useState } from "react";
import mojs from "@mojs/core";

import { max, avg } from "./utilities";

const draw = (el, audioData, value) => {
  if (!audioData) return;
  const canvas = el.current;

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

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

  // ctx.arc((width / 2), height / 2, height * 0.25, 0, Math.PI * 2);
  // ctx.shadowColor = "rgba(0,0,0,0.25)";
  // ctx.shadowBlur = 10;
  // ctx.shadowOffsetY = 4;
  // let linGrd = ctx.createLinearGradient(
  //   width / 2,
  //   height / 2,
  //   height * 0.25,
  //   height * 0.25
  // );
  // linGrd.addColorStop(0, "rgba(241,220,33,1)");
  // linGrd.addColorStop(1, "rgba(241,220,33,0.5)");
  // ctx.fillStyle = linGrd;
  // ctx.fill();

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

const Dots = ({ audioData }) => {
  const [value, setValue] = useState("lines");
  const el = useRef();

  useEffect(() => {
    draw(el, audioData, value);
  });

  return (
    <div>
      <canvas ref={el} className="dots" />
      <select
        className="select"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option default value="lines">
          Lines
        </option>
        <option value="circles">Circles</option>
      </select>
    </div>
  );
};

export default Dots;
