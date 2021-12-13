import { logout } from "~stores/userSlice";
import { useDispatch } from "~utils/redux/hooks";


export default () => {

  const dispatch = useDispatch();

	const onLogout = () => {
    dispatch(logout());
  }
	
	return {
		onLogout,
	};
}