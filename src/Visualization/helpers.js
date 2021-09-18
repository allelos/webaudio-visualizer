import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  IcosahedronGeometry,
  PlaneGeometry,
  MeshLambertMaterial,
  AmbientLight,
  PointLight,
  Vector3,
  DoubleSide,
} from "three";
import SimplexNoise from "simplex-noise";
import { max } from "../Visualizations/utilities";

export const renderer = new WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

camera.position.set(0, 0, 50);

const geometry = new IcosahedronGeometry(16, 14);
const material = new MeshLambertMaterial({
  color: 0xf6019d,
  wireframe: true,
});

const planeGeometry = new PlaneGeometry(800, 800, 20, 20);
const planeMaterial = new MeshLambertMaterial({
  color: 0xf6019d,
  side: DoubleSide,
  wireframe: true,
});

const sphere = new Mesh(geometry, material);

const plane = new Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, -30, 0);

const ambientLight = new AmbientLight(0xcccccc);
const pointLight = new PointLight(0xffffff);

// scene.add(plane);
scene.add(sphere);
scene.add(ambientLight);
scene.add(pointLight);

const modulate = (val, minVal, maxVal, outMin, outMax) => {
  const fr = (val - minVal) / (maxVal - minVal);
  const delta = outMax - outMin;
  return outMin + fr * delta;
};

const noise = new SimplexNoise();

const getBall = (mesh, audioData) => {
  const halfArray = Math.floor(audioData.length / 2);
  const lowerHalf = audioData.slice(0, halfArray);
  const upperHalf = audioData.slice(halfArray, audioData.length);

  const lowerMax = max(lowerHalf);
  const upperMax = max(upperHalf);

  const bass = modulate(lowerMax * 0.01, 0, 1, 0, 2);
  const treble = modulate(upperMax * 0.01, 0, 1, 0, 1);

  const offset = mesh.geometry.parameters.radius;
  const positions = mesh.geometry.attributes.position.array;

  for (let i = 0; i < positions.length; i += 3) {
    const vector = new Vector3(
      positions[i],
      positions[i + 1],
      positions[i + 2]
    );

    vector.normalize();

    const radius =
      offset +
      bass +
      noise.noise3D(vector.x + treble, vector.y + treble, vector.z + treble);

    vector.multiplyScalar(radius);

    Object.keys(vector).forEach(
      (key, index) => (positions[i + index] = vector[key])
    );
  }

  mesh.geometry.attributes.position.needsUpdate = true;
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
};

export const animate = (audioData) => {
  getBall(sphere, audioData);
  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.005;
  sphere.rotation.z += 0.005;
  plane.rotation.z += 0.001;
  renderer.render(scene, camera);
};

export const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
