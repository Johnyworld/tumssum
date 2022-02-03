import { render, screen, fireEvent } from '@testing-library/react';
import {
  selectList,
  selectListGroups,
  selectPlaceholder,
} from '~/fixtures/common';
import ContentDropdown from '.';

/**
 * Test List
 * - [x] render a placeholder when selected is empty
 * - [x] render a list of options
 * - [x] render a list of options with groups
 * - [x] render a default value
 * - [x] simulates selection
 */

const mockClick = jest.fn();

test('render a placeholder', () => {
  render(
    <ContentDropdown
      list={selectList}
      placeholder={selectPlaceholder}
      onSelect={mockClick}
    />
  );
  expect(screen.getByPlaceholderText(selectPlaceholder)).toBeInTheDocument();
});

test('render a list of options', () => {
  render(
    <ContentDropdown
      list={selectList}
      placeholder={selectPlaceholder}
      onSelect={mockClick}
    />
  );
  expect(
    screen.getByPlaceholderText(selectPlaceholder).childNodes.length
  ).toEqual(selectList.length + 1); // plus 1 is placeholder option
});

test('render a list of options with groups', () => {
  render(
    <ContentDropdown
      list={selectListGroups}
      placeholder={selectPlaceholder}
      onSelect={mockClick}
    />
  );
  expect(
    screen.getByPlaceholderText(selectPlaceholder).childNodes.length
  ).toEqual(selectListGroups.length + 1); // plus 1 is placeholder option
});

test('render a default value', () => {
  render(
    <ContentDropdown
      list={selectList}
      selected='banana'
      placeholder={selectPlaceholder}
      onSelect={mockClick}
    />
  );
  expect(
    screen.getByPlaceholderText(selectPlaceholder).childNodes.length
  ).toEqual(selectList.length + 1); // plus 1 is placeholder option
});

test('Simulates selection', () => {
  render(
    <ContentDropdown
      list={selectList}
      placeholder={selectPlaceholder}
      onSelect={mockClick}
    />
  );
  //The value should be the key of the option
  fireEvent.change(screen.getByRole('group'), { target: { value: 'apple' } });
  let options: HTMLOptionElement[] = screen.getAllByRole('listbox');
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeTruthy();
  expect(options[2].selected).toBeFalsy();
  //...
});
