import { Story, Meta } from '@storybook/react';
import AccordionTable, { AccordionTableProps } from './AccordionTable';

export default {
  title: 'Molecules/Tables/AccordionTable/AccordionTable',
  component: AccordionTable,
  argTypes: {},
} as Meta;

const Template: Story<AccordionTableProps> = args => <AccordionTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  headings: ['카테고리', '예산', '소비'],
  data: [
    {
      group: ['고정지출', 580_000, -572_000],
      items: [
        ['공과금', 80_000, -72_000],
        ['월세', 500_000, -500_000],
      ],
    },
    {
      group: ['용돈', 130_000, -32_700],
      items: [
        ['문화생활', 80_000, -31_500],
        ['간식', 50_000, -1_200],
      ],
    },
  ],
};
