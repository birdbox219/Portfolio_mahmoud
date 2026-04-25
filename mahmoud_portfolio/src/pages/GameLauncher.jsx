import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import BootSequence from '../components/BootSequence';
import ControlsOverlay from '../components/ControlsOverlay';
import { PORTFOLIO_DATA } from '../data';

// States: STANDBY → BOOTING → LOADING → RUNNING
const STATES = {
  STANDBY: 'STANDBY',
  BOOTING: 'BOOTING',
  LOADING: 'LOADING',
  RUNNING: 'RUNNING',
};

export default function GameLauncher() {
  const { id } = useParams();
  const [gameState, setGameState] = useState(STATES.STANDBY);
  const [isMobile, setIsMobile] = useState(false);
  const [iframeSrc, setIframeSrc] = useState(null); // null = iframe not mounted yet
  const gameContainerRef = useRef(null);
  const iframeRef = useRef(null);

  // Find project
  const project = PORTFOLIO_DATA.projects.find(p => p.id === id);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 0);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If project not found or no embedUrl, redirect
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  if (!project.detail.embedUrl) {
    // No web build — redirect to itch.io
    window.open(project.detail.itchUrl, '_blank');
    return <Navigate to={`/projects/${id}`} replace />;
  }

  const { detail } = project;

  const handleExecute = () => {
    if (isMobile) {
      window.open(detail.itchUrl, '_blank');
      return;
    }
    // Start loading the iframe immediately when user clicks run,
    // but show the boot sequence animation on top
    setIframeSrc(detail.embedUrl);
    setGameState(STATES.BOOTING);
  };

  const handleBootComplete = () => {
    setGameState(STATES.LOADING);
  };

  // Auto-transition from LOADING → RUNNING after timeout
  // The itch.io embed onLoad fires on the wrapper page (not the game itself),
  // so we use a timed transition instead for a clean experience
  useEffect(() => {
    if (gameState !== STATES.LOADING) return;
    const timeout = setTimeout(() => {
      setGameState(STATES.RUNNING);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [gameState]);

  const handleExit = () => {
    // Reset iframe src to free memory, then reset state
    setIframeSrc(null);
    setGameState(STATES.STANDBY);
  };

  const handleFullscreen = useCallback(() => {
    if (gameContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        gameContainerRef.current.requestFullscreen();
      }
    }
  }, []);

  // Determine if the iframe should be visible (only in RUNNING state)
  const iframeVisible = gameState === STATES.RUNNING;

  return (
    <PageWrapper>
      <main className="md:ml-64 pt-20 pb-10 px-margin max-w-container-max min-h-screen flex flex-col mx-auto w-full">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[14px]">sports_esports</span>
              GAME_EXECUTION // {project.id}
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{project.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            {gameState === STATES.RUNNING && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleExit}
                className="bg-on-surface text-surface px-4 py-2 font-label-md text-label-md border border-on-surface hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">stop</span>
                EXIT_MODULE
              </motion.button>
            )}
            <Link
              to={`/projects/${project.id}`}
              className="px-3 py-2 border border-outline-variant font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              PROJECT_LOG
            </Link>
          </div>
        </div>

        {/* Game Container — 16:9 aspect ratio */}
        <div
          ref={gameContainerRef}
          className="relative w-full border border-outline-variant bg-surface-container-lowest overflow-hidden"
          style={{ aspectRatio: '16 / 9' }}
        >
          {/* STANDBY State */}
          {gameState === STATES.STANDBY && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background p-8 z-20">
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }}
              ></div>

              <div className="relative z-10 flex flex-col items-center gap-6 max-w-md text-center">
                {/* Game icon */}
                <div className="w-20 h-20 border border-outline-variant bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[36px]">sports_esports</span>
                </div>

                <div>
                  <h2 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-2">{project.title}</h2>
                  <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    {detail.classType} // {project.category}
                  </div>
                </div>

                {/* System warning */}
                <div className="w-full p-3 bg-surface-container-low border-l-2 border-secondary text-left">
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {isMobile
                      ? "⚠ THIS MODULE IS OPTIMIZED FOR DESKTOP BROWSERS"
                      : `⚠ ESTIMATED LOAD TIME: ${detail.estimatedLoadTime}`
                    }
                  </p>
                </div>

                {/* Controls preview */}
                {!isMobile && detail.controls.length > 0 && (
                  <div className="w-full p-3 bg-surface-container-low border border-outline-variant">
                    <div className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider">CONTROL_SCHEMA:</div>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {detail.controls.map((ctrl, i) => (
                        <div key={i} className="flex items-center gap-1 font-label-sm text-label-sm">
                          <span className="px-1.5 py-0.5 bg-surface border border-outline-variant text-on-surface font-mono text-[10px]">{ctrl.key}</span>
                          <span className="text-on-surface-variant text-[10px]">→ {ctrl.action}</span>
                        </div>
                      ))}
                      {detail.gamepadSupported && (
                        <div className="flex items-center gap-1 font-label-sm text-label-sm text-primary">
                          <span className="material-symbols-outlined text-[12px]">gamepad</span>
                          <span className="text-[10px]">SUPPORTED</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Execute button */}
                <button
                  onClick={handleExecute}
                  className="bg-on-surface text-surface px-8 py-4 font-label-md text-label-md border border-on-surface hover:bg-primary hover:text-on-primary transition-all flex items-center gap-3 group"
                >
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">play_arrow</span>
                  {isMobile ? "[ OPEN_ON_ITCH.IO ]" : "[ INITIALIZE_SIMULATION ]"}
                </button>

                {/* Itch.io fallback link */}
                <a
                  href={detail.itchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 underline-offset-4 hover:underline"
                >
                  <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                  VIEW_ON_ITCH.IO
                </a>
              </div>
            </div>
          )}

          {/* BOOTING State */}
          <AnimatePresence>
            {gameState === STATES.BOOTING && (
              <BootSequence onComplete={handleBootComplete} />
            )}
          </AnimatePresence>

          {/* LOADING State — sits above iframe so user never sees the raw iframe loading */}
          <AnimatePresence>
            {gameState === STATES.LOADING && (
              <motion.div
                className="absolute inset-0 z-40 bg-background flex flex-col items-center justify-center gap-4 cursor-pointer"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onClick={() => setGameState(STATES.RUNNING)}
              >
                <div className="font-label-md text-label-md text-primary uppercase tracking-widest flex items-center gap-2">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  >
                    LOADING_ASSETS...
                  </motion.span>
                </div>
                {/* Animated progress bar */}
                <div className="w-64 h-[2px] bg-outline-variant overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    style={{ width: '50%' }}
                  />
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">PLEASE STAND BY</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* iframe — mounted once via iframeSrc, never conditionally unmounted during play.
               Stays behind overlays (z-10) until RUNNING state reveals it.
               Uses CSS opacity for smooth reveal instead of mount/unmount. */}
          {iframeSrc && (
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              title={`${project.title} - Game`}
              allow="autoplay; fullscreen; gamepad"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-none z-10 transition-opacity duration-500"
              style={{
                opacity: iframeVisible ? 1 : 0,
                pointerEvents: iframeVisible ? 'auto' : 'none',
              }}
            />
          )}

          {/* Controls overlay — only when RUNNING */}
          {gameState === STATES.RUNNING && (
            <ControlsOverlay
              controls={detail.controls}
              gamepadSupported={detail.gamepadSupported}
              onRequestFullscreen={handleFullscreen}
            />
          )}
        </div>

        {/* Bottom info bar */}
        <div className="mt-3 flex justify-between items-center">
          <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${gameState === STATES.RUNNING ? 'bg-primary animate-pulse' : 'bg-outline-variant'}`}></span>
              {gameState}
            </span>
            <span>ASPECT: 16:9</span>
            <span>REQ: {detail.systemRequirements}</span>
          </div>
          <a
            href={detail.itchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[12px]">download</span>
            DOWNLOAD_BUILD
          </a>
        </div>
      </main>
    </PageWrapper>
  );
}
