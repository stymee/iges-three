import { parseEntities } from './iges-entity';
import { parseRecords } from './iges-record';
import { IgesData, Section, igesColumnMarkers } from './iges-types';


// the whole shebang
export const parse = (text: string): IgesData => {
    const rawMap = igesMap(text);
    const global = parseRecords(rawMap.get('G').join(''));
    const entities = parseEntities(rawMap.get('D'));
    const parameters = parseRecords(rawMap.get('P').join(''));

    return <IgesData>{
        rawMap,
        global,
        entities,
        parameters
    };
};

// initial map parsing functions
const sectionLetter = (line: string) => line[igesColumnMarkers.sectionNo] as Section;
const igesMap = (text: string) => {
    const ret = new Map<Section, Array<string>>();
    ret.set('S', new Array<string>());
    ret.set('G', new Array<string>());
    ret.set('D', new Array<string>());
    ret.set('P', new Array<string>());
    ret.set('T', new Array<string>());
    text.split('\n')
        .filter(s => s.length === igesColumnMarkers.max)
        .forEach(s => ret.get(sectionLetter(s)).push(s));
    return ret;
};

// 
