import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);


/** shadow texture */
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg"); // static shadow
const dynBakedShadow = textureLoader.load("/textures/simpleShadow.jpg"); // dynamic shadow

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 32, 32),
  material
);

// shadow dynamic object
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1.5,1.5),
  new THREE.MeshBasicMaterial({
    color:'black',
    transparent: true,
    alphaMap: dynBakedShadow
  })
)
sphereShadow.rotation.x = -Math.PI * 0.5
sphereShadow.position.y = -0.5+0.01
scene.add (sphereShadow)


const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(5, 5),
  // new THREE.MeshBasicMaterial({ map: bakedShadow })
  material
); // baked shadow
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(sphere, plane);

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
camera.position.z = 3.8;
camera.position.y = 1.9;
camera.position.x = -5;
gui.add(camera.position, "z", -10, 10, 0.1).name("camera Z");
gui.add(camera.position, "y", -10, 10, 0.1).name("camera y");
gui.add(camera.position, "x", -10, 10, 0.1).name("camera x");
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



/** Directional light shadow*/
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, "intensity").min(0).max(1).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
scene.add(directionalLight);

// pointLight, direction, spotlight supports shadow
renderer.shadowMap.enabled = false; // default PCFShadowMap
// type
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// object shadows
sphere.castShadow = true;
plane.receiveShadow = true;
// light shadow setting
const mapSize = 1024
const recSize = 1
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = mapSize; // resolution of shadow and only for blurring with PCFSoftShadowMap
directionalLight.shadow.mapSize.height = mapSize;
directionalLight.shadow.camera.near = 1; // camera depth
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.camera.right = recSize;
directionalLight.shadow.camera.left = -recSize;
directionalLight.shadow.camera.top = recSize;
directionalLight.shadow.camera.bottom = -recSize;
directionalLight.shadow.radius = 12; // blur

const directionalLightHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);

/** Spotlight */
const spotLight = new THREE.SpotLight("white", 0.4, 10, Math.PI * 0.3);
spotLight.position.set(0, 2, 2);
// shadow
spotLight.castShadow = true;
// shadow setting
spotLight.shadow.mapSize.width = 1024; // resolution of shadow and only for blurring with PCFSoftShadowMap
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.fov = 30; // size
spotLight.shadow.camera.near = 1; // camera depth
spotLight.shadow.camera.far = 6;
// camera helper
const spotLightHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(spotLightHelper);
spotLightHelper.visible = false;
// scene
scene.add(spotLight);
scene.add(spotLight.target);

/** PointLight */
const pointLight = new THREE.PointLight("white", 0.1);
pointLight.position.set(-1, 2, 2);

// shadow setting
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024; // resolution of shadow and only for blurring with PCFSoftShadowMap
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.1; // camera depth
pointLight.shadow.camera.far = 5;

// camera helper
const pointLightHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLight);
pointLightHelper.visible = false;
scene.add(pointLightHelper);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  sphere.position.x = Math.cos(elapsedTime)
  sphere.position.z = Math.sin(elapsedTime)
  sphere.position.y = Math.abs(Math.sin(elapsedTime))

  sphereShadow.position.x =sphere.position.x
  sphereShadow.position.z =sphere.position.z
  sphereShadow.material.opacity = 1.2-Math.abs(Math.sin(elapsedTime*3))

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
