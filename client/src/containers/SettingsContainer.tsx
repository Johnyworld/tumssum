import { h, FunctionalComponent } from 'preact';
import { User } from 'types';
import Button from '~components/atoms/Button';
import Input from '~components/atoms/Input';
import LanguageSettingCard from '~components/organisms/LanguageSettingCard';
import ThemeSettingCard from '~components/organisms/ThemeSettingCard';
import settingsHooks from '~hooks/settingsHooks';
import userHooks from '~hooks/userHooks';

export interface settingsContainerProps {
	user: User;
}

const SettingsContainer: FunctionalComponent<settingsContainerProps> = ({ user }) => {

	const { onLogout } = userHooks.useLogout();
	const { name, onChangeName } = settingsHooks.useName(user.name);
	const { onChangeTheme } = settingsHooks.useTheme();
	const { onChangeLanguage } = settingsHooks.useLanguage();

	return (
		<main class='settings-page main wrap'>
			
			<p
				class='f-huge pre'
				children={`안녕하세요 ${user.name}님.\n서비스를 이용해주셔서 감사합니다.`}
			/>

			<div class='flex flex-start gap-small' style={{ alignItems: 'flex-end' }}>
				<form>
					<Input value={name} onChange={onChangeName} label='이름' name='username' maxLength={20} />
					{/* { name !== user.name && name && <Button children='저장' /> } */}
				</form>
			</div>

			<div class='gap-mv-regular'>
				<ThemeSettingCard onChange={onChangeTheme} />
				<LanguageSettingCard onChange={onChangeLanguage} />
			</div>

			<div class='flex mv-huge'>
				<Button color='red' onClick={onLogout} class='gap-mv-regular' type='submit'>로그아웃</Button>
			</div>

		</main>
	)
}

export default SettingsContainer;
