import { useState } from 'react';

export default <S>() => {

	const [detailView, setDetailView] = useState<null | S>(null);
	
	const handleViewDetail = (data: S) => () => {
		setDetailView(data);
	}

	const handleCloseDetail = () => {
		setDetailView(null);
	}
	
	return { detailView, handleViewDetail, handleCloseDetail };
}