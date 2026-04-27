import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';
import Footer from './Footer';
import BackgroundWatermark from './BackgroundWatermark';

import { useGameState } from '../context/GameStateContext';

export default function Layout() {
  const location = useLocation();
  const { state } = useGameState();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className={state.glitchActive ? 'glitch-transition' : ''}>
      <BackgroundWatermark />
      <TopNavBar />
      <SideNavBar />
      <div className="md:pl-64 pt-20 flex flex-col min-h-screen">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

