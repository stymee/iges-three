import { IgesEntity } from "./iges-spec";

// record parsing loop, don't really need this but it's handy
export const parseEntities = (textArray: Array<string>) => {
    console.time('parseEntities');

    const ret = textArray
        .map((v, i, me) => {
            if (i % 2 === 0) {
                const row = parseDentity({line1: me[i], line2: me[i + 1]});
                return row;
            }
        })
        .filter(s => s);

    console.timeEnd('parseDirectories');
    console.log(ret);
    return new Array<IgesEntity>();
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
