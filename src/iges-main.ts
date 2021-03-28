import { getGlobalProperty, globalProperties, igesColumnMarkers, IgesData, Section } from './iges-spec';
import { parseEntities } from './iges-entity';
import { parseRecords } from './iges-record';


// the whole shebang
export const parse = (text: string): IgesData => {
    const rawMap = igesMap(text);
    const global = parseRecords(rawMap.get('G').join(''));
    const entities = parseEntities(rawMap.get('D').join(''));
    const parameters = parseRecords(rawMap.get('P').join(''));

    return <IgesData>{
        rawMap,
        global,
        entities,
        parameters
    };
};

export const loadIgesFile = async (file: File): Promise<string> => {
    const perf = performance.now();
    console.log(`in loadIges, file is ${file.name}`);

    const text = await file.text();
    const iges = parse(text);
    
    console.log(getGlobalProperty(iges, globalProperties.AuthorName));
    console.log(getGlobalProperty(iges, globalProperties.MinimumModelResolution));

    console.log('Global', iges.global);
    console.log('Entities', iges.entities);
    console.log('Parameters', iges.parameters);

    return `${(performance.now() - perf).toFixed(3)} ms to load |${file.name}|`;
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