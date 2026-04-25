import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import Typewriter from '../components/Typewriter';
import { PORTFOLIO_DATA } from '../data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const barVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: 'circOut' } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
};

export default function Skills() {
  return (
    <PageWrapper>
      <main className="flex-1 p-margin pt-24 md:pl-64 max-w-container-max mx-auto w-full min-h-screen">
        <div className="mb-stack-lg">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-unit uppercase border-b border-outline-variant pb-2 inline-block">
            <Typewriter text="SYSTEM_STATUS" />
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant uppercase tracking-widest">Capabilities Readout</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Skills Bars */}
          <motion.div 
            className="lg:col-span-8 flex flex-col gap-stack-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {PORTFOLIO_DATA.skills.list.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants} className="bg-surface-container-low p-stack-md border border-outline-variant rounded-DEFAULT">
                <div className="flex justify-between items-end mb-unit">
                  <span className="font-label-md text-label-md text-on-surface uppercase">{skill.name}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">{skill.pct}%</span>
                </div>
                <div className="w-full h-[1px] bg-outline-variant relative">
                  <motion.div 
                    variants={barVariants} 
                    className="absolute top-0 left-0 h-[1px] bg-primary origin-left" 
                    style={{ width: `${skill.pct}%` }} 
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-[-2px] w-[5px] h-[5px] bg-primary rounded-full transform -translate-x-1/2"
                    style={{ left: `${skill.pct}%` }} 
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Right Column: System Efficiency */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
            className="lg:col-span-4 flex flex-col items-center justify-center p-stack-lg bg-surface-container border border-outline-variant rounded-DEFAULT relative overflow-hidden"
          >
            <div className="absolute top-4 left-4 font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase">
              DIAGNOSTIC
            </div>
            <div className="relative w-48 h-48 flex items-center justify-center mb-stack-md">
              {/* Background Circle */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle className="text-outline-variant" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="1"></circle>
                {/* Progress Circle (88%) */}
                <motion.circle 
                  className="text-primary" 
                  cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="2" 
                  strokeDasharray="283" 
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 34 }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                />
                {/* Inner decorative elements */}
                <circle className="text-outline-variant opacity-50" cx="50" cy="50" fill="none" r="35" stroke="currentColor" strokeDasharray="2 4" strokeWidth="0.5"></circle>
                <circle className="text-outline-variant opacity-30" cx="50" cy="50" fill="none" r="25" stroke="currentColor" strokeWidth="0.5"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline-lg text-headline-lg text-on-surface font-mono">
                  {PORTFOLIO_DATA.skills.efficiency}<span className="text-body-md">%</span>
                </span>
              </div>
            </div>
            <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-unit text-center">SYSTEM_EFFICIENCY</h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant text-center uppercase tracking-wider font-mono">Optimal Performance</p>
          </motion.div>
        </div>
      </main>
    </PageWrapper>
  );
}
