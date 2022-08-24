import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// scene
const scene = new THREE.Scene();

// sizes
const sizes = {
  width: 800,
  height: 600,
};

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); // FOV, viewport
camera.position.z = 5;
scene.add(camera);

// cube
const geometry = new THREE.BoxGeometry(1, 1, 2);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const mesh2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 2),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
scene.add(mesh2);

// object
mesh.position.set(-2, 0, 0);

// axes helper
const axeshelper = new THREE.AxesHelper();
scene.add(axeshelper);

// renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

// adjust speed > Clock

const clock = new THREE.Clock();

/*  requestAnimationFrame */

// function gameLoop() {
//   // rotate at 1 rpm
//   const elapsedTime = clock.getElapsedTime();
//   mesh.rotation.z = elapsedTime * 3.14 * 2;

//   // bounce
//   mesh.position.y = Math.sin(elapsedTime);

//    renderer.render(scene, camera);
//   window.requestAnimationFrame(gameLoop);
// }
// gameLoop();

/*  requestAnimationFrame camera */

// function cameraLoop() {

//   const elapsedTime = clock.getElapsedTime();

//   camera.position.y = 2+Math.sin(elapsedTime*2);
//   camera.position.x = Math.cos(elapsedTime*2);
//   camera.lookAt(mesh2.position)

//   renderer.render(scene, camera);
//   window.requestAnimationFrame(cameraLoop);
// }
// cameraLoop();

/* greensock */

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: -2 }); // delay 2 sec

function gameLoop() {
  renderer.render(scene, camera);
  window.requestAnimationFrame(gameLoop);
}
gameLoop();
