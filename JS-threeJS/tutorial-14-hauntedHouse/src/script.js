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

//fog
const fog = new THREE.Fog("#262837", 6, 15); // distance from camera
scene.fog = fog;

const axesHelper = new THREE.AxesHelper(8);
// scene.add(axesHelper);
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const filePath = "/textures/door/";
const doorColor = textureLoader.load(filePath + "color.jpg");
const doorAlpha = textureLoader.load(filePath + "alpha.jpg");
const doorAmbientOcclusion = textureLoader.load(
  filePath + "ambientOcclusion.jpg"
);
const doorHeight = textureLoader.load(filePath + "height.jpg");
const doorNormal = textureLoader.load(filePath + "normal.jpg");
const doorMetalness = textureLoader.load(filePath + "metalness.jpg");
const doorRoughness = textureLoader.load(filePath + "roughness.jpg");

const bricksColor = textureLoader.load("./textures/bricks/color.jpg");
const bricksNormal = textureLoader.load("/textures/bricks/normal.jpg");
const bricksAmbientOcclusion = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksRoughness = textureLoader.load("/textures/bricks/roughness.jpg");

const grassColor = textureLoader.load("./textures/grass/color.jpg");
const grassNormal = textureLoader.load("/textures/grass/normal.jpg");
const grassAmbientOcclusion = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassRoughness = textureLoader.load("/textures/grass/roughness.jpg");

// repeat texture
grassColor.repeat.set(8, 8);
grassNormal.repeat.set(8, 8);
grassAmbientOcclusion.repeat.set(8, 8);
grassRoughness.repeat.set(8, 8);

grassColor.wrapS = THREE.RepeatWrapping;
grassNormal.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusion.wrapS = THREE.RepeatWrapping;
grassRoughness.wrapS = THREE.RepeatWrapping;

grassColor.wrapT = THREE.RepeatWrapping;
grassNormal.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusion.wrapT = THREE.RepeatWrapping;
grassRoughness.wrapT = THREE.RepeatWrapping;

/**
 * House
 */

const house = new THREE.Group();
scene.add(house);

// walls
const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColor,
    aoMap: bricksAmbientOcclusion, // requires uv2
    aoMapIntensity: 15,
    normalMap: bricksNormal,
    roughnessMap: bricksRoughness,
  })
);
walls.material.normalScale.set(3, 3);

// UV map Object
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);

walls.position.y = 1.25;

// floor
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColor,
    aoMap: grassAmbientOcclusion, // requires uv2
    aoMapIntensity: 2,
    normalMap: grassNormal,
    roughnessMap: grassRoughness,
  })
);

// UV map Object
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

floor.rotation.x = -Math.PI * 0.5;

// roof
const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({
    color: "brown",
  })
);
roof.position.y =
  walls.geometry.parameters.height + roof.geometry.parameters.height / 2;
roof.rotation.y = Math.PI * 0.25;

// door
const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColor,
    transparent: true,
    alphaMap: doorAlpha,
    aoMap: doorAmbientOcclusion, // requires uv2
    aoMapIntensity: 5,
    displacementMap: doorHeight,
    displacementScale: 0.2,
    normalMap: doorNormal,
    roughnessMap: doorRoughness,
    metalnessMap: doorMetalness,
  })
);
gui.add(door.material, "aoMapIntensity", 0, 10, 0.1);

// UV map Object
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);

door.position.set(0, 1, 2.01);

// bush
const bush1 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 16, 16),
  new THREE.MeshStandardMaterial({
    color: "green",
  })
);
const bush2 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 16, 16),
  new THREE.MeshStandardMaterial({
    color: "green",
  })
);
const bush3 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 16, 16),
  new THREE.MeshStandardMaterial({
    color: "green",
  })
);

const bush4 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 16, 16),
  new THREE.MeshStandardMaterial({
    color: "green",
  })
);

bush1.position.set(3, 0.5, 1);
let randomScale = Math.random() / 2 + 0.2;
bush1.scale.set(randomScale, randomScale, randomScale);
bush2.position.set(2, 0.5, 3);
randomScale = Math.random() / 2 + 0.2;
bush2.scale.set(randomScale, randomScale, randomScale);
bush3.position.set(1, 0.5, 4);
randomScale = Math.random() / 2 + 0.2;
bush3.scale.set(randomScale, randomScale, randomScale);
bush4.position.set(3, 0.5, 5);
randomScale = Math.random() / 2 + 0.2;
bush4.scale.set(randomScale, randomScale, randomScale);

// grave

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMateral = new THREE.MeshStandardMaterial({ color: "gray" });

for (let n = 0; n < 50; n++) {
  const angle = Math.PI * 2 * Math.random();
  const radius = 5 + Math.random() * 3;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMateral);
  // shadow
  grave.castShadow = true;
  grave.position.set(x, 0.3, z);
  grave.rotation.y = ((Math.random() - 0.5) * Math.PI) / 8;
  grave.rotation.z = ((Math.random() - 0.5) * Math.PI) / 8;
  grave.rotation.x = (Math.random() * Math.PI) / 12;
  graves.add(grave);
}

house.add(walls, floor, roof, door, bush1, bush2, bush3, bush4);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.15);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.15);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

// doorlight
const doorLight = new THREE.PointLight("#b9d5ff", 0.5, 3);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

// GHOST
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
const ghost2 = new THREE.PointLight("#00ffea", 2, 3);
scene.add(ghost1, ghost2);
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
camera.position.x = 2.5;
camera.position.y = 12;
camera.position.z = 7;
scene.add(camera);

gui.add(camera.position, "x").min(-15).max(15).step(0.001).name("camera-x");
gui.add(camera.position, "y").min(-15).max(15).step(0.001).name("camera-y");
gui.add(camera.position, "z").min(-15).max(15).step(0.001).name("camera-z");

// Controls
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
// const controls = new FirstPersonControls(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor("#262837"); // set background color of scene

// shadow
renderer.shadowMap.enabled = true; // default PCFShadowMap
moonLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush2.castShadow = true;
walls.castShadow = true;

floor.receiveShadow = true;

// optimization
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
doorLight.shadow.mapSize.width = 8;
doorLight.shadow.mapSize.height = 8;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

/**
 * Animate
 */
function animatePointOneCircle(angle, radius, elapsedTime = 0) {
  const [a, b, c] = [
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    Math.sin(elapsedTime),
  ];
  return [a, b, c];
};

// animate wave
for (let n = 0; n < particleCount; n++) {
  const i3 = n * 3; // build a 1x3 matrix of x,y,z
  const x = particleGeometry.attributes.position.array[i3 + 0] * 2;
  particleGeometry.attributes.position.array[i3 + 1] =
    Math.sin(elapsedTime + x) * 2; // +1 refers to y-pos

  // update geometry
  particleGeometry.attributes.position.needsUpdate = true;

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //ghost 1
  const ghost1Angle = elapsedTime * 0.5;
  const radius = 4;
  let [x, z, y] = animatePointOneCircle(ghost1Angle, radius, elapsedTime * 2);
  ghost1.position.x = x;
  ghost1.position.z = z;
  ghost1.position.y = y;

  //ghost 2
  const ghost2Angle = elapsedTime * 0.4;
  const radius2 = 5;
  let [x1, z1, y1] = animatePointOneCircle(
    -ghost2Angle,
    radius2,
    elapsedTime * 3
  );
  ghost2.position.x = x1;
  ghost2.position.z = z1;
  ghost2.position.y = y1;

  // camera
  // camera.position.x = Math.sin( elapsedTime*.3) * 8
  // camera.position.z = Math.cos( elapsedTime*.3) * 8
  // camera.position.y = elapsedTime/8
  // Update controls
  controls.update(clock.getDelta());

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
