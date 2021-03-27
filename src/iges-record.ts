import { igesColumnMarkers, IgesProp, IgesRecord } from "./iges-spec";

type ParsedRecord = {
    value: string;
    position: number;
    column: number;
    hLength: number;
    records: Array<IgesRecord>;
    props: Array<IgesProp>;
    lineNo: number;
};


// record parsing loop, don't really need this but it's handy
export const parseRecords = (text: string) => {
    console.time('parseRecords');
    const init = <ParsedRecord>{
        value: '',
        position: 0,
        column: 0,
        hLength: 0,
        records: new Array<Array<[number, string]>>(),
        props: new Array<[number, string]>(),
        lineNo: 1
    };

    const ret = [...text].reduce((acc, val) => {
        return parseRecord(val, acc);
    }, init);

    console.timeEnd('parseRecords');
    //console.log(ret.records);
    return ret.records;
};

// record parsing function
export const parseRecord = (char: string, rec: ParsedRecord) => {
    // make a copy of the incomming record
    let r = {...rec};

    r.column++;

    // line number section, throw this out
    if (r.column >= igesColumnMarkers.sectionNo + 1 && r.column <= igesColumnMarkers.max) {
        return r;
    }

    // back to the beginning of a new colum
    if (r.column > igesColumnMarkers.max) {
        r.lineNo++;
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
            r.props.push([r.lineNo, r.value]);
            r.value = '';
            r.hLength = 0;
            r.position = 0;
            break;

        // close record
        case ';':
            if (r.value !== '') {
                // need this for the spaces after a semi-colon
                r.props.push([r.lineNo, r.value]);
            }
            r.records.push(r.props);
            r.props = new Array<[number, string]>();
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
