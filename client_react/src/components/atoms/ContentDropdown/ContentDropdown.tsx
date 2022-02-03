import React, { useCallback } from 'react';
import { DropdownOption } from 'types';
import './ContentDropdown.scss';

export interface ContentDropdownProps {
  list: DropdownOption[];
  selected?: string;
  placeholder?: string;
  onSelect: (selected: string) => void;
}

const ContentDropdown: React.FC<ContentDropdownProps> = ({
  list,
  selected,
  placeholder,
  onSelect,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => onSelect(e.target.value),
    [onSelect]
  );

  return (
    <div className='content-dropdown'>
      <select
        role='group'
        className='content-dropdown__select'
        defaultValue={selected || ''}
        placeholder={placeholder}
        onChange={handleChange}
      >
        {placeholder && (
          <option disabled value={''}>
            {placeholder}
          </option>
        )}

        {list.map((item) =>
          item.children ? (
            <optgroup key={item.id} label={item.text + ''}>
              {item.children.map((child) => (
                <option key={child.id} role='listbox' value={child.id}>
                  {child.text || '이름 없음'}
                </option>
              ))}
            </optgroup>
          ) : (
            <option key={item.id} role='listbox' value={item.id}>
              {item.text || '이름 없음'}
            </option>
          )
        )}
      </select>
      <div className='content-dropdown__arrow' />
    </div>
  );
};

export default ContentDropdown;
