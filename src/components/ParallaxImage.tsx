import { useEffect, useRef, useState } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
}

const ParallaxImage = ({ 
  src, 
  alt, 
  className = '', 
  speed = 0.5,
  overlay = true 
}: ParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      const parallaxOffset = scrolled * speed * 0.3;
      
      setOffset(parallaxOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-[120%] object-cover will-change-transform"
        style={{ 
          transform: `translateY(${offset}px) scale(1.1)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      {overlay && (
        <>
          <div className="absolute inset-0 bg-dark-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </>
      )}
    </div>
  );
};

export default ParallaxImage;
