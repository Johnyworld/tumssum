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
	const { name, onChangeName, onUpdateName } = settingsHooks.useName(user.name);
	const { onChangeTheme } = settingsHooks.useTheme();
	const { onChangeLanguage } = settingsHooks.useLanguage();

	const handleSubmit: h.JSX.GenericEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		onUpdateName();
		e.currentTarget.blur();
	}

	return (
		<section class='gap-mv-big'>
			
			<p
				class='f-huge pre'
				children={`안녕하세요 ${name}님.\n서비스를 이용해주셔서 감사합니다.`}
			/>

			<div class='flex flex-start gap-small' style={{ alignItems: 'flex-end' }}>
				<form onSubmit={handleSubmit}>
					<div class='flex flex-start gap-small' style={{ alignItems: 'flex-end' }}>
						<Input value={name} onChange={onChangeName} label='이름' name='username' maxLength={20} />
						{ name !== user.name && name && <Button type='submit' children='저장' /> }
					</div>
				</form>
			</div>

			<div class='gap-mv-regular'>
				<ThemeSettingCard onChange={onChangeTheme} />
				<LanguageSettingCard onChange={onChangeLanguage} />
			</div>

			<div class='flex mv-huge'>
				<Button color='red' onClick={onLogout} class='gap-mv-regular' type='submit'>로그아웃</Button>
			</div>

		</section>
	)
}

export default SettingsContainer;
