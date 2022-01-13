import { render, fireEvent } from '@testing-library/react';
import ConfirmModal from '.';

const confirmText = 'Confirm text'

test('render component', () => {
  const mockConfirm = jest.fn();
  const mockCancel = jest.fn();
  const { getByText } = render(<ConfirmModal message={confirmText} onConfirm={mockConfirm} onCancel={mockCancel} />);
  expect(getByText(confirmText)).toBeInTheDocument();
});

test('click button events', () => {
  const mockConfirm = jest.fn();
  const mockCancel = jest.fn();
  const { getByText } = render(<ConfirmModal message={confirmText} onConfirm={mockConfirm} onCancel={mockCancel} />);
  fireEvent.click(getByText('예'));
  fireEvent.click(getByText('아니오'));
  expect(mockConfirm.mock.calls.length).toBe(1);
  expect(mockCancel.mock.calls.length).toBe(1);
});

test('press escape key', () => {
  const mockConfirm = jest.fn();
  const mockCancel = jest.fn();
  render(<ConfirmModal message={confirmText} onConfirm={mockConfirm} onCancel={mockCancel} />);
  fireEvent.keyUp(window, { key: 'Escape' });
  expect(mockCancel.mock.calls.length).toBe(1);
});
