// point
// page 102
// 4.16 Point Entity (Type 116)
// A point is defined by its coordinates in definition space. An optional pointer to a Subfigure Definition ECO630
// Entity (Type 308) references a display symbol. Examples of the Point Entity are shown in Figure 28.
// Directory Entry
// (1) (2) (3) (4) (5) (6) (7) (8) (9) (10)
// Entity Type Parameter Structure Line Font Level View Xformation Label Status Sequence
// Number Data Pattern Matrix Display Number Number
// 116 < n.a. > ????????
// (11) (12) (13) (14) (15) (16) (17) (18) (19) (20)
// Entity Type Line Color Parameter Form
// Weight
// Reserved Reserved Entity Entity Sequence
// Number Number Line Count Number Label Subscript Number
// 116 D#+ 1
// Note: If PD Index 4 (Pointer to Display Geometry) is 0 or defaulted, Line Font Pattern, Line
// Weight, and Hierarchy are ignored.
// Parameter Data
// Index Name Type Description
// 1 X Real Coordinates of point
// 2 Y Real
// 3 Z Real
// 4 PTR Pointer Pointer to the DE of the Subfigure Definition Entity specifying the display symbol or zero. If zero, no display symbol is
// specified.

import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from "three";
import { IgesData, IgesParameterRecord } from "../iges-standard";


export const pointAsVector3 = (parameters: IgesParameterRecord, iges: IgesData) => {
	const geometry = new BufferGeometry();
	const material = new PointsMaterial({
		color: '#00ffff',
		size: 4
	});

	const xyz = parameters.values.slice(1,3).map(s => parseFloat(s));

	geometry.setAttribute('position', new BufferAttribute(xyz, 3))
	const point = new Points(
		geometry,
		material
	);

	return point;
}


