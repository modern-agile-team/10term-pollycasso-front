import type { Meta, StoryObj } from '@storybook/react-vite';
import Spinner from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
  args: {
    message: '로딩 중...',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    message: '로딩 중...',
  },
};

export const CustomMessage: Story = {
  args: {
    message: '데이터를 불러오는 중...',
  },
};
