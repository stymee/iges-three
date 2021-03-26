export const loadIgesFile = async (file: File): Promise<string> => {
    console.log(`in loadIges, file is ${file.name}`);

    console.time('rip');
    for (let line of await (await file.text()).split('\n')) {
        let section = line[72] as Section;
        const lineNo = parseInt(line.slice(73));
        switch (section) {
            case 'S':
				debugger;
                break;
            case 'G':
                break;
            case 'D':
                break;
            case 'P':
                break;
            case 'T':
                break;
        }
        console.log(`section:${section} = ${sectionNames[section]}, #:${lineNo}`);
		if (section === 'T') break;
    }
    console.timeEnd('rip');

    //console.log(getNextCharUntilNewLine({start: 0, loc: 0, arr: contents}));

    return `Loaded ${file.name}`;
};

type Section = 'S' | 'G' | 'D' | 'P' | 'T';

const sectionNames = {
	S:'Start',
	G:'Global',
	D:'Directory Entry',
	P:'Parameter Data',
	T:'Terminate'
}


// just an attempt at some recursive line ripping
// files are small so a straight up read is fine
const getNextCharUntilNewLine = (params: {start: number; loc: number; arr: Uint8Array}) => {
    if (params.arr[params.loc + 1] !== 10) {
        return getNextCharUntilNewLine({start: params.start, loc: params.loc + 1, arr: params.arr});
    } else {
        let line = new TextDecoder().decode(params.arr.slice(params.start, params.loc));
        return line;
    }
};
