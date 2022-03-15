import { Story, Meta } from '@storybook/react';
import AccordionTableRow, { AccordionTableRowProps } from './AccordionTableRow';

export default {
  title: 'Molecules/Tables/AccordionTable/AccordionTableRow',
  component: AccordionTableRow,
  argTypes: {},
} as Meta;

const Template: Story<AccordionTableRowProps> = args => <AccordionTableRow {...args} />;

export const Default = Template.bind({});
Default.args = {
  rowItem: ['고정지출', 500_000, -120_500],
};

export const isGroup = Template.bind({});
isGroup.args = {
  rowItem: ['고정지출', 500_000, -120_500],
  isGroup: true,
};
