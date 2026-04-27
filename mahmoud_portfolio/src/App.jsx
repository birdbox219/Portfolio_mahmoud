import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import GameLauncher from './pages/GameLauncher';
import ProjectLog from './pages/ProjectLog';
import NotFound from './pages/NotFound';
import { AudioProvider } from './context/AudioContext';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <AudioProvider>
      <HashRouter>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="play/:id" element={<GameLauncher />} />
            <Route path="log" element={<ProjectLog />} />
            <Route path="terminal" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </AudioProvider>
  );
}
