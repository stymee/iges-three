import {igesColumnMarkers, IgesData, Section} from './iges-standard';
import {parseDirectoryEntities} from './parse-entities';
import {parseGlobalRecords} from './parse-global';
import {parseParameterRecords} from './parse-parameters';

// the whole shebang
export const parse = (text: string): IgesData => {
    const rawMap = igesMap(text);
    const global = parseGlobalRecords(rawMap.get('G').join(''));
    const entities = parseDirectoryEntities(rawMap.get('D'));
    const parameters = parseParameterRecords(rawMap.get('P').join(''));

    return <IgesData>{
        rawMap,
        global,
        entities,
        parameters
    };
};

export const loadIgesFile = async (file: File): Promise<IgesData> => {
    const perf = performance.now();
    console.log(`in loadIges, file is ${file.name}`);

    const text = await file.text();
    const iges = parse(text);

    // examples on how to get to stuff
    // console.log('parameter delimiter', iges.global.ParameterDelimiterCharacter.value);
    // console.log('record delimiter', iges.global.RecordDelimiterCharacter.value);
    // console.log('author name', iges.global.AuthorName.value);
    // console.log('min resolution', iges.global.MinimumModelResolution.value);

    // console.log('Global', iges.global);
    // console.log('Entities', iges.entities);
    // console.log('Parameters', iges.parameters);

    console.log(`${(performance.now() - perf).toFixed(3)} ms to load |${file.name}|`);

    return iges;
};

// initial map parsing functions
const sectionLetter = (line: string) => line[igesColumnMarkers.sectionNoIndex] as Section;
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

export const entityFromSeqNo = (seqNo: number | string, iges: IgesData) => {
	let seq = typeof(seqNo) === 'number' ? seqNo : parseInt(seqNo);
    return iges.entities.find(s => parseInt(s.sequence.value) === seq);
}


