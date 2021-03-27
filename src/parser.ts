type Section = 'S' | 'G' | 'D' | 'P' | 'T';

//const lineNo = (line: string) => parseInt(line.slice(74));

const columns = {
	sectionNo: 72,
	max: 80
}

export const parse = (text: string): any[] => {
    const ret = [];
    const imap = igesMap(text);

    const g = parseRecords(imap.get('G').join(''));
    ret.push(g);

    return ret;
};

const sectionLetter = (line: string) => line[columns.sectionNo] as Section;
const igesMap = (text: string) => {
    const ret = new Map<Section, Array<string>>();
    ret.set('S', new Array<string>());
    ret.set('G', new Array<string>());
    ret.set('D', new Array<string>());
    ret.set('P', new Array<string>());
    ret.set('T', new Array<string>());
    text.split('\n')
        .filter(s => s.length === columns.max)
        .forEach(s => ret.get(sectionLetter(s)).push(s));
    return ret;
};

const parseRecords = (text: string) => {
    console.time('parseRecords');
    const init = <ParsedRecord>{
        value: '',
        position: 0,
        column: 0,
        hLength: 0,
        record: new Array<Array<[number, string]>>(),
        prop: new Array<[number, string]>(),
		lineNo: 1
    };

    const records = [...text].reduce((acc, val) => {
        return parseRecord(val, acc);
    }, init);

    console.timeEnd('parseRecords');
    console.log(records.record);
    return records;
};

type ParsedRecord = {
    value: string;
    position: number;
    column: number;
    hLength: number;
    record: Array<Array<[number, string]>>;
    prop: Array<[number, string]>;
	lineNo: number;
};

const parseRecord = (char: string, rec: ParsedRecord) => {
	// make a copy of the incomming record
    let r = {...rec};

    r.column++;

    // line number section, throw this out
    if (r.column >= columns.sectionNo + 1 && r.column <= columns.max) {
        return r;
    }

    // back to the beginning of a new colum
    if (r.column > columns.max) {
		r.lineNo ++;
        r.column = 1;
    }

    // if our captured string is at Hollerith length
    if (r.position >= r.hLength) {
        r.hLength = 0;
    }

    // we are capturing a Hollerith string and still under length,
    //  capture more and continue
    if (r.hLength > 0 && r.position <= r.hLength) {
        r.value += char;
        r.position++;
        return r;
    }

    switch (char) {
        // close prop and push to record
        case ',':
            r.prop.push([r.lineNo, r.value]);
            r.value = '';
            r.hLength = 0;
            r.position = 0;
            break;

        // close record
        case ';':
            if (r.value !== '') {
                r.prop.push([r.lineNo, r.value]);
            }
            r.record.push(r.prop);
            r.value = '';
            r.hLength = 0;
            r.position = 0;
            break;

        // Hollerith string start
        case 'H':
            r.hLength = parseInt(r.value);
            r.position = 0;
            r.value = '';
            break;

        // ongoing capture
        default:
            r.value += char !== ' ' ? char : '';
            r.position++;
            break;
    }

    return r;
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

// const parseD = (rows: Array<string>) => {
//     return rows
//         .map((v, i, me) => {
//             if (i % 2 === 0) {
//                 const row = parseDentity({line1: me[i], line2: me[i + 1]});
//                 return row;
//             }
//         })
//         .filter(s => s);
// };

// const parseDentity = (p: {line1: string; line2: string}) => {
//     const plen = 8;
//     const pcount = 9;
//     const ret = new Array<number>();
//     for (let i = 0; i < pcount; i++) {
//         const prop = parseDentityProp({line: p.line1, i: i, len: plen});
//         ret.push(prop);
//     }
//     for (let i = 0; i < pcount; i++) {
//         const prop = parseDentityProp({line: p.line2, i: i, len: plen});
//         ret.push(prop);
//     }
//     return ret;
// };

// const parseDentityProp = (p: {line: string; i: number; len: number}) => {
//     const str = p.line.slice(p.i * p.len, p.i * p.len + p.len);
//     const ret = parseInt(str);
//     // console.log(`"012345678" ${p.i}`)
//     // console.log(`"${str}"=>${ret}`)
//     return ret;
// };
