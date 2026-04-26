import { motion } from 'framer-motion';
import useMousePosition from '../hooks/useMousePosition';
import logoCircular from '../assets/logo_circular.png';

export default function BackgroundWatermark() {
  const { x, y } = useMousePosition();

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden flex items-center justify-center opacity-[0.04] dark:opacity-[0.07]">
      <motion.div
        className="w-[800px] h-[800px] flex items-center justify-center"
        animate={{
          rotate: 360,
          x: x * -30, // Subtle parallax
          y: y * -30,
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 120, // 2 minutes for a full rotation
            ease: "linear"
          },
          x: { type: "spring", stiffness: 50, damping: 20 },
          y: { type: "spring", stiffness: 50, damping: 20 }
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
