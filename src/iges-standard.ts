export type IgesData = {
    rawMap: Map<Section, Array<string>>;
    global: IgesGlobalRecord;
    entities: Array<IgesEntity>;
    parameters: Array<IgesParameterRecord>;
};

export type Section = 'S' | 'G' | 'D' | 'P' | 'T';

export const igesColumnMarkers = {
    seqNoColumn: 66,
    sectionNo: 74,
    max: 80
};


/**
 * Global section
 * from Iges 5.3 spec page 18
 * https://shocksolution.files.wordpress.com/2017/12/iges5-3_fordownload.pdf
 */
export type IgesGlobalPropertyType = 'string' | 'integer' | 'real';
export type IgesGlobalProperty = {index: number; propertyType: IgesGlobalPropertyType; value: string};

export type IgesGlobalRecord = {
    ParameterDelimiterCharacter: IgesGlobalProperty;
    RecordDelimiterCharacter: IgesGlobalProperty;
    ProductIdentifactionFromSender: IgesGlobalProperty;
    FileName: IgesGlobalProperty;
    NativeSystemId: IgesGlobalProperty;
    PreprocessorVersion: IgesGlobalProperty;
    NumberOfBinaryBitsForIntegerRepresentation: IgesGlobalProperty;
    MaximumSinglePowerOfTenFromSender: IgesGlobalProperty;
    MaximumSingleSignificantDigitsFromSender: IgesGlobalProperty;
    MaximumDoublePowerOfTenFromSender: IgesGlobalProperty;
    MaxumumDoubleSignificantDigitsFromSender: IgesGlobalProperty;
    ProductIdentificationForReceiver: IgesGlobalProperty;
    ModelSpaceScale: IgesGlobalProperty;
    UnitsFlag: IgesGlobalProperty;
    UnitsName: IgesGlobalProperty;
    MaximunNumberOfLineweights: IgesGlobalProperty;
    MaximumLineweight: IgesGlobalProperty;
    DateTimeOfFileGeneration: IgesGlobalProperty;
    MinimumModelResolution: IgesGlobalProperty;
    MaximumApproximateModelCoordinateValue: IgesGlobalProperty;
    AuthorName: IgesGlobalProperty;
    AuthorOrganization: IgesGlobalProperty;
    IgesVersionFlat: IgesGlobalProperty;
    DraftingStandard: IgesGlobalProperty;
    DateTimeOfModelCreation: IgesGlobalProperty;
    MilSpecProtocol: IgesGlobalProperty;
};

export const defaultGlobalRecord = () => {
    return <IgesGlobalRecord>{
        ParameterDelimiterCharacter: <IgesGlobalProperty>{index: 0, propertyType: 'string', value: ''},
        RecordDelimiterCharacter: <IgesGlobalProperty>{index: 1, propertyType: 'string', value: ''},
        ProductIdentifactionFromSender: <IgesGlobalProperty>{index: 2, propertyType: 'string', value: ''},
        FileName: <IgesGlobalProperty>{index: 3, propertyType: 'string', value: ''},
        NativeSystemId: <IgesGlobalProperty>{index: 4, propertyType: 'string', value: ''},
        PreprocessorVersion: <IgesGlobalProperty>{index: 5, propertyType: 'string', value: ''},
        NumberOfBinaryBitsForIntegerRepresentation: <IgesGlobalProperty>{index: 6, propertyType: 'integer', value: ''},
        MaximumSinglePowerOfTenFromSender: <IgesGlobalProperty>{index: 7, propertyType: 'integer', value: ''},
        MaximumSingleSignificantDigitsFromSender: <IgesGlobalProperty>{index: 8, propertyType: 'integer', value: ''},
        MaximumDoublePowerOfTenFromSender: <IgesGlobalProperty>{index: 9, propertyType: 'integer', value: ''},
        MaxumumDoubleSignificantDigitsFromSender: <IgesGlobalProperty>{index: 10, propertyType: 'integer', value: ''},
        ProductIdentificationForReceiver: <IgesGlobalProperty>{index: 11, propertyType: 'integer', value: ''},
        ModelSpaceScale: <IgesGlobalProperty>{index: 12, propertyType: 'real', value: ''},
        UnitsFlag: <IgesGlobalProperty>{index: 13, propertyType: 'integer', value: ''},
        UnitsName: <IgesGlobalProperty>{index: 14, propertyType: 'string', value: ''},
        MaximunNumberOfLineweights: <IgesGlobalProperty>{index: 15, propertyType: 'integer', value: ''},
        MaximumLineweight: <IgesGlobalProperty>{index: 16, propertyType: 'real', value: ''},
        DateTimeOfFileGeneration: <IgesGlobalProperty>{index: 17, propertyType: 'string', value: ''},
        MinimumModelResolution: <IgesGlobalProperty>{index: 18, propertyType: 'real', value: ''},
        MaximumApproximateModelCoordinateValue: <IgesGlobalProperty>{index: 19, propertyType: 'real', value: ''},
        AuthorName: <IgesGlobalProperty>{index: 20, propertyType: 'string', value: ''},
        AuthorOrganization: <IgesGlobalProperty>{index: 21, propertyType: 'string', value: ''},
        IgesVersionFlat: <IgesGlobalProperty>{index: 22, propertyType: 'integer', value: ''},
        DraftingStandard: <IgesGlobalProperty>{index: 23, propertyType: 'integer', value: ''},
        DateTimeOfModelCreation: <IgesGlobalProperty>{index: 24, propertyType: 'string', value: ''},
        MilSpecProtocol: <IgesGlobalProperty>{index: 25, propertyType: 'string', value: ''}
    };
};

// export const getGlobalProperty = (iges: IgesData, prop: [number, IgesGlobalPropertyType]) => {
//     const [propIndex, propType] = prop;
//     const propValue = iges.global[propIndex];
//     switch (propType) {
//         case 'string':
//             return propValue;
//         case 'integer':
//             return parseInt(propValue);
//         case 'real':
//             return parseFloat(propValue);
//     }
// };

/**
 * Directory Entry section (or Entities)
 * from Iges 5.3 spec page 24
 * https://shocksolution.files.wordpress.com/2017/12/iges5-3_fordownload.pdf
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

export const defaultEntity = () => {
    return <IgesEntity>{
        entityType: <IgesEntityProperty>{index: 0, line: 1, column: 1, dType: 'integer', value: ''},
        parameterData: <IgesEntityProperty>{index: 1, line: 1, column: 9, dType: 'pointer', value: ''},
        structure: <IgesEntityProperty>{index: 2, line: 1, column: 17, dType: 'integerpointer', value: ''},
        lineFontPattern: <IgesEntityProperty>{index: 3, line: 1, column: 25, dType: 'integerpointer', value: ''},
        level: <IgesEntityProperty>{index: 4, line: 1, column: 33, dType: 'integerpointer', value: ''},
        view: <IgesEntityProperty>{index: 5, line: 1, column: 41, dType: 'zeropointer', value: ''},
        transformationMatrix: <IgesEntityProperty>{index: 6, line: 1, column: 49, dType: 'zeropointer', value: ''},
        labelDisplayAssoc: <IgesEntityProperty>{index: 7, line: 1, column: 57, dType: 'zeropointer', value: ''},
        status: <IgesEntityProperty>{index: 8, line: 1, column: 65, dType: 'string', value: ''},
        sequence: <IgesEntityProperty>{index: 9, line: 1, column: 74, dType: 'integer', value: ''},
        // skip second entityType at start of second line
        lineWeight: <IgesEntityProperty>{index: 11, line: 2, column: 9, dType: 'integer', value: ''},
        color: <IgesEntityProperty>{index: 12, line: 2, column: 17, dType: 'integerpointer', value: ''},
        parameterLineCount: <IgesEntityProperty>{index: 13, line: 2, column: 25, dType: 'integer', value: ''},
        form: <IgesEntityProperty>{index: 14, line: 2, column: 33, dType: 'integer', value: ''},
        // skip 2 reserved fields at 15 and 16
        label: <IgesEntityProperty>{index: 17, line: 2, column: 57, dType: 'string', value: ''},
        subscript: <IgesEntityProperty>{index: 18, line: 2, column: 65, dType: 'integer', value: ''}
    };
};


/**
 * Parameter Data section
 * from Iges 5.3 spec page 32
 * https://shocksolution.files.wordpress.com/2017/12/iges5-3_fordownload.pdf
 */
export type IgesParameterRecord = {seqNo: number; values: Array<string>};

