import { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { PORTFOLIO_DATA } from '../data';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', label: 'SYSTEM_BOOT', icon: 'power_settings_new' },
  { path: '/projects', label: 'DATA_ARCHIVE', icon: 'folder_open' },
  { path: '/skills', label: 'SYSTEM_STATUS', icon: 'analytics' },
  { path: '/profile', label: 'PERSONNEL_PROFILE', icon: 'account_circle' },
  { path: '/terminal', label: 'TERMINAL_SESSION', icon: 'terminal' },
];

export default function TopNavBar() {
  const { isAudioEnabled, toggleAudio } = useAudio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="bg-[#F2F1E8] dark:bg-[#1A1915] text-[#4A4941] dark:text-[#DCD8C0] font-['Space_Grotesk'] uppercase tracking-tight text-xs border-b border-[#4A4941]/20 dark:border-[#DCD8C0]/10 flex justify-between items-center w-full px-4 md:px-8 py-4 fixed top-0 z-50 transition-colors">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-[#DCD8C0] dark:hover:bg-[#4A4941] transition-colors rounded-DEFAULT"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          <span className="text-sm md:text-lg font-bold tracking-widest text-[#4A4941] dark:text-[#DCD8C0] whitespace-nowrap">
            MAHMOUD_ELSAIED <span className="hidden sm:inline">// PORTFOLIO</span>
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Resume Download */}
            <a
              href={PORTFOLIO_DATA.operator.resumeUrl}
              download
              className="flex items-center gap-1 md:gap-2 hover:bg-[#DCD8C0] dark:hover:bg-[#4A4941] transition-colors px-2 md:px-3 py-2 rounded-DEFAULT opacity-70 duration-75 border border-transparent hover:border-current"
            >
              <span className="material-symbols-outlined text-[20px]">
                download
              </span>
              <span className="font-label-sm mt-0.5 tracking-[0.1em] hidden sm:inline">
                RESUME
              </span>
            </a>

            <button
              onClick={toggleAudio}
              className="flex items-center gap-1 md:gap-2 hover:bg-[#DCD8C0] dark:hover:bg-[#4A4941] transition-colors px-2 md:px-3 py-2 rounded-DEFAULT opacity-70 duration-75"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isAudioEnabled ? 'volume_up' : 'volume_off'}
              </span>
              <span className="font-label-sm mt-0.5 tracking-[0.1em] hidden md:inline">
                AUDIO: {isAudioEnabled ? 'ON' : 'OFF'}
              </span>
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <button className="hover:bg-[#DCD8C0] dark:hover:bg-[#4A4941] transition-colors p-2 rounded-DEFAULT opacity-70 duration-75">
                <span className="material-symbols-outlined text-[20px]">language</span>
              </button>
              <button className="hover:bg-[#DCD8C0] dark:hover:bg-[#4A4941] transition-colors p-2 rounded-DEFAULT opacity-70 duration-75">
                <span className="material-symbols-outlined text-[20px]">wifi</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#F2F1E8] dark:bg-[#1A1915] md:hidden pt-24 px-8 overflow-y-auto"
          >
            <div className="flex flex-col gap-8">
              <div className="border-b border-[#4A4941]/20 dark:border-[#DCD8C0]/20 pb-6">
                <div className="text-[#4A4941] dark:text-[#DCD8C0] font-bold text-xl uppercase tracking-widest">{PORTFOLIO_DATA.operator.name}</div>
                <div className="text-[#4A4941]/60 dark:text-[#DCD8C0]/50 text-xs mt-1 uppercase tracking-tighter">{PORTFOLIO_DATA.operator.status}</div>
              </div>

              <nav>
                <ul className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-4 p-4 rounded-DEFAULT transition-all font-['Space_Grotesk'] uppercase tracking-[0.2em] text-sm ${active
                            ? 'bg-[#4A4941] text-[#F2F1E8] dark:bg-[#DCD8C0] dark:text-[#1A1915]'
                            : 'text-[#4A4941]/70 dark:text-[#DCD8C0]/60 hover:bg-[#DCD8C0]/40 dark:hover:bg-[#4A4941]/40'
                            }`}
                        >
                          <span className="material-symbols-outlined text-[24px]">
                            {item.icon}
                          </span>
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-12 flex flex-col gap-4 text-[#4A4941]/40 dark:text-[#DCD8C0]/30 text-[10px] uppercase tracking-widest">
                <div>SYSTEM_VERSION: 1.0.42</div>
                <div>LAST_SYNC: 11945.02.14</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
