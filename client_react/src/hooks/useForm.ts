import { useCallback, useRef, useState } from 'react';
import { RegisterForm } from 'types';
import formUtil from '~/utils/formUtil';


export default (registers: RegisterForm[]) => {
	const formRef = useRef<HTMLFormElement>(null);
	const [values, setValues] = useState<{[x:string]: string}>({});
	const [errors, setErrors] = useState<{[x:string]: string}>({});

	const onChange = useCallback((name: string, value: string) => {
		setValues({ ...values, [name]: value });
	}, [values]);

	const handleSubmit: (callback: Function) => React.FormEventHandler<HTMLFormElement> = useCallback(callback => e => {
		e.preventDefault();
		const { isValid, focusTarget, tempErrs } = formUtil.getErrors(registers, values);
		setErrors(tempErrs);
		if (!isValid) {
			(formRef.current?.querySelector(`input[name=${focusTarget}]`) as HTMLInputElement)?.focus();
			return;
		}
		callback();
	}, [registers, values, formRef.current]);

	return { values, errors, formRef, onChange, handleSubmit }
}