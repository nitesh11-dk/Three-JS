import * as THREE from 'three'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 'red'})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 3
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#canvas')})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)  