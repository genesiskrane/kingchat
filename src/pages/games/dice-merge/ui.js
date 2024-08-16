import * as THREE from 'three'
import { toJpeg } from 'html-to-image'
import { getBoardHTML } from './templates'

let models
let mesh = new Map()
let textures = new Map()

async function getUIs(_models, { width, height }) {
  models = _models
  await createTextures({ width, height })
  createAllMesh({ width, height })

  return mesh
}

async function createTextures({ width, height }) {
  // Create Board Texture
  const url = await createDataURLFromTemplate(getBoardHTML, { width, height })
  const texture = await new THREE.TextureLoader().load(url)
  textures.set('boardTexture', texture)
}

async function createDataURLFromTemplate(getHTML, { width, height }) {
  const element = getHTML({ width, height })
  document.body.appendChild(element)
  element.style.visibility = 'visible'
  const url = await toJpeg(element)
  // element.remove()
  return url
}

function createAllMesh({ width, height }) {
  // Create Board Mesh
  const boardGeometry = new THREE.PlaneGeometry(width, height)

  const material = new THREE.MeshBasicMaterial({
    map: textures.get('boardTexture'),
    side: THREE.DoubleSide
  })
  const board = new THREE.Mesh(boardGeometry, material)

  // Create Cube Mesh
  const cube = new THREE.Mesh(models.cube, new THREE.MeshBasicMaterial({ color: 'red' }))
  cube.scale.set(2, 2, 2)

  // Scale Cube to fit Board Cells
  // Calculate the bounding box of the cube
  const cubeDimensions = new THREE.Box3().setFromObject(cube)
  const cubeSize = new THREE.Vector3()
  cubeDimensions.getSize(cubeSize)

  // Calculate the bounding box of the cube
  const boardDimensions = new THREE.Box3().setFromObject(board)
  const boardSize = new THREE.Vector3()
  boardDimensions.getSize(boardSize)

  console.log(boardDimensions, cubeDimensions)
  // Desired cube size
  const desiredSize = boardDimensions.max.x * 2 - 32 / 5

  console.log(desiredSize)
  
  // Calculate the scale factors
  const scaleX = desiredSize / cubeSize.x
  const scaleY = desiredSize / cubeSize.y
  const scaleZ = desiredSize / cubeSize.z

  console.log(scaleX, scaleY, scaleZ)
  // Apply the scale to the model
  cube.scale.set(scaleX, scaleY, scaleZ)

  // All All Created Mesh to Mesh Map
  mesh.set('cube', cube)
  mesh.set('board', board)
}

export { getUIs }
