import { User } from "types";
import useFetch from "~hooks/useFetch";
import useInput from "~hooks/useInput";
import useToast from "~hooks/useToast";
import { updateUser } from "~stores/userSlice";
import { useDispatch } from "~utils/redux/hooks";


export default (initialValue: string) => {

	const [name, onChangeName, setName] = useInput(initialValue);
	const dispatch = useDispatch();
	const toast = useToast();

	const patchUser = useFetch<User>({
		method: 'PATCH',
		url: '/api/user/',
		onSuccess: data => {
			setName(data.name);
			dispatch(updateUser(data));
			toast(`이름을 ${data.name}(으)로 변경했어요.`, 'green')
		}
	});

	const onUpdateName = () => {
		patchUser.call({
			name,
		});
	}
	
	return {
		name,
		onChangeName,
		onUpdateName,
	};
}