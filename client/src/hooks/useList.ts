import { useState } from 'react';


export default <S>(initialList?: S[]) => {
	
	const [list, setList] = useState<S[]>(initialList || []);

	const handleUpdate = (index: number, newData: S) => {
		const tempList = list;
		tempList[index] = { ...tempList[index], ...newData };
		setList(tempList);
	}
	
	return { list, setList, handleUpdate };
}