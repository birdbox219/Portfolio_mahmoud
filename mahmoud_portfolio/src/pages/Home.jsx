import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import Typewriter from '../components/Typewriter';
import { PORTFOLIO_DATA } from '../data';
import WireframeAnimation from '../components/WireframeAnimation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

export default function Home() {
  return (
    <PageWrapper>
      <main className="effect-scanlines flex-grow pt-[80px] pb-[40px] flex items-center min-h-screen px-4 md:pr-margin md:pl-[calc(256px+32px)] overflow-hidden relative">
        <div className="max-w-container-max w-full flex justify-between items-center relative">
          <motion.div 
            className="flex flex-col gap-stack-lg max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* System Output */}
            <motion.div variants={itemVariants} className="flex flex-col gap-unit border-l-2 border-outline-variant pl-4">
              <span className="font-label-sm text-label-sm text-tertiary">INITIALIZING SEQUENCE...</span>
              <span className="font-label-sm text-label-sm text-primary">ACCESS LEVEL: AUTHORIZED</span>
            </motion.div>
            
            {/* Hero Typography */}
            <motion.div variants={itemVariants} className="flex flex-col gap-stack-sm">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-[0.15em] uppercase border-b border-outline-variant pb-stack-sm inline-block w-fit">
                <Typewriter text={PORTFOLIO_DATA.home.title} delay={0.4} />
              </h1>
              <h2 className="font-label-md text-label-md text-on-surface-variant tracking-[0.2em] mt-stack-sm uppercase">
                <Typewriter text={PORTFOLIO_DATA.home.subtitle} delay={1.2} />
              </h2>
            </motion.div>
            
            {/* Value Proposition */}
            <motion.p variants={itemVariants} className="font-body-lg text-body-lg text-on-surface-variant max-w-xl border-l border-outline-variant pl-4 py-2 bg-surface-container-low/50">
              {PORTFOLIO_DATA.home.bio}
            </motion.p>
            
            {/* Action Area */}
            <motion.div variants={itemVariants} className="pt-stack-md">
              <Link
                to="/projects"
                className="bg-primary-container text-on-primary-container font-label-md text-label-md px-6 py-4 border border-outline-variant hover:bg-tertiary-container hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.15em] flex items-center gap-stack-sm group w-fit"
              >
                ACCESS ARCHIVE
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Side Animation */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
            <WireframeAnimation />
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
