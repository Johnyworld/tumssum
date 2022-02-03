import { Story, Meta } from '@storybook/react';
import { fixtureBankTree } from '~/fixtures/bank.fixture';
import BankList, { BankListProps } from './BankList';

export default {
  title: 'Molecules/Lists/BankList',
  component: BankList,
  argTypes: {},
} as Meta;

const Template: Story<BankListProps> = (args) => <BankList {...args} />;
export const Default = Template.bind({});
Default.args = {
  bankTree: fixtureBankTree,
};

const TemplateNoList: Story<BankListProps> = (args) => <BankList {...args} />;
export const CASE_NoList = TemplateNoList.bind({});
CASE_NoList.args = {
  bankTree: [],
};
