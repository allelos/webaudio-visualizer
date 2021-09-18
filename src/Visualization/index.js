import React, { useEffect, useLayoutEffect, useRef } from "react";
import { renderer, animate, onResize } from "./helpers";

const Visualization = ({ audioData }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    ref.current.appendChild(renderer.domElement);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    animate(audioData);
  }, [audioData]);

  return <div ref={ref} />;
};

export default Visualization;
