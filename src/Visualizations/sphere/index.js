import { WebGLRenderer } from "three";
import {
  getCanvas,
  getInnerWidth,
  getInnerHeight,
  max,
  avg,
} from "../utilities";

const getRenderer = (canvas) => new WebGLRenderer({ canvas: canvas, alpha: true});
const getEmptyParentNode = (el) => {
  const parentNode = el.current.parentNode;
  parentNode.removeChild(el.current);
  return parentNode;
};

const makeSphere = (el, audioData) => {
  const renderer = getRenderer(el.current);
  console.log(renderer)
//   const parentNode = getEmptyParentNode(el);
//   parentNode.appendChild(renderer.domElement)
};

export default makeSphere;
