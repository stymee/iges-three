import { globalProperties, IgesData, IgesGlobalPropertyType } from './iges-types';
import {parse} from './parser';


export const loadIgesFile = async (file: File): Promise<string> => {
    const perf = performance.now();
    console.log(`in loadIges, file is ${file.name}`);

    const text = await file.text();
    const iges = parse(text);

    console.log(globalProperties.AuthorName);
    console.log(getGlobalProperty(iges, globalProperties.AuthorName));
    console.log(getGlobalProperty(iges, globalProperties.MinimumModelResolution));

    return `${(performance.now() - perf).toFixed(3)} ms to load |${file.name}|`;
};


// helper functions
export const getGlobalProperty = (iges: IgesData, prop: [number, IgesGlobalPropertyType]) => {
    const [propIndex, propType] = prop;
    const [, propValue] = iges.global[0][propIndex];
    switch (propType) {
        case 'string':
            return propValue;
        case 'integer':
            return parseInt(propValue);
        case 'real':
            return parseFloat(propValue);
    }
};
