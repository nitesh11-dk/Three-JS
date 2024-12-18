// 1. Import Three.js library
import * as THREE from 'three'
import gsap from 'gsap'

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
// renderer.render(scene, camera) 

// 13 . Create a loop to animate 

// function animate(){
//     renderer.render(scene, camera)
//     mesh.rotation.y += 0.01
//     window.requestAnimationFrame(animate)
// }
// ! here the function will run on dependent on the device fps so to make independent we can use clock time 
// let clock =  Date.now;

// function animate(){
//     let currentTime = Date.now();
//     let deltaTime = currentTime - clock;
//     clock = currentTime;

//     mesh.rotation.x = deltaTime * 0.001;

//     renderer.render(scene, camera)
//     window.requestAnimationFrame(animate)
// }

//  ? using gsap to animate the mesh
// gsap.to(mesh.position, {x: 2, duration: 1})
// gsap.to(mesh.position, {x: 0, duration: 1, delay: 1})


// gsap.to(mesh.position, {x: 2, duration: 1,repeat: -1, yoyo: true})

function animate() {
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()



















//  ! instead of this we can use clock time by using THREE.Clock()
const clock = new THREE.Clock();

function clockAnimate(){
    mesh.rotation.x = clock.getElapsedTime()
    
    renderer.render(scene, camera)
    window.requestAnimationFrame(clockAnimate)
}

// clockAnimate()