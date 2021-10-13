import { useCallback } from 'preact/hooks';
import { useState } from 'react';

export interface UseListReturns<S> {
	list: S[];
}

export default <S>(initialList?: S[]) => {
	
	const [list, setList] = useState<S[]>(initialList || []);

	const handleUpdate = useCallback((index: number, newData: S) => {
		const tempList = list;
		tempList[index] = { ...tempList[index], ...newData };
		setList(tempList);
	}, [list]);

	const handleAdd = useCallback((newData: S) => {
		setList([ ...list, newData ]);
	}, [list])

	const handleRemove = useCallback((index?: number) => {
		if (!index) return;
		const tempList = list;
		tempList.splice(index, 1);
		setList(tempList);
	}, [list])

	return { list, setList, handleUpdate, handleAdd, handleRemove };
}
