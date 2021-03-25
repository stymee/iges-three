import './style.css';
import * as THREE from 'three';
import { initUI } from './src/ui';

const ui = initUI()


const tick = () => {
    ui.tick();
    requestAnimationFrame(tick);
};

tick();
