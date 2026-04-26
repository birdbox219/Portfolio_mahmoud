import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import logoCircular from '../assets/logo_circular.png';

const PARALLAX_FACTOR = 30;
const SPRING_CONFIG = { stiffness: 40, damping: 30, mass: 1 }; // Over-damped to prevent overshoot

export default function BackgroundWatermark() {
  const location = useLocation();
  const isTransitioning = useRef(false);

  // Raw mouse values (not React state — no re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed springs derived from the raw values
  const springX = useSpring(mouseX, SPRING_CONFIG);
  const springY = useSpring(mouseY, SPRING_CONFIG);

  // Map springs → parallax offset
  const parallaxX = useTransform(springX, (v) => v * -PARALLAX_FACTOR);
  const parallaxY = useTransform(springY, (v) => v * -PARALLAX_FACTOR);

  // Track mouse without React state
  useEffect(() => {
    const onMouseMove = (e) => {
      if (isTransitioning.current) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [mouseX, mouseY]);

  // Freeze parallax during route transitions, then gently resume
  useEffect(() => {
    isTransitioning.current = true;

    // Reset to center to avoid any jump
    mouseX.set(0);
    mouseY.set(0);

    // Re-enable after the page transition finishes (matches PageWrapper duration)
    const timer = setTimeout(() => {
      isTransitioning.current = false;
    }, 400);

    return () => clearTimeout(timer);
  }, [location.pathname, mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden flex items-center justify-center opacity-[0.04] dark:opacity-[0.07]">
      <motion.div
        className="w-[800px] h-[800px] flex items-center justify-center"
        animate={{ rotate: 360 }}
        style={{ x: parallaxX, y: parallaxY }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 120,
            ease: "linear"
          }
        }}
      >
        <img 
          src={logoCircular} 
          alt="" 
          className="w-full h-full object-contain grayscale"
        />
      </motion.div>
    </div>
  );
}
