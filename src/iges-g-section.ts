import {igesColumnMarkers, IgesGlobalRecord} from './iges-standard';

type ParsedRecord = {
    value: string;
    column: number;
    hLength: number;
    record: IgesGlobalRecord;
};

// record parsing loop, don't really need this but it's handy
export const parseGlobalRecords = (text: string) => {
    console.time('parseGlobalRecord');
    const init = <ParsedRecord>{
        value: '',
        column: 1,
        hLength: 0,
        record: new Array<string>()
    };

    const ret = [...text].reduce((acc, val) => {
        return parseGlobalRecord(val, acc);
    }, init);

    console.timeEnd('parseGlobalRecord');
    return ret.record;
};

/**
 * Parser state is copied and modified based on incomming character
 * @param char single character
 * @param rec Previous ParsedRecord value
 * @returns new ParsedRecord
 */
export const parseGlobalRecord = (char: string, rec: ParsedRecord): ParsedRecord => {
    // make a copy of the incomming record
    let r = {...rec};

    // the column we're actually working on
    r.column++;

    // col 1-73
    // actual data, with only hollerith strings continuing across a line (i think)
    if (r.column < igesColumnMarkers.sectionNo) {
        // if we are capturing a Hollerith string and still under length,
        // this could include one of our terminators below
        if (r.hLength > 0 && r.value.length < r.hLength) {
            r.value += char;
        } else {
            // process char
            switch (char) {
                // push value
                case ',':
                case ';':
                    r.record.push(r.value);
                    r.value = '';
                    r.hLength = 0;
                    break;

                // Hollerith string start
                case 'H':
                    r.hLength = parseInt(r.value);
                    r.value = '';
                    break;

                // ongoing capture
                default:
                    r.value += char.trim();
                    break;
            }
        }
    }

    // col 74-79
    // section label thru line number section, throw this out
    else if (r.column >= igesColumnMarkers.sectionNo && r.column <= igesColumnMarkers.max) {
        // do nothing
    }

    // col 80
    // back to the beginning of a new colum
    else {
        r.column = 1;
    }

    return r;
};
