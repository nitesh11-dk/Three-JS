// Import required Three.js modules
import * as THREE from 'three' ;
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Initialize the scene
const scene = new THREE.Scene();

// Create cube geometry and material
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: 'red' ,wireframe:true});

// Create cube mesh and add to scene
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// Initialize the perspective camera
const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight,0.1,30);

// Add axes helper for orientation
const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

// Position the camera
camera.position.z = 5;
scene.add(camera);

// Initialize the renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas:canvas,antialias:true});

// Setup orbit controls
const controls = new OrbitControls(camera,canvas );

// Configure renderer settings
renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = (Math.min(window.devicePixelRatio,2));
renderer.setPixelRatio(maxPixelRatio);

// Enable smooth controls
controls.enableDamping = true;

cubeMesh.scale.set(2,2,2);

// Handle window resizing
window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animation loop

const clock = new THREE.Clock();

let previousTime = 0;
function renderloop(){

  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  cubeMesh.rotation.x += THREE.MathUtils.degToRad(1) * deltaTime * 20;
  
  cubeMesh.position.x = Math.sin(elapsedTime) +1;

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
}

// Start the animation
renderloop();
