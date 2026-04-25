import { motion } from 'framer-motion';

export default function WireframeAnimation() {
  const faceBaseClass = "absolute w-full h-full border border-outline-variant/80 bg-surface-container-lowest/5 flex items-center justify-center";
  
  const InnerSquare = () => <div className="w-[60%] h-[60%] border border-outline-variant/50 flex items-center justify-center">
    <div className="w-[20%] h-[20%] bg-outline-variant/20 rounded-full" />
  </div>;

  return (
    <div className="relative w-full h-full flex items-center justify-center opacity-60 pointer-events-none" style={{ perspective: '1200px' }}>
      
      {/* Decorative vertical lines */}
      <div className="absolute right-4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-outline-variant/30 to-transparent" />
      <div className="absolute right-12 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-outline-variant/10 to-transparent" />

      {/* Main 3D Wireframe */}
      <motion.div
        className="relative w-48 h-48"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* Front */}
        <div className={faceBaseClass} style={{ transform: 'translateZ(96px)' }}>
          <InnerSquare />
          <div className="absolute top-2 left-2 text-[8px] font-label-sm text-tertiary tracking-widest">FRONT_01</div>
        </div>
        {/* Back */}
        <div className={faceBaseClass} style={{ transform: 'translateZ(-96px) rotateY(180deg)' }}>
          <InnerSquare />
          <div className="absolute top-2 left-2 text-[8px] font-label-sm text-tertiary tracking-widest">BACK_02</div>
        </div>
        {/* Right */}
        <div className={faceBaseClass} style={{ transform: 'translateX(96px) rotateY(90deg)' }}>
          <InnerSquare />
          <div className="absolute top-2 left-2 text-[8px] font-label-sm text-tertiary tracking-widest">RIGHT_03</div>
        </div>
        {/* Left */}
        <div className={faceBaseClass} style={{ transform: 'translateX(-96px) rotateY(-90deg)' }}>
          <InnerSquare />
          <div className="absolute top-2 left-2 text-[8px] font-label-sm text-tertiary tracking-widest">LEFT_04</div>
        </div>
        {/* Top */}
        <div className={faceBaseClass} style={{ transform: 'translateY(-96px) rotateX(90deg)' }}>
          <InnerSquare />
          <div className="absolute top-2 left-2 text-[8px] font-label-sm text-tertiary tracking-widest">TOP_05</div>
        </div>
        {/* Bottom */}
        <div className={faceBaseClass} style={{ transform: 'translateY(96px) rotateX(-90deg)' }}>
          <InnerSquare />
          <div className="absolute top-2 left-2 text-[8px] font-label-sm text-tertiary tracking-widest">BOTTOM_06</div>
        </div>
      </motion.div>
      
      {/* Floating System Data */}
      <motion.div 
        className="absolute right-16 bottom-[30%] flex flex-col gap-1 text-right"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="font-label-sm text-[9px] text-tertiary tracking-[0.2em] border-b border-outline-variant/30 pb-1 mb-1">POD_PROGRAM_042</div>
        <span className="font-label-sm text-[10px] text-primary">XYZ: 45.2 // 12.8</span>
        <span className="font-label-sm text-[10px] text-primary">ROT: <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>ACTIVE</motion.span></span>
        <span className="font-label-sm text-[10px] text-primary">SYNC: 100%</span>
      </motion.div>

      {/* Decorative Crosshair */}
      <div className="absolute left-1/4 top-1/4 w-4 h-4 border-l border-t border-outline-variant/40" />
      <div className="absolute left-1/4 bottom-1/4 w-4 h-4 border-l border-b border-outline-variant/40" />
      
    </div>
  );
}
