import {Matrix4} from 'three';
import {IgesData} from '../iges/iges-standard';

export const threeTransformationMatrixFromSeqNo = (seqNo: number | string, iges: IgesData) => {
    let seq = typeof seqNo === 'number' ? seqNo : parseInt(seqNo);
    const parameters = iges.parameters.find(s => s.seqNo === seq);
    const [r11, r12, r13, t1, r21, r22, r23, t2, r31, r32, r33, t3] = parameters.values
        .slice(1, 13)
        .map(s => parseFloat(s));
    const mat4 = new Matrix4();
    mat4.set(r11, r12, r13, t1, r21, r22, r23, t2, r31, r32, r33, t3, 0, 0, 0, 1);

    return mat4;
};


// transformation matrix
// page 116
// too much stuff in the spec to show here, basically take the 1x11 array and 
// feed that into the set() method on a Matrix4();
// then just use this with the applyMatrix4() method on any Object3D to put it in the right position, viola!
