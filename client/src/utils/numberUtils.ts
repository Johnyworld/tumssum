const option = {
  maximumFractionDigits: 4
};

const getNumberWithComma = (value: number) => {
	return value.toLocaleString('en-US', option);
	// return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const getZeroNumber = (value: number) => {
	return (value < 10 ? '0' : '') + value;
}

export default {
	getNumberWithComma,
	getZeroNumber,
}
