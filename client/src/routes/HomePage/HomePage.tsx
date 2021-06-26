import { h, FunctionalComponent } from 'preact';
import Button from '~components/elements/Button';
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
      { userInfo && <Button onClick={handleLogout} fluid class='gap-regular' type='submit'>logout</Button> }
			{ userInfo && `Hello ${userInfo.name}`}
		</div>
	)
}

export default HomePage;
