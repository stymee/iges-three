export type IgesData = {
    rawMap: Map<Section, Array<string>>;
    global: Array<IgesRecord>;
    entities: Array<IgesEntity>;
    parameters: Array<IgesRecord>;
};

export type IgesProp = [number, string];
export type IgesRecord = Array<IgesProp>;

export type Section = 'S' | 'G' | 'D' | 'P' | 'T';

export const igesColumnMarkers = {
    sectionNo: 72,
    max: 80
};

/**
 * Global section array map
 * from Iges 5.3 spec page 18
 * https://shocksolution.files.wordpress.com/2017/12/iges5-3_fordownload.pdf
 * I changed it to zero based, so everything is -1
 */
export type IgesGlobalPropertyType = 'string' | 'integer' | 'real';
export type IgesGlobalProperty = [number, IgesGlobalPropertyType];

export const globalProperties = {
    ParameterDelimiterCharacter: <IgesGlobalProperty>[0, 'string'],
    RecordDelimiterCharacter: <IgesGlobalProperty>[1, 'string'],
    ProductIdentifactionFromSender: <IgesGlobalProperty>[2, 'string'],
    FileName: <IgesGlobalProperty>[3, 'string'],
    NativeSystemId: <IgesGlobalProperty>[4, 'string'],
    PreprocessorVersion: <IgesGlobalProperty>[5, 'string'],
    NumberOfBinaryBitsForIntegerRepresentation: <IgesGlobalProperty>[6, 'integer'],
    MaximumSinglePowerOfTenFromSender: <IgesGlobalProperty>[7, 'integer'],
    MaximumSingleSignificantDigitsFromSender: <IgesGlobalProperty>[8, 'integer'],
    MaximumDoublePowerOfTenFromSender: <IgesGlobalProperty>[9, 'integer'],
    MaxumumDoubleSignificantDigitsFromSender: <IgesGlobalProperty>[10, 'integer'],
    ProductIdentificationForReceiver: <IgesGlobalProperty>[11, 'integer'],
    ModelSpaceScale: <IgesGlobalProperty>[12, 'real'],
    UnitsFlag: <IgesGlobalProperty>[13, 'integer'],
    UnitsName: <IgesGlobalProperty>[14, 'string'],
    MaximunNumberOfLineweights: <IgesGlobalProperty>[15, 'integer'],
    MaximumLineweight: <IgesGlobalProperty>[16, 'real'],
    DateTimeOfFileGeneration: <IgesGlobalProperty>[17, 'string'],
    MinimumModelResolution: <IgesGlobalProperty>[18, 'real'],
    MaximumApproximateModelCoordinateValue: <IgesGlobalProperty>[19, 'real'],
    AuthorName: <IgesGlobalProperty>[20, 'string'],
    AuthorOrganization: <IgesGlobalProperty>[21, 'string'],
    IgesVersionFlat: <IgesGlobalProperty>[22, 'integer'],
    DraftingStandard: <IgesGlobalProperty>[23, 'integer'],
    DateTimeOfModelCreation: <IgesGlobalProperty>[24, 'string'],
    MilSpecProtocol: <IgesGlobalProperty>[25, 'string']
};

/**
 * Directory Entry section array map
 * from Iges 5.3 spec page 24
 * https://shocksolution.files.wordpress.com/2017/12/iges5-3_fordownload.pdf
 * I changed it to zero based, so everything is -1
 */
export type IgesEntityPropertyType = 'integer' | 'pointer' | 'integerpointer' | 'zeropointer' | 'string';
export type IgesEntityProperty = {
    index: number;
    line: number;
    column: number;
    dType: IgesEntityPropertyType;
    value: string;
};
export type IgesEntity = {
    entityType: IgesEntityProperty;
    parameterData: IgesEntityProperty;
    structure: IgesEntityProperty;
    lineFontPattern: IgesEntityProperty;
    level: IgesEntityProperty;
    view: IgesEntityProperty;
    transformationMatrix: IgesEntityProperty;
    labelDisplayAssoc: IgesEntityProperty;
    status: IgesEntityProperty;
    sequence: IgesEntityProperty;
    lineWeight: IgesEntityProperty;
    color: IgesEntityProperty;
    parameterLineCount: IgesEntityProperty;
    form: IgesEntityProperty;
    label: IgesEntityProperty;
    subscript: IgesEntityProperty;
};

export const defaultEntityProperties = {
    entityType: <IgesEntityProperty>{index: 0, line: 1, column: 1, dType: 'integer', value: ''},
    parameterData: <IgesEntityProperty>{index: 1, line: 1, column: 9, dType: 'pointer', value: ''},
    structure: <IgesEntityProperty>{index: 2, line: 1, column: 17, dType: 'integerpointer', value: ''},
    lineFontPattern: <IgesEntityProperty>{index: 3, line: 1, column: 25, dType: 'integerpointer', value: ''},
    level: <IgesEntityProperty>{index: 4, line: 1, column: 33, dType: 'integerpointer', value: ''},
    view: <IgesEntityProperty>{index: 5, line: 1, column: 41, dType: 'zeropointer', value: ''},
    transformationMatrix: <IgesEntityProperty>{index: 6, line: 1, column: 49, dType: 'zeropointer', value: ''},
    labelDisplayAssoc: <IgesEntityProperty>{index: 7, line: 1, column: 57, dType: 'zeropointer', value: ''},
    status: <IgesEntityProperty>{index: 8, line: 1, column: 65, dType: 'string', value: ''},
    sequence: <IgesEntityProperty>{index: 9, line: 1, column: 73, dType: 'integer', value: ''},
    // skip second entityType at start of second line
    lineWeight: <IgesEntityProperty>{index: 11, line: 2, column: 9, dType: 'integer', value: ''},
    color: <IgesEntityProperty>{index: 12, line: 2, column: 17, dType: 'integerpointer', value: ''},
    parameterLineCount: <IgesEntityProperty>{index: 13, line: 2, column: 25, dType: 'integer', value: ''},
    form: <IgesEntityProperty>{index: 14, line: 2, column: 33, dType: 'integer', value: ''},
    // skip 2 reserved fields at 15 and 16
    label: <IgesEntityProperty>{index: 17, line: 2, column: 57, dType: 'string', value: ''},
    subscript: <IgesEntityProperty>{index: 18, line: 2, column: 65, dType: 'integer', value: ''}
};
