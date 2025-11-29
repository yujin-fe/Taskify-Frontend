import { cva } from 'class-variance-authority';
export const DashboardColor = cva('w-2 h-2 rounded-full', {
  variants: {
    colorName: {
      orange: 'bg-orange-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      pink: 'bg-pink-500',
      purple: 'bg-purple-500',
    },
  },
  defaultVariants: {
    colorName: 'orange',
  },
});
