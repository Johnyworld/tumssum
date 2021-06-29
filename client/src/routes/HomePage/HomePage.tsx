import { h, FunctionalComponent } from 'preact';
import Button from '~components/elements/Button';
import Aside from '~components/partials/Aside';
import Content from '~components/partials/Content';
import { logout } from '~features/user/userSlice';
import { useDispatch, useSelector } from '~utils/redux/hooks';


const HomePage: FunctionalComponent = ({  }) => {

	const userInfo = useSelector(state=> state.user.userInfo);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

	return (
		<div>
			<Aside />
			<Content>
				{ userInfo && <Button onClick={handleLogout} fluid class='gap-regular' type='submit'>logout</Button> }
				{ userInfo && `Hello ${userInfo.name}`}
			</Content>
			<Aside alignRight wide />
		</div>
	)
}

export default HomePage;
