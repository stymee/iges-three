import './style.css';
import {initUI} from './src/ui/ui';
import {loadIgesFile} from './src/iges/iges-main';
import {createGeometry} from './src/three/three-main';
import { Object3D } from 'three';

const ui = initUI();

let threeObjects = new Array<Object3D>();

ui.inputFile.addEventListener('change', async (e: InputEvent) => {
    const file = (<HTMLInputElement>e.target).files[0];
    if (!file) return;

    const iges = await loadIgesFile(file);

    threeObjects = createGeometry(iges);
    threeObjects.forEach(obj => ui.scene.add(obj));

    console.log(threeObjects);
});

ui.animate();
