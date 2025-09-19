import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorMessage } from './ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
  title: 'shared/ui/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const WithMessage: Story = {
  args: {
    message: '에러 메시지가 여기에 표시됩니다.',
  },
};

export const WithoutMessage: Story = {
  args: {
    message: undefined,
  },
};
