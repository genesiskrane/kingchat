import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { start, move, end, cancel } from './events'

const loader = new GLTFLoader()

let camera
let cubeGeometry

const sides = new Map()
sides.set('1', {
  color: '#ffffff',
  nodeColor: 'red',
  cubeRotation: [0.2, 0, 0],
  position: [0, 50, 0],
  cameraPosition: [0, 60, 0],
  rotate: [1.51208, 0, 0],
  positions: [[0, 0, 0]]
})
sides.set('2', {
  color: '#fd2f2c',
  nodeColor: '#ffffff',
  cubeRotation: [0.2, 0, 0],
  position: [0, 0, 50],
  cameraPosition: [0, 0, 60],
  rotate: [3.02416, 0, 0],
  positions: [
    [20, 20, 0],
    [-20, -20, 0]
  ]
})
sides.set('3', {
  color: '#1056fa',
  position: [-50, 0, 0],
  cubeRotation: [0, 0, 0.2],
  cameraPosition: [-60, 0, 0],
  rotate: [0, 1.51208, 0],
  positions: [
    [20, -20, 0],
    [0, 0, 0],
    [-20, 20, 0]
  ]
})
sides.set('4', {
  color: '#b900fe',
  position: [50, 0, 0],
  cubeRotation: [0, 0, -0.2],
  cameraPosition: [60, 0, 0],
  rotate: [0, -1.51208, 0],
  positions: [
    [20, 20, 0],
    [20, -20, 0],
    [-20, 20, 0],
    [-20, -20, 0]
  ]
})
sides.set('5', {
  color: '#fe90fe',
  position: [0, 0, -50],
  cubeRotation: [-0.2, 0, 0],
  cameraPosition: [0, 0, -60],
  rotate: [0, 0, 0],
  positions: [
    [20, 20, 0],
    [20, -20, 0],
    [0, 0, 0],
    [-20, 20, 0],
    [-20, -20, 0]
  ]
})
sides.set('6', {
  color: '#f78901',
  position: [0, -50, 0],
  cubeRotation: [0.2, 0, 0],
  cameraPosition: [0, -60, 0],
  rotate: [-1.51208, 0, 0],
  positions: [
    [20, 20, 0],
    [20, -20, 0],
    [0, 20, 0],
    [0, -20, 0],
    [-20, 20, 0],
    [-20, -20, 0]
  ]
})

const init = (dice, size) => {
  loader.load(
    '../assets/models/cube.gltf',
    (gltf) => {
      cubeGeometry = gltf.scene.children[0].children[0].children[0].geometry
      initDice(dice, size)
    },
    undefined,
    (error) => console.error(error)
  )
}

const initDice = (dice, size) => {
  let width = size
  let height = size

  camera = new THREE.OrthographicCamera(-width / 2, width / 2, -height / 2, height / 2, 0.1, 200)
  let i = 0

  for (let [key, data] of sides.entries()) {
    dice[i].style.width = width + 'px'
    dice[i].style.height = height + 'px'

    let scene = new THREE.Scene()

    let die = createDie(key, data)

    scene.add(die)

    mountCanvas(scene, dice[i], width, height, data.cameraPosition)
    registerEvents(dice[i])
    i++
  }
}

const createDie = (key, data) => {
  const die = new THREE.Group()
  const cube = new THREE.Mesh(cubeGeometry, new THREE.MeshBasicMaterial({ color: data.color }))

  const color = data.nodeColor || '#ffffff'
  die.add(cube)

  for (let [key, data] of sides.entries()) {
    let num = parseInt(key)

    const side = new THREE.Group()
    for (num; num > 0; num--) {
      let node = new THREE.Mesh(
        new THREE.CircleGeometry(7.5, 90),
        new THREE.MeshBasicMaterial({ color })
      )

      node.material.depthTest = false
      node.renderOrder = 2
      side.add(node)

      node.position.set(...data.positions[num - 1])
    }

    let rotation = data.rotate ? data.rotate : [0, 0, 0]
    side.rotation.set(...rotation)
    side.position.set(...data.position)
    die.add(side)
  }
  die.rotation.set(...data.cubeRotation)

  return die
}

const mountCanvas = (scene, container, width, height, cameraPosition) => {
  let renderer = new THREE.WebGLRenderer()
  camera.position.set(...cameraPosition)

  camera.lookAt(0, 0, 0)
  // renderer.setClearColor(0x00000, 0)
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)
  renderer.render(scene, camera)
}

const registerEvents = (die) => {
  // Events
  die.addEventListener('dragstart', start)
  die.addEventListener('touchstart', start)
  die.addEventListener('touchmove', move)
  die.addEventListener('touchend', end)
  die.addEventListener('touchcancel', cancel)
}

export { init }
