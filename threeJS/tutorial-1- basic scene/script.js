// scene
const scene = new THREE.Scene();

// sizes
const sizes = {
  width: 160,
  height: 120,
};

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/ sizes.height); // FOV, viewport
camera.position.z=3
camera.position.y=1
camera.position.x=1

scene.add(camera);

// renderer
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene,camera)