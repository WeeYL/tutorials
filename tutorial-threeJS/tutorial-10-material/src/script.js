import "./style.css";
import * as THREE from "three";
import * as dat from 'dat.gui'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// loading maanger
const manager = new THREE.LoadingManager();
manager.onStart = () => {
  console.log("...loading");
};

// Textures
const textureLoader = new THREE.TextureLoader();
const doorColor = textureLoader.load("./textures/door/color.jpg");
const doorAlpha = textureLoader.load("/textures/door/alpha.jpg");
const doorHeight = textureLoader.load("/textures/door/height.jpg");
const doorNormal = textureLoader.load("/textures/door/normal.jpg");
const doorAmbientOcclusion = textureLoader.load(  "/textures/door/ambientOcclusion.jpg");
const doorMetalness = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughness = textureLoader.load("/textures/door/roughness.jpg");
const doorMatCaps = textureLoader.load("/textures/matcaps/3.png");
const doorGradients = textureLoader.load("/textures/gradients/3.jpg");



// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();


// material

/* #region basic material*/

// const material = new THREE.MeshBasicMaterial({
//   wireframe: false,
//   map: doorColor,
//   color: "turquoise",
// opacity:0.5,  // transparent = true
// transparent:true,
// alphaMap:doorAlpha, // transparent = true
// });
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial(
// { flatShading: true });

// const material = new THREE.MeshMatcapMaterial(
//   {matcap:doorMatCaps}
// )

// const material = new THREE.MeshDepthMaterial( {matcap:doorMatCaps})

// const material = new THREE.MeshLambertMaterial() // shows sphere lines

// const material = new THREE.MeshPhongMaterial(
//   {shininess:1000,
//   specular:'red'}
// ) // doesn't show sphere lines

// const material = new THREE.MeshToonMaterial({
//   gradientMap: doorGradients,
// }); // cartoonist
// doorGradients.minFilter = THREE.NearestFilter;
// doorGradients.magFilter = THREE.NearestFilter;
// doorGradients.generateMipmaps = false;

// UV ambient occulent, and set geometry uv2 attributes
// const material = new THREE.MeshStandardMaterial({
//   metalnessMap:doorMetalness,
//   roughnessMap:doorRoughness,
//   map:doorColor,
//   aoMap:doorAmbientOcclusion, // shadows around the object
//   aoMapIntensity:2,
//   displacementMap:doorHeight, // height of the object
//   displacementScale:0.05,
//   normalMap:doorNormal, // details inner
//   transparent:true,
//   alphaMap:doorAlpha,
// })
// material.normalScale.set(0.9,0.9)

/* #endregion */

/* #region environment map*/

// load in this order as below p-positive, n-negative
const cubeTextureLoader = new THREE.CubeTextureLoader
const environmentMap = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg',
])

const material = new THREE.MeshStandardMaterial({
  metalness:1,
  roughness:0.05,
  envMap:environmentMap
})


/* #endregion */


// object
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material
);
sphere.position.set(-2, 0, 0);

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2, 2, 128, 128),
  material
);
plane.position.set(0, 0, 0);

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(1, 0.5, 64, 128, ),
  material
);
torus.position.set(3, 0, 0);

scene.add(sphere, plane, torus);


// set UV map 
sphere.geometry.setAttribute('uv2',new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2)) 
plane.geometry.setAttribute('uv2',new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2)) 
torus.geometry.setAttribute('uv2',new THREE.BufferAttribute(torus.geometry.attributes.uv.array,2)) 



/* #region debug UI*/
const gui = new dat.GUI({width:300})
gui.add(material, 'metalness',0,1,0.01)
gui.add(material, 'roughness',0,1,0.01)
gui.add(material, 'aoMapIntensity',0,10,0.01)
gui.add(material, 'displacementScale',0,1,0.0001)


/* #endregion */


// light

const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("white", 0.5);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// sizes
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

// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 3;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const cameraLoop = () => {
  // Animate setup
  const rpm = 0.01;
  const elapsedTime = clock.getElapsedTime(); // update in sec

  // Animate Obj
  sphere.rotation.y = elapsedTime * Math.PI * 2 * rpm;
  plane.rotation.y = elapsedTime * Math.PI * 2 * rpm;
  torus.rotation.y = elapsedTime * Math.PI * 2 * rpm;

  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call cameraLoop again on the next frame
  window.requestAnimationFrame(cameraLoop);
};

cameraLoop();
