import { fireEvent, render, screen } from '@testing-library/react';
import MonthSelectorHeader from '.';

const mockOpenPicker = jest.fn();
const mockClickPrev = jest.fn();
const mockClickNext = jest.fn();

test('renders year and month', () => {
  render(
    <MonthSelectorHeader
      yyyymm='2022-02'
      onClickOpenPicker={mockOpenPicker}
      onClickPrev={mockClickPrev}
      onClickNext={mockClickNext}
    />
  );
  expect(screen.getByText('2022. 02')).toBeInTheDocument();
});

test('click buttons', () => {
  render(
    <MonthSelectorHeader
      yyyymm='2022-02'
      onClickOpenPicker={mockOpenPicker}
      onClickPrev={mockClickPrev}
      onClickNext={mockClickNext}
    />
  );
  fireEvent.click(screen.getByTestId('month-selector-prev'));
  fireEvent.click(screen.getByTestId('month-selector-next'));
  fireEvent.click(screen.getByTestId('month-selector-open-picker'));
  expect(mockOpenPicker.mock.calls.length).toBe(1);
  expect(mockClickPrev.mock.calls.length).toBe(1);
  expect(mockClickNext.mock.calls.length).toBe(1);
});
