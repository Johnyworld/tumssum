import { fireEvent, render } from "@testing-library/react";
import { ToastItem } from "~/stores/toastSlice";
import Toast from ".";

const toastMessage = 'This is toast!';
const toastObj: ToastItem = { id: 1, index: 0, message: toastMessage, color: 'green' }

test('render component', () => {
  const mockRemove = jest.fn();
  const { getByText } = render(<Toast toast={toastObj} onRemove={mockRemove} />);
  expect(getByText(toastMessage)).toBeInTheDocument();
});

test('click x button', () => {
  const mockRemove = jest.fn();
  const { container } = render(<Toast toast={toastObj} onRemove={mockRemove} />);
	fireEvent.click(container.getElementsByClassName('icon')[0])
  expect(mockRemove.mock.calls.length).toBe(1);
});
