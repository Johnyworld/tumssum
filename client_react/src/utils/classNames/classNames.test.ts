import { c, replaceDefaultClassName } from '.';

test('it should replace from "&" to default classname', () => {
	expect(replaceDefaultClassName('name', '&--modifier')).toEqual('name--modifier');
	expect(replaceDefaultClassName('name', '--modifier')).toEqual('--modifier');
	expect(replaceDefaultClassName('name', '-&--modifier')).toEqual('-&--modifier');
	expect(replaceDefaultClassName('name', '')).toEqual('');
})

test('it should build the classname from classname conditions', () => {
	const classNames = c( 'name', '', '&--mod', [true, '&--mod2'], [false, '&--mod3'])
	expect(classNames).toEqual('name name--mod name--mod2');

	const noDefaultClassName = c( '', '&--mod' );
	expect(noDefaultClassName).toEqual('&--mod');
})
