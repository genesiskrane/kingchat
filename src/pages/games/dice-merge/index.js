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
  } catch (e) {
    console.error(e);
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
  (camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000));

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
  console.log(container.offsetWidth, container.offsetHeight);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  // renderer.setPixelRatio(window.devicePixelRatio);
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
  let offset = new THREE.Vector3(); // To store the offset between object and mouse in 3D space
  let initialIntersection = new THREE.Vector3();

  let initialMousePosition = new THREE.Vector2(); // To store initial mouse position
  let initialObjectPosition = new THREE.Vector3(); // To store the initial object position

  const onMouseDown = (event) => liftCube(event, 'mouse');
  const onTouchStart = (event) => liftCube(event, 'touch');

  const onMouseMove = (event) => moveCube(event, 'mouse');
  const onTouchMove = (event) => moveCube(event, 'touch');

  const onMouseUp = () => dropCube();
  const onTouchEnd = () => dropCube();

  container.addEventListener('mousedown', onMouseDown, false);
  container.addEventListener('touchstart', onTouchStart, false);

  container.addEventListener('mousemove', onMouseMove, false);
  container.addEventListener('touchmove', onTouchMove, false);

  container.addEventListener('mouseup', onMouseUp, false);
  container.addEventListener('touchend', onTouchEnd, false);

  function liftCube(event, inputType) {
    event.preventDefault();

    const containerDimension = container.getBoundingClientRect();

    const clientX = inputType == 'mouse' ? event.clientX : event.touches[0].clientX;
    const clientY = inputType == 'mouse' ? event.clientY : event.touches[0].clientY;

    mouse.x = ((clientX - containerDimension.left) / container.offsetWidth) * 2 - 1;
    mouse.y = -((clientY - containerDimension.top) / container.offsetHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(mesh.get('cube'));

    if (intersects.length > 0) {
      const cube = mesh.get('cube'); //Get Cube
      objectInFocus = cube; // Save As Object in Focus
      cube.position.z += 50; // Lift Cube

      initialIntersection.copy(intersects[0].point);
      offset.subVectors(cube.position, initialIntersection);

      initialMousePosition.set(clientX, clientY);
      initialObjectPosition.copy(cube.position);
    }
  }

  function dropCube() {
    if (objectInFocus) {
      const cube = objectInFocus; // Get Object In Focus
      cube.position.z -= 50; // Drop Object in Focus
      objectInFocus = null;
    }
  }

  function moveCube(event, inputType) {
    if (!objectInFocus) return;

    event.preventDefault();

    const clientX = inputType == 'mouse' ? event.clientX : event.touches[0].clientX;
    const clientY = inputType == 'mouse' ? event.clientY : event.touches[0].clientY;

    const cube = objectInFocus;

    const deltaX = clientX - initialMousePosition.x;
    const deltaY = clientY - initialMousePosition.y;

    const movementX = (deltaX / container.offsetWidth) * 2;
    const movementY = -(deltaY / container.offsetHeight) * 2;

    cube.position.x = initialObjectPosition.x + movementX * (camera.position.z - cube.position.z);
    cube.position.y = initialObjectPosition.y + movementY * (camera.position.z - cube.position.z);

    clampObjectToCameraBounds(cube);
  }

  function clampObjectToCameraBounds(cube) {
    const frustumSize = getFrustumSize(camera, cube.position.z);

    // Clamp X and Y position based on frustum size at the object's depth
    cube.position.x = Math.max(
      -frustumSize.width / 2,
      Math.min(frustumSize.width / 2, cube.position.x)
    );
    cube.position.y = Math.max(
      -frustumSize.height / 2,
      Math.min(frustumSize.height / 2, cube.position.y)
    );
  }

  function getFrustumSize(camera, zDepth) {
    const vFOV = THREE.Math.degToRad(camera.fov); // vertical field of view in radians
    const heightAtDepth = 2 * Math.tan(vFOV / 2) * Math.abs(camera.position.z - zDepth);
    const widthAtDepth = heightAtDepth * camera.aspect;

    return { width: widthAtDepth, height: heightAtDepth };
  }
}

function createScene() {
  let board = mesh.get('board');
  let cube = mesh.get('cube');

  cube.castShadow = true;
  cube.receiveShadow = true;

  const helper = new THREE.CameraHelper(camera);
  scene.add(helper);
  scene.add(cube);
  scene.add(board);
}

export { createArena };
