import { RegisterForm, ValidOption } from "types";

const getRegisterFormValues: (registerForms: RegisterForm[]) => {[x:string]: string} = (registerForms) => {
	return registerForms.reduce((prev, curr) => {
		return { ...prev, [curr.name]: curr.init || '' };
	}, {});
}

/**
 * input value에 에러가 존재하는지 체크하고 가장 먼저 발견 된 에러 타입을 반환합니다.
 */
 const getErrorType = (validOption: ValidOption, inputValue: string | undefined) => {
	const value = inputValue?.trim() || '';
	const { required, maxLength, pattern } = validOption;
	if (required && !value) {
		return 'required';

	} else if (maxLength && value.length > maxLength) {
		return 'maxLength';

	} else if (pattern && !pattern.test(value)) {
		return 'pattern';
	}	
}

/**
 * 등록 된 input 들에 에러가 존재하는지 체크하고, 어떤 에러가 포착 됐는지, 포커스 돼야 할 input의 name이 무엇인지 반환합니다. 
 */
const getErrors = (registers: RegisterForm[], values: {[x:string]: string}) => {
	let focusTarget = '';
	let tempErrs = {};
	for (const register of registers) {
		const errType = getErrorType(register, values[register.name]);
		if (errType) {
			if (!focusTarget) focusTarget = register.name;
			tempErrs = {...tempErrs, [register.name]: errType};
		}
	}
	return { isValid: !focusTarget, focusTarget, tempErrs }
}


export default {
	getRegisterFormValues,
	getErrors,
}