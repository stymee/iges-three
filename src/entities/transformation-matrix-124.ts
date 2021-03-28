import {Matrix3, Vector3} from 'three';
import { entityFromSeqNo } from '../iges/iges-main';
import {IgesData, IgesParameterRecord} from '../iges/iges-standard';

export const threeTransformationMatrix = (parameters: IgesParameterRecord, iges: IgesData) => {
    const [r11, r12, r13, t1, r21, r22, r23, t2, r31, r32, r33, t3] = parameters.values.map(s => parseFloat(s));

	const entity = entityFromSeqNo(parameters.seqNo, iges);

	console.log('got entity', entity);

    const mat = new Matrix3();
    mat.set(r11, r12, r13, r21, r22, r23, r31, r32, r33);
	const vec = new Vector3(t1, t2, t3)

	console.log('got transformation info, mat', mat, 'vec', vec);

    return '';
};

// transformation matrix
// page 116
