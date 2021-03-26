export const loadIgesFile = async (file: File): Promise<string> => {
    console.log(`in loadIges, file is ${file.name}`);

    const text = await file.text();
    console.time('rip');
    const data = getMap(text);
    console.timeEnd('rip');
    
    console.log(data)

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

const getSection = (line: string) => line[72] as Section;

const getLineNo = (line: string) => parseInt(line.slice(74))

const getMap = (text: string) => {
    const ret = new Map<Section, Array<string>>();
    ret.set('S', new Array<string>());
    ret.set('G', new Array<string>());
    ret.set('D', new Array<string>());
    ret.set('P', new Array<string>());
    ret.set('T', new Array<string>());
    text.split('\n')
        .filter(s => s.length === 80)
        .forEach(s => ret.get(getSection(s)).push(s));
    return ret;
}


