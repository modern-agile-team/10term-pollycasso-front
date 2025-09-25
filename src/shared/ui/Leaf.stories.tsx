import type { Meta, StoryObj } from '@storybook/react-vite';
import { Leaf } from './Leaf';
import { LeafGreen, LeafYellow } from '@/assets';

const meta = {
  title: 'shared/ui/Leaf',
  component: Leaf,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    src: {
      control: 'radio',
      options: [LeafGreen, LeafYellow],
    },
  },
  args: {
    src: LeafGreen,
    x: 200,
    rotation: 0,
    duration: 10,
    delay: 0,
    size: 80,
    screenHeight: 800,
    shifts: [200, 240, 160, 220, 200],
  },
} satisfies Meta<typeof Leaf>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleLeaves: Story = {
  render: () => (
    <div className="relative w-screen h-screen bg-blue-100 overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <Leaf
          key={i}
          src={i % 2 === 0 ? LeafGreen : LeafYellow}
          x={100 + i * 80}
          rotation={Math.random() * 360}
          duration={8 + i}
          delay={i * 0.5}
          size={60 + i * 10}
          screenHeight={800}
          shifts={[
            100 + i * 80,
            120 + i * 80,
            80 + i * 80,
            110 + i * 80,
            100 + i * 80,
          ]}
        />
      ))}
    </div>
  ),
};
