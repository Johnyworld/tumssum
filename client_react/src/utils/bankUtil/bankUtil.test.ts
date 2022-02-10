import { fixtureBankGroupA, fixtureBankGroupB, fixtureBanks } from '~/fixtures/bank.fixture';
import { fixtureMonths } from '~/fixtures/month.fixrure';
import { getBankAligned, getBankTree } from './bankUtil';

/**
 * testing getBankAligned function
 * testing getBankTree function
 */

test('testing getBankAligned function', () => {
  expect(getBankAligned(fixtureBanks, fixtureMonths)).toEqual({
    1: [fixtureBanks[0], fixtureBanks[1]],
    2: [fixtureBanks[2]],
    EMPTY: [fixtureBanks[3]],
  });
});

test('testing getBankTree function', () => {
  expect(getBankTree([fixtureBankGroupA, fixtureBankGroupB], fixtureBanks, fixtureMonths)).toEqual([
    { ...fixtureBankGroupA, items: [fixtureBanks[0], fixtureBanks[1]] },
    { ...fixtureBankGroupB, items: [fixtureBanks[2]] },
    { id: 0, items: [fixtureBanks[3]] },
  ]);
});
