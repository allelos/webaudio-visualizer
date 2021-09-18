import React, { useRef, useLayoutEffect } from "react";
import makeCircles from "./circles";
import makeLines from "./lines";
import makeSphere from "./sphere";

const visualizationMap = {
  lines: makeLines,
  circles: makeCircles,
  sphere: makeSphere,
};

const Visualizations = ({ audioData, visualization }) => {
  const el = useRef();

  useLayoutEffect(() => {
    visualizationMap[visualization](el, audioData);
  }, [visualization, audioData]);

  return <canvas ref={el} className="dots"/>;
};

export default Visualizations;
