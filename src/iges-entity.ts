import {IgesEntity} from './iges-spec';

type ParsedEntity = {
    value: string;
    position: number;
    column: number;
    hLength: number;
    entities: Array<IgesEntity>;
    lineNo: number;
    skipUntilEnd: boolean;
};

const init = <ParsedEntity>{
};

// record parsing loop, don't really need this but it's handy
export const parseEntities = (text: string) => {
    console.time('parseEntities');

    // const ret = new Array<IgesEntity>()
    const init = <ParsedEntity>{};

    //debugger;
    const ret = [...text].reduce((acc, val) => {
        return parseEntity(val, acc);
    }, init);

    console.timeEnd('parseRecords');
    //console.log(ret.records);
    //return ret.records;

    // const ret = textArray
    //     .map((v, i, me) => {
    //         if (i % 2 === 0) {
    //             const row = parseDentity({line1: me[i], line2: me[i + 1]});
    //             return row;
    //         }
    //     })
    //     .filter(s => s);

    console.timeEnd('parseEntities');
    //console.log(ret);
    return ret;
};

const parseEntity = (text: string, entity: ParsedEntity) => {

    
    return <ParsedEntity>{};
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

const parseDentity = (p: {line1: string; line2: string}) => {
    const plen = 8;
    const pcount = 10;
    const ret = new Array<string>();
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
    //const ret = parseInt(str);
    // console.log(`"012345678" ${p.i}`)
    // console.log(`"${str}"=>${ret}`)
    return str.trim();
};
