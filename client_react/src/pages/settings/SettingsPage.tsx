import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/atoms/Button';
import VersionText from '~/components/atoms/VersionText';
import GlobalHeader from '~/components/organisms/headers/GlobalHeader';
import { changeTheme } from '~/stores/modeSlice';
import { logout } from '~/stores/userSlice';
import { useDispatch, useSelector } from '~/utils/reduxHooks';
import routes from '~/utils/routes';
import './SettingsPage.scss';


const SettingsPage: React.FC = () => {
	
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userInfo = useSelector(state=> state.user.userInfo);
	const { name } = userInfo!;

	const onChangeTheme = () => {
		dispatch(changeTheme());
	}

	const onLogout = () => {
    dispatch(logout());
		navigate(routes.home);
  }

	return (
		<div>
			<GlobalHeader />
			<main className='settings-page'>

				<p className='settings-page__title' children={`안녕하세요 ${name}님.\n서비스를 이용해주셔서 감사합니다.`} />

				<VersionText />

				<div className='settings-page__buttons'>
					<Button onClick={onLogout} color='red'>로그아웃</Button>
					<Button onClick={onChangeTheme}>테마 변경하기</Button>
				</div>

			</main>
		</div>
	)
}

export default SettingsPage;
