import React from 'react';
import { Vec2 } from 'types';
import Icon from '~/components/atoms/Icon';
import './Picker.scss';

export interface PickerProps {
  pos: Vec2;
  onClose: () => void;
}

interface PickerHeaderProps {
  title: string | number;
  onClickPrev: () => void;
  onClickNext: () => void;
}

interface PickerFooterProps {
  primaryText: string;
  secondaryText?: string;
  onClickPrimary: () => void;
  onClickSecondary?: () => void;
  onClear?: () => void;
}

const Picker: React.FC<PickerProps> = ({ children, pos, onClose }) => {
  return (
    <div className='picker'>
      <div className='picker__dim' onClick={onClose} />
      <div className='picker__content' style={{ top: pos.y, left: pos.x }}>
        {children}
      </div>
    </div>
  );
};

const PickerHeader: React.FC<PickerHeaderProps> = ({ title, onClickPrev, onClickNext }) => {
  return (
    <div className='picker-header'>
      <p className='f-large'>
        <span className='f-bold'>{title}</span>
      </p>
      <div className='picker-header__arrows'>
        <div className='picker-header__arrow' onClick={onClickPrev}>
          <Icon as='arrowLeft' />
        </div>
        <div className='picker-header__arrow' onClick={onClickNext}>
          <Icon as='arrowRight' />
        </div>
      </div>
    </div>
  );
};

const PickerFooter: React.FC<PickerFooterProps> = ({
  primaryText,
  secondaryText,
  onClickPrimary,
  onClickSecondary,
  onClear,
}) => {
  return (
    <div className='picker-footer'>
      {onClear && <p className='picker-footer__clear'>Clear</p>}
      <div className='picker-footer__buttons'>
        {onClickSecondary && secondaryText && (
          <p className='picker_footer__secondary' onClick={onClickSecondary} children={secondaryText} />
        )}
        <p className='picker_footer__primary' onClick={onClickPrimary} children={primaryText} />
      </div>
    </div>
  );
};

export default Object.assign(Picker, {
  Header: PickerHeader,
  Footer: PickerFooter,
});
