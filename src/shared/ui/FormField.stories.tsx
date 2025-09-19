import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'shared/ui/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    isFocused: { control: 'boolean' },
    isError: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    isFocused: false,
    isError: false,
    children: (
      <div className="h-14 flex items-center justify-center">Content</div>
    ),
  },
};

export const Focused: Story = {
  args: {
    isFocused: true,
    isError: false,
    children: (
      <div className="h-14 flex items-center justify-center">Content</div>
    ),
  },
};

export const Error: Story = {
  args: {
    isFocused: false,
    isError: true,
    children: (
      <div className="h-14 flex items-center justify-center">Content</div>
    ),
  },
};

export const FocusedWithError: Story = {
  args: {
    isFocused: true,
    isError: true,
    children: (
      <div className="h-14 flex items-center justify-center">Content</div>
    ),
  },
};
