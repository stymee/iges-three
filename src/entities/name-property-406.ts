import {IgesData} from '../iges/iges-standard';

export const nameProperty = (seqNo: number | string, iges: IgesData) => {
	let seq = typeof(seqNo) === 'number' ? seqNo : parseInt(seqNo);
	if (seq <= 0) {
		return '';
	}
    const parameters = iges.parameters.find(s => s.seqNo === seq);
	console.log(parameters);
	debugger;
    return parameters[2];
};

// form properties
// page 448 !!

// 4.111 Name Property (Form 15)
// This property attaches a string which specifies a user-defined name. It can be used for any entity ECO630
// that does not have a name explicitly specified in the parameter data for the entity.
// Directory Entry
// Note: The Level shall be ignored if this property is subordinate (see Sections 4.97 and 1.6.1).
// Parameter Data
// Index Name Type Description
// 1 NP Integer Number of property values (NP=l)
// 2 NAME String Entity Name
