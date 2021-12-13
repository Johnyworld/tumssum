import { changeTheme } from "~stores/modeSlice";
import { useDispatch } from "~utils/redux/hooks";


export default () => {

	const dispatch = useDispatch();

	const onChangeTheme = () => {
		dispatch(changeTheme());
	}
	
	return {
		onChangeTheme,
	};
}