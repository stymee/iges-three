import {
    BufferAttribute,
    BufferGeometry,
    LineBasicMaterial,
    Line,
    EllipseCurve,
    Object3D,
    Points,
    PointsMaterial,
} from 'three';
import {entityFromSeqNo} from '../iges/iges-main';
import {IgesData, IgesParameterRecord} from '../iges/iges-standard';
import { nameProperty } from './name-property-406';
import { threeTransformationMatrixFromSeqNo } from './transformation-matrix-124';

export const threeCircularArc = (parameters: IgesParameterRecord, iges: IgesData): Array<Object3D> => {

    const entity = entityFromSeqNo(parameters.seqNo, iges);
    
    let label = entity.label.value;
    if (!label) {
        // not in the directory data, have to look up a 406 form15 name property
        // the sequence number of the 406 directory is in the last field of the parameters array
        label = nameProperty(parameters.values[parameters.values.length-1], iges);
    }
    
    const {ellipseCurve, mat4, positions} = threeCircularArcCurve(parameters, iges);
    const vertexPoints = new Points(
        new BufferGeometry(),
        new PointsMaterial({
            color: '#ffff00',
            size: 1.5 * window.devicePixelRatio,
            sizeAttenuation: false
        })
    );
    // const positions = new Float32Array([x1, y1, z, x2, y2, z, x3, y3, z]);
    vertexPoints.geometry.setAttribute('position', new BufferAttribute(positions, 3));

    const arc = new Line(
        new BufferGeometry(),
        new LineBasicMaterial({
            color: '#0000ff'
        })
    );

    arc.geometry.setFromPoints(ellipseCurve.getPoints(500));
    arc.name = label;
    arc.userData = parameters;
	
    arc.applyMatrix4(mat4);
    vertexPoints.applyMatrix4(mat4);

    // vertexPoints.visible = false;

    // const group = new Group();
    // group.add(vertexPoints);
    // group.add(arc);


    return [vertexPoints, arc];
};



export const threeCircularArcCurve = (parameters: IgesParameterRecord, iges: IgesData) => {
    const [z, x1, y1, x2, y2, x3, y3] = parameters.values.slice(1, 10).map(s => parseFloat(s));
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angleStart = Math.atan(y2 / x2);
    const angleStop = Math.atan(y3 / x3);

    const entity = entityFromSeqNo(parameters.seqNo, iges);

    const mat4 = threeTransformationMatrixFromSeqNo(entity.transformationMatrix.value, iges);

    const ellipseCurve = new EllipseCurve(x1, y1, radius, radius, angleStart, angleStop, false, 0);
    const positions = new Float32Array([x1, y1, z, x2, y2, z, x3, y3, z]);

    return { ellipseCurve, mat4, positions };
};


export const threeCircularArcPoints = (parameters: IgesParameterRecord, iges: IgesData) => {

    const {ellipseCurve, mat4,} = threeCircularArcCurve(parameters, iges);
    const geometry = new BufferGeometry();
    geometry.setFromPoints(ellipseCurve.getPoints(500));
    geometry.applyMatrix4(mat4);

    return geometry;

}
// line
// page 64
// 4.3 Circular Arc Entity (Type 100)
// A circular arc is a connected portion of a circle which has distinct
// ARC ENTITY (TYPE 100)
// start and terminate points. The ECO630
// definition space coordinate system is always chosen so that the circular arc lies in a plane either
// coincident with, or parallel to, the XT, YT plane.
// A circular arc determines unique arc endpoints and an arc center point (the center of the parent
// circle). By considering the arc end points to be enumerated and listed in an ordered manner, start
// point first, followed by terminate point, a direction with respect to definition space can be associated
// with the arc. The ordering of the end points corresponds to the ordering necessary for the arc to be
// traced out in a counterclockwise direction. (See Section 3.2.4.) This convention serves to distinguish
// the desired circular arc from its complementary arc (complementary with respect to the parent
// circle).
// The direction of the arc with respect to model space is determined by the original counterclockwise
// direction of the arc within definition space, in conjunction with the action of the transformation
// matrix on the arc.
// If required, the default parameterization is: ECO630
// where ZT is the coordinate of a point along the ZT axis, for i = 2 and 3,
// ti is such that
// and
// Examples of the Circular Arc Entity are shown in Figure 16. In Example 1 of Figure 16 the solid ECO630
// arc is a full circle, and the start and terminate points are coincident. In Example 2 of Figure 16,
// the solid arc is defined using point A as the start point and point B as the terminate point. If the
// complementary dashed arc were desired, the start point listed in the parameter data entry would be
// B, and the terminate point would be A.
// 4.3 CIRCULAR ARC ENTITY (TYPE 100)
// Directory Entry
// (1) (2) (3) (4) (5) (6) (7) (8)
// Entity Type Parameter Structure Line Font Level View Xformation Label
// Number Data Pattern Matrix Display
// 100 < n.a. >
// (11) (12) (13) (14) (15) (16) (17) (18)
// Entity Type Line Color Parameter Form Reserved Reserved Entity
// Number Weight Number Line Count Number Label
// 100 # # 0
// Parameter Data
// Index Name Type Description
// (9) (10)
// Status Sequence
// Number Number
// D #
// (19) (20)
// Entity Sequence
// Subscript Number
// D#+ l
// 1 ZT Real Parallel ZT displacement of arc from XT, YT plane
// 2 X1 Real Arc center abscissa
// 3 Y1 Real Arc center ordinate
// 4 X2 Real Start point abscissa
// 5 Y2 Real Start point ordinate
// 6 X3 Real Terminate point abscissa
// 7 Y3 Real Terminate point ordinate
