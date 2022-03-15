import { Story, Meta } from '@storybook/react';
import AccordionTableGroup, { AccordionTableGroupProps } from './AccordionTableGroup';

export default {
  title: 'Molecules/Tables/AccordionTable/AccordionTableGroup',
  component: AccordionTableGroup,
  argTypes: {},
} as Meta;

const Template: Story<AccordionTableGroupProps> = args => <AccordionTableGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    group: ['고정지출', 580_000, -572_000],
    items: [
      ['공과금', 80_000, -72_000],
      ['월세', 500_000, -500_000],
    ],
  },
};
