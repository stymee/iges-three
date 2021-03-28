import {BufferAttribute, BufferGeometry, LineBasicMaterial, Line} from 'three';
import {IgesData, IgesParameterRecord} from '../iges/iges-standard';

export const threeLine = (parameters: IgesParameterRecord, iges: IgesData) => {
    const geometry = new BufferGeometry();
    const material = new LineBasicMaterial({
        color: '#00ff00'
    });

    const positions = new Float32Array(parameters.values.slice(1, 7).map(s => parseFloat(s)));

    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    const line = new Line(geometry, material);

    return line;
};

// line
// page 119
// 4.13 Line Entity (Type 110, Form 0) ECO646
// A line is a bounded, connected portion of a straight line which has distinct start and terminate ECO630
// points.
// A line is defined by its end points. Each end point is specified relative to definition space by triple
// coordinates. With respect to definition space, a direction is associated with the line by considering
// the start point to be listed first and the terminate point second.
// The direction of the line with respect to model space is determined by the original direction of the
// line within definition space, in conjunction with the action of the transformation matrix on the line.
// Examples of the line entity are shown in Figure 24.
// If required, the default parameterization is: ECO630
// C(t) = P1 + t(P2 – P1) f o r 0 £ t £ 1
// Directory Entry
// (1) (2) (3) (4) (5) (6) (7) (8) (9) (10)
// Entity Type Parameter Structure Line Font Level View Xformation Label Status
// Number
// Sequence
// Data Pattern Matrix Display Number Number
// 110 < n.a. > ??????** D #
// (11) (12) (13) (14) (15) (16) (17) (18) (19) (20)
// Entity Type Line Color Parameter Form Reserved Reserved Entity Entity Sequence
// Number Weight Number Line Count Number Label Subscript Number
// 110 # D#+ l
// Parameter Data
// # Name Type Description
// 1 Xl Real Start Point P1
// 2 Y1 Real
// 3 Z1 Real
// 4 X2 Real Terminate Point P2
// 5 Y2 Real
// 6 Z2 Real