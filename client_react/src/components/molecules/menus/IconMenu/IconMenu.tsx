import React from 'react';
import { IconMenuItemType } from 'types';
import LinkTo from '~/components/atoms/LinkTo';
import IconMenuItem from '../IconMenuItem';
import './IconMenu.scss';

export interface IconMenuProps {
  list: IconMenuItemType[];
}

const IconMenu: React.FC<IconMenuProps> = ({ list }) => {
  return (
    <ul className='icon-menu'>
      {list.map(item => (
        <LinkTo key={item.id} to={item.href}>
          <IconMenuItem icon={item.icon} text={item.text} />
        </LinkTo>
      ))}
    </ul>
  );
};

export default IconMenu;
