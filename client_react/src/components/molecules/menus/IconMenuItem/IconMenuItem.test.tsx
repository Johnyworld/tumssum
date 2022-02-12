import { render, screen } from '@testing-library/react';
import IconMenuItem from '.';

test('renders text', () => {
  const text = 'Calendar';
  render(<IconMenuItem icon='calendar' text={text} />);
  expect(screen.getByText(text)).toBeInTheDocument();
});
