import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export const initUI = () => {
    const canvas = <HTMLCanvasElement>document.getElementById('webgl');

    const mouse = {
        x: 0,
        y: 0
    };

    const scene = new THREE.Scene();

    const helperGroup = new THREE.Group();
    helperGroup.name = `helpers`;
    helperGroup.add(new THREE.AxesHelper(5));
    const box = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshNormalMaterial());
    helperGroup.add(box);
    scene.add(helperGroup);

    const camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.001, 10000);
    camera.position.set(200, 400, 600);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.8;
    controls.screenSpacePanning = true;
    controls.zoomSpeed = 3;
    controls.update();

    // 3D canvas and renderer
    const renderer3d = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });
    renderer3d.setSize(window.innerWidth, window.innerHeight);
    renderer3d.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     *
     * expose these for the event listeners
     */
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer3d.setSize(window.innerWidth, window.innerHeight);
        renderer3d.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    canvas.addEventListener('mousemove', (e: MouseEvent) => {
        mouse.x = (canvas.clientLeft - e.clientX - 1) * 2;
        mouse.y = -(canvas.clientTop - e.clientY - 1) * 2;
    });

    // run this at each render
    const tick = (): void => {
        controls.update();
        renderer3d.render(scene, camera);
    };


	return {
		scene,
		camera,
		mouse,
		tick
	}
};
