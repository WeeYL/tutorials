import * as THREE from "three";

export function Helper(
  scene = scene,
  camera = camera,
  renderer = renderer,
  sizes = sizes
) {
  this.createAxeshelper = function () {
    const axeshelper = new THREE.AxesHelper();
    scene.add(axeshelper);
  };

  this.createViewport = function () {
    // viewport

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
  };

  // cursor
  this.createCursor = function () {
    const cursor = {
      x: 0,
      y: 0,
    };
    window.addEventListener("mousemove", (e) => {
      // normalise to -0.5 to 0.5
      cursor.x = e.clientX / sizes.width - 0.5;
      cursor.y = -(e.clientY / sizes.height - 0.5);
    });
  };

  
}

export let commonVar = {
  scene: new THREE.Scene(),
  canvas: document.querySelector("canvas.webgl"),
  clock: new THREE.Clock(),
};

// TICK

export function tick(clock) {
  const elapsedTime = clock
  window.requestAnimationFrame(tick)
  // console.log(elapsedTime);
  
};
