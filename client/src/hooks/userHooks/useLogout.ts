import { useLocation } from "wouter";
import { logout } from "~stores/userSlice";
import { useDispatch } from "~utils/redux/hooks";


export default () => {

	const [_, setLocation] = useLocation();
  const dispatch = useDispatch();

	const onLogout = () => {
    dispatch(logout());
		setLocation('/');
  }
	
	return {
		onLogout,
	};
}