// Import required Three.js modules
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// Initialize the scene
const scene = new THREE.Scene();

// !  Initializing the texture Loader
const textureLoader = new THREE.TextureLoader();

let geometry = new THREE.BoxGeometry(1, 1, 1);

//  !  MeshLambertMaterial

// const material = new THREE.MeshBasicMaterial();
const material = new THREE.MeshPhysicalMaterial();

// !  Initializing the texture
const grassTexture = textureLoader.load("/space/space-cruiser.png");
const grassTextureRough = textureLoader.load("/space/space-roughness.png");
const grassTextureMetallic = textureLoader.load("/space/space-metallic.png");
const grassTextureNormal = textureLoader.load("/space/space-normal.png");


// ! mapping the texture on the geometry via material
material.map = grassTexture;
material.roughnessMap = grassTextureRough;
material.roughness = 1;
material.metalnessMap = grassTextureMetallic;
material.metalness = 1; 
material.normalMap = grassTextureNormal;
material.shininess = 100;

const cube = new THREE.Mesh(geometry, material);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = 2;
sphere.position.y = 2;
sphere.scale.set(2,2,2);
//  ! creating a group
const group = new THREE.Group();
group.add(sphere);
group.add(cube);
scene.add(group);

material.side = THREE.DoubleSide;

// //  ! Ambient light
const light  = new THREE.AmbientLight(0xffffff,4 ) ;// intensity);

//!  point light
const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(2,1,1);
scene.add(pointLight);
scene.add(light);

// Initialize the perspective camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

// Add axes helper for orientation
const axesHelper = new THREE.AxesHelper(10);
const axesHelper2 = new THREE.AxesHelper(2);
scene.add(axesHelper);
// pointLight.add(axesHelper2);

// Position the camera
camera.position.z = 5;
// camera.position.y = 10;
scene.add(camera);

// Initialize the renderer
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

// Setup orbit controls
const controls = new OrbitControls(camera, canvas);

// Configure renderer settings
renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

// Enable smooth controls
controls.enableDamping = true;

// Handle window resizing
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function renderloop() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
}

// Start the animation
renderloop();
