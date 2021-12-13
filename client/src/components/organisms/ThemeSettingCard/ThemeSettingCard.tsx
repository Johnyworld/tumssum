import { h, FunctionalComponent } from 'preact';
import Button from '~components/atoms/Button';
import Card from '~components/atoms/Card';

export interface ThemeSettingCardProps {
	onChange: () => void;
}

const ThemeSettingCard: FunctionalComponent<ThemeSettingCardProps> = ({ onChange }) => {
	return (
		<Card>
			<h3>테마</h3>
			<div class='flex flex-end'>
				<Button onClick={onChange}>변경</Button>
			</div>
		</Card>
	)
}

export default ThemeSettingCard;
