import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';

import { getUIs } from './ui';

let camera;
let scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

let container;
let models = {};
let mesh;

async function createArena(screenDiv) {
  container = screenDiv.value;

  await load();
  await init();
  finalize();
}

const load = async () => {
  const loader = new GLTFLoader();

  try {
    // Get Cube Geometry From Model
    const gltf = await loader.loadAsync('../assets/models/dice-merge/cube.gltf');
    models.cube = gltf.scene.children[0].children[0].children[2].geometry;

    console.log(models.cube, gltf.scene.children[0].children[0].children[2].geometry);
  } catch (e) {
    console.log(e);
  }
};

async function init() {
  createCamera(container.offsetWidth, container.offsetHeight);
  addLights();

  mesh = await getUIs(models, { width: container.offsetWidth, height: container.offsetHeight });

  createScene();

  setRenderer();
  // configControls()
}

function finalize() {
  setRaycaster();
  fitCameraView(mesh.get('board'));

  // Animate Scene
  renderer.setAnimationLoop(() => renderer.render(scene, camera));
}

// Create Camera
const createCamera = (width, height) =>
  (camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000));

// Fitting Camera To Screen
function fitCameraView(object) {
  // Step 1: Compute the bounding box of the object
  const box = new THREE.Box3().setFromObject(object);
  const boxSize = box.getSize(new THREE.Vector3());
  const boxCenter = box.getCenter(new THREE.Vector3());

  // Step 2: Determine the distance required to fit the entire object within the camera view
  const maxDim = Math.max(boxSize.x, boxSize.y, boxSize.z);
  const fov = camera.fov * (Math.PI / 180); // Convert vertical FOV from degrees to radians
  let cameraZ = maxDim / (2 * Math.tan(fov / 2));

  // Adjust the camera's position to fit the object, considering the camera's aspect ratio
  if (camera.aspect > 1) cameraZ /= camera.aspect;

  camera.position.set(boxCenter.x, boxCenter.y, cameraZ + boxCenter.z);

  // Step 3: Update the camera
  camera.lookAt(boxCenter);

  // Optionally, adjust near and far planes
  camera.near = cameraZ / 100;
  camera.far = cameraZ * 100;

  // Update camera projection matrix after modifying properties
  camera.updateProjectionMatrix();
}

function addLights() {
  // Add Lights
  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(0, 0, 0);
  scene.add(light);
}

// Set Renderer
function setRenderer() {
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  // renderer.domElement.style.position = 'absolute'
  container.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

// Optional
function configControls() {
  const controls = new OrbitControls(camera, container);
  controls.target.set(0, 0, 0);
  controls.update();
}

function setRaycaster() {
  const origin = new THREE.Vector3(0, 0, camera.position.z);
  const target = new THREE.Vector3(0, 0, 0);
  const direction = target.clone().sub(origin).normalize();

  const raycaster = new THREE.Raycaster(origin, direction);
  const mouse = new THREE.Vector2();

  let objectInFocus;

  const onDocumentClick = (event) => {
    console.log('clicked');
    console.log(event.clientX);
    console.log(event.clientY);
    console.log(container.offsetWidth);
    console.log(container.offsetHeight);
    const rect = container.getBoundingClientRect();
    console.log(rect);

    event.preventDefault();
    mouse.x = ((event.clientX - rect.left) / container.offsetWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / container.offsetHeight) * 2 + 1;
    console.log(mouse.x, mouse.y);

    raycaster.setFromCamera(mouse, camera);
    const rayHelper = new THREE.ArrowHelper(direction, origin, 10, 0xff0000);
    scene.add(rayHelper);
    const intersects = raycaster.intersectObject(mesh.get('cube'));
    console.log(intersects);
    if (intersects.length > 0) {
      const cube = mesh.get('cube'); //Get Cube
      objectInFocus = cube; // Save As Object in Focus
      cube.position.z += 50; // Lift Cube
    }
  };

  const onDocumentMouseDown = (event) => {
    console.log('mouse down');
    console.log(event.clientX);
    console.log(event.clientY);
    console.log(container.offsetWidth);
    console.log(container.offsetHeight);
    const rect = container.getBoundingClientRect();
    console.log(rect);

    event.preventDefault();
    mouse.x = ((event.clientX - rect.left) / container.offsetWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / container.offsetHeight) * 2 + 1;
    console.log(mouse.x, mouse.y);

    raycaster.setFromCamera(mouse, camera);
    const rayHelper = new THREE.ArrowHelper(direction, origin, 10, 0xff0000);
    scene.add(rayHelper);
    const intersects = raycaster.intersectObject(mesh.get('cube'));
    console.log(intersects);
    if (intersects.length > 0) {
      const cube = mesh.get('cube'); //Get Cube
      objectInFocus = cube; // Save As Object in Focus
      cube.position.z += 50; // Lift Cube
    }
  };
  const onDocumentMouseMove = () => {};
  const onDocumentMouseUp = (event) => {
    // Check If There Was An Object In Focus
    if (objectInFocus) {
      const cube = objectInFocus; // Get Object In Focus
      cube.position.z -= 20; // Drop Object in Focus
    }
    console.log(event);
  };
  const onDocumentTouchStart = () => {};
  const onDocumentTouchMove = () => {};
  const onDocumentTouchEnd = () => {};

  container.addEventListener('click', onDocumentClick, false);
  container.addEventListener('mousedown', onDocumentMouseDown, false);
  container.addEventListener('mousemove', onDocumentMouseMove, false);
  container.addEventListener('mouseup', onDocumentMouseUp, false);
  container.addEventListener('touchstart', onDocumentTouchStart, false);
  container.addEventListener('touchmove', onDocumentTouchMove, false);
  container.addEventListener('touchend', onDocumentTouchEnd, false);
}
function createScene() {
  let board = mesh.get('board');
  let cube = mesh.get('cube');

  scene.add(cube);
  scene.add(board);
}

export { createArena };
