import React from 'react';
import useToggle from '~/hooks/useToggle';
import { c } from '~/utils/classNames';
import AccordionTableRow from '../AccordionTableRow';
import { AccordionTableItem } from '../AccordionTableRow/AccordionTableRow';

export interface AccordionTableData {
  group: AccordionTableItem;
  items: AccordionTableItem[];
}

export interface AccordionTableGroupProps {
  data: AccordionTableData;
}

const ITEM_HEIGHT = 32;

const AccordionTableGroup: React.FC<AccordionTableGroupProps> = ({ data }) => {
  const { group, items } = data;
  const [isOpen, onOpen, onClose] = useToggle();

  return (
    <div className='accordion-table__group'>
      <AccordionTableRow rowItem={group} isGroup onClick={isOpen ? onClose : onOpen} />

      <div
        style={{ height: `${ITEM_HEIGHT * items.length}px` }}
        className={c('accordion-table__items', [!isOpen, '&--hide'])}
        role='list'
      >
        {items.map(item => (
          <AccordionTableRow key={item[0]} rowItem={item} />
        ))}
      </div>
    </div>
  );
};

export default AccordionTableGroup;
