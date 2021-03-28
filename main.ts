import './style.css';
import { initUI } from './src/ui/ui';
import { loadIgesFile } from './src/iges/iges-main';
import { createGeometry } from './src/three/three-main';

const ui = initUI()

ui.inputFile.addEventListener('change', async (e:InputEvent) => {
    const file = (<HTMLInputElement>e.target).files[0];
    if (!file) return;

    const iges = await loadIgesFile(file);

    const threeGeometry = createGeometry(iges);

    threeGeometry.forEach(group => ui.scene.add(group));

    //console.log(ret);
});


const tick = () => {
    ui.tick();
    requestAnimationFrame(tick);
};

tick();
