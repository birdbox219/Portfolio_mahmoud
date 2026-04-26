import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';
import Footer from './Footer';
import BackgroundWatermark from './BackgroundWatermark';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <BackgroundWatermark />
      <TopNavBar />
      <SideNavBar />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
      <Footer />
    </>
  );
}
