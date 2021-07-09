import { useState } from 'react';


export default <S>(initialList?: S[]) => {
	
	const [list, setList] = useState<S[]>(initialList || []);

	console.log('===== List', list);
	const handleUpdate = (index: number, newData: S) => {
		console.log('===== useList', index, newData);
		const tempList = list;
		tempList[index] = { ...tempList[index], ...newData };
		setList(tempList);
	}
	
	return { list, handleUpdate };
}