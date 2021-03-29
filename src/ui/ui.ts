import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export const initUI = () => {
    const canvas = <HTMLCanvasElement>document.getElementById('webgl');
    const btnFile = <HTMLButtonElement>document.getElementById('btnFile');
    const inputFile = <HTMLInputElement>document.getElementById('inputFile');
    const spanMouse = <HTMLSpanElement>document.getElementById('spanMouse');
    const spanHover = <HTMLSpanElement>document.getElementById('spanHover');

    const mouse = new THREE.Vector2(-1.0, -1.0);

    const scene = new THREE.Scene();

    const helperGroup = new THREE.Group();
    helperGroup.name = `helpers`;
    helperGroup.add(new THREE.AxesHelper(5));
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshNormalMaterial());
    box.position.set(0, 0, -0.26);
    helperGroup.add(box);
    scene.add(helperGroup);

    const camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.001, 10000);
    camera.position.set(100, 200, 300);

    const raycaster = new THREE.Raycaster();
    // very important!  default threshold is 1, which will drive you crazy
    raycaster.params.Line.threshold = 0.1;
    raycaster.params.Points.threshold = 0.1;

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
     * event listeners
     */
    btnFile.addEventListener('click', () => inputFile.click());

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer3d.setSize(window.innerWidth, window.innerHeight);
        renderer3d.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        spanMouse.textContent = updateMouseText(mouse);
    });


    // ui functions
    const updateMouseText = (m: THREE.Vector2) => {
        const px = m.x >= 0 ? '+' : '';
        const py = m.y >= 0 ? '+' : '';
        return `m ${px}${m.x.toFixed(3)}, ${py}${m.y.toFixed(3)}`;
    };

    const render = () => {
        controls.update();
        camera.updateMatrixWorld();

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, false);

        if (intersects[0]?.object) {
            const {distance, point, object} = intersects[0];
            if (object.type === 'Points') {

            } else if (object.type === 'Line') {

            }
            const hoverText = `id:${object.id} pt:${point.x.toFixed(3)}, ${point.y.toFixed(3)}, ${point.z.toFixed(3)} dist:${distance.toFixed(3)}`;
            spanHover.innerText = hoverText;
        } else {
            spanHover.innerText = '';
        }

        renderer3d.render(scene, camera);
    }

    const animate = (): void => {
        requestAnimationFrame(animate);
        render();
    };

    return {
        scene,
        inputFile,
        animate
    };
};
