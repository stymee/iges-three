// import {BufferGeometry, CurvePath, LineCurve3, LineBasicMaterial, LineBasicMaterial, CatmullRomCurve3} from 'three';
// import { IgesData, IgesParameterRecord} from '../iges/iges-standard';
// import {threeLineCurve} from './line-110';
// import {threeCircularArcPoints} from './circular-arc-100';

// export const threeCompositeCurve = (parameters: IgesParameterRecord, iges: IgesData) => {
    // const composite = new CurvePath();

    // const curveMaterial = new LineBasicMaterial({
    //     color: '#0000ff'
    // });

    // const LineBasicMaterial = new LineBasicMaterial({
    //     color: '#00ff00'
    // });

    // const parts = parameters.values.slice(1, parameters.values.length - 3).map(seq => {
    //     const partParameters = iges.parameters.find(s => s.seqNo === parseInt(seq));

    //     switch (partParameters[0]) {
    //         case entityTypes.Line:
    //             const newLine = threeLineCurve(partParameters);
	// 			composite.add(newLine);

    //             break;

    //         case entityTypes.CircularArc:
    //             const curvePositions = threeCircularArcPoints(partParameters, iges);

    //             const newCurve = new CatmullRomCurve3()

    //             break;

    //         default:
    //             break;
    //     }

    //     return;
    // });
    // console.log(parameters);
    // debugger;
    // return parameters[2];
// 	return '';
// };

// composit curve
// page 67
// 4.4 Composite Curve Entity (Type 102)
// A composite curve is a continuous curve that results from the grouping
// stituent entities into a logical unit.
// A composite curve is defined as an ordered list of entities consisting of
// ENTITY (TYPE 102)
// of certain individual conpoint, connect point, and
// parameterized curve entities (excluding the Composite Curve Entity). The list of entities appears
// in the parameter data entry. There, each entity to appear in the defining list is indicated by means
// of a pointer to the directory entry of that entity. The order within the defining list is the same as
// the order of the listing of these pointers.
// Each constituent entity has its own transformation matrix and display attributes. Each constituent
// entity may have text or properties associated with it. Because the constituent entities are subordinate
// to the composite entity, the Subordinate Entity Switch (digits 3–4 in Directory Entry Field 9) of
// each constituent entity shall indicate a physical dependency.
