import { cva } from 'class-variance-authority';
import Icons from '@/assets/icons';
import { COLOR_PALETTE, type ColorHex } from '@/constants/color';
import { cn } from '@/utils/cn';

const colorPickerStyle = cva('w-[30px] h-[30px] rounded-full cursor-pointer', {
  variants: {
    color: {
      orange: 'bg-orange-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      pink: 'bg-pink-500',
      purple: 'bg-purple-500',
    },
  },
});

interface ColorPickerProps {
  selectedColor: ColorHex;
  setSelectedColor: React.Dispatch<React.SetStateAction<ColorHex>>;
}

export default function ColorPicker({ selectedColor, setSelectedColor }: ColorPickerProps) {
  const handleClickColor = (color: ColorHex) => {
    setSelectedColor(color);
  };

  return (
    <div className='flex gap-[8px]'>
      {COLOR_PALETTE.map((palette) => (
        <button
          type='button'
          key={palette.color}
          className={cn(
            colorPickerStyle({ color: palette.color }),
            'flex items-center justify-center'
          )}
          onClick={() => handleClickColor(palette.hexCode)}>
          {selectedColor === palette.hexCode && <Icons.Check className='text-gray-0' />}
        </button>
      ))}
    </div>
  );
}
