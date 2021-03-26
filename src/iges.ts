export const loadIgesFile = async (file: File): Promise<string> => {
    const perf = performance.now();
    console.log(`in loadIges, file is ${file.name}`);

    const text = await file.text();
    console.time('rip');
    const data = getMap(text);
    console.timeEnd('rip');

    //console.log(data);

    //console.log(sectionAsString({section: 'G', map: data}));

    console.time('global');
    const global = parseGlobal(sectionAsString({section: 'G', map: data}));
    console.timeEnd('global');
    console.log(global);

    return `${(performance.now() - perf).toFixed(3)} ms to load ${file.name} in `;
};

type Section = 'S' | 'G' | 'D' | 'P' | 'T';

const getSection = (line: string) => line[72] as Section;

const getLineNo = (line: string) => parseInt(line.slice(74));

const getMap = (text: string) => {
    const ret = new Map<Section, Array<string>>();
    ret.set('S', new Array<string>());
    ret.set('G', new Array<string>());
    ret.set('D', new Array<string>());
    ret.set('P', new Array<string>());
    ret.set('T', new Array<string>());
    text.split('\n')
        .filter(s => s.length === 80)
        .forEach(s => ret.get(getSection(s)).push(s));
    return ret;
};

// G - global section
// strings start with number (length of string), then H and are terminated by a comma
// I'll use the length to stop the string and skip the comma
const sectionAsString = (p: {section: Section; map: Map<Section, Array<string>>}) => {
    return p.map.get(p.section).reduce((acc, line) => acc + line.slice(0, 72), '');
};

const parseGlobal = (chunk: string) => {
    type GLoc = 'search' | 'string';
    let loc: GLoc = 'search';

    let strLen = 0;
    let str = '';
    const ret = new Array<string>();
    console.log(chunk);

    debugger;
    [...chunk].forEach(char => {
        switch (loc) {
            case 'string':
                if (str.length >= strLen) {
                    ret.push(str);
                    str = '';
                    loc = 'search';
                } else {
                    str += char;
                }
                break;

            case 'search':
                if (char === ',') {
                    ret.push(str);
                    str = '';
                    strLen = parseInt(char);
                } else if (char === 'H') {
                    strLen = parseInt(str);
                    str = '';
                    loc = 'string';
                } else if (char === ' ') {
                    
                } else {
                    str += char;
                }
                break;
        }
    });
    return ret;
};

// const globalLoc = (p:{gloc: GLoc, char: string}): GLoc => {
//     if (p.gloc === '' === 'H') {
//         return 'head';
//     } else if {c === ','}
// }

// const parseGlobal = (p:{loc: number, chunk: string}) => {
//     const char = p.chunk[p.loc];
//     const test = parseInt(char);
//     if
//     let head = '';
//     switch (char) {
//         case '0':
//             head += parseGlobal({loc: p.loc + 1, chunk: p.chunk});
//         case '1':
//         case '2':
//         case '3':
//         case '4':
//         case '5':
//         case '6':
//         case '7':
//         case '8':
//         case '9':
//         case 'H':
//             break;
//         default:
//             break;
//     }
// }
