import './style.css';
import {initUI} from './src/ui/ui';
import {loadIgesFile} from './src/iges/iges-main';
import {createGeometry} from './src/three/three-main';
import * as THREE from 'three';


const ui = initUI();
const raycaster = new THREE.Raycaster();

const igesElements = [];

ui.inputFile.addEventListener('change', async (e: InputEvent) => {
    const file = (<HTMLInputElement>e.target).files[0];
    if (!file) return;

    const iges = await loadIgesFile(file);

    const threeGeometry = createGeometry(iges);

    debugger;
    threeGeometry.forEach(group => {
        if (group.name === 'CircularArc' || group.name === 'Line') {
            igesElements.push(group);
        }
        ui.scene.add(group);
    });

    //console.log(ret);
});

console.log(igesElements);

const tick = () => {
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(ui.mouse, ui.camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(igesElements);
    //console.log(performance.now())
    if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
            ui.setHover(`${intersects[i].object.name} ${intersects[i].object.id} `);
            //console.log(`intersected!`,intersects[i].object)
            //intersects[i].object.material.color.set(0xff0000);
        }
    } else {
        ui.setHover('');
    }

    ui.tick();
    requestAnimationFrame(tick);
};

tick();
