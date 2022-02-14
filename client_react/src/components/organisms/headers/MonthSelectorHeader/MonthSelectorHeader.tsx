import React from 'react';
import Icon from '~/components/atoms/Icon';
import './MonthSelectorHeader.scss';

export interface MonthSelectorHeaderProps {
  yyyymm: string;
  onClickOpenPicker: React.MouseEventHandler<HTMLDivElement>;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const MonthSelectorHeader: React.FC<MonthSelectorHeaderProps> = ({
  yyyymm,
  onClickOpenPicker,
  onClickPrev,
  onClickNext,
}) => {
  const [YYYY, MM] = yyyymm.split('-');

  return (
    <div className='month-selector-header'>
      <div className='month-selector-header__icon' data-testid='month-selector-prev' onClick={onClickPrev}>
        <Icon as='arrowLeft' color='pen' />
      </div>

      <h2 className='month-selector-header__date' data-testid='month-selector-open-picker' onClick={onClickOpenPicker}>
        {`${YYYY}. ${MM}`}
      </h2>

      <div className='month-selector-header__icon' data-testid='month-selector-next' onClick={onClickNext}>
        <Icon as='arrowRight' color='pen' />
      </div>
    </div>
  );
};

export default MonthSelectorHeader;
