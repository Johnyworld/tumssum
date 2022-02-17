import { Story, Meta } from '@storybook/react';
import { Account } from 'types';
import { fixtureBankTree } from '~/fixtures/bank.fixture';
import { fixtureCategoryTree } from '~/fixtures/category.fixture';
import { isoStringNow } from '~/fixtures/common';
import AccountFormModal, { AccountFormModalProps } from './AccountFormModal';

export default {
  title: 'Organisms/Account/AccountFormModal',
  component: AccountFormModal,
  argTypes: {},
} as Meta;

const Template: Story<AccountFormModalProps> = args => <AccountFormModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  categoryTree: fixtureCategoryTree,
  bankTree: fixtureBankTree,
  isUpdating: false,
};

export const WithInitialValues = Template.bind({});
WithInitialValues.args = {
  categoryTree: fixtureCategoryTree,
  bankTree: fixtureBankTree,
  initAccount: {
    id: 1,
    account: -4100,
    title: '아이스 아메리카노',
    datetime: '2022-02-10T17:22:03.222z',
    category: 1,
    bank: 1,
    user: 1,
    memo: '맛있는 아아',
  } as Account,
  isUpdating: false,
};
