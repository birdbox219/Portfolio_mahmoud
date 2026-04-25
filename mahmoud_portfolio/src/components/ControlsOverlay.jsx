import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ControlsOverlay({ controls = [], gamepadSupported = false, onRequestFullscreen }) {
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // Auto-hide after 5 seconds
  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  // Show again on mouse movement near bottom
  useEffect(() => {
    if (dismissed) return;
    const handleMouseMove = (e) => {
      const nearBottom = e.clientY > window.innerHeight - 80;
      if (nearBottom && !visible) setVisible(true);
      if (!nearBottom && visible) {
        // Start hide timer again
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [visible, dismissed]);

  if (dismissed || controls.length === 0) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0 z-30 bg-background/90 backdrop-blur-sm border-t border-outline-variant px-4 py-3 flex items-center justify-between gap-4"
        >
          {/* Controls list */}
          <div className="flex items-center gap-4 flex-wrap">
            {controls.map((ctrl, i) => (
              <div key={i} className="flex items-center gap-1.5 font-label-sm text-label-sm">
                <span className="px-2 py-0.5 bg-surface-container border border-outline-variant text-on-surface font-mono text-[10px] tracking-wider">
                  {ctrl.key}
                </span>
                <span className="text-on-surface-variant">→</span>
                <span className="text-on-surface-variant uppercase">{ctrl.action}</span>
              </div>
            ))}
            {gamepadSupported && (
              <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-primary">
                <span className="material-symbols-outlined text-[14px]">gamepad</span>
                <span>GAMEPAD</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {onRequestFullscreen && (
              <button
                onClick={onRequestFullscreen}
                className="p-1.5 border border-outline-variant bg-surface hover:bg-surface-container transition-colors"
                title="Fullscreen"
              >
                <span className="material-symbols-outlined text-on-surface text-[16px]">fullscreen</span>
              </button>
            )}
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 border border-outline-variant bg-surface hover:bg-surface-container transition-colors"
              title="Dismiss"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-[16px]">close</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
