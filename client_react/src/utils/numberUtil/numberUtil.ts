const getComma = (num: number | string) => !num && num !== 0 ? '' : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const removeCharacters = (num: string) => num.replace(/([^0-9])/gi, "") || '';

const numberUtil = {
	getComma,
	removeCharacters,
}

export default numberUtil;
