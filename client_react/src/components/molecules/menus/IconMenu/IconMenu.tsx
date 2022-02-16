import React from 'react';
import { IconMenuItemType } from 'types';
import LinkTo from '~/components/atoms/LinkTo';
import IconMenuItem from '../IconMenuItem';
import './IconMenu.scss';

export interface IconMenuProps {
  list: IconMenuItemType[];
  selected?: string;
  onSelect?: (id: string) => void;
}

const IconMenu: React.FC<IconMenuProps> = ({ list, selected, onSelect }) => {
  return (
    <ul className='icon-menu'>
      {list.map(item => (
        <LinkTo key={item.id} to={item.href}>
          <IconMenuItem
            icon={item.icon}
            text={item.text}
            isSelected={selected === item.id}
            onClick={onSelect ? () => onSelect(item.id) : undefined}
          />
        </LinkTo>
      ))}
    </ul>
  );
};

export default IconMenu;
