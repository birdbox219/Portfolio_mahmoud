import { Link } from 'react-router-dom';
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } }
};

export default function Projects() {
  return (
    <PageWrapper>
      <main className="flex-grow pt-[80px] md:pl-64 pb-20 md:pb-[40px] flex justify-center bg-background min-h-screen">
        <div className="max-w-[1280px] w-full px-4 md:px-margin">
          <header className="mb-stack-lg border-b border-outline-variant pb-stack-sm">
            <h1 className="font-headline-lg text-headline-lg text-on-background tracking-widest uppercase">
              <Typewriter text="DATA_ARCHIVE // PROJECT_FILES" />
            </h1>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
            {/* Projects Grid Area (Bento Layout) */}
            <motion.div 
              className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {PORTFOLIO_DATA.projects.map((project) => (
                <motion.div key={project.id} variants={cardVariants}>
                  <Link to={`/projects/${project.id}`} className="bg-surface-container-low border border-outline-variant rounded-DEFAULT flex flex-col h-full min-h-[280px] hover:bg-surface-container transition-colors relative group block cursor-pointer">
                    <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-variant/30 relative z-30">
                      <span className="font-label-md text-label-md text-tertiary tracking-widest">[{project.id}]</span>
                      <span className={`px-2 py-1 border font-label-sm text-label-sm rounded-DEFAULT ${
                        project.status === 'ACTIVE' 
                          ? 'border-primary text-primary bg-primary/10' 
                          : 'border-outline-variant text-on-surface-variant bg-surface-variant/50'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex-grow p-4 flex flex-col justify-end relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent z-10"></div>
                      {project.id === '004' && <div className="absolute inset-0 bg-gradient-to-br from-tertiary-container/40 to-surface-container-highest/20 mix-blend-multiply z-15"></div>}
                      <img 
                        alt={project.title} 
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                          project.status === 'ARCHIVED' 
                            ? 'opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0' 
                            : 'opacity-60 mix-blend-luminosity group-hover:mix-blend-normal'
                        }`} 
                        src={project.image}
                      />
                      <div className="relative z-20">
                        <h2 className="font-body-lg text-body-lg text-on-surface font-semibold mb-1 uppercase tracking-wider bg-surface-container-low/80 backdrop-blur-sm inline-block px-2">{project.title}</h2>
                        <div className="font-label-md text-label-md text-on-surface-variant bg-surface-container-low/80 backdrop-blur-sm inline-block px-2">Category: {project.category}</div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Status Side Panel */}
            <motion.aside 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-4 lg:col-span-3 flex flex-col gap-stack-md sticky top-[100px]"
            >
              <div className="bg-surface border border-outline-variant p-6 rounded-DEFAULT shadow-sm">
                <h3 className="font-label-md text-label-md text-on-surface tracking-widest uppercase mb-stack-md border-b border-outline-variant pb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">monitoring</span>
                  DATA_TELEMETRY
                </h3>
                <div className="flex flex-col gap-stack-sm mb-stack-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-body-md text-body-md text-on-surface-variant">TOTAL_RECORDS</span>
                    <span className="font-label-md text-label-md text-primary bg-primary/10 px-2 py-1 rounded-DEFAULT">{PORTFOLIO_DATA.projects.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body-md text-body-md text-on-surface-variant">LAST_SYNC</span>
                    <span className="font-label-md text-label-md text-on-surface tracking-wider">11945.02.14</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body-md text-body-md text-on-surface-variant">INTEGRITY</span>
                    <span className="font-label-md text-label-md text-tertiary">99.9%</span>
                  </div>
                </div>
                <h4 className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase mb-2">RESOURCE_ALLOCATION</h4>
                <div className="flex flex-col gap-2">
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface-variant">
                      <span>COMPUTE</span>
                      <span>78%</span>
                    </div>
                    <div className="h-[4px] bg-surface-variant rounded-full overflow-hidden w-full flex">
                      <div className="h-full bg-primary w-[78%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface-variant">
                      <span>STORAGE</span>
                      <span>42%</span>
                    </div>
                    <div className="h-[4px] bg-surface-variant rounded-full overflow-hidden w-full flex">
                      <div className="h-full bg-tertiary w-[42%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface-variant">
                      <span>BANDWIDTH</span>
                      <span>91%</span>
                    </div>
                    <div className="h-[4px] bg-surface-variant rounded-full overflow-hidden w-full flex">
                      <div className="h-full bg-on-surface-variant w-[91%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
