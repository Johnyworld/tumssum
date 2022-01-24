import { useCallback, useRef, useState } from 'react';
import { RegisterForm } from 'types';
import formUtil from '~/utils/formUtil';


export default function useForm (registers: RegisterForm[]) {
	const formRef = useRef<HTMLFormElement>(null);
	const [values, setValues] = useState<{[x:string]: string}>(formUtil.getRegisterFormValues(registers));
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
	}, [registers, values]);

	return { values, errors, formRef, onChange, handleSubmit }
}
