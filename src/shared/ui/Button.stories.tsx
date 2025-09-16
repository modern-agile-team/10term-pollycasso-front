import type { Meta } from '@storybook/react-vite';
import Button from './Button';
import type { ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    type: { control: 'radio', options: ['button', 'submit', 'reset'] },
    variant: { control: 'radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    textColor: { control: 'radio', options: ['white', 'black', 'gray'] },
    bgColor: {
      control: 'radio',
      options: ['blue', 'red', 'green', 'transparent'],
    },
  },
  args: {
    children: '버튼',
    textColor: 'white',
    bgColor: 'blue',
  },
};

export const Default = {
  args: {
    children: '아주 평범한 버튼',
  },
};

export default meta;
