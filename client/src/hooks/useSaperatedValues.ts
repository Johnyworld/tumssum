import { useTranslation } from 'preact-i18next';
import { useCallback, useMemo } from 'preact/hooks';
import { Account } from 'types';
import { getDateStringByDateType } from '~utils/calendar';
import stringUtils from '~utils/stringUtils';

interface UseCSV {
	fileType: 'CSV' | 'TSV';
	accounts: Account[];
}

export default ({ fileType, accounts }: UseCSV) => {

	const { i18n } = useTranslation();
	const head = useMemo(() => ['번호', '날짜', '시간', '제목', '금액', '카테고리', '뱅크', '메모'], []);
	const body = useMemo(() => accounts.map((item, i)=> {
		const { datetime, title, account, category_title, bank_title, memo } = item
		return [
			i+1,
			getDateStringByDateType(i18n.language, new Date(datetime)),
			datetime.split('T')[1]?.substr(0,5) || '',
			title ? title : '',
			account || '',
			category_title || '',
			bank_title || '',
			memo ? stringUtils.getIgnoringLineChanges(memo) : '',
		];
	}), [accounts])
	const summary = useMemo(() => ['이번달 합계', '', '', '', `=sum(E2:E${accounts.length+1})`], [accounts])


	const getCSV = useCallback((filename: string = 'Tumssum') => {

		let el = document.createElement('a');

		const results = [head, ...body, summary].map(row => row.join(fileType === 'CSV' ? ', ' : '	')).join('\n');
	
		const csvFile = new Blob([results], {type: fileType === 'CSV' ? 'text/csv' : 'text/tab-separated-values'});
		el.href = window.URL.createObjectURL(csvFile);
		el.download = filename;
		el.click();
	}, [accounts]);

	return { getCSV }
}
