import * as THREE from "three";
import { GLTF, GLTFLoader } from "./module_declarations/GLTFLoader";
import "./index.scss";

// create our scene and add a perspective camera
const scene = new THREE.Scene();
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// select the input element and set the size of what we are painting
const canvas = document.querySelector("#c") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0088ff);
document.body.appendChild(renderer.domElement);

// add some lighting to the scene
const light_color = 0xffffff;
const light_intensity = 3;
const light = new THREE.DirectionalLight(light_color, light_intensity);
light.position.set(-4, 6, 1);
scene.add(light);
const ambientLight = new THREE.AmbientLight(light_color, light_intensity / 2);
scene.add(ambientLight);

// load our model
const loader = new GLTFLoader();
// create our functions for managing the load lifecycle
const onLoadModel = (gltf: GLTF) => {
  console.log(gltf);
  const mesh = gltf.scene;
  const scale_factor = 4.5;
  mesh.scale.set(scale_factor, scale_factor, scale_factor);
  mesh.position.x = 0;
  mesh.position.y = 0;
  mesh.position.z = 0;
  scene.add(mesh);
};
loader.load("porsche/scene.gltf", onLoadModel);

// set our camera's position and render the scene
camera.position.z = 12;
camera.position.y = 4;
camera.position.x = 11;
camera.lookAt(0, 0, 0);

function render() {
  requestAnimationFrame(render);
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
}
requestAnimationFrame(render);
