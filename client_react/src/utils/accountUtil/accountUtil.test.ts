import { fixtureAccounts, fixtureAlignedAccounts } from '~/fixtures/account.fixture';
import { getDataAligned } from './accountUtil';

test('tests getDataAligned function', () => {
  expect(getDataAligned(fixtureAccounts)).toEqual(fixtureAlignedAccounts);
});
