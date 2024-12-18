// 1. Import Three.js library
import * as THREE from 'three'

// 2. Create a new scene
const scene = new THREE.Scene()

// 3. Create geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)

// 4. Create material
const material = new THREE.MeshBasicMaterial({color: 'red'})

// 5. Create mesh by combining geometry and material
const mesh = new THREE.Mesh(geometry, material)

// 6. Add mesh to scene
scene.add(mesh)

// 7. Add axes helper to visualize 3D space
const axxesHelper = new THREE.AxesHelper()
scene.add(axxesHelper)

// 8. Create camera with perspective
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)

// 9. Set camera position
camera.position.z = 4

// 10. Create WebGL renderer
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#canvas')})

// 11. Set renderer size
renderer.setSize(window.innerWidth, window.innerHeight)

// 12. Render the scene
renderer.render(scene, camera)   