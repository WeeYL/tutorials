import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import * as dat from 'dat.gui'
import { BufferAttribute, VertexColors } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleColor=textureLoader.load('/textures/particles/2.png')

/** Particles */
const particleGeometry = new THREE.SphereBufferGeometry(1,32,32)
const particleMaterial = new THREE.PointsMaterial({
    map:particleColor,
    alphaMap:particleColor,
    transparent:true,
    
})
particleMaterial.size = 0.25
particleMaterial.sizeAttenuation = true // perspective view

// improvement on alpha
/* option */ particleMaterial.depthWrite=true
// /* option */ particleMaterial.blending = THREE.AdditiveBlending // add brightness to the ones nearer
// /* option */  particleMaterial.alphaTest=0.001


// generate random points
const particleCount = 1000
const positions = new Float32Array( particleCount *3)
const colors = new Float32Array(particleCount * 3)

for (let n = 0; n < particleCount *3; n++) {
    positions[n] = (Math.random()-0.5)*5
    colors[n] = Math.random()
}

// set attributes color and position
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
particleMaterial.vertexColors = true
/** Points */
const particles = new THREE.Points(particleGeometry, particleMaterial)

scene.add (particles)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 12

scene.add(camera)


// Controls

const controls = new OrbitControls(camera, canvas)



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


const clock = new THREE.Clock()


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // animate camera
    camera.position.x = Math.sin( elapsedTime) * 6
    camera.position.z = Math.cos( elapsedTime) * 6

    // animate wave
    for (let n = 0; n < particleCount; n++) {
        const i3 = n*3 // build a 1x3 matrix of x,y,z
        const x = particleGeometry.attributes.position.array[i3+0] *2
        particleGeometry.attributes.position.array[i3+1] = Math.sin(elapsedTime+x)*2 // +1 refers to y-pos

        // update geometry
        particleGeometry.attributes.position.needsUpdate=true
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()