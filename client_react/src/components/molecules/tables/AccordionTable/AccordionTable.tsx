import React from 'react';
import AccordionTableGroup from './AccordionTableGroup';
import { AccordionTableData } from './AccordionTableGroup/AccordionTableGroup';
import './AccordionTable.scss';

export interface AccordionTableProps {
  data: AccordionTableData[];
  headings?: string[];
}

const AccordionTable: React.FC<AccordionTableProps> = ({ data, headings }) => {
  return (
    <div className='accordion-table' data-testid='accordion-table'>
      {headings && (
        <div className='accordion-table__head' data-testid='accordion-table__head'>
          {headings.map((heading, i) => (
            <div key={i} className='accordion-table__item'>
              {heading}
            </div>
          ))}
        </div>
      )}

      {data.map(item => (
        <AccordionTableGroup data={item} />
      ))}
    </div>
  );
};

export default AccordionTable;
