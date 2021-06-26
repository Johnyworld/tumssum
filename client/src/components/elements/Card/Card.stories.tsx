import { h } from 'preact';
import { Story, Meta } from '@storybook/preact';
import Card, { CardProps } from './Card';

export default {
  title: 'Elements/Card',
  component: Card,
  argTypes: {
    onClick: { action: 'onClick' },
    padding: { control: { type: 'select', options: [ 'regular', 'small', 'none' ]}},
  },
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} ><div><h3 class='mv-small'>Heading 3</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi repellendus quae, qui ab ducimus eos reprehenderit accusamus, voluptas dolore eveniet atque. Asperiores suscipit eos fugiat quasi ratione quos quam facere.</p></div></Card>;

export const Primary = Template.bind({});
Primary.args = {
	padding: 'regular',
};
