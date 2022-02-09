import numberUtil from '.';

test('returns numbers with comma as string type', () => {
  expect(numberUtil.getComma(1234567)).toEqual('1,234,567');
  expect(numberUtil.getComma(0)).toEqual('0');
  expect(numberUtil.getComma(undefined!)).toEqual('');
  expect(numberUtil.getComma(null!)).toEqual('');
  expect(numberUtil.getComma(NaN!)).toEqual('');
});

test('returns number without characters as string type', () => {
  expect(numberUtil.removeCharacters('123가나다456ABC789def')).toEqual('123456789');
  expect(numberUtil.removeCharacters('abcdef')).toEqual('');
  expect(numberUtil.removeCharacters('')).toEqual('');
});

test('returns number with zero as string type', () => {
  expect(numberUtil.getZeroNumber(1)).toEqual('01');
  expect(numberUtil.getZeroNumber(10)).toEqual('10');
  expect(numberUtil.getZeroNumber(5)).toEqual('05');
});
