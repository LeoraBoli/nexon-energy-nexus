import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
        
        // Check for custom cursor text
        const cursorTextAttr = target.getAttribute('data-cursor') || 
                               target.closest('[data-cursor]')?.getAttribute('data-cursor');
        if (cursorTextAttr) {
          setCursorText(cursorTextAttr);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseout', handleMouseOut);

    // Add event listeners to all interactive elements
    document.querySelectorAll('a, button, .cursor-pointer, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Re-attach listeners when DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, .cursor-pointer, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorText('');
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Don't render on mobile/touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Inner dot */}
          <motion.div
            className="absolute w-3 h-3 bg-white rounded-full"
            style={{ marginLeft: '-6px', marginTop: '-6px' }}
            animate={{
              scale: isHovering ? 0 : 1,
            }}
          />
          
          {/* Outer ring */}
          <motion.div
            className="absolute w-10 h-10 border-2 border-white rounded-full"
            style={{ marginLeft: '-20px', marginTop: '-20px' }}
            animate={{
              scale: isHovering ? 1.5 : 1,
              opacity: isHovering ? 1 : 0.5,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Hover state with text */}
          {cursorText && (
            <motion.div
              className="absolute whitespace-nowrap px-4 py-2 bg-white text-background text-xs font-bold rounded-full"
              style={{ marginTop: '-40px' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {cursorText}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-32 h-32 rounded-full opacity-20"
          style={{ 
            marginLeft: '-64px', 
            marginTop: '-64px',
            background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)',
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isVisible ? (isHovering ? 0.3 : 0.15) : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Hide default cursor */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
