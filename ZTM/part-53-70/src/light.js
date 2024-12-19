// Import required Three.js modules
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import { float } from "three/tsl";
import { DirectionalLightHelper } from "three/webgpu";
import { Pane } from "tweakpane";

// Initialize the scene
const scene = new THREE.Scene();

// !  Initializing the texture Loader
const textureLoader = new THREE.TextureLoader();

let geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.0,
  roughness: 0.5
});


const cube = new THREE.Mesh(geometry, material);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = 2;
sphere.position.y = 2;
sphere.scale.set(2,2,2);


const torusKnotGeometry  = new THREE.TorusKnotGeometry( 0.5, 0.2, 500, 10);  
const torusKnot = new THREE.Mesh( torusKnotGeometry, material );
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



//  ! light 


//  * Ambient Light
const light  = new THREE.AmbientLight(0xffffff,4 ) ;
// scene.add(light);

//  * Hemisphere Light
const hemisphereLight = new THREE.HemisphereLight('red', 'blue', 1);
// scene.add(hemisphereLight);

//  * Directional Light
const directionalLight = new THREE.DirectionalLight('red', 1);
// scene.add(directionalLight);

directionalLight.position.set(4,2,2);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(directionalLightHelper);
directionalLight.target.position.set(0,0,0);

//  * Point Light
const pointLight = new THREE.PointLight('red', 1);
// scene.add(pointLight);
pointLight.position.set(0,4,0);


const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1,10,2);
// scene.add(pointLightHelper);

const spotLight = new THREE.SpotLight(0x47b5b5, 1);
// scene.add(spotLight);
spotLight.position.set(-2,3,0);



let spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

spotLight.target.position.set(0,0,0);
// spotLight.target.position.set(-2,3,0);
// 



//  ! Rectangular Area Light
const rectAreaLight = new THREE.RectAreaLight('red', 0.5,3,10);
scene.add(rectAreaLight);
rectAreaLight.position.set(0,3,0);
rectAreaLight.lookAt(0,0,-5);
let rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);
//  ? Pane for light controls
const pane = new Pane();

const lightFolder = pane.addFolder({
  title: 'Light Settings'
});

lightFolder.addBinding(rectAreaLight, 'intensity', {
  min: 0,
  max: 10,
  step: 0.1,
  label: 'Intensity'
});

lightFolder.addBinding(rectAreaLight, 'color', {
  color: {type: 'float'}
});

// pane.addBinding(spotLight,'angle',{
//   min: 0,
//   max: Math.PI / 2,
//   step: 0.01,
//   label: 'Angle'
// });
// pane.addBinding(spotLight,'penumbra',{
//   min: 0,
//   max: 1,   
//   step: 0.01,
//   label: 'Penumbra'
// });
// pane.addBinding(spotLight,'distance',{
//   min: 0,
//   max: 10,
//   step: 0.01,
//   label: 'Distance'
// });
// pane.addBinding(spotLight,'decay',{
//   min: 0,
//   max: 2,
//   step: 0.01,
//   label: 'Decay'
// });





//  ++++++++++++++++++++++++++++++




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
