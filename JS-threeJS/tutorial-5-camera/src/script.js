import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  // normalise to -0.5 to 0.5
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

// scene
const scene = new THREE.Scene();

// sizes
const sizes = {
  width: 800,
  height: 600,
};

// axes helper
const axeshelper = new THREE.AxesHelper();
scene.add(axeshelper);

// renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "gray" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

mesh.position.set(0, 0, 0);

// camera ortho > To remove the view of obj being squeeze use aspect ratio on the longer side
// const aspectRatio = sizes.width/sizes.height
// const camera = new THREE.OrthographicCamera(-2*aspectRatio,2*aspectRatio,2,-2)

// camera perspective
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
); // FOV, viewport, view container of nearest and farthest

camera.position.set(0, 0, 3);
scene.add(camera);

camera.lookAt(mesh.position);

// adjust speed > Clock

const clock = new THREE.Clock();

// // uncomment for ortho camera
// function gameLoop() {
//   const elapsedTime = clock.getElapsedTime();
//   mesh.rotation.y = elapsedTime * 3.14 * .5;
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(gameLoop);
// }
// gameLoop();

// // update camera view
// function cameraLoop() {

//   camera.position.set(cursor.x*8,cursor.y*8)
//   camera.lookAt(mesh.position)
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(cameraLoop);

// }
// cameraLoop();

// // stationery rotate
// function cameraLoop() {

//   const oneRev = Math.PI *2
//   const multipler = 3

//   camera.position.x = Math.sin(cursor.x * oneRev) * multipler
//   camera.position.z = Math.cos(cursor.x * oneRev) * multipler
//   camera.position.y = cursor.y * multipler

//   camera.lookAt(mesh.position)
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(cameraLoop);

// }
// cameraLoop();

// obit control and damping

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const controls = new OrbitControls(camera,canvas)

// // swinging motion
// controls.target.y=1 

// damping
controls.enableDamping = true;
controls.dampingFactor=.05

function cameraLoop() {

  renderer.render(scene, camera);
  window.requestAnimationFrame(cameraLoop);
  controls.update()
}
cameraLoop();