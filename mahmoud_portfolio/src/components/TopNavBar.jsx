export default function TopNavBar() {
  return (
    <header className="bg-[#F2F1E8] dark:bg-[#1A1915] text-[#4A4941] dark:text-[#DCD8C0] font-['Space_Grotesk'] uppercase tracking-tight text-xs border-b border-[#4A4941]/20 dark:border-[#DCD8C0]/10 flex justify-between items-center w-full px-8 py-4 fixed top-0 z-50 transition-colors">
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold tracking-widest text-[#4A4941] dark:text-[#DCD8C0]">
          AUTOMATA_OS // PORTFOLIO
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 hidden md:flex">
          <button className="hover:bg-[#DCD8C0] dark:hover:bg-[#4A4941] transition-colors p-2 rounded-DEFAULT opacity-70 duration-75">
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
          <button className="hover:bg-[#DCD8C0] dark:hover:bg-[#4A4941] transition-colors p-2 rounded-DEFAULT opacity-70 duration-75">
            <span className="material-symbols-outlined text-[20px]">language</span>
          </button>
          <button className="hover:bg-[#DCD8C0] dark:hover:bg-[#4A4941] transition-colors p-2 rounded-DEFAULT opacity-70 duration-75">
            <span className="material-symbols-outlined text-[20px]">wifi</span>
          </button>
        </div>
      </div>
    </header>
  );
}
