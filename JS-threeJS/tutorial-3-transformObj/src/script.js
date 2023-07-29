import "./style.css";
import * as THREE from "three";


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

// // cube
// const geometry = new THREE.BoxGeometry(1, 1, 2);
// const material = new THREE.MeshBasicMaterial({ color: "red" });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// // object
// mesh.position.z=-1
// mesh.position.y=2
// mesh.position.x=3

// // scale
// mesh.scale.set (1.2,1.2,1.2)

// // rotate
// // mesh.rotation.reorder('xyz')
// mesh.rotation.x=1

// // dist obj to canvas
// console.log('dist obj to canvas',mesh.position.length());

// // normalise > changes distance of obj to canvas to 1
// mesh.position.normalize()
// console.log('dist obj to canvas after normalise',mesh.position.length()); // dist obj to canvas

// // lookat
// camera.lookAt(mesh.position) // look at center of mesh
// console.log('dist obj to camera',mesh.position.distanceTo(camera.position)); // dist obj to canvas

// grouping
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);

const cube2 = cube1.clone();
const cube3 = cube1.clone();

cube2.position.x = -2;
cube3.position.x = 2;

group.add(cube1, cube2, cube3);
group.position.set(0,1,0)

// axes helper
const axeshelper = new THREE.AxesHelper();
scene.add(axeshelper);

// renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
