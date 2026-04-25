export default function Footer() {
  return (
    <footer className="hidden md:flex bg-[#F2F1E8] dark:bg-[#1A1915] text-[#4A4941] dark:text-[#DCD8C0] font-['Space_Grotesk'] text-[10px] uppercase font-mono border-t border-[#4A4941]/20 dark:border-[#DCD8C0]/10 fixed bottom-0 w-full z-50 justify-between px-8 py-2 md:pl-[280px]">
      <div className="opacity-80">© 11945 // YORHA_CONSTRUCTION_ARCHIVE</div>
      <div className="flex gap-6 opacity-60">
        <span className="hover:text-primary transition-colors cursor-pointer">VER_1.0.4</span>
        <span className="hover:text-primary transition-colors cursor-pointer">LATENCY_32ms</span>
        <span className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block"></span> CRC_OK
        </span>
      </div>
    </footer>
  );
}
