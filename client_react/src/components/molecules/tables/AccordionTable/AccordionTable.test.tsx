import { render, screen } from '@testing-library/react';
import AccordionTable from './AccordionTable';
import { AccordionTableData } from './AccordionTableGroup/AccordionTableGroup';

const data: AccordionTableData[] = [
  {
    group: ['고정지출', 580_000, -572_000],
    items: [
      ['공과금', 80_000, -72_000],
      ['월세', 500_000, -500_000],
    ],
  },
  {
    group: ['용돈', 130_000, -32_700],
    items: [
      ['문화생활', 80_000, -31_500],
      ['간식', 50_000, -1_200],
    ],
  },
];

const headings = ['카테고리', '예산', '소비'];

test('render headings', () => {
  render(<AccordionTable data={data} headings={headings} />);
  const headingEls = screen.getByTestId('accordion-table__head');
  headingEls.childNodes.forEach((node, i) => {
    expect(node.textContent).toBe(headings[i]);
  });
});

test('render groups', () => {
  render(<AccordionTable data={data} headings={headings} />);
  const containerEl = screen.getByTestId('accordion-table');
  expect(containerEl.childNodes.length).toBe(data.length + 1);
});
