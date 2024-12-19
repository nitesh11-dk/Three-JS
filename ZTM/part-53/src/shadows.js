// Import required Three.js modules
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// 1. renderer.shadowMap.enabled = true
// 2. spotLight.castShadow = true
// 3. sphere.castShadow = true
// 4. plane.receiveShadow = true

// Initialize the scene
const scene = new THREE.Scene();

// Create material with realistic PBR properties
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.5,
  roughness: 0
});

// Create geometries
let geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;


const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = 5;
// sphere.position.y = 2;
sphere.scale.set(2,2,2);
sphere.castShadow = true;

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.2, 500, 10);  
const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = 2;
torusKnot.castShadow = true;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(10,10), material);
plane.position.y = -2;
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;

const group = new THREE.Group();
group.add(sphere);
group.add(cube); 
group.add(torusKnot);
group.add(plane);
scene.add(group);

// Directional Light
const directionalLight = new THREE.DirectionalLight('red', 0.3);
directionalLight.position.set(4, 4, 6);
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(directionalLightHelper);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.radius = 10;

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(directionalLightCameraHelper);

// Point Light
const pointLight = new THREE.PointLight('green', 100);
pointLight.position.set(-2, 3, -2);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);
pointLight.castShadow = true;
pointLight.shadow.mapSize.set(1024, 1024);
pointLight.shadow.radius = 10;

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightCameraHelper);

// Spot Light
const spotLight = new THREE.SpotLight('green', 20,30,Math.PI/2,0.5);
spotLight.position.set(-4, 4, -4);
scene.add(spotLight);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);
spotLight.castShadow = true;
spotLight.shadow.mapSize.set(1024, 1024);
spotLight.shadow.radius = 10;

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(spotLightCameraHelper);

// GUI Controls
const pane = new Pane();

// Material controls
const materialFolder = pane.addFolder({ title: 'Material Settings' });
materialFolder.addBinding(material, 'roughness', { min: 0, max: 1, step: 0.01 });
materialFolder.addBinding(material, 'metalness', { min: 0, max: 1, step: 0.01 });

// Light controls
const lightFolder = pane.addFolder({ title: 'Light Settings' });

// Directional Light controls
const directionalLightFolder = lightFolder.addFolder({ title: 'Directional Light' });
directionalLightFolder.addBinding(directionalLight, 'intensity', { min: 0, max: 200, step: 0.1 });
directionalLightFolder.addBinding(directionalLight, 'color', { color: { type: 'float' } });
directionalLightFolder.addBinding(directionalLight.shadow, 'radius', { min: 0, max: 20, step: 0.1 });
directionalLightFolder.addBinding(directionalLightCameraHelper, 'visible', { label: 'Show Camera Helper' });

// Point Light controls
const pointLightFolder = lightFolder.addFolder({ title: 'Point Light' });
pointLightFolder.addBinding(pointLight, 'intensity', { min: 0, max: 200, step: 0.1 });
pointLightFolder.addBinding(pointLight, 'color', { color: { type: 'float' } });
pointLightFolder.addBinding(pointLight.shadow, 'radius', { min: 0, max: 20, step: 0.1 });
pointLightFolder.addBinding(pointLightCameraHelper, 'visible', { label: 'Show Camera Helper' });

// Spot Light controls
const spotLightFolder = lightFolder.addFolder({ title: 'Spot Light' });
spotLightFolder.addBinding(spotLight, 'intensity', { min: 0, max: 200, step: 0.1 });
spotLightFolder.addBinding(spotLight, 'color', { color: { type: 'float' } });
spotLightFolder.addBinding(spotLight, 'angle', { min: 0, max: Math.PI/2, step: 0.1 });
spotLightFolder.addBinding(spotLight, 'penumbra', { min: 0, max: 1, step: 0.1 });
spotLightFolder.addBinding(spotLight.shadow, 'radius', { min: 0, max: 20, step: 0.1 });
spotLightFolder.addBinding(spotLightCameraHelper, 'visible', { label: 'Show Camera Helper' });

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);
camera.position.z = 12;
scene.add(camera);
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
const controls = new OrbitControls(camera, canvas);
renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);
controls.enableDamping = true;
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//  ignore the radius if we use PCFSoftShadowMap



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
renderloop();
