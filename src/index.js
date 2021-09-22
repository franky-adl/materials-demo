import './style.css';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

import { dumpObject, addLighting } from './common';
import { addCameraGUI, updateCameraLookat } from './dat-gui';
import GummyBears from './gltf/scene.glb'

let camera, scene, canvas, controls, renderer
let redGummy, grnGummy, prpGummy, bluGummy

init()
animate()
addCameraGUI(camera)

function init() {
  scene = new THREE.Scene();
  canvas = document.querySelector("#canvas");
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(23, 35, 40);
  controls = new OrbitControls(camera, canvas);

  // Set up the renderer
  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize( window.innerWidth, window.innerHeight );

  addLighting(scene)

  // load the gltf models
  const loader = new GLTFLoader();
  loader.load( GummyBears, function ( gltf ) {
    const root = gltf.scene
    scene.add( root )
    console.log(dumpObject(root).join('\n'))

    redGummy = root.getObjectByName('Gummy')
    grnGummy = root.getObjectByName('Gummy1')
    prpGummy = root.getObjectByName('Gummy2')
    bluGummy = root.getObjectByName('Gummy3')

    // remove redundant gummies
    // cannot use scene.remove(obj), that only works for direct children of the scene
    grnGummy.parent.remove(grnGummy)
    prpGummy.parent.remove(prpGummy)
    bluGummy.parent.remove(bluGummy)

    redGummy.scale.set(0.05, 0.05, 0.05)
    redGummy.position.set(30, 0, 0)

    // clone 3 red gummies
    let BasicGummy = redGummy.clone()
    let LambertGummy = redGummy.clone()
    let PhongGummy = redGummy.clone()

    BasicGummy.position.set(-30, 0, 0)
    BasicGummy.children[0].material = new THREE.MeshBasicMaterial({color: '#F00'})

    LambertGummy.position.set(-10, 0, 0)
    LambertGummy.children[0].material = new THREE.MeshLambertMaterial({color: '#F00'})

    PhongGummy.position.set(10, 0, 0)
    PhongGummy.children[0].material = new THREE.MeshPhongMaterial({color: '#F00', shininess: 100})
    
    scene.add(BasicGummy)
    scene.add(LambertGummy)
    scene.add(PhongGummy)
  } );
}

function animate() {
  updateCameraLookat(camera)

  renderer.render( scene, camera );

  requestAnimationFrame( animate );
}