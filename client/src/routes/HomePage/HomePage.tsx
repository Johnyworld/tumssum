import { h, FunctionalComponent } from 'preact';
import Button from '~components/elements/Button';
import Aside from '~components/layouts/Aside';
import PageContainer from '~components/layouts/PageComtainet/PageContainer';
import Monthly from '~features/month/Monthly';
import MonthlyCalendar from '~features/month/MonthlyCalendar';
import { logout } from '~features/user/userSlice';
import { useDispatch, useSelector } from '~utils/redux/hooks';


const HomePage: FunctionalComponent = ({  }) => {

	const userInfo = useSelector(state=> state.user.userInfo);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

	return (
		<PageContainer>
			<div class='home-page'>
				<div class='home-page-contents'>
					<Monthly />
					{ userInfo && <Button onClick={handleLogout} fluid class='gap-regular' type='submit'>logout</Button> }
					{ userInfo && `Hello ${userInfo.name}`}
				</div>
				<Aside class='hide-desktop' alignRight wide />
			</div>
		</PageContainer>
	)
}

export default HomePage;
