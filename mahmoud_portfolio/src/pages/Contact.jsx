import { PORTFOLIO_DATA } from '../data';
import PageWrapper from '../components/PageWrapper';

export default function Contact() {
  return (
    <PageWrapper>
    <main className="pt-[80px] md:pl-64 min-h-screen pb-[60px] relative">
      <div className="px-4 md:px-margin max-w-container-max mx-auto h-full flex flex-col">
        {/* Context Header */}
        <div className="mb-stack-lg border-b border-outline-variant pb-stack-sm flex justify-between items-end">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-background uppercase tracking-tight">COMM_LINK</h1>
            <p className="font-label-md text-label-md text-on-surface-variant mt-unit">SECURE DIRECTORY // CONTACT PROTOCOL</p>
          </div>
          <div className="font-label-sm text-label-sm text-primary opacity-60 hidden sm:block">
            [ ENC_KEY: 9A-F4-2B ]
          </div>
        </div>

        {/* Terminal Interface */}
        <div className="border border-outline-variant bg-surface-container-low rounded-DEFAULT flex flex-col flex-grow shadow-sm relative overflow-hidden scanlines">
          {/* Subtle scanline effect inline CSS */}
          <style>{`
            .scanlines::before {
                content: " ";
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
                z-index: 2;
                background-size: 100% 4px, 6px 100%;
                pointer-events: none;
            }
          `}</style>

          {/* Terminal Header Bar */}
          <div className="bg-surface-variant border-b border-outline-variant px-4 py-2 flex justify-between items-center z-10 relative">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant text-[16px]">terminal</span>
              <span className="font-label-md text-label-md text-on-surface uppercase">TERMINAL_SESSION.exe</span>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 border border-outline-variant bg-background"></div>
              <div className="w-3 h-3 border border-outline-variant bg-background"></div>
              <div className="w-3 h-3 border border-outline-variant bg-primary-container"></div>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-stack-lg flex flex-col flex-grow z-10 relative">
            {/* Network Links */}
            <div className="mb-stack-lg border-l-2 border-primary-container pl-stack-md">
              <div className="font-label-sm text-label-sm text-on-surface-variant mb-stack-sm">&gt; IDENTIFY_TARGET_NODES:</div>
              <div className="flex flex-wrap gap-stack-md">
                {PORTFOLIO_DATA.contact.links.map((link) => (
                  <a key={link.name} className="border border-outline-variant bg-surface px-4 py-2 font-label-md text-label-md text-on-surface hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center gap-2" href={link.url}>
                    <span className="material-symbols-outlined text-[14px]">{link.icon}</span> {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <div className="mb-stack-lg">
              <div className="font-label-sm text-label-sm text-on-surface-variant mb-stack-md">&gt; INITIATE_MESSAGE_PROTOCOL:</div>
              <form className="flex flex-col gap-stack-md bg-surface p-stack-md border border-outline-variant">
                <div className="flex flex-col gap-unit">
                  <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="operator_name">INPUT_NAME // STRING</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 font-label-md text-label-md text-primary">&gt;</span>
                    <input className="w-full bg-surface-container-lowest border border-outline-variant pl-8 pr-4 py-3 font-label-md text-label-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-none transition-all placeholder:text-outline-variant" id="operator_name" placeholder="ENTER_DESIGNATION" type="text" />
                  </div>
                </div>
                <div className="flex flex-col gap-unit">
                  <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="message_payload">MESSAGE_PAYLOAD // TEXT</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 font-label-md text-label-md text-primary">&gt;</span>
                    <textarea className="w-full bg-surface-container-lowest border border-outline-variant pl-8 pr-4 py-3 font-label-md text-label-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-none transition-all placeholder:text-outline-variant resize-none" id="message_payload" placeholder="ENTER_TRANSMISSION_DATA..." rows="5"></textarea>
                  </div>
                </div>
                <button className="mt-stack-sm self-start bg-on-surface text-surface hover:bg-primary hover:text-on-primary px-6 py-3 font-label-md text-label-md border border-on-surface transition-colors flex items-center gap-2" type="submit">
                  <span className="material-symbols-outlined text-[16px]">send</span> [ EXECUTE_TRANSMISSION ]
                </button>
              </form>
            </div>

            {/* System Logs */}
            <div className="mt-auto pt-stack-md border-t border-outline-variant/50">
              <div className="font-label-sm text-label-sm text-on-surface-variant mb-unit">SYSTEM_LOG:</div>
              <div className="flex flex-col gap-1 font-label-md text-label-md text-primary opacity-80">
                <div><span className="opacity-50">0x00A1:</span> ESTABLISHING SECURE CONNECTION...</div>
                <div><span className="opacity-50">0x00A2:</span> VERIFYING PROTOCOLS... OK</div>
                <div className="text-on-surface"><span className="opacity-50 text-primary">0x00A3:</span> READY FOR USER INPUT_<span className="animate-pulse">_</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </PageWrapper>
  );
}
