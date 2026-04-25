import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <TopNavBar />
      <SideNavBar />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
      <Footer />
    </>
  );
}
