import {IgesData, parse} from './parser'

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



export const getGlobalProperty = (iges: IgesData, prop:[number, IgesType]) => {
    const [propIndex, propType] = prop;
    const [, propValue] = iges.global[0][propIndex]
    switch (propType) {
        case 'string':
            return propValue;
        case 'integer':
            return parseInt(propValue);
        case 'real':
            return parseFloat(propValue);
    }
}
/**
 * Global section array map
 * from Iges 5.3 spec page 18
 * https://shocksolution.files.wordpress.com/2017/12/iges5-3_fordownload.pdf
 * I changed it to zero based, so everything is -1
 * 
 */
type IgesType = 'string' | 'integer' | 'real'
type IGlobalProperty = [number, IgesType];

export const globalProperties = {
    ParameterDelimiterCharacter: <IGlobalProperty>[0, 'string'],
    RecordDelimiterCharacter: <IGlobalProperty>[1, 'string'],
    ProductIdentifactionFromSender: <IGlobalProperty>[2, 'string'],
    FileName: <IGlobalProperty>[3, 'string'],
    NativeSystemId: <IGlobalProperty>[4, 'string'],
    PreprocessorVersion: <IGlobalProperty>[5, 'string'],
    NumberOfBinaryBitsForIntegerRepresentation: <IGlobalProperty>[6, 'integer'],
    MaximumSinglePowerOfTenFromSender: <IGlobalProperty>[7, 'integer'],
    MaximumSingleSignificantDigitsFromSender: <IGlobalProperty>[8, 'integer'],
    MaximumDoublePowerOfTenFromSender: <IGlobalProperty>[9, 'integer'],
    MaxumumDoubleSignificantDigitsFromSender: <IGlobalProperty>[10, 'integer'],
    ProductIdentificationForReceiver: <IGlobalProperty>[11, 'integer'],
    ModelSpaceScale: <IGlobalProperty>[12, 'real'],
    UnitsFlag: <IGlobalProperty>[13, 'integer'],
    UnitsName: <IGlobalProperty>[14, 'string'],
    MaximunNumberOfLineweights: <IGlobalProperty>[15, 'integer'],
    MaximumLineweight: <IGlobalProperty>[16, 'real'],
    DateTimeOfFileGeneration: <IGlobalProperty>[17, 'string'],
    MinimumModelResolution: <IGlobalProperty>[18, 'real'],
    MaximumApproximateModelCoordinateValue: <IGlobalProperty>[19, 'real'],
    AuthorName: <IGlobalProperty>[20, 'string'],
    AuthorOrganization: <IGlobalProperty>[21, 'string'],
    IgesVersionFlat: <IGlobalProperty>[22, 'integer'],
    DraftingStandard: <IGlobalProperty>[23, 'integer'],
    DateTimeOfModelCreation: <IGlobalProperty>[24, 'string'],
    MilSpecProtocol: <IGlobalProperty>[25, 'string']
};

// interface IGlobalProperties {
//     ParameterDelimiterCharacter: [number, IgesType];
//     RecordDelimiterCharacter: [number, IgesType];
//     ProductIdentifactionFromSender: [number, IgesType];
//     FileName: [number, IgesType];
//     NativeSystemId: [number, IgesType];
//     PreprocessorVersion: [number, IgesType];
//     NumberOfBinaryBitsForIntegerRepresentation: [number, IgesType];
//     MaximumSinglePowerOfTenFromSender: [number, IgesType];
//     MaximumSingleSignificantDigitsFromSender: [number, IgesType];
//     MaximumDoublePowerOfTenFromSender: [number, IgesType];
//     MaxumumDoubleSignificantDigitsFromSender: [number, IgesType];
//     ProductIdentificationForReceiver: [number, IgesType];
//     ModelSpaceScale: [number, IgesType];
// 	UnitsFlag: [number, IgesType];
// 	UnitsName: [number, IgesType];
// 	MaximunNumberOfLineweights: [number, IgesType];
// 	MaximumLineweight: [number, IgesType];
// 	DateTimeOfFileGeneration: [number, IgesType];
// 	MinimumModelResolution: [number, IgesType];
// 	MaximumApproximateModelCoordinateValue: [number, IgesType];
// 	AuthorName: [number, IgesType];
// 	AuthorOrganization: [number, IgesType];
// 	IgesVersionFlat: [number, IgesType];
// 	DraftingStandard: [number, IgesType];
// 	DateTimeOfModelCreation: [number, IgesType];
// 	MilSpecProtocol: [number, IgesType];
// }