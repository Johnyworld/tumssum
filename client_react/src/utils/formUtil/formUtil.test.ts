import formUtil from '.';
import { regEmail } from '../regex';

const registerForms = [
	{ name: 'name', required: true, maxLength: 20 },
	{ name: 'email', required: true, pattern: regEmail },
]

test('no values', () => {
	const values = { name: '', email: '' };
	const { isValid, focusTarget, tempErrs } = formUtil.getErrors(registerForms, values);
	expect(isValid).toBeFalsy();
	expect(focusTarget).toEqual('name');
	expect(tempErrs).toEqual({ name: 'required', email: 'required' });
});

test('too long name and not email value', () => {
	const values = { name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', email: 'My email?' };
	const { isValid, focusTarget, tempErrs } = formUtil.getErrors(registerForms, values);
	expect(isValid).toBeFalsy();
	expect(focusTarget).toEqual('name');
	expect(tempErrs).toEqual({ name: 'maxLength', email: 'pattern' });
});

test('good values', () => {
	const values = { name: 'Tom', email: 'email@example.com' };
	const { isValid, focusTarget, tempErrs } = formUtil.getErrors(registerForms, values);
	expect(isValid).toBeTruthy();
	expect(focusTarget).toEqual('');
	expect(tempErrs).toEqual({ });
});
