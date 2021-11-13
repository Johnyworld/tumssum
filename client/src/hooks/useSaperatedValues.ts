import { useTranslation } from 'preact-i18next';
import { useCallback, useMemo } from 'preact/hooks';
import { useState } from 'react';
import { Account, Bank, Category } from 'types';
import { getDateStringByDateType, getLocalString } from '~utils/calendar';
import stringUtils from '~utils/stringUtils';
import useToggle from './useToggle';

interface UseCSV {
	fileType: 'CSV' | 'TSV';
	accounts: Account[];
	banks: Bank[];
	categories: Category[];
}

export default ({ fileType, accounts, banks, categories }: UseCSV) => {

	const toggleTSVModal = useToggle();
	const [uploadingAccounts, setUploadingAccounts] = useState<Account[]>([]);

	const { i18n } = useTranslation();
	const head = useMemo(() => ['번호', '날짜', '시간', '제목', '금액', '카테고리', '뱅크', '메모'], []);
	const body = useMemo(() => accounts.map((item, i)=> {
		const { datetime, title, account, category_title, bank_title, memo } = item
		return [
			i+1,
			getDateStringByDateType(i18n.language, new Date(datetime)),
			datetime.split('T')[1]?.substr(0,5) || '',
			title ? stringUtils.getIgnoringCommas(title) : '',
			account || '',
			category_title || '',
			bank_title || '',
			memo ? stringUtils.getIgnoringCommas(stringUtils.getIgnoringLineChanges(memo)) : '',
		];
	}), [accounts])
	const summary = useMemo(() => ['이번달 합계', '', '', '', `=sum(E2:E${accounts.length+1})`], [accounts])


	const download = useCallback((filename: string = 'Tumssum') => {
		let el = document.createElement('a');
		const results = [head, ...body, summary].map(row => row.join(fileType === 'CSV' ? ', ' : '	')).join('\n');
		const csvFile = new Blob([results], {type: fileType === 'CSV' ? 'text/csv' : 'text/tab-separated-values'});
		el.href = window.URL.createObjectURL(csvFile);
		el.download = filename;
		el.click();
	}, [accounts]);


	const upload = (files: FileList) => {
		const file = files[0];
		const reader = new FileReader();
		const categoriesByName: {[x: string]: number} = categories.reduce((prev, curr)=> {
			return { ...prev, [curr.title]: curr.id };
		}, {});
		const banksByName: {[x: string]: number} = banks.reduce((prev, curr)=> {
			return { ...prev, [curr.title]: curr.id };
		}, {});
		reader.onload = function(e) {
			const str = reader.result?.toString();
			if (str) {
				const rows = str.split('\n');
				let items: Account[] = [];
				rows.forEach((row, i) => {
					if (i === 0 || i === rows.length-1) return;
					const cols = row.split(', ');
					const date = getLocalString(new Date(cols[1])).substr(0, 10);
					const time = cols[2] ? 'T'+cols[2] : '';
					const item = {
						id: i+1,
						datetime: date + time,
						title: cols[3] || '',
						account: +cols[4],
						category_title: cols[5] || '',
						category: cols[5] ? +categoriesByName[cols[5]] : undefined,
						bank_title: cols[6] || '',
						bank: cols[6] ? +banksByName[cols[6]] : undefined,
						memo: cols[7],
					} as Account;
					items.push(item);
				})
				setUploadingAccounts(items);
				toggleTSVModal.handleOff();
			}
		}
		reader.readAsText(file as any);
	}

	const resetUploading = () => {
		setUploadingAccounts([]);
	}

	return {
		toggleTSVModal,
		uploadingAccounts,
		download,
		upload,
		resetUploading,
	};
}
