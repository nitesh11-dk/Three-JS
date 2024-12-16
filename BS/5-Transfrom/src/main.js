import * as THREE from 'three'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 'red'})
const mesh = new THREE.Mesh(geometry, material)
//  positions 
// mesh.position.x = 1
// mesh.position.y = -1 
// mesh.position.z = -2

//  all at once 
mesh.position.set(1, -1, -2)


//  sCALES 
// mesh.scale.x = 2.5
// mesh.scale.y = 0.5
// mesh.scale.z = 10.5

//  all at once 
mesh.scale.set(2.5, 0.5, 1.5)

//  ROtation 


// mesh.rotation.x = Math.PI 
// mesh.rotation.reorder('YXZ') // changing the axes order  
// mesh.rotation.y = Math.PI /2
// mesh.rotation.x = Math.PI /2

//  quaternion   information 




scene.add(mesh)

// console.log(mesh.position.length())
// .length() is used to get the length of the vector , it is the distance between  the center of the scene and the object 
// console.log(mesh.position.distanceTo(new THREE.Vector3(4,4,4)))
//  distance between the mesh and the Vector3(0,0,0)
// if  want we can pass camera position to get the distance between the camera and the object 

mesh.position.normalize() // it will normalize the vector to 1 

// ALex Helper 

// const axxesHelper = new THREE.AxesHelper(2)
const axxesHelper = new THREE.AxesHelper()
scene.add(axxesHelper)





const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
// console.log(mesh.position.distanceTo(camera.position))

camera.lookAt(mesh.position)


camera.position.z = 3
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#canvas')})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)   