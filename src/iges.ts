import {parse} from './parser'

export const loadIgesFile = async (file: File): Promise<string> => {
    const perf = performance.now();
    console.log(`in loadIges, file is ${file.name}`);

    const text = await file.text();
    const iges = parse(text);
    console.table(iges);

    return `${(performance.now() - perf).toFixed(3)} ms to load |${file.name}|`;
};


