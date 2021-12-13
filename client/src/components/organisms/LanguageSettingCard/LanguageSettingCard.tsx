import { h, FunctionalComponent } from 'preact';
import { Lang } from 'types';
import Button from '~components/atoms/Button';
import Card from '~components/atoms/Card';

export interface LanguageSettingCardProps {
	onChange: (lang: Lang) => void;
}

const LanguageSettingCard: FunctionalComponent<LanguageSettingCardProps> = ({ onChange }) => {

	
	return (
		<Card>
			<h3>언어</h3>
			<div class='flex flex-end gap-small'>
				<Button onClick={() => onChange('ko')}>한국어</Button>
				<Button onClick={() => onChange('en')}>English</Button>
			</div>
		</Card>
	)
}

export default LanguageSettingCard;
