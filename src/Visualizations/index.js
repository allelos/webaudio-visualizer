import React, { useRef, useLayoutEffect } from "react";
import makeCircles from "./circles";
import makeLines from "./lines";

const visualizationMap = {
  lines: makeLines,
  circles: makeCircles,
};

const Visualizations = ({ audioData, visualization }) => {
  const el = useRef();

  useLayoutEffect(() => {
    visualizationMap[visualization](el, audioData);
  }, [visualization, audioData]);

  return <canvas ref={el} className="dots" />;
};

export default Visualizations;
