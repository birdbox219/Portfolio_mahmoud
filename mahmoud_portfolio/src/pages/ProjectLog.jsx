import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import Typewriter from '../components/Typewriter';
import TimelineNode from '../components/TimelineNode';
import { PORTFOLIO_DATA } from '../data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function ProjectLog() {
  return (
    <PageWrapper>
      <main className="flex-grow pb-20 md:pb-[40px] flex justify-center min-h-screen overflow-x-hidden">
        <div className="max-w-[1280px] w-full px-4 md:px-margin">
          
          <header className="mb-stack-lg border-b border-outline-variant pb-stack-sm flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <h1 className="font-headline-lg text-headline-lg text-on-background tracking-widest uppercase">
              <Typewriter text="PROJECT_LOG // CAREER_HISTORY" />
            </h1>
            <div className="font-label-sm text-label-sm text-on-surface-variant tracking-[0.2em] mb-1">
              STATUS: [OPERATIONAL] // VERSION: 1.0.42
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Timeline Column */}
            <motion.div 
              className="lg:col-span-9 pt-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {PORTFOLIO_DATA.projectLog.map((node, index) => (
                <TimelineNode 
                  key={node.id} 
                  node={node} 
                  isLast={index === PORTFOLIO_DATA.projectLog.length - 1} 
                />
              ))}
            </motion.div>
            
            {/* Status Side Panel */}
            <motion.aside 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3 flex flex-col gap-stack-md sticky top-[100px]"
            >
              <div className="bg-surface border border-outline-variant p-6 rounded-DEFAULT shadow-sm relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-5 pointer-events-none">
                  <div className="w-full h-full border-t-8 border-r-8 border-[#4A4941]" />
                </div>

                <h3 className="font-label-md text-label-md text-on-surface tracking-widest uppercase mb-stack-md border-b border-outline-variant pb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">history</span>
                  RECORD_METADATA
                </h3>

                <div className="flex flex-col gap-stack-sm mb-stack-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-body-md text-body-md text-on-surface-variant">LOG_ENTRIES</span>
                    <span className="font-label-md text-label-md text-primary bg-primary/10 px-2 py-1 rounded-DEFAULT">
                      {PORTFOLIO_DATA.projectLog.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body-md text-body-md text-on-surface-variant">SYSTEM_TIME</span>
                    <span className="font-label-md text-label-md text-on-surface tracking-wider">
                      {new Date().getFullYear()}.{new Date().getMonth() + 1}.{new Date().getDate()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body-md text-body-md text-on-surface-variant">SYNC_STATUS</span>
                    <span className="font-label-md text-label-md text-tertiary uppercase animate-pulse">Synced</span>
                  </div>
                </div>

                <div className="border-t border-outline-variant/30 pt-4 mt-2">
                  <p className="font-label-sm text-[9px] text-[#4A4941]/40 dark:text-[#DCD8C0]/30 leading-tight uppercase tracking-tighter">
                    NOTICE: ALL LOG ENTRIES ARE SUBJECT TO ARCHIVAL REVIEW. DATA INTEGRITY IS MONITORED BY UNIT_042.
                  </p>
                </div>
              </div>

              {/* Decorative System Card */}
              <div className="bg-secondary-container/30 border border-outline-variant/50 p-4 rounded-DEFAULT">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                  <span className="font-label-sm text-label-sm text-on-secondary-container tracking-widest uppercase">Real-time Stream</span>
                </div>
                <div className="font-['Space_Grotesk'] text-[10px] text-on-secondary-container/60 break-all leading-none space-y-1">
                  <div>0x42_BOOT_SEQUENCE_INIT...</div>
                  <div>0x42_LOAD_CAREER_ARCHIVE...</div>
                  <div>0x42_NODE_CONNECTION_STABLE...</div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
