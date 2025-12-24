import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'shared/ui/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    isFocused: { control: 'boolean' },
    hasValue: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: '라벨',
    isFocused: false,
    hasValue: false,
  },
};

export const Focused: Story = {
  args: {
    label: '라벨',
    isFocused: true,
    hasValue: false,
  },
};

export const WithValue: Story = {
  args: {
    label: '라벨',
    isFocused: false,
    hasValue: true,
  },
};

export const FocusedWithValue: Story = {
  args: {
    label: '라벨',
    isFocused: true,
    hasValue: true,
  },
};
