import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import Button from '~components/elements/Button';
import Aside from '~components/layouts/Aside';
import PageContainer from '~components/layouts/PageComtainet/PageContainer';
import { logout } from '~features/user/userSlice';
import { useDispatch, useSelector } from '~utils/redux/hooks';


const HomePage: FunctionalComponent = ({  }) => {

	const [ count, setCount ] = useState(0);

	const userInfo = useSelector(state=> state.user.userInfo);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

	return (
		<PageContainer>
			<div class='home-page'>
				<p>{count}</p>
				<button onClick={() => setCount(count+1)}>Plus</button>
				<div class='home-page-contents'>
					{ userInfo && <Button onClick={handleLogout} fluid class='gap-regular' type='submit'>logout</Button> }
					{ userInfo && `Hello ${userInfo.name}`}
				</div>
				<Aside class='hide-desktop' alignRight wide />
			</div>
		</PageContainer>
	)
}

export default HomePage;
