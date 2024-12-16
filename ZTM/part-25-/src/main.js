import * as THREE from 'three' ;
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// console.log(OrbitControls);



const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: 'red' ,wireframe:true});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

//  Initialize the camera 

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight,0.1,30);


cubeMesh.position.x = 1;
cubeMesh.position.y = 1;

cubeMesh.rotation.y = Math.PI ;
// cubeMesh.rotation.x = Math.PI /4 ;
cubeMesh.rotation.x = THREE.MathUtils.degToRad(45);
const axesHelper = new THREE.AxesHelper(2);
const axesHelper2 = new THREE.AxesHelper(2);
cubeMesh.add(axesHelper);
scene.add(axesHelper2);


// orthographic camera 
// let aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.1,100);

// position of the camera 

camera.position.z = 5;
scene.add(camera);


// Rendered the scene 

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas:canvas,antialias:true});

const controls = new OrbitControls(camera,canvas );
renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = (Math.min(window.devicePixelRatio,2));
renderer.setPixelRatio(maxPixelRatio);


controls.enableDamping = true;
// controls.autoRotate = true;

function renderloop(){
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
}

renderloop();

window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});



// console.log(window.devicePixelRatio)