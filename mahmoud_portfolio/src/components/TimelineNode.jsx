import { motion } from 'framer-motion';

export default function TimelineNode({ node, isLast }) {
  return (
    <div className="relative flex flex-col items-center w-full max-w-4xl mx-auto group">
      {/* Connecting Line */}
      {!isLast && (
        <div className="absolute top-20 bottom-0 left-1/2 w-[1px] bg-[#4A4941]/20 dark:bg-[#DCD8C0]/10 hidden md:block" />
      )}
      
      {/* Mobile Connecting Line */}
      {!isLast && (
        <div className="absolute top-20 bottom-0 left-8 w-[1px] bg-[#4A4941]/20 dark:bg-[#DCD8C0]/10 md:hidden" />
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 mb-20 md:mb-32"
      >
        {/* Date Marker (Desktop Center) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-4 w-4 h-4 bg-[#F2F1E8] dark:bg-[#1A1915] border border-[#4A4941] dark:border-[#DCD8C0] rotate-45 z-20 group-hover:bg-[#4A4941] dark:group-hover:bg-[#DCD8C0] transition-colors" />

        {/* Node Content */}
        <div className="flex flex-col md:flex-row items-stretch w-full border border-[#4A4941]/20 dark:border-[#DCD8C0]/10 bg-[#F2F1E8]/50 dark:bg-[#1A1915]/50 backdrop-blur-sm group-hover:border-[#4A4941]/40 dark:group-hover:border-[#DCD8C0]/30 transition-all duration-300">
          
          {/* Square Image Container */}
          <div className="w-full md:w-64 aspect-square border-b md:border-b-0 md:border-r border-[#4A4941]/20 dark:border-[#DCD8C0]/10 overflow-hidden relative">
            <img 
              src={node.image} 
              alt={node.company} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
            />
            {/* NieR Decorative Corner */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#4A4941] dark:border-[#DCD8C0] opacity-30" />
          </div>

          {/* Text Content */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background Accent Text */}
            <div className="absolute -bottom-4 -right-4 text-[60px] font-bold text-[#4A4941]/5 dark:text-[#DCD8C0]/5 select-none pointer-events-none uppercase">
              {node.id}
            </div>

            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-['Space_Grotesk'] font-bold text-[#4A4941] dark:text-[#DCD8C0] tracking-wider uppercase">
                    {node.role}
                  </h3>
                  <p className="text-sm font-['Space_Grotesk'] text-[#4A4941]/60 dark:text-[#DCD8C0]/50 tracking-widest uppercase">
                    {node.company}
                  </p>
                </div>
                <div className="text-[10px] font-['Space_Grotesk'] text-[#4A4941] dark:text-[#DCD8C0] border border-[#4A4941]/30 dark:border-[#DCD8C0]/30 px-2 py-1 bg-[#DCD8C0]/20 dark:bg-[#4A4941]/20">
                  {node.date}
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-[#4A4941]/10 dark:bg-[#DCD8C0]/10" />
                <p className="pl-6 text-sm md:text-base text-[#4A4941]/80 dark:text-[#DCD8C0]/70 leading-relaxed font-['Inter']">
                  {node.historyText}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-[#4A4941]/10 dark:bg-[#DCD8C0]/10" />
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[#4A4941]/40 dark:bg-[#DCD8C0]/40" />
                <div className="w-2 h-2 border border-[#4A4941]/40 dark:border-[#DCD8C0]/40" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
