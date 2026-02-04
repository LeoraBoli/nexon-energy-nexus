import { useState, useCallback, useEffect, ReactNode } from 'react';
import { SoundContext } from '@/hooks/useSoundEffects';
import useSoundEffects from '@/hooks/useSoundEffects';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SoundProviderProps {
  children: ReactNode;
}

const SoundProvider = ({ children }: SoundProviderProps) => {
  const [enabled, setEnabled] = useState(() => {
    // Check localStorage for preference
    const saved = localStorage.getItem('nexon-sound-enabled');
    return saved !== null ? saved === 'true' : true;
  });
  
  const [showTooltip, setShowTooltip] = useState(false);
  const sounds = useSoundEffects(enabled);

  useEffect(() => {
    localStorage.setItem('nexon-sound-enabled', String(enabled));
  }, [enabled]);

  const toggleSound = useCallback(() => {
    setEnabled(prev => !prev);
    if (!enabled) {
      sounds.playClick();
    }
  }, [enabled, sounds]);

  const contextValue = {
    enabled,
    setEnabled,
    playClick: sounds.playClick,
    playHover: sounds.playHover,
    playSuccess: sounds.playSuccess,
    playWhoosh: sounds.playWhoosh,
    playAmbient: sounds.playAmbient,
  };

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
      
      {/* Sound Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-card border border-border shadow-elevated flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors"
        onClick={toggleSound}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        aria-label={enabled ? 'Desativar sons' : 'Ativar sons'}
      >
        <AnimatePresence mode="wait">
          {enabled ? (
            <motion.div
              key="on"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="off"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="fixed bottom-20 right-6 z-50 px-3 py-2 bg-card border border-border rounded-lg text-xs text-foreground shadow-elevated"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {enabled ? 'Clique para silenciar' : 'Clique para ativar sons'}
          </motion.div>
        )}
      </AnimatePresence>
    </SoundContext.Provider>
  );
};

export default SoundProvider;
