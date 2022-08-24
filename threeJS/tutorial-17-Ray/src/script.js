import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { Raycaster } from "three";

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
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object1.position.x = -2;

const object2 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);

const object3 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object3.position.x = 2;

scene.add(object1);
scene.add(object2);
scene.add(object3);

// Ray eg 1
// const rayCaster1 = new THREE.Raycaster();
// const origin1 = new THREE.Vector3(-3, 0, 0);
// const direction1 = new THREE.Vector3(10, 0, 0);
// direction1.normalize(); // normalized direction
// rayCaster1.set(origin1, direction1);

// // Ray interesects
// rayCaster1.intersectObject(object1);
// rayCaster1.intersectObjects([object1, object2, object3]);

// Ray eg2

// const rayCaster = new THREE.Raycaster();
// const rayOrigin = new THREE.Vector3(-3, 0, 0);
// const rayDirection = new THREE.Vector3(10, 0, 0);
// rayDirection.normalize();
// rayCaster.set(rayOrigin, rayDirection);

// Ray Mouse Hover eg 3
const rayCaster = new THREE.Raycaster();
const rayOrigin = new THREE.Vector3(-3, 0, 0);
const rayDirection = new THREE.Vector3(10, 0, 0);
rayDirection.normalize();
rayCaster.set(rayOrigin, rayDirection);

// mouse position
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (e) => {
  mouse.x = 2 * (e.clientX / sizes.width) - 1; // +1 to -1
  mouse.y = -2 * (e.clientY / sizes.height) + 1;
});


  // mouse click

  window.addEventListener('click', () =>
  {
      if(currentIntersect)
      {
          switch(currentIntersect.object)
          {
              case object1:
                  console.log('click on object 1')
                  break
  
              case object2:
                  console.log('click on object 2')
                  break
  
              case object3:
                  console.log('click on object 3')
                  break
          }
      }
  })
  

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

// current intersect
let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // animate sphere
  object1.position.y = Math.sin(Math.PI * elapsedTime * 0.3) * 1.5;
  object2.position.y = Math.sin(Math.PI * elapsedTime * 0.4) * 1.5;
  object3.position.y = Math.sin(Math.PI * elapsedTime * 0.5) * 1;

  // ray casting eg 2
  // const objectsToTest = [object1,object2,object3]
  // const intersectObjects = rayCaster.intersectObjects(objectsToTest)

  // for (const n of objectsToTest){

  //     n.material.color.set('red')
  // }
  // for (const n of intersectObjects){
  //     n.object.material.color.set('blue')
  // }

  // Ray Mouse Hover eg 3

  rayCaster.setFromCamera(mouse, camera);

  const objectsToTest = [object1, object2, object3];
  const intersectObjects = rayCaster.intersectObjects(objectsToTest);

  for (const n of objectsToTest) {
    n.material.color.set("red");
  }
  for (const n of intersectObjects) {
    n.object.material.color.set("blue");
  }

  // Ray mouse enter and leave

  if (intersectObjects.length) {
    /* current intersect */
    if (!currentIntersect) {
      /* prev intersect */
      console.log("mouse enters");
    }
    currentIntersect = intersectObjects[0]; /* set to current intersect */
  } else {
    if (currentIntersect) {
      console.log("mouse leave");
    }
    currentIntersect = null;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
