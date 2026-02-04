import { useCallback, useEffect, useRef } from 'react';

// Sound effect types
type SoundType = 'click' | 'hover' | 'success' | 'whoosh' | 'ambient';

// Web Audio API context
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Generate synthetic sounds using Web Audio API
const generateSound = (type: SoundType, volume: number = 0.1) => {
  try {
    const ctx = getAudioContext();
    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    gainNode.gain.value = volume;

    switch (type) {
      case 'click': {
        // Short, crisp click sound
        const oscillator = ctx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        
        oscillator.connect(gainNode);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
        break;
      }
      
      case 'hover': {
        // Subtle hover tone
        const oscillator = ctx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.3, ctx.currentTime + 0.03);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        
        oscillator.connect(gainNode);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.12);
        break;
      }
      
      case 'success': {
        // Ascending chime
        const oscillator1 = ctx.createOscillator();
        const oscillator2 = ctx.createOscillator();
        oscillator1.type = 'sine';
        oscillator2.type = 'sine';
        
        oscillator1.frequency.setValueAtTime(523, ctx.currentTime); // C5
        oscillator2.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
        
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        oscillator1.start(ctx.currentTime);
        oscillator1.stop(ctx.currentTime + 0.15);
        oscillator2.start(ctx.currentTime + 0.1);
        oscillator2.stop(ctx.currentTime + 0.3);
        break;
      }
      
      case 'whoosh': {
        // Swoosh/transition sound using noise
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.1);
        filter.Q.value = 0.5;
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.5, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        
        source.connect(filter);
        filter.connect(gainNode);
        source.start(ctx.currentTime);
        break;
      }
      
      case 'ambient': {
        // Very subtle ambient tone
        const oscillator = ctx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(120, ctx.currentTime);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 200;
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.05, ctx.currentTime + 0.5);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 2);
        break;
      }
    }
  } catch (error) {
    // Silently fail if audio is not supported
    console.log('Audio not supported:', error);
  }
};

// Custom hook for sound effects
export const useSoundEffects = (enabled: boolean = true) => {
  const isEnabled = useRef(enabled);
  const lastHoverTime = useRef(0);
  const throttleDelay = 100; // ms between hover sounds

  useEffect(() => {
    isEnabled.current = enabled;
  }, [enabled]);

  const playClick = useCallback(() => {
    if (isEnabled.current) {
      generateSound('click', 0.08);
    }
  }, []);

  const playHover = useCallback(() => {
    const now = Date.now();
    if (isEnabled.current && now - lastHoverTime.current > throttleDelay) {
      lastHoverTime.current = now;
      generateSound('hover', 0.04);
    }
  }, []);

  const playSuccess = useCallback(() => {
    if (isEnabled.current) {
      generateSound('success', 0.1);
    }
  }, []);

  const playWhoosh = useCallback(() => {
    if (isEnabled.current) {
      generateSound('whoosh', 0.06);
    }
  }, []);

  const playAmbient = useCallback(() => {
    if (isEnabled.current) {
      generateSound('ambient', 0.03);
    }
  }, []);

  return {
    playClick,
    playHover,
    playSuccess,
    playWhoosh,
    playAmbient,
  };
};

// Sound context for global access
import { createContext, useContext } from 'react';

interface SoundContextType {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  playClick: () => void;
  playHover: () => void;
  playSuccess: () => void;
  playWhoosh: () => void;
  playAmbient: () => void;
}

export const SoundContext = createContext<SoundContextType | null>(null);

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    // Return no-op functions if context is not available
    return {
      enabled: false,
      setEnabled: () => {},
      playClick: () => {},
      playHover: () => {},
      playSuccess: () => {},
      playWhoosh: () => {},
      playAmbient: () => {},
    };
  }
  return context;
};

export default useSoundEffects;
