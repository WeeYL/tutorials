import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { RectAreaLight } from 'three'

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
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight('white', 0.5) // cover all surface
// scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('white', 0.5) // uniform light light the sun
directionalLight.position.set( 2,3,4)
scene.add(directionalLight)

const hemisphere = new THREE.HemisphereLight('pink','blue', 0.5) // top red, bottom blue, ambient light
hemisphere.position.set( 0,1,2)
scene.add(hemisphere)

// distance and decay
// const pointLight = new THREE.PointLight('white', 0.5,10,1) // one light source in all direction,  (distance: the reach, decay: how fast light dims)
// pointLight.position.set( 2,3,4)
// scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight('white', .2) // plane light, works only with MeshStandardMaterial and MeshPhyiscalMaerial
rectAreaLight.position.set( 2,3,4)
rectAreaLight.lookAt(cube.position)
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight('white',0.5,9,Math.PI*0.1,0.2,1) // penumbra, dimness along the edges
spotLight.position.set( 2,1,4)
scene.add(spotLight)
spotLight.target.position.x = -0.5 // point spotlight at
scene.add(spotLight.target)

// LIGHT HELPERS

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphere,0.2) // size is the display size
// scene.add(hemisphereLightHelper)

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,0.2) // size is the display size
// scene.add(directionalLightHelper)

// const spotLightHelper = new THREE.SpotLightHelper(spotLight,0.2) // size is the display size
// scene.add(spotLightHelper)

import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper'
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight,'blue') // size is the display size
scene.add(rectAreaLightHelper)

window.requestAnimationFrame( ()=> {
  rectAreaLightHelper.position.copy(rectAreaLight.position)
  rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion)
  rectAreaLightHelper.update()
})

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
camera.position.x = 1
camera.position.y = 2
camera.position.z = 6 
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()