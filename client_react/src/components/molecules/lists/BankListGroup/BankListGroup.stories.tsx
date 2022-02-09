import { Story, Meta } from '@storybook/react';
import { fixtureBankGroupA } from '~/fixtures/bank.fixture';
import { tooLongText2 } from '~/fixtures/common';
import BankListGroup, { BankListGroupProps } from './BankListGroup';

export default {
  title: 'Molecules/Lists/BankListGroup',
  component: BankListGroup,
  argTypes: {},
} as Meta;

const Template: Story<BankListGroupProps> = args => <BankListGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  bankGroup: fixtureBankGroupA,
};

export const CASE_TooLongTitle = Template.bind({});
CASE_TooLongTitle.args = {
  bankGroup: { ...fixtureBankGroupA, title: tooLongText2 },
};

export const CASE_NoTitle = Template.bind({});
CASE_NoTitle.args = {
  bankGroup: { ...fixtureBankGroupA, title: '' },
};

export const CASE_NoItems = Template.bind({});
CASE_NoItems.args = {
  bankGroup: { ...fixtureBankGroupA, items: [] },
};
