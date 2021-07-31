import { useState } from 'react';

export interface UseListReturns<S> {
	list: S[];
}

export default <S>(initialList?: S[]) => {
	
	const [list, setList] = useState<S[]>(initialList || []);

	const handleUpdate = (index: number, newData: S) => {
		const tempList = list;
		tempList[index] = { ...tempList[index], ...newData };
		setList(tempList);
	}

	const handleAdd = (newData: S) => {
		setList([ ...list, newData ]);
	}

	const handleRemove = (index?: number) => {
		if (!index) return;
		const tempList = list;
		tempList.splice(index, 1);
		setList(tempList);
	}

	return { list, setList, handleUpdate, handleAdd, handleRemove };
}
