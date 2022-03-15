import { render, screen } from '@testing-library/react';
import AccordionTableRow from '.';
import { AccordionTableItem } from './AccordionTableRow';

const rowItem: AccordionTableItem = ['고정지출', 500_000, -120_500];

test('renders title and values', () => {
  render(<AccordionTableRow rowItem={rowItem} />);
  const titleEl = screen.getByTestId('accordion-table__title');
  const defaultValueEl = screen.getByTestId('accordion-table__default-value');
  const currentValueEl = screen.getByTestId('accordion-table__current-value');
  expect(titleEl.textContent).toBe('고정지출');
  expect(defaultValueEl.textContent).toBe('500,000');
  expect(currentValueEl.textContent).toBe('-120,500');
});

test('renders wrong values', () => {
  render(<AccordionTableRow rowItem={['고정지출', null!, null!]} />);
  const defaultValueEl = screen.getByTestId('accordion-table__default-value');
  const currentValueEl = screen.getByTestId('accordion-table__current-value');
  expect(defaultValueEl.textContent).toBe('0');
  expect(currentValueEl.textContent).toBe('0');
});

test('renders empty values', () => {
  // @ts-ignore
  render(<AccordionTableRow rowItem={['고정지출']} />);
  const defaultValueEl = screen.getByTestId('accordion-table__default-value');
  const currentValueEl = screen.getByTestId('accordion-table__current-value');
  expect(defaultValueEl.textContent).toBe('0');
  expect(currentValueEl.textContent).toBe('0');
});
