import * as THREE from "three";
import "./index.scss";

// create our scene and add a perspective camera
const scene = new THREE.Scene();
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 10;
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
const ambientLight = new THREE.AmbientLight(light_color, light_intensity / 2);
scene.add(ambientLight);

// create some cubes and add them to our scene
const box_geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
// note that we use the same geometry to create three different mesh objects
const cube1 = new THREE.Mesh(box_geometry, material);
const cube2 = new THREE.Mesh(box_geometry, material);
const cube3 = new THREE.Mesh(box_geometry, material);

scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
cube1.position.x = 0;
cube2.position.x = -2;
cube3.position.x = 2;
// rotations made easy!
const rotation_angle = Math.PI / 4;
cube1.rotateX(rotation_angle);
cube2.rotateY(rotation_angle);
cube3.rotateZ(rotation_angle);
// translations
cube1.translateZ(-1);
cube2.translateY(1);
cube3.translateOnAxis(new THREE.Vector3(-1, -1, -1), 1);

// set our camera's position and render the scene
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 1;
camera.lookAt(0, 0, 0);
camera.aspect = canvas.clientWidth / canvas.clientHeight;
camera.updateProjectionMatrix();
renderer.render(scene, camera);
