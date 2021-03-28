import { igesColumnMarkers, IgesGlobalRecord } from "./iges-spec";

type ParsedRecord = {
    value: string;
    position: number;
    column: number;
    hLength: number;
    props: Array<string>;
};


// record parsing loop, don't really need this but it's handy
export const parseGlobalRecords = (text: string): IgesGlobalRecord => {
    console.time('parseGlobal');
    const init = <ParsedRecord>{
        value: '',
        position: 0,
        column: 0,
        hLength: 0,
        props: new Array<string>(),
    };

    //debugger;
    const ret = [...text].reduce((acc, val) => {
        return parseGlobalRecord(val, acc);
    }, init);

    console.timeEnd('parseGlobal');
    //console.log(ret.records);
    return ret.props;
};

// record parsing function
export const parseGlobalRecord = (char: string, rec: ParsedRecord) => {
    // make a copy of the incomming record
    let r = {...rec};

    r.column++;

    // line number section, throw this out
    if (r.column >= igesColumnMarkers.sectionNo + 1 && r.column <= igesColumnMarkers.max) {
        return r;
    }

    // back to the beginning of a new colum
    if (r.column > igesColumnMarkers.max) {
        // r.lineNo++;
        //r.seqNo = '';
        // r.lookForSeqNo = false;
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
            r.props.push(r.value);
            r.value = '';
            r.hLength = 0;
            r.position = 0;
            break;

        // close record
        case ';':
            // we done!
            break;

        // Hollerith string start
        case 'H':
            r.hLength = parseInt(r.value);
            r.position = 0;
            r.value = '';
            break;
        

        // ongoing capture
        default:
            r.value += char.trim();
            break;
    }

    return r;
};
