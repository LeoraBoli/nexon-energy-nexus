import { forwardRef, ButtonHTMLAttributes } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useSound } from '@/hooks/useSoundEffects';

interface SoundButtonProps extends ButtonProps {
  soundOnClick?: boolean;
  soundOnHover?: boolean;
}

const SoundButton = forwardRef<HTMLButtonElement, SoundButtonProps>(
  ({ soundOnClick = true, soundOnHover = true, onClick, onMouseEnter, children, ...props }, ref) => {
    const { playClick, playHover } = useSound();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (soundOnClick) {
        playClick();
      }
      onClick?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (soundOnHover) {
        playHover();
      }
      onMouseEnter?.(e);
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

SoundButton.displayName = 'SoundButton';

export default SoundButton;
