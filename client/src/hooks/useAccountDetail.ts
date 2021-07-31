import { useState } from 'react';
import { Account } from 'types';


export default () => {

	const [detailView, setDetailView] = useState<null | Account>(null);
	
	const handleViewDetail = (account: Account) => () => {
		setDetailView(account);
	}

	const handleCloseDetail = () => {
		setDetailView(null);
	}
	
	return { detailView, handleViewDetail, handleCloseDetail };
}