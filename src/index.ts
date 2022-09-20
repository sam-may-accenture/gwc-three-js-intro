import * as THREE from "three";
import "./index.scss";

// create our scene and add our perspective's camera
const scene = new THREE.Scene();
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// select the input element and set the size of what we are painting
const canvas = document.querySelector("#c") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add some lighting to the scene
const light_color = 0xffffff;
const light_intensity = 1;
const light = new THREE.DirectionalLight(light_color, light_intensity);
light.position.set(-1, 2, 4);
scene.add(light);

// create a cube and add it to our scene
const geometry = new THREE.BoxGeometry();
function makeCube(
  color: THREE.ColorRepresentation,
  x_coord: number
): THREE.Mesh {
  const material = new THREE.MeshPhongMaterial({ color: color });
  // note that we use the same geometry to create three different mesh objects
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = x_coord;
  return cube;
}
const cubes = [
  makeCube(0x44aa88, 0),
  makeCube(0x8844aa, -2),
  makeCube(0xaa8844, 2),
];
// scene.add(...cubes);

camera.position.z = 3;

function render(time: number) {
  // time to seconds
  time *= 0.001;
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  cubes.forEach((cube, i) => {
    // slightly differ rotation for each cube
    const speed = 1 + i * 0.1;
    const rotation = time * speed;
    cube.rotation.x = rotation;
    cube.rotation.y = rotation;
  });
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
requestAnimationFrame(render);
