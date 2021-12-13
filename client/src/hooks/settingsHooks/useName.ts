import useInput from "~hooks/useInput";


export default (initialValue: string) => {

	const [name, onChangeName] = useInput(initialValue);
	
	return {
		name,
		onChangeName,
	};
}