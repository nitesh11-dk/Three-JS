// Import required Three.js modules
import * as THREE from 'three' ;
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {Pane} from 'tweakpane';

// Initialize the scene
const scene = new THREE.Scene();

// !  Initializing the texture Loader
const textureLoader = new THREE.TextureLoader();


let geometry = new THREE.BoxGeometry( 1, 1, 1 ); 


//  !  MeshLambertMaterial

// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshPhongMaterial();
// const material = new THREE.MeshStandardMaterial();
// const material = new THREE.MeshPhysicalMaterial();
// all the above material to see light is required
const material = new THREE.MeshBasicMaterial();

// !  Initializing the texture 
const texture = textureLoader.load('static/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png');

material.map = texture;




const cube = new THREE.Mesh( geometry, material ); 
const cube2 = new THREE.Mesh( geometry, material ); 
cube2.position.x = 2;
const plane = new THREE.Mesh( new THREE.PlaneGeometry(1,1),material );
plane.position.x = -2;
const torus = new THREE.Mesh( new THREE.TorusKnotGeometry(0.5,0.15,100,16),material );
torus.position.x = 2;
const sphere = new THREE.Mesh( new THREE.SphereGeometry(0.5,32,32),material );
sphere.position.y = -2;
//  ! this can also be done 
const cylinder = new THREE.Mesh();
const cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,32);
cylinder.geometry=cylinderGeometry;
cylinder.material=material;
cylinder.position.y = 2;


//  ! creating a group
const group = new THREE.Group();
group.add(cylinder ,sphere,torus,plane,cube);
scene.add(group);


material.side = THREE.DoubleSide;






//  ! Ambient light
const light  = new THREE.AmbientLight(0xffffff,0.4 ) ;// intensity);

//!  point light
const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(2,1,1);
scene.add(pointLight);
scene.add(light);







// Initialize the perspective camera
const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight,0.1,30);

// Add axes helper for orientation
const axesHelper = new THREE.AxesHelper(2);
const axesHelper2 = new THREE.AxesHelper(2);
scene.add(axesHelper);
pointLight.add(axesHelper2);




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



function renderloop(){
    // cube.rotation.x += 0.01;
    // scene.children.forEach(child => {
    //    if (child instanceof THREE.Mesh){
    //     child.rotation.x += 0.01;
    //    }
    // });   //! instead of this we can make a group 
   group.children.forEach(child => {
       if (child instanceof THREE.Mesh){
        child.rotation.x += 0.01;
       }
    }); 
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
  }

// Start the animation
renderloop();
