import * as THREE from 'three';
import {threeCircularArc} from '../entities/circular-arc-100';
// import {threeCompositeCurve} from '../entities/composite-curve-102';
import {threeLine} from '../entities/line-110';
import {threePoint} from '../entities/point-116';
import {IgesData, entityTypes} from '../iges/iges-standard';

export const createGeometry = (iges: IgesData) => {
    const groups = new Map<string, THREE.Group>();

    Object.entries(entityTypes).forEach(v => {
        const [key, val] = v;
        const group = new THREE.Group();
        group.name = key;
        groups.set(val, group);
    });
    groups.set(entityTypes.Point, new THREE.Group());

    iges.parameters.forEach(v => {
        switch (v.values[0]) {
            case entityTypes.CompositeCurve:
                //groups.get(v.values[0]).add(threeCompositeCurve(v, iges));
                break;

            case entityTypes.Point:
                groups.get(v.values[0]).add(threePoint(v, iges));
                break;

            case entityTypes.Line:
                groups.get(v.values[0]).add(threeLine(v, iges));
                break;

            case entityTypes.CircularArc:
                groups.get(v.values[0]).add(threeCircularArc(v, iges));
                break;

            case entityTypes.TransformationMatrix:
                // will calculte transformations on the fly, just don't want to show an error
                break;

            case entityTypes.ClosureProperty:
                // will pull names and form data on the fly, just don't want to show an error
                break;

            default:
                console.log(`Unsupported Entity Type:${v.values[0]}, skipping creation...`);
        }
    });

    return [...groups.values()];
};
