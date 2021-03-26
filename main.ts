import './style.css';
import { initUI } from './src/ui';
import {loadIgesFile} from './src/iges';

const ui = initUI()

ui.inputFile.addEventListener('change', async (e:InputEvent) => {
    const file = (<HTMLInputElement>e.target).files[0];
    if (!file) return;

    const ret = await loadIgesFile(file);

    console.log(ret);
});




const tick = () => {
    ui.tick();
    requestAnimationFrame(tick);
};

tick();
