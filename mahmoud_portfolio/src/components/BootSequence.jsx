import { motion } from 'framer-motion';

const BOOT_LINES = [
  { code: "0x00F1", text: "VALIDATING MODULE INTEGRITY..." },
  { code: "0x00F2", text: "LOADING ASSET BUNDLES..." },
  { code: "0x00F3", text: "INITIALIZING RENDER PIPELINE..." },
  { code: "0x00F4", text: "ALLOCATING VRAM RESOURCES..." },
  { code: "0x00F5", text: "ESTABLISHING SIMULATION CONTEXT..." },
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

const lineVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.15, ease: 'easeOut' } }
};

export default function BootSequence({ onComplete }) {
  return (
    <motion.div
      className="absolute inset-0 z-50 bg-background flex flex-col items-center justify-center p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onAnimationComplete={() => {
        // After all stagger children finish, wait a beat then call onComplete
        setTimeout(() => onComplete?.(), 600);
      }}
    >
      {/* Terminal window chrome */}
      <div className="w-full max-w-xl border border-outline-variant bg-surface-container-low">
        {/* Header bar */}
        <div className="bg-surface-variant border-b border-outline-variant px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-on-surface-variant text-[14px]">terminal</span>
            <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">MODULE_LOADER.exe</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 border border-outline-variant bg-background"></div>
            <div className="w-2.5 h-2.5 border border-outline-variant bg-background"></div>
            <div className="w-2.5 h-2.5 border border-outline-variant bg-primary-container"></div>
          </div>
        </div>

        {/* Boot lines */}
        <div className="p-6 flex flex-col gap-2 font-mono">
          {BOOT_LINES.map((line, i) => (
            <motion.div
              key={i}
              variants={lineVariants}
              className="flex items-center gap-3 font-label-md text-label-md"
            >
              <span className="text-primary opacity-50">{line.code}:</span>
              <span className="text-on-surface">{line.text}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-primary ml-auto"
              >
                OK
              </motion.span>
            </motion.div>
          ))}

          {/* Final ready line */}
          <motion.div
            variants={lineVariants}
            className="flex items-center gap-2 font-label-md text-label-md text-primary mt-4 pt-3 border-t border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[14px]">play_arrow</span>
            <span>EXECUTION READY</span>
            <span className="animate-pulse">_</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
