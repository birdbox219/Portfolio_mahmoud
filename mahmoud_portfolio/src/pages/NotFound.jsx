import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimationControls } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

// --- Utility Components ---

// Decryption Effect Component
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+';
const DecryptedText = ({ text, delay = 0, duration = 1000, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime - delay;
      
      if (progress < 0) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      
      if (progress >= duration) {
        setDisplayText(text);
        return;
      }
      
      const revealRatio = progress / duration;
      const revealCount = Math.floor(revealRatio * text.length);
      
      let scrambled = '';
      for (let i = 0; i < text.length; i++) {
        if (i < revealCount) {
          scrambled += text[i];
        } else if (text[i] === ' ') {
          scrambled += ' ';
        } else {
          scrambled += characters[Math.floor(Math.random() * characters.length)];
        }
      }
      
      setDisplayText(scrambled);
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [text, delay, duration]);

  return <span className={className}>{displayText}</span>;
};

// Dynamic Hex Dump Component
const HexDump = () => {
  const generateLines = () => {
    return Array.from({length: 15}).map((_, i) => 
      `0x${Math.random().toString(16).slice(2, 10).toUpperCase()} F${i % 9} ${Math.random() > 0.5 ? '00' : 'FF'} ${Math.random().toString(16).slice(2, 6).toUpperCase()}`
    );
  };

  const [lines, setLines] = useState(generateLines);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(generateLines());
    }, 2000); // Update hex dump every 2 seconds for a live feel

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 right-4 font-mono text-[10px] text-on-surface/10 pointer-events-none text-right hidden lg:block leading-tight select-none">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
};


export default function NotFound() {
  const [isGlitching, setIsGlitching] = useState(false);
  const containerControls = useAnimationControls();

  // Dynamic Random Glitch Event Loop
  useEffect(() => {
    let timeoutId;
    
    const triggerGlitch = () => {
      setIsGlitching(true);
      
      // Random violent shake
      containerControls.start({
        x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, 0],
        y: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, 0],
        skewX: [(Math.random() - 0.5) * 10, 0],
        filter: [
          'hue-rotate(90deg) contrast(150%)', 
          'hue-rotate(-90deg) contrast(200%)', 
          'hue-rotate(0deg) contrast(100%)'
        ],
        transition: { duration: 0.2, ease: "linear" }
      });

      // Turn off glitch shortly after
      setTimeout(() => setIsGlitching(false), 100 + Math.random() * 200);
      
      // Schedule next glitch randomly (between 2s and 6s)
      timeoutId = setTimeout(triggerGlitch, 2000 + Math.random() * 4000);
    };

    // Start first glitch
    timeoutId = setTimeout(triggerGlitch, 1500);

    return () => clearTimeout(timeoutId);
  }, [containerControls]);

  return (
    <PageWrapper>
      <main className="flex-grow pb-[40px] flex items-center justify-center min-h-screen px-margin overflow-hidden relative">
        <HexDump />
        
        <motion.div 
          animate={containerControls}
          className={`max-w-container-max w-full flex flex-col items-center text-center relative ${isGlitching ? 'mix-blend-difference' : ''}`}
        >
          
          {/* Warning Banner */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="w-full max-w-2xl bg-error/10 border-y border-error/30 py-4 mb-stack-lg relative overflow-hidden"
          >
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 bg-error/5 skew-x-12"
            />
            <span className="font-label-md text-error tracking-[0.4em] uppercase relative z-10">
              <DecryptedText text="[ CRITICAL_SYSTEM_ANOMALY ]" delay={200} duration={1200} />
            </span>
          </motion.div>

          {/* Glitch 404 */}
          <div className="relative mb-stack-md">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-headline-lg text-[120px] md:text-[180px] leading-none text-on-surface opacity-20 select-none tracking-tighter"
            >
              404
            </motion.h1>
            <motion.div 
              animate={{ 
                x: isGlitching ? [-5, 5, -3, 6, 0] : [-1, 1, 0],
                opacity: isGlitching ? [1, 0.5, 1] : [1, 0.9, 1],
                scale: isGlitching ? [1, 1.05, 1] : 1
              }}
              transition={{ 
                repeat: Infinity, 
                duration: isGlitching ? 0.05 : 0.2, 
                repeatType: "reverse" 
              }}
              className="absolute inset-0 flex items-center justify-center mix-blend-screen"
            >
               <h1 className={`font-headline-lg text-[120px] md:text-[180px] leading-none text-error/60 tracking-tighter ${isGlitching ? 'text-red-500 blur-[1px]' : ''}`}>
                404
              </h1>
            </motion.div>
          </div>

          {/* Error Message */}
          <div className="max-w-md flex flex-col gap-unit">
            <p className="font-label-md text-on-surface-variant uppercase tracking-widest border-b border-outline-variant pb-2">
              <DecryptedText text="Sector_Access:" delay={1000} duration={800} />{" "}
              <span className="text-error font-bold">
                <DecryptedText text="DENIED" delay={1800} duration={400} />
              </span>
            </p>
            <p className="font-body-md text-on-surface-variant/70 leading-relaxed italic min-h-[60px]">
               <DecryptedText 
                 text="&quot;The requested data fragment has been purged or moved to a restricted memory sector. Terminal link lost.&quot;" 
                 delay={2200} 
                 duration={2000} 
               />
            </p>
          </div>

          {/* Action Area */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5 }} // Wait for decryption to mostly finish
            className="mt-stack-lg flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2 text-label-sm text-on-surface-variant/50">
              <span className="material-symbols-outlined text-[14px] animate-[spin_2s_linear_infinite]">settings</span>
              <span>INITIALIZING RECOVERY PROTOCOL...</span>
            </div>
            
            <Link
              to="/"
              className="bg-on-surface text-surface font-label-md text-label-md px-10 py-4 border border-outline-variant hover:bg-error hover:text-white transition-all uppercase tracking-[0.2em] group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">terminal</span>
                REBOOT_SYSTEM
              </span>
              <motion.div 
                className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
              />
            </Link>
          </motion.div>

        </motion.div>
      </main>
    </PageWrapper>
  );
}
