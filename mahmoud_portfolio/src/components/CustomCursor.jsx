import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { playHover, playClick } = useAudio();

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if we are hovering an interactive element
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovering(true);
        playHover();
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseClick = (e) => {
      playClick();
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleMouseClick);
    };
  }, [playHover, playClick]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: mousePosition.x - 12, // center the 24x24 cursor
        y: mousePosition.y - 12,
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 45 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="relative w-6 h-6 flex items-center justify-center"
      >
        {/* Simple Reticle SVG */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
          <path d="M12 2v6m0 8v6M2 12h6m8 0h6" stroke="currentColor" strokeWidth="1" />
          <rect x="8" y="8" width="8" height="8" stroke="currentColor" strokeWidth="1" />
        </svg>
        
        {/* Inner dot when hovering */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0 }}
          className="absolute w-1 h-1 bg-white"
        />
      </motion.div>
    </motion.div>
  );
}
