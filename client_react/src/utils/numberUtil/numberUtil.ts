const getComma = (num: number | string) =>
  !num && num !== 0 ? '' : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const removeCharacters = (num: string) => num.replace(/([^0-9])/gi, '') || '';

const getZeroNumber = (value: number) => (value < 10 ? '0' : '') + value;

const getLimit = (num: number, limit: number) => {
  if (num < 0) return (limit * (Math.floor(-num / limit) + 1) + num) % limit;
  if (num > limit - 1) return num % limit;
  return num;
};

const numberUtil = {
  getComma,
  removeCharacters,
  getZeroNumber,
  getLimit,
};

export default numberUtil;
