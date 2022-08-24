import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";

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

// viewport
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // updating viewport
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // updating camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // updating renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // limit to 2
});

// fullscreen

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// axes helper
const axeshelper = new THREE.AxesHelper();
scene.add(axeshelper);

// renderer and pixel
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // limit to 2

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "gray" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.set(0, 0, 0);

// camera perspective
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
);

camera.position.set(0, 0, 3);
scene.add(camera);
camera.lookAt(mesh.position);

// controls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const controls = new OrbitControls(camera, canvas);

// damping
controls.enableDamping = true;
controls.dampingFactor = 0.05;

/* #region debug UI */
// hide control panel press 'h'

// position
const gui = new dat.GUI({width:400});
Array("x", "y", "z").map((n) => {
  gui.add(mesh.position, n, -3, 3, 0.01).name("red cube -" + n);
});

// boolean
gui.add(mesh, "visible").name("red cube - visible");
gui.add(material, "wireframe").name("red cube - wire");

// color use only the hex color
const parameter = {
  color: 0xff0000,
  spin:()=>{
    gsap.to(mesh.rotation, {duration:1, z:mesh.rotation.z+Math.PI }) // spin
  }
};
gui.addColor(parameter, "color").onChange(() => {
  material.color.set(parameter.color);
});

// function
gui.add(parameter,'spin')

/* #endregion */

function cameraLoop() {
  renderer.render(scene, camera);
  window.requestAnimationFrame(cameraLoop);
  controls.update();
}
cameraLoop();
