import React from 'react';
import { c } from '~/utils/classNames';
import numberUtil from '~/utils/numberUtil';

export type AccordionTableItem = [string, number, number];

export interface AccordionTableRowProps {
  rowItem: AccordionTableItem;
  isGroup?: boolean;
  onClick?: () => void;
}

const AccordionTableRow: React.FC<AccordionTableRowProps> = ({ rowItem, isGroup, onClick }) => {
  const [title, defaultValue, currentValue] = rowItem;

  return (
    <div className='accordion-table__row' data-testid='accordion-table__row' onClick={onClick}>
      <div
        className={c('accordion-table__item', 'accordion-table__title', [isGroup, '&--bold'])}
        data-testid='accordion-table__title'
      >
        {title || '이름 없음'}
      </div>

      <div
        className={c('accordion-table__item', [isGroup, '&--bold'], [defaultValue < 0, '&--negative'])}
        data-testid='accordion-table__default-value'
      >
        {defaultValue ? numberUtil.getComma(defaultValue) : 0}
      </div>

      <div
        className={c('accordion-table__item', [isGroup, '&--bold'], [currentValue < 0, '&--negative'])}
        data-testid='accordion-table__current-value'
      >
        {currentValue ? numberUtil.getComma(currentValue) : 0}
      </div>
    </div>
  );
};

export default AccordionTableRow;
