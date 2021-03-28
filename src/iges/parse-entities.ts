import {defaultEntity} from './iges-standard';

// record parsing loop, don't really need this but it's handy
export const parseDirectoryEntities = (textArray: Array<string>) => {
    // console.time('parseDirectoryEntities');

    const ret = textArray
        .map((_v, i, arr) => {
            if (i % 2 === 0) {
                return parseEntity(arr[i] + arr[i+1]);
            }
        })
        .filter(s => s);

    // console.timeEnd('parseDirectoryEntities');
    return ret;
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

const parseEntity = (text: string) => {
    // get a standard entity
    const ret = defaultEntity();

    Object.entries(ret).forEach((v) => {
        const [key, obj] = v;
        // ToDo: this is a little hacky, but oh well
        //  I can either set the column start in the default object after the section
        //  or chop off the leading character
        const len = key === 'sequence' ? 7 : 8;
        const start = (obj.line - 1) * 80 + obj.column - 1;
        const stop = start + len;
        obj.value = text.slice(start, stop).trim();
    })

    return ret;
};
