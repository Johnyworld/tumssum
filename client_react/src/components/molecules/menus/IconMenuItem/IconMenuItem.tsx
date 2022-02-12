import React from 'react';
import { IconType } from 'types';
import Icon from '~/components/atoms/Icon';
import './IconMenuItem.scss';

export interface IconMenuItemProps {
  icon: IconType;
  text: string;
}

const IconMenuItem: React.FC<IconMenuItemProps> = ({ icon, text }) => {
  return (
    <li className='icon-menu-item'>
      <Icon strokeWidth='bold' as={icon} />
      <p className='icon-menu-item__text'>{text}</p>
    </li>
  );
};

export default IconMenuItem;
