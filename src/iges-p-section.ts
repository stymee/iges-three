import {igesColumnMarkers, IgesParameterRecord} from './iges-standard';

type ParsedRecord = {
    value: string;
    column: number;
    hLength: number;
    complete: boolean;
    seqNo: string;
    records: Array<IgesParameterRecord>;
    record: IgesParameterRecord;
};

// record parsing loop, don't really need this but it's handy
export const parseParameterRecords = (text: string) => {
    console.time('parseParameterRecords');
    const init = <ParsedRecord>{
        value: '',
        column: 1,
        hLength: 0,
        complete: false,
        seqNo: '',
        records: new Array<IgesParameterRecord>(),
        record: <IgesParameterRecord>{seqNo: 0, values: new Array<string>()}
    };

    const ret = [...text].reduce((acc, val) => {
        return parseParameterRecord(val, acc);
    }, init);

    console.timeEnd('parseParameterRecords');
    return ret.records;
};

/**
 * Parser state is copied and modified based on incomming character
 * @param char single character
 * @param rec Previous ParsedRecord value
 * @returns new ParsedRecord
 */
export const parseParameterRecord = (char: string, rec: ParsedRecord): ParsedRecord => {
    // make a copy of the incomming record
    let r = {...rec};

    // the column we're actually working on
    r.column++;

    // col 1-64
    // actual data, with only hollerith strings continuing across a line (i think)
    if (r.column <= igesColumnMarkers.seqNoColumn) {

        // if we are capturing a Hollerith string and still under length,
        // this could include one of our terminators below
        if (r.hLength > 0 && r.value.length < r.hLength) {
            r.value += char;

        } else {
            // process char
            switch (char) {
                // push value
                case ',':
                    r.record.values.push(r.value);
                    r.value = '';
                    r.hLength = 0;
                    r.seqNo = '';
                    break;

                // push value and set complete to wait for seqNo
                case ';':
                    r.record.values.push(r.value);
                    r.value = '';
                    r.hLength = 0;
                    r.complete = true;
                    r.seqNo = '';
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

    // col 65-73
    // sequence number section
    else if (r.column >= igesColumnMarkers.seqNoColumn && r.column < igesColumnMarkers.sectionNo) {
        r.seqNo += char.trim();
    }

    // col 74
    // end of sequence section is beginning of section label
    else if (r.column === igesColumnMarkers.sectionNo) {
        if (r.complete) {
            r.record.seqNo = parseInt(r.seqNo);
            r.records.push(r.record);
            r.record = <IgesParameterRecord>{seqNo: 0, values: new Array<string>()};
            r.complete = false;
        }
    }

    // col 75-79
    // line number section, throw this out
    else if (r.column > igesColumnMarkers.sectionNo && r.column <= igesColumnMarkers.max) {
        // do nothing
    }

    // col 80
    // back to the beginning of a new colum
    else {
        r.column = 1;
    }

    return r;
};
