import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { PORTFOLIO_DATA } from '../data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

export default function About() {
  return (
    <PageWrapper>
      <main className="md:ml-64 pt-24 pb-20 px-4 md:px-margin flex justify-center min-h-screen">
        <div className="w-full max-w-container-max flex flex-col gap-stack-lg">
          {/* Page Header */}
          <header className="border-b border-outline-variant pb-stack-md flex justify-between items-end">
            <div>
              <div className="font-label-sm text-label-sm text-primary uppercase mb-unit">SEC_LEVEL // 04</div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">PERSONNEL_PROFILE</h1>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-label-md text-label-md text-on-surface-variant bg-surface-container px-3 py-1 border border-outline-variant">
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
              STATUS_ONLINE
            </div>
          </header>
          {/* Bento Grid Layout */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-gutter"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Profile Image Component */}
            <motion.div variants={itemVariants} className="col-span-1 lg:col-span-4 bg-surface-container-low border border-outline-variant relative overflow-hidden flex flex-col group p-4 min-h-[300px]">
              <div className="font-label-sm text-label-sm text-on-surface-variant absolute top-4 left-4 z-10 bg-surface/80 px-2 border border-outline-variant/50 backdrop-blur-sm">VISUAL_RECORD // {PORTFOLIO_DATA.operator.id}</div>
              {/* Crosshair Grid Overlay */}
              <div className="absolute inset-4 border border-outline-variant/30 z-20 pointer-events-none flex items-center justify-center mix-blend-difference">
                <div className="w-full h-[1px] bg-outline-variant/40 relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-outline-variant/80 rounded-full"></div>
                </div>
                <div className="h-full w-[1px] bg-outline-variant/40 absolute left-1/2"></div>
              </div>
              {/* Image */}
              <div className="absolute inset-4 bg-surface-container-highest">
                <img alt="Profile Record" className="w-full h-full object-cover grayscale contrast-125 opacity-80 mix-blend-multiply transition-transform duration-700 group-hover:scale-105" src={PORTFOLIO_DATA.about.image}/>
              </div>
              {/* Bottom readout */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end">
                <div className="font-label-sm text-label-sm text-on-surface bg-surface/90 px-2 py-1 border border-outline-variant/50 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">fingerprint</span> BIOMETRIC_VERIFIED
                </div>
                <div className="font-label-sm text-label-sm text-on-surface bg-surface/90 px-2 py-1 border border-outline-variant/50">
                  COORD_SYNC
                </div>
              </div>
            </motion.div>
            {/* Info Blocks */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-gutter">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
                {/* Data Block 1 */}
                <motion.div variants={itemVariants} className="bg-surface-container-low/80 backdrop-blur-md border border-outline-variant p-stack-md flex flex-col relative overflow-hidden hover:bg-surface-container-low transition-colors">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary-container blur-2xl opacity-30"></div>
                  <div className="font-label-md text-label-md text-secondary mb-stack-md uppercase">DATA_ENTRY_01</div>
                  <div className="font-headline-md text-headline-md text-on-surface uppercase mb-unit">{PORTFOLIO_DATA.about.dataEntry01.label}</div>
                  <div className="font-body-lg text-body-lg text-on-surface-variant flex items-center gap-2 mt-auto">
                    <span className="w-1.5 h-1.5 bg-primary block"></span>
                    {PORTFOLIO_DATA.about.dataEntry01.value}
                  </div>
                </motion.div>
                {/* Data Block 2 */}
                <motion.div variants={itemVariants} className="bg-surface-container-low/80 backdrop-blur-md border border-outline-variant p-stack-md flex flex-col relative overflow-hidden hover:bg-surface-container-low transition-colors">
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-secondary-container blur-2xl opacity-40"></div>
                  <div className="font-label-md text-label-md text-secondary mb-stack-md uppercase">DATA_ENTRY_02</div>
                  <div className="font-headline-md text-headline-md text-on-surface uppercase mb-unit">{PORTFOLIO_DATA.about.dataEntry02.label}</div>
                  <div className="font-body-lg text-body-lg text-on-surface-variant flex items-center gap-2 mt-auto">
                    <span className="w-1.5 h-1.5 bg-secondary block"></span>
                    {PORTFOLIO_DATA.about.dataEntry02.value}
                  </div>
                </motion.div>
              </div>
              {/* Biography Block */}
              <motion.div variants={itemVariants} className="bg-surface-container-low/60 backdrop-blur-lg border border-outline-variant p-margin flex-grow relative overflow-hidden group">
                {/* Decorative bg */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 border-[1px] border-outline-variant/20 rounded-full opacity-50 pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
                <div className="absolute -right-10 -bottom-10 w-48 h-48 border-[1px] border-outline-variant/30 rounded-full opacity-50 pointer-events-none transition-transform duration-1000 delay-75 group-hover:scale-105"></div>
                <div className="flex items-center gap-3 border-b border-outline-variant/50 pb-stack-sm mb-stack-md">
                  <span className="material-symbols-outlined text-primary">history_edu</span>
                  <h2 className="font-label-md text-label-md text-primary uppercase tracking-widest">BIOGRAPHY_LOG</h2>
                </div>
                <div className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-3xl relative z-10">
                  {PORTFOLIO_DATA.about.biography.map((para, idx) => (
                    <p key={idx} className={idx === 0 ? "mb-stack-sm" : ""}>
                      {para}
                    </p>
                  ))}
                </div>
                {/* Technical readout decorative */}
                <div className="mt-stack-lg pt-stack-sm border-t border-outline-variant/30 flex gap-6 text-[10px] font-mono text-on-surface-variant/60 uppercase relative z-10">
                  <span>LAST_UPDATED: {PORTFOLIO_DATA.about.lastUpdated}</span>
                  <span>ENCRYPTION: AES_256_GCM</span>
                  <span>INTEGRITY_CHECK: PASSED</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </PageWrapper>
  );
}
