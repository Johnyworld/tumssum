import { fireEvent, render, screen } from '@testing-library/react';
import AccordionTableGroup from '.';
import { AccordionTableData } from './AccordionTableGroup';

const data: AccordionTableData = {
  group: ['고정지출', 580_000, -572_000],
  items: [
    ['공과금', 80_000, -72_000],
    ['월세', 500_000, -500_000],
  ],
};

test('renders parent item', () => {
  render(<AccordionTableGroup data={data} />);
  const titleEl = screen.getAllByTestId('accordion-table__title')[0];
  const defaultValueEl = screen.getAllByTestId('accordion-table__default-value')[0];
  const currentValueEl = screen.getAllByTestId('accordion-table__current-value')[0];
  expect(titleEl.textContent).toBe('고정지출');
  expect(defaultValueEl.textContent).toBe('580,000');
  expect(currentValueEl.textContent).toBe('-572,000');
});

test('renders items', () => {
  render(<AccordionTableGroup data={data} />);
  const listEl = screen.getByRole('list');
  expect(listEl.childNodes.length).toBe(data.items.length);
});

test('showing items', () => {
  render(<AccordionTableGroup data={data} />);
  const rowEl = screen.getAllByTestId('accordion-table__row')[0];
  const listEl = screen.getByRole('list');
  expect(listEl.classList.contains('accordion-table__items--hide')).toBeTruthy();
  fireEvent.click(rowEl);
  expect(listEl.classList.contains('accordion-table__items--hide')).toBeFalsy();
});
