import React, { useCallback } from 'react';
import { DropdownOption } from 'types';
import { c } from '~/utils/classNames';
import './ContentDropdown.scss';

export interface ContentDropdownProps {
  list: DropdownOption[];
  selected?: string;
  placeholder?: string;
  label?: string;
  onSelect: (selected: string) => void;
}

const ContentDropdown: React.FC<ContentDropdownProps> = ({ list, selected, placeholder, label, onSelect }) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => onSelect(e.target.value),
    [onSelect]
  );

  return (
    <div className='content-dropdown'>
      {label && <p className='content-dropdown__label'>{label}</p>}
      <select
        role='group'
        className={c('content-dropdown__select', [!selected, '&--disabled'])}
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
