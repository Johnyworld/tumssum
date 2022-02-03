import { render, screen } from '@testing-library/react';
import { fixtureBankItemA } from '~/fixtures/bank.fixture';
import numberUtil from '~/utils/numberUtil';
import BankListItem from '../BankListItem/BankListItem';
/**
 * - [x] render a listitem
 * - [x] render a empty title
 */

test('render a listitem', () => {
  render(<BankListItem bank={fixtureBankItemA} />);
  expect(screen.getByText(fixtureBankItemA.title)).toBeInTheDocument();
  expect(screen.getByText(fixtureBankItemA.memo!)).toBeInTheDocument();
  expect(screen.getByText(numberUtil.getComma(fixtureBankItemA.balance || 0))).toBeInTheDocument();
});

test('render a empty title', () => {
  render(<BankListItem bank={{ ...fixtureBankItemA, title: '' }} />);
  expect(screen.getByText('이름 없음')).toBeInTheDocument();
});
