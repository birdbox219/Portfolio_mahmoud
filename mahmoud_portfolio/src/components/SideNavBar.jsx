import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';

const navItems = [
  { path: '/', label: 'SYSTEM_BOOT', icon: 'power_settings_new' },
  { path: '/projects', label: 'DATA_ARCHIVE', icon: 'folder_open' },
  { path: '/projects/001', label: 'PROJECT_LOG', icon: 'receipt_long' },
  { path: '/skills', label: 'SYSTEM_STATUS', icon: 'analytics' },
  { path: '/profile', label: 'PERSONNEL_PROFILE', icon: 'account_circle' },
  { path: '/terminal', label: 'TERMINAL_SESSION', icon: 'terminal' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } }
};

export default function SideNavBar() {
  const location = useLocation();

  // Helper function to check if the current path matches the item path
  // Projects detail needs exact matching, while others can be partial if nested
  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    if (path === '/projects' && location.pathname.startsWith('/projects/')) return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="hidden md:flex fixed left-0 top-0 h-full z-40 pt-20 border-r w-64 bg-[#F2F1E8] dark:bg-[#1A1915] border-[#4A4941]/20 dark:border-[#DCD8C0]/10 font-['Space_Grotesk'] uppercase tracking-widest text-[11px] flex-col">
      <div className="p-6 border-b border-[#4A4941]/10 dark:border-[#DCD8C0]/10 mb-4">
        <div className="w-12 h-12 bg-primary-container border border-outline-variant flex items-center justify-center mb-3">
          <img
            src={PORTFOLIO_DATA.about.image}
            alt="Operator"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-[#4A4941] dark:text-[#DCD8C0] font-bold text-sm">{PORTFOLIO_DATA.operator.name}</div>
        <div className="text-[#4A4941]/60 dark:text-[#DCD8C0]/50 text-[9px] mt-1">{PORTFOLIO_DATA.operator.status}</div>
      </div>
      <motion.ul
        className="flex flex-col w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <motion.li key={item.path} variants={itemVariants}>
              <Link
                to={item.path}
                className={`p-3 flex items-center gap-3 transition-all duration-75 border-b border-[#4A4941]/5 dark:border-[#DCD8C0]/5 hover:bg-[#DCD8C0]/40 dark:hover:bg-[#4A4941]/40 ${active
                    ? 'bg-[#4A4941] text-[#F2F1E8] dark:bg-[#DCD8C0] dark:text-[#1A1915] opacity-70 translate-x-1'
                    : 'text-[#4A4941]/60 dark:text-[#DCD8C0]/50'
                  }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
