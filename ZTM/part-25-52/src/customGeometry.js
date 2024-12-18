// Import required Three.js modules
import * as THREE from 'three' ;
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {Pane} from 'tweakpane';

// Initialize the scene
const scene = new THREE.Scene();



// Create cube geometry and material
// const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: 'red' ,wireframe:true});

// Create custom geometry
// const geometry = new THREE.BufferGeometry();
// const vertices = new Float32Array([
//     0, 0, 0,
//     0, 2, 0 ,
//     2, 0, 0
// ]);
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// const mesh = new THREE.Mesh(geometry, cubeMaterial);
// scene.add(mesh);

// const geometry = new THREE.BoxGeometry( 1, 1, 1,2,2,2 ); 
// const geometry = new THREE.SphereGeometry( 1,16 ); 


// const geometry = new THREE.TorusKnotGeometry(  ); 

let geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00 , wireframe:true} ); 
const cube = new THREE.Mesh( geometry, material ); 

 

//  Using Tweakpane  
const pane = new Pane();

// // pane.addInput(cube.position,'x',{});
// pane.addBinding(cube.scale,'x',{
//   step:0.01,
//   min:0,
//   max:10,
//   label:'Scale X',
// });
// pane.addBinding(cube.scale,'y',{
//   step:0.01,
//   min:0,
//   max:10,
//   label:'Scale Y',
// });
// pane.addBinding(cube.scale,'z',{
//   step:0.01,
//   min:0,
//   max:10,
//   label:'Scale Z',
// }).on('change',(value)=>{
//   console.log(value.value);
// });

scene.add(cube);

const geometryParamater = {
  height: 1,
  width: 1, 
  breadth: 1,
}

const Geometry = pane.addFolder({title:'Geometry'});

Geometry.addBinding(geometryParamater,'height',{
  step: 0.01,
  min: 0,
  max: 10,
  label: 'Height',
}).on('change',(value)=>{
  // Create new geometry
  // geometry = new THREE.BoxGeometry(geometryParamater.width, value.value, geometryParamater.breadth);
  geometry = new THREE.BoxGeometry(geometryParamater.width, geometryParamater.height, geometryParamater.breadth);
  // Update the cube's geometry
  cube.geometry.dispose(); 
  cube.geometry = geometry;
});



// Create cube mesh and add to scene
// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

// scene.add(cubeMesh);

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
// renderloop();
