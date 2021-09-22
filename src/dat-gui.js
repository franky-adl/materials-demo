import { Vector3 } from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

let gui
let cameraLookat = {
    'lookX': 12,
    'lookY': 23,
    'lookZ': 0,
}

function getGUI() {
    if (!gui) {
        gui = new GUI()
    }
    return gui
}

export function addCameraGUI(camera) {
    gui = getGUI()
    const camFolder = gui.addFolder('Camera')
    camFolder.add(camera.position, 'x', -500, 500)
    camFolder.add(camera.position, 'y', -500, 500)
    camFolder.add(camera.position, 'z', -500, 500)
    camFolder.add(cameraLookat, 'lookX', -500, 500)
    camFolder.add(cameraLookat, 'lookY', -500, 500)
    camFolder.add(cameraLookat, 'lookZ', -500, 500)
    camFolder.open()
}

export function updateCameraLookat(camera) {
    camera.lookAt(cameraLookat.lookX, cameraLookat.lookY, cameraLookat.lookZ)
}