import { useCallback } from 'preact/hooks';
import { useState } from 'react';

export default <S>() => {

	const [selectedItem, setSelectedItem] = useState<null | S>(null);
	
	const handleSelectItem = useCallback((data: S) => () => {
		setSelectedItem(data);
	}, []);

	const handleClearSelectedItem = useCallback(() => {
		setSelectedItem(null);
	}, []);
	
	return { selectedItem, handleSelectItem, handleClearSelectedItem };
}