import { motion } from 'framer-motion';

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      staggerChildren: 0.04
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.05 }
  }
};

export default function Typewriter({ text, className, delay = 0 }) {
  const customSentenceVariants = {
    ...sentenceVariants,
    visible: {
      ...sentenceVariants.visible,
      transition: {
        ...sentenceVariants.visible.transition,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.span
      className={className}
      variants={customSentenceVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((char, index) => (
        <motion.span key={`${char}-${index}`} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
