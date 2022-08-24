import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import * as CANNON from "cannon-es";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
// const scene = require('../../util')
const scene = new THREE.Scene();

// sound
const hitSound = new Audio("/sounds/hit.mp3")
const playSound = (collision) =>
{
    const impactStrength = collision.contact.getImpactVelocityAlongNormal()

    console.log(impactStrength);
    if(impactStrength > 0.5)
    {

        hitSound.volume = impactStrength>3 ?1: impactStrength /3
        hitSound.currentTime = 0
        hitSound.play()

    }
}
// Object to update
let objectsToUpdate = [];

/* PHYSICS */

// PHYSIC world and Optimisation
const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true
world.gravity.set(0, -9.81 / 2, 0);

// PHYSIC material

const defaultMaterial = new CANNON.Material("default");

const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.2,
    restitution: 0.7, // bounce
  }
);

world.addContactMaterial(defaultContactMaterial);
world.defaultContactMaterial = defaultContactMaterial;

// util

// Sphere
const sphereMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
});
const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20)

const createSphere = (radius, position) => {
  // THREE
  const mesh = new THREE.Mesh(
    sphereGeometry,
    sphereMaterial
  );
  mesh.scale.set(radius,radius,radius)
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

  // PHYSIC
  const shape = new CANNON.Sphere(radius);
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape,
  });

  body.position.copy(position);
  body.addEventListener('collide',playSound)
  world.addBody(body);

  // push to list
  objectsToUpdate.push({ mesh, body });
};

// Box

const boxMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
});
const boxGeometry = new THREE.BoxBufferGeometry(1,1,1, 20, 20)


const createBox = (w,h,d, position) => {
  // THREE
  const mesh = new THREE.Mesh(
    boxGeometry,
    boxMaterial
  );
  mesh.scale.set(w,h,d)
  mesh.castShadow = true;
  mesh.position.copy(position);
  
  scene.add(mesh);

  // PHYSIC
  const shape = new CANNON.Box(new CANNON.Vec3(w/2,h/2,d/2));
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape,
  });

  body.position.copy(position);
  body.addEventListener('collide',playSound)
  world.addBody(body);

  // push to list
  objectsToUpdate.push({ mesh, body });
};




// PHYSIC floor plane

const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body({
  mass: 0,
});

floorBody.quaternion.setFromAxisAngle(
  new CANNON.Vec3(1, 0, 0), // rotate x-axis
  -Math.PI * 0.5
);
floorBody.addShape(floorShape);
world.addBody(floorBody);

/**
 * Debug
 */
const gui = new dat.GUI();
const debugObj = {
  createSphere: ()=>{ createSphere(Math.random()*2, { x: (Math.random()-0.5)*2, y: 3, z: 0 })},
  createBox:()=>{createBox(Math.random()*2,Math.random()*2,Math.random()*2, { x: (Math.random()-0.5)*2, y: 3, z: 0 })},
  reset:()=>{

    for(const obj of objectsToUpdate){

      console.log(obj);
      // remove body
      obj.body.removeEventListener('collide',playSound)
      world.removeBody(obj.body)
  
      // remove mesh
      scene.remove(obj.mesh)
    }

  }
}

gui.add(debugObj,'createSphere')
gui.add(debugObj,'createBox')
gui.add(debugObj,'reset')


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.png",
  "/textures/environmentMaps/0/nx.png",
  "/textures/environmentMaps/0/py.png",
  "/textures/environmentMaps/0/ny.png",
  "/textures/environmentMaps/0/pz.png",
  "/textures/environmentMaps/0/nz.png",
]);

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#777777",
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);

scene.add(directionalLight);

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
camera.position.set(-3, 5, 15);
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// createSphere
createSphere(0.5, { x: 0, y: 3, z: 0 });

console.log(objectsToUpdate);

/**
 * Animate
 */
const clock = new THREE.Clock();
let prevTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // update object
  const deltaTime = elapsedTime - prevTime;
  prevTime = elapsedTime;

  world.step(1 / 60, deltaTime, 3);
  for (const obj of objectsToUpdate) {
    obj.mesh.position.copy(obj.body.position);
    obj.mesh.quaternion.copy(obj.body.quaternion); // rotational
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
