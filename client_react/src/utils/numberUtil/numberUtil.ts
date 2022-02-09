const getComma = (num: number | string) =>
  !num && num !== 0 ? '' : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const removeCharacters = (num: string) => num.replace(/([^0-9])/gi, '') || '';
const getZeroNumber = (value: number) => (value < 10 ? '0' : '') + value;

const numberUtil = {
  getComma,
  removeCharacters,
  getZeroNumber,
};

export default numberUtil;
