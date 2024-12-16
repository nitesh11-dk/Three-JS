// Import required Three.js modules
import * as THREE from 'three' ;
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {Pane} from 'tweakpane';

// Initialize the scene
const scene = new THREE.Scene();

let geometry = new THREE.BoxGeometry( 1, 1, 1 ); 

// ! Materials 
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00 , opacity:0.5,transparent:true} );
const material = new THREE.MeshBasicMaterial();

material.color = new THREE.Color(0x00ff00);
// material.transparent = true;
// material.opacity = 0.5;

// opacity will work only if transparent is true 

const cube = new THREE.Mesh( geometry, material ); 
const cube2 = new THREE.Mesh( geometry, material ); 
cube2.position.x = 2;
const plane = new THREE.Mesh( new THREE.PlaneGeometry(1,1),material );
material.side = THREE.DoubleSide;
// material.fog = true;
const fog = new THREE.Fog(0xffffff,1,10);
scene.fog = fog;
scene.background = new THREE.Color(0xffffff);

plane.position.x = -2;
scene.add(plane);

scene.add(cube);

scene.add(cube2);




//  Using Tweakpane  
const pane = new Pane();
// const geometryParamater = {
//   height: 1,
//   width: 1, 
//   breadth: 1,
// }

// const Geometry = pane.addFolder({title:'Geometry'});

// Geometry.addBinding(geometryParamater,'height',{
//   step: 0.01,
//   min: 0,
//   max: 10,
//   label: 'Height',
// }).on('change',(value)=>{
//   // Create new geometry
//   // geometry = new THREE.BoxGeometry(geometryParamater.width, value.value, geometryParamater.breadth);
//   geometry = new THREE.BoxGeometry(geometryParamater.width, geometryParamater.height, geometryParamater.breadth);
//   // Update the cube's geometry
//   cube.geometry.dispose(); 
//   cube.geometry = geometry;
// });




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

// Handle window resizing
window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animation loop



let previousTime = 0;
function renderloop(){
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
  }

// Start the animation
renderloop();
