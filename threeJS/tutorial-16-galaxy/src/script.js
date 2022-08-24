import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * GALAXY
 */

let points = null;
let geometry = null;
let material = null;

const parameters = {
  count: 10000,
  size: 0.02,
  radius: 5,
  branches: 4,
  spin: 0.5,
  random: 0.5,
  randomPow: 2, // create a parabolic
  insideColor: "#ff3700",
  outsideColor: "#1b3984",
};

// Debug
const gui = new dat.GUI();
gui.add(parameters, "count", 100, 100000, 100).onFinishChange(generateGalaxy);
gui.add(parameters, "size", 0.001, 0.1, 0.001).onFinishChange(generateGalaxy);
gui.add(parameters, "radius", 0.1, 20, 0.1).onFinishChange(generateGalaxy);
gui.add(parameters, "branches", 2, 10, 1).onFinishChange(generateGalaxy);
gui.add(parameters, "spin", -5, 5, 0.01).onFinishChange(generateGalaxy);
gui.add(parameters, "random", 0.1, 1, 0.01).onFinishChange(generateGalaxy);
gui.add(parameters, "randomPow", 2, 10, 0.01).onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

const textureLoader = new THREE.TextureLoader();
const particleColor = textureLoader.load("/textures/particles/3.png");

function generateGalaxy() {
  // Destroy old galaxy for each update

  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }



  // Geometry
  // geometry = new THREE.BufferGeometry();
  geometry = new THREE.SphereBufferGeometry(1,32,32);
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  // Loop
  for (let n = 0; n < positions.length; n++) {
    // random
    const randomX =
      Math.pow(Math.random(), parameters.randomPow) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomY =
      Math.pow(Math.random(), parameters.randomPow) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomZ =
      Math.pow(Math.random(), parameters.randomPow) *
      (Math.random() < 0.5 ? 1 : -1);

    // radius
    const radius = Math.random() * parameters.radius;

    // Angle
    const spinAngle = parameters.spin * radius;
    const branchAngle =
      ((n % parameters.branches) / parameters.branches) * Math.PI * 2;

    // Colors

    const mixedColors = new THREE.Color(parameters.insideColor);
    mixedColors.lerp(
      new THREE.Color(parameters.outsideColor),
      radius / parameters.radius
    ); // color > extends from inside to outside radius

    const c3 = n * 3;
    colors[c3] = mixedColors.r;
    colors[c3 + 1] = mixedColors.g;
    colors[c3 + 2] = mixedColors.b;
    // Position
    const n3 = n * 3;
    positions[n3] = Math.cos(branchAngle + spinAngle) * radius + randomX; // x
    positions[n3 + 1] = randomY; // y
    positions[n3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ; // z
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3)); // colors

  // material
  material = new THREE.PointsMaterial({
    map:particleColor,
    size: parameters.size,
    transparent: true,
    sizeAttenuation: true, // perspective view
    depthWrite: false, // improve alpha
    blending: THREE.AdditiveBlending,
    vertexColors: true, // point colors
  });

  // POINT
  points = new THREE.Points(geometry, material);
  scene.add(points);
}

generateGalaxy();
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
