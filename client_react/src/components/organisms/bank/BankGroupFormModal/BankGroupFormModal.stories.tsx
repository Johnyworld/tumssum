import { Story, Meta } from '@storybook/react';
import BankGroupFormModal, { BankGroupFormModalProps } from './BankGroupFormModal';

export default {
  title: 'Organisms/Bank/BankGroupFormModal',
  component: BankGroupFormModal,
  argTypes: {},
} as Meta;

const Template: Story<BankGroupFormModalProps> = (args) => <BankGroupFormModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
