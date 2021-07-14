import { useCallback } from 'preact/hooks';
import { useState } from 'react';


export default (defaultChecked?: boolean) => {
	
	const [checked, setChecked] = useState(defaultChecked || false);

	const handleToggle = useCallback(() => {
		setChecked(!checked);
	}, [checked]);
	
	const handleOn = useCallback(() => {
		setChecked(true);
	}, [checked]);

	const handleOff = useCallback(() => {
		setChecked(false);
	}, [checked]);

	return { checked, handleToggle, handleOn, handleOff };
}