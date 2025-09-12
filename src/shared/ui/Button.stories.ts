import type { Meta, StoryObj } from '@storybook/react-vite';

import { createElement } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  textColor?: 'white' | 'black' | 'gray';
  bgColor?: 'blue' | 'red' | 'green';
}

import Button from './Button';

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
    bgColor: { control: 'radio', options: ['blue', 'red', 'green'] },
  },
  args: {
    children: '버튼',
    textColor: 'white',
    bgColor: 'blue',
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
  },
};

export const Sizes: Story = {
  render: () => {
    return createElement(
      'div',
      { style: { display: 'flex', gap: '10px' } },
      createElement(Button, { size: 'small' }, 'Small'),
      createElement(Button, { size: 'medium' }, 'Medium'),
      createElement(Button, { size: 'large' }, 'Large'),
    );
  },
};

export const Colors: Story = {
  render: () => {
    return createElement(
      'div',
      { style: { display: 'flex', gap: '10px' } },
      createElement(
        Button,
        { textColor: 'white', bgColor: 'blue' },
        'White on Blue',
      ),
      createElement(
        Button,
        { textColor: 'black', bgColor: 'red' },
        'Black on Red',
      ),
      createElement(
        Button,
        { textColor: 'gray', bgColor: 'green' },
        'Gray on Green',
      ),
    );
  },
};

export const Types: Story = {
  render: () => {
    return createElement(
      'div',
      { style: { display: 'flex', gap: '10px' } },
      createElement(Button, { type: 'button' }, 'Button Type'),
      createElement(Button, { type: 'submit' }, 'Submit Type'),
      createElement(Button, { type: 'reset' }, 'Reset Type'),
    );
  },
};

export const DisabledStates: Story = {
  render: () => {
    return createElement(
      'div',
      { style: { display: 'flex', gap: '10px' } },
      createElement(Button, { disabled: true }, 'Disabled Button'),
      createElement(Button, { disabled: false }, 'Enabled Button'),
    );
  },
};
