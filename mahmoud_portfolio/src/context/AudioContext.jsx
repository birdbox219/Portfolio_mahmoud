/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import { initAudio, playHoverSound, playClickSound } from '../utils/audioSystem';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false); // Default off so browser doesn't block it until user interaction

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled(prev => {
      const newState = !prev;
      if (newState) {
        initAudio(); // Initialize audio context on first user interaction
      }
      return newState;
    });
  }, []);

  const playHover = useCallback(() => {
    if (isAudioEnabled) playHoverSound();
  }, [isAudioEnabled]);

  const playClick = useCallback(() => {
    if (isAudioEnabled) playClickSound();
  }, [isAudioEnabled]);

  return (
    <AudioContext.Provider value={{ isAudioEnabled, toggleAudio, playHover, playClick }}>
      {children}
    </AudioContext.Provider>
  );
};
