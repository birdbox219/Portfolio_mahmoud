import { motion } from 'framer-motion';

const pageVariants = {
  initial: { 
    opacity: 0, 
    clipPath: 'inset(50% 0 50% 0)', // Slices open from middle
    filter: 'blur(4px)'
  },
  in: { 
    opacity: 1, 
    clipPath: 'inset(0% 0 0% 0)', 
    filter: 'blur(0px)',
    transition: { duration: 0.3, ease: 'easeOut' } 
  },
  out: { 
    opacity: 0, 
    clipPath: 'inset(0% 0 100% 0)', // Slices up to exit
    filter: 'blur(4px)',
    transition: { duration: 0.15, ease: 'easeIn' } 
  }
};

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="flex flex-col flex-grow w-full relative z-10"
    >
      {children}
    </motion.div>
  );
}
