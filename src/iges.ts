import {IgesData, parse} from './parser';

export const loadIgesFile = async (file: File): Promise<string> => {
    const perf = performance.now();
    console.log(`in loadIges, file is ${file.name}`);

    const text = await file.text();
    const iges = parse(text);

    console.log(globalProperties.AuthorName);
    console.log(getGlobalProperty(iges, globalProperties.AuthorName));
    console.log(getGlobalProperty(iges, globalProperties.MinimumModelResolution));

    return `${(performance.now() - perf).toFixed(3)} ms to load |${file.name}|`;
};

export const getGlobalProperty = (iges: IgesData, prop: [number, IgesGlobalType]) => {
    const [propIndex, propType] = prop;
    const [, propValue] = iges.global[0][propIndex];
    switch (propType) {
        case 'string':
            return propValue;
        case 'integer':
            return parseInt(propValue);
        case 'real':
            return parseFloat(propValue);
    }
};
/**
 * Global section array map
 * from Iges 5.3 spec page 18
 * https://shocksolution.files.wordpress.com/2017/12/iges5-3_fordownload.pdf
 * I changed it to zero based, so everything is -1
 */
type IgesGlobalType = 'string' | 'integer' | 'real';
type GlobalProperty = [number, IgesGlobalType];

export const globalProperties = {
    ParameterDelimiterCharacter: <GlobalProperty>[0, 'string'],
    RecordDelimiterCharacter: <GlobalProperty>[1, 'string'],
    ProductIdentifactionFromSender: <GlobalProperty>[2, 'string'],
    FileName: <GlobalProperty>[3, 'string'],
    NativeSystemId: <GlobalProperty>[4, 'string'],
    PreprocessorVersion: <GlobalProperty>[5, 'string'],
    NumberOfBinaryBitsForIntegerRepresentation: <GlobalProperty>[6, 'integer'],
    MaximumSinglePowerOfTenFromSender: <GlobalProperty>[7, 'integer'],
    MaximumSingleSignificantDigitsFromSender: <GlobalProperty>[8, 'integer'],
    MaximumDoublePowerOfTenFromSender: <GlobalProperty>[9, 'integer'],
    MaxumumDoubleSignificantDigitsFromSender: <GlobalProperty>[10, 'integer'],
    ProductIdentificationForReceiver: <GlobalProperty>[11, 'integer'],
    ModelSpaceScale: <GlobalProperty>[12, 'real'],
    UnitsFlag: <GlobalProperty>[13, 'integer'],
    UnitsName: <GlobalProperty>[14, 'string'],
    MaximunNumberOfLineweights: <GlobalProperty>[15, 'integer'],
    MaximumLineweight: <GlobalProperty>[16, 'real'],
    DateTimeOfFileGeneration: <GlobalProperty>[17, 'string'],
    MinimumModelResolution: <GlobalProperty>[18, 'real'],
    MaximumApproximateModelCoordinateValue: <GlobalProperty>[19, 'real'],
    AuthorName: <GlobalProperty>[20, 'string'],
    AuthorOrganization: <GlobalProperty>[21, 'string'],
    IgesVersionFlat: <GlobalProperty>[22, 'integer'],
    DraftingStandard: <GlobalProperty>[23, 'integer'],
    DateTimeOfModelCreation: <GlobalProperty>[24, 'string'],
    MilSpecProtocol: <GlobalProperty>[25, 'string']
};


/**
 * Directory Entry section array map
 * from Iges 5.3 spec page 24
 * https://shocksolution.files.wordpress.com/2017/12/iges5-3_fordownload.pdf
 * I changed it to zero based, so everything is -1
 */
type IgesDirectoryType = 'integer' | 'pointer' | 'integerpointer' | 'zeropointer' | 'string'
type DirectoryProperty = {index: number, line: number, column: number, dType: IgesDirectoryType};

export const directoryProperties = {
    entityType: <DirectoryProperty>{index: 0, line: 1, column: 1, dType: 'integer'},
    parameterData: <DirectoryProperty>{index: 1, line: 1, column: 9, dType: 'pointer'},
    structure: <DirectoryProperty>{index: 2, line: 1, column: 17, dType: 'integerpointer'},
    lineFontPattern: <DirectoryProperty>{index: 3, line: 1, column: 25, dType: 'integerpointer'},
    level: <DirectoryProperty>{index: 4, line: 1, column: 33, dType: 'integerpointer'},
    view: <DirectoryProperty>{index: 5, line: 1, column: 41, dType: 'zeropointer'},
    transformationMatrix: <DirectoryProperty>{index: 6, line: 1, column: 49, dType: 'zeropointer'},
    labelDisplayAssoc: <DirectoryProperty>{index: 7, line: 1, column: 57, dType: 'zeropointer'},
    status: <DirectoryProperty>{index: 8, line: 1, column: 65, dType: 'string'},
    sequence: <DirectoryProperty>{index: 9, line: 1, column: 73, dType: 'integer'},
    // skip second entityType at start of second line
    lineWeight: <DirectoryProperty>{index: 11, line: 2, column: 9, dType: 'integer'},
    color: <DirectoryProperty>{index: 12, line: 2, column: 17, dType: 'integerpointer'},
    parameterLineCount: <DirectoryProperty>{index: 13, line: 2, column: 25, dType: 'integer'},
    form: <DirectoryProperty>{index: 14, line: 2, column: 33, dType: 'integer'},
    // skip 2 reserved fields at 15 and 16
    label: <DirectoryProperty>{index: 17, line: 2, column: 57, dType: 'string'},
    subscript: <DirectoryProperty>{index: 18, line: 2, column: 65, dType: 'integer'}
};
