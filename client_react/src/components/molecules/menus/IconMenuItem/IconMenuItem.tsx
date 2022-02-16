import React from 'react';
import { IconType } from 'types';
import Icon from '~/components/atoms/Icon';
import { c } from '~/utils/classNames';
import './IconMenuItem.scss';

export interface IconMenuItemProps {
  icon: IconType;
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const IconMenuItem: React.FC<IconMenuItemProps> = ({ icon, text, isSelected, onClick }) => {
  return (
    <li className='icon-menu-item' onClick={onClick}>
      <Icon strokeWidth='bold' as={icon} color={isSelected ? 'pen' : 'gray'} />
      <p className={c('icon-menu-item__text', [isSelected, '&--selected'])}>{text}</p>
    </li>
  );
};

export default IconMenuItem;
