import { Story, Meta } from '@storybook/react';
import { fixtureBankItemA } from '~/fixtures/bank.fixture';
import { tooLongText2 } from '~/fixtures/common';
import BankListItem, { BankListItemProps } from './BankListItem';

export default {
  title: 'Molecules/Lists/BankListItem',
  component: BankListItem,
  argTypes: {},
} as Meta;

const Template: Story<BankListItemProps> = (args) => <BankListItem {...args} />;
export const Default = Template.bind({});
Default.args = {
  bank: fixtureBankItemA,
};

export const CASE_noTitleAndMemo = Template.bind({});
CASE_noTitleAndMemo.args = {
  bank: {
    ...fixtureBankItemA,
    title: '',
    memo: '',
  },
};

export const CASE_longTitleAndMemo = Template.bind({});
CASE_longTitleAndMemo.args = {
  bank: {
    ...fixtureBankItemA,
    title: tooLongText2,
    memo: tooLongText2,
  },
};
