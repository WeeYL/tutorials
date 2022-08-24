import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";

/* #region loading manager*/

const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = ()=>{
  console.log('onstart');
}

/* #endregion */

/* #region texture*/
// see material({map:colorTexture})
const manager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader()
manager.onStart  =()=>{console.log('...loading');}

// const colorTexture = textureLoader.load('/textures/door/color.jpg')

// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/textures/door/height.jpg')
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// 
// colorTexture.repeat.x = 2
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.offset.x = 0.5
// colorTexture.rotation = Math.PI/4
// colorTexture.center.x = colorTexture.center.y = 0.5

// Filter
// const colorTexture = textureLoader.load('./textures/checkerboard-1024x1024.png')
// colorTexture.minFilter = THREE.NearestFilter

// const colorTexture = textureLoader.load('./textures/checkerboard-8x8.png')
const colorTexture = textureLoader.load('./textures/minecraft.png')
colorTexture.magFilter = THREE.NearestFilter



/* #endregion */

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
const material = new THREE.MeshBasicMaterial({ color: "gray", map:colorTexture });
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

function cameraLoop() {
  renderer.render(scene, camera);
  window.requestAnimationFrame(cameraLoop);
  controls.update();
}
cameraLoop();
