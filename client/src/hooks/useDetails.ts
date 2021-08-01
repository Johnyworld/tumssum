import { useState } from 'react';

export default <S>() => {

	const [detailView, setDetailView] = useState<null | S>(null);
	
	const handleViewDetail = (account: S) => () => {
		setDetailView(account);
	}

	const handleCloseDetail = () => {
		setDetailView(null);
	}
	
	return { detailView, handleViewDetail, handleCloseDetail };
}