import * as P from './parser'

export const loadIgesFile = async (file: File): Promise<string> => {
    const perf = performance.now();
    console.log(`in loadIges, file is ${file.name}`);

    const text = await file.text();
    console.time('rip');
    const iges = igesMap(text);
    console.timeEnd('rip');

    const g = sectionBlob({section: 'G', map: iges})

    console.log(g)

    const tree: P.Tree = {
        input: g,
        pos: 0
    }
    
    const endProp = P.chr(',');
    const endRecord = P.chr(';');
    
    console.log(endProp(tree))
    //console.log(data);

    //console.log(sectionAsString({section: 'G', map: data}));

    // console.time('global');
    // const global = sectionAsArrays(sectionBlob({section: 'G', map: data}));
    // console.timeEnd('global');
    // console.log(global);

    //console.log(sectionAsString({section: 'P', map: data}))
    // console.table(parseD(data.get('D')));

    // console.log(sectionAsArrays(sectionBlob({section: 'P', map: data})));

    return `${(performance.now() - perf).toFixed(3)} ms to load |${file.name}|`;
};

type Section = 'S' | 'G' | 'D' | 'P' | 'T';

const sectionLetter = (line: string) => line[72] as Section;

const lineNo = (line: string) => parseInt(line.slice(74));

const igesMap = (text: string) => {
    const ret = new Map<Section, Array<string>>();
    ret.set('S', new Array<string>());
    ret.set('G', new Array<string>());
    ret.set('D', new Array<string>());
    ret.set('P', new Array<string>());
    ret.set('T', new Array<string>());
    text.split('\n')
        .filter(s => s.length === 80)
        .forEach(s => ret.get(sectionLetter(s)).push(s));
    return ret;
};

const sectionBlob = (p: {section: Section; map: Map<Section, Array<string>>}) => {
    return p.map.get(p.section).reduce((acc, line) => acc + line.slice(0, 72), '');
};

// D - directory section
// each entity takes two lines with each line (0-73) split into 10 8 character fields
// so 20 parameters per entity
/**
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
      0|      1|      2|      3|      4|      5|      6|      7|      8|      9|
     406       1       0       0       0       0       0       000010201D      1
     406       0       0       1      15                               0D      2
*/
/**
 * [0,0] Entity type
 * [0,1] parameter data pointer
 * []
 */





// const chr = (char: string, chr: string) => char === chr;

// const valEnd = (char: string) => chr(char, ',');
// const arrEnd = (char: string) => chr(char, ';');
// const h = (char: string) => chr(char, 'H');
// const digit = (char: string) => parseInt(char) != NaN;

const parseD = (rows: Array<string>) => {
    return rows
        .map((v, i, me) => {
            if (i % 2 === 0) {
                const row = parseDentity({line1: me[i], line2: me[i + 1]});
                return row;
            }
        })
        .filter(s => s);
};

const parseDentity = (p: {line1: string; line2: string}) => {
    const plen = 8;
    const pcount = 9;
    const ret = new Array<number>();
    for (let i = 0; i < pcount; i++) {
        const prop = parseDentityProp({line: p.line1, i: i, len: plen});
        ret.push(prop);
    }
    for (let i = 0; i < pcount; i++) {
        const prop = parseDentityProp({line: p.line2, i: i, len: plen});
        ret.push(prop);
    }
    return ret;
};

const parseDentityProp = (p: {line: string; i: number; len: number}) => {
    const str = p.line.slice(p.i * p.len, p.i * p.len + p.len);
    const ret = parseInt(str);
    // console.log(`"012345678" ${p.i}`)
    // console.log(`"${str}"=>${ret}`)
    return ret;
};

// strings start with number (length of string), then H and are terminated by a comma
// I'll use the length to stop the string and skip the comma
const sectionAsArrays = (chunk: string) => {
    type GLoc = 'search' | 'string';
    let loc: GLoc = 'search';
    let strLen = 0;
    let str = '';
    const ret = new Array<string>();

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
