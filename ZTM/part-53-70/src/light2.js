// Import required Three.js modules
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import { Pane } from "tweakpane";

// Initialize the scene
const scene = new THREE.Scene();

// Create material with realistic PBR properties
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.5,
  roughness: 0.5
});

// Create geometries
let geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, material);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = 2;
sphere.position.y = 2;
sphere.scale.set(2,2,2);

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.2, 500, 10);  
const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = 2;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(10,10), material);
plane.position.y = -2;
plane.rotation.x = -Math.PI / 2;

const group = new THREE.Group();
group.add(sphere);
group.add(cube); 
group.add(torusKnot);
group.add(plane);
scene.add(group);

// Lights setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(4, 2, 2);
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(0, 4, 0);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);

const spotLight = new THREE.SpotLight(0x47b5b5, 0.5);
spotLight.position.set(-2, 3, 0);
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const rectAreaLight = new THREE.RectAreaLight(0xff0000, 0.5, 3, 10);
rectAreaLight.position.set(0, 3, 0);
rectAreaLight.lookAt(0, 0, -5);
scene.add(rectAreaLight);
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

// GUI Controls
const pane = new Pane();

// Material controls
const materialFolder = pane.addFolder({ title: 'Material Settings' });
materialFolder.addBinding(material, 'roughness', { min: 0, max: 1, step: 0.01 });
materialFolder.addBinding(material, 'metalness', { min: 0, max: 1, step: 0.01 });

// Light controls
const lightFolder = pane.addFolder({ title: 'Light Settings' });

// Ambient Light controls
const ambientLightFolder = lightFolder.addFolder({ title: 'Ambient Light' });
ambientLightFolder.addBinding(ambientLight, 'intensity', { min: 0, max: 2, step: 0.1 });
ambientLightFolder.addBinding(ambientLight, 'color', { color: { type: 'float' } });

// Hemisphere Light controls
const hemisphereLightFolder = lightFolder.addFolder({ title: 'Hemisphere Light' });
hemisphereLightFolder.addBinding(hemisphereLight, 'intensity', { min: 0, max: 2, step: 0.1 });
hemisphereLightFolder.addBinding(hemisphereLight, 'color', { color: { type: 'float' } });
hemisphereLightFolder.addBinding(hemisphereLight, 'groundColor', { color: { type: 'float' } });

// Directional Light controls
const directionalLightFolder = lightFolder.addFolder({ title: 'Directional Light' });
directionalLightFolder.addBinding(directionalLight, 'intensity', { min: 0, max: 2, step: 0.1 });
directionalLightFolder.addBinding(directionalLight, 'color', { color: { type: 'float' } });

// Point Light controls
const pointLightFolder = lightFolder.addFolder({ title: 'Point Light' });
pointLightFolder.addBinding(pointLight, 'intensity', { min: 0, max: 2, step: 0.1 });
pointLightFolder.addBinding(pointLight, 'color', { color: { type: 'float' } });

// Spot Light controls
const spotLightFolder = lightFolder.addFolder({ title: 'Spot Light' });
spotLightFolder.addBinding(spotLight, 'intensity', { min: 0, max: 2, step: 0.1 });
spotLightFolder.addBinding(spotLight, 'color', { color: { type: 'float' } });
spotLightFolder.addBinding(spotLight, 'angle', { min: 0, max: Math.PI/2, step: 0.1 });
spotLightFolder.addBinding(spotLight, 'penumbra', { min: 0, max: 1, step: 0.1 });

// Rect Area Light controls
const rectAreaLightFolder = lightFolder.addFolder({ title: 'Rectangular Area Light' });
rectAreaLightFolder.addBinding(rectAreaLight, 'intensity', { min: 0, max: 2, step: 0.1 });
rectAreaLightFolder.addBinding(rectAreaLight, 'color', { color: { type: 'float' } });

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);
camera.position.z = 8;
scene.add(camera);
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
const controls = new OrbitControls(camera, canvas);
renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);
controls.enableDamping = true;

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
