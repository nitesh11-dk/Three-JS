// 1. Import Three.js library
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
//  !? camera 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)

// ?  orthographic camera 
// this issue for the orthographic camera is that it is not perspective camera so we need to set the camera position and look at the mesh position 
// const aspectRatio = window.innerWidth / window.innerHeight
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio   , 1, -1, 0.1, 100) 

const coursor = {
    x: 0,
    y: 0
}
// ! Coustom Camera  that can move via mouse 
window.addEventListener('mousemove', (event) => {
    coursor.x = -(event.clientX / window.innerWidth -0.5) // -0.5 to 0.5 
    coursor.y = (event.clientY / window.innerHeight - 0.5)  // -0.5 to 0.5 
})


// 9. Set camera position
camera.position.z = 2
// camera.position.x = 2
// camera.position.y = 2
// camera.lookAt(mesh.position)


// 10. Create WebGL renderer
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#canvas')})


// ! orbit controls 
const controls = new OrbitControls(camera, renderer.domElement)
// controls.target.y = 2;
// controls.update();
controls.enableDamping = true   // ! so the camera will move smoothly , but update the controls in the animate funciton 



// 11. Set renderer size
renderer.setSize(window.innerWidth, window.innerHeight)


// gsap.to(mesh.position, {x: 2, duration: 1,repeat: -1, yoyo: true})



function animate() {

    // ! coustom controls 
    // camera.position.x = coursor.x * 2 
    // camera.position.y = coursor.y * 2
    // camera.position.x = Math.sin(coursor.x * Math.PI * 2) * 2 
    // camera.position.z = Math.cos(coursor.x * Math.PI * 2) * 2
    // camera.position.y = coursor.y * 5
    // camera.lookAt(mesh.position)

    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()



//  Pointer lock controls 
//!   pointer lock javascript api 














