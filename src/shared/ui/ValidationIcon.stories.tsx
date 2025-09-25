import type { Meta, StoryObj } from '@storybook/react-vite';
import { ValidationIcon } from './ValidationIcon';

const meta: Meta<typeof ValidationIcon> = {
  title: 'shared/ui/ValidationIcon',
  component: ValidationIcon,
  tags: ['autodocs'],
  argTypes: {
    isTouched: { control: 'boolean' },
    isError: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="relative w-20 h-20">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ValidationIcon>;

export const Default: Story = {
  args: {
    isTouched: false,
    isError: false,
  },
};

export const Success: Story = {
  args: {
    isTouched: true,
    isError: false,
  },
};

export const Error: Story = {
  args: {
    isTouched: true,
    isError: true,
  },
};
