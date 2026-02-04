import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'complete' | 'exit'>('loading');

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('complete');
          setTimeout(() => {
            setPhase('exit');
            setTimeout(onLoadingComplete, 800);
          }, 600);
          return 100;
        }
        // Accelerating progress
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      )}
      {phase === 'exit' ? null : (
        <motion.div
          key="loader-content"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background overflow-hidden"
          exit={{ 
            clipPath: 'circle(0% at 50% 50%)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
              }} 
            />
          </div>

          {/* Animated Background Glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Main Logo Container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Mark */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.2 
              }}
            >
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 w-32 h-32 rounded-2xl border-2 border-accent/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Inner Ring */}
              <motion.div
                className="absolute inset-2 w-28 h-28 rounded-xl border border-accent/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />

              {/* Logo Background */}
              <motion.div
                className="w-32 h-32 bg-accent-gradient rounded-2xl flex items-center justify-center shadow-glow"
                animate={{
                  boxShadow: [
                    '0 0 40px hsl(24 95% 53% / 0.3)',
                    '0 0 80px hsl(24 95% 53% / 0.5)',
                    '0 0 40px hsl(24 95% 53% / 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Logo Letter */}
                <motion.span
                  className="text-accent-foreground font-black text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  N
                </motion.span>
              </motion.div>

              {/* Corner Accents */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-accent rounded-full"
                  style={{
                    top: i < 2 ? -6 : 'auto',
                    bottom: i >= 2 ? -6 : 'auto',
                    left: i % 2 === 0 ? -6 : 'auto',
                    right: i % 2 === 1 ? -6 : 'auto',
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                />
              ))}
            </motion.div>

            {/* Brand Name */}
            <motion.div
              className="flex flex-col items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.span 
                className="text-4xl font-black tracking-tight text-foreground"
                animate={{ letterSpacing: ['0em', '0.05em', '0em'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                NEXON
              </motion.span>
              <motion.span 
                className="text-sm tracking-[0.4em] text-accent uppercase mt-1"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                Energy Group
              </motion.span>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="w-64 h-1 bg-secondary rounded-full overflow-hidden"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 256 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-accent-gradient rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Progress Text */}
            <motion.div
              className="mt-4 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="w-2 h-2 bg-accent rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-sm text-muted-foreground font-medium">
                {phase === 'complete' ? 'Pronto' : 'Carregando experiência...'}
              </span>
              <span className="text-sm text-accent font-bold w-12 text-right">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </div>

          {/* Bottom Tagline */}
          <motion.div
            className="absolute bottom-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <p className="text-xs text-muted-foreground tracking-widest uppercase">
              Energia para um mundo em transição
            </p>
          </motion.div>

          {/* Decorative Lines */}
          <motion.div
            className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-px h-32 bg-gradient-to-t from-transparent via-accent/30 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
