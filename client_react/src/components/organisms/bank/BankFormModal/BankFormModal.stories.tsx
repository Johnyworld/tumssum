import { Story, Meta } from '@storybook/react';
import { fixtureBankGroupA, fixtureBankGroupB } from '~/fixtures/bank.fixture';
import BankFormModal, { BankFormModalProps } from './BankFormModal';

export default {
  title: 'Organisms/Bank/BankFormModal',
  component: BankFormModal,
  argTypes: {},
} as Meta;

const Template: Story<BankFormModalProps> = (args) => <BankFormModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  groupList: [fixtureBankGroupA, fixtureBankGroupB],
};
