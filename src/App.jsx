import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { AnimatePresence } from 'framer-motion';
import Scene from './Scene';

import Home from './pages/Home';
import Events from './pages/Events';
import Databanks from './pages/Databanks';
import Register from './pages/Register';

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* HUD Border System */}
      <div className="hud-border">
        <div className="hud-corner hud-tl"></div>
        <div className="hud-corner hud-tr"></div>
        <div className="hud-corner hud-bl"></div>
        <div className="hud-corner hud-br"></div>
      </div>
      
      <div className="scanlines"></div>

      {/* 3D Background - Persistent across routes */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
          <Scene />
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            <Noise opacity={0.025} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
          <Preload all />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="ui-container">
        {/* Left HUD Panel */}
        <div className="hud-overlay hud-left">
          <div className="hud-element">
            <div className="hud-data-row"><span className="hud-label">SYS_STATUS</span><span>ONLINE</span></div>
            <div className="hud-data-row"><span className="hud-label">COORDS</span><span>28.61° N, 77.2° E</span></div>
            <div className="hud-data-row"><span className="hud-label">LOCAL_T</span><span>{time}</span></div>
          </div>
          <div className="hud-element">
            <div className="hud-data-row"><span className="hud-label">CPU_LOAD</span><span>42.8%</span></div>
            <div className="hud-data-row"><span className="hud-label">MEM_ALLOC</span><span>1024 TB</span></div>
          </div>
          <div className="hud-element" style={{ borderLeftColor: 'var(--secondary)', color: 'var(--secondary)' }}>
            <div className="hud-data-row"><span className="hud-label">WARNING</span><span>NEXUS UNSTABLE</span></div>
          </div>
        </div>

        {/* Right HUD Panel */}
        <div className="hud-overlay hud-right">
          <div className="hud-element">
            <div className="hud-data-row"><span>IIT BOMBAY</span><span className="hud-label">HOST</span></div>
            <div className="hud-data-row"><span>TECHFEST 2026</span><span className="hud-label">EVENT</span></div>
          </div>
          <div className="hud-element">
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '10px' }}>
              {location.pathname === '/' ? '01' : location.pathname === '/events' ? '02' : location.pathname === '/databanks' ? '03' : '04'}
            </div>
            <div style={{ textTransform: 'uppercase' }}>
              {location.pathname === '/' ? 'NEXUS ROOT' : location.pathname.substring(1)}
            </div>
          </div>
        </div>

        {/* Main Central Content wrapped in Routes */}
        <div className="main-content">
          <nav className="navbar">
            <div className="logo"><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>TECHFEST</Link></div>
            <div className="nav-links">
              <Link to="/" className="nav-link">NEXUS</Link>
              <Link to="/events" className="nav-link">EVENTS</Link>
              <Link to="/databanks" className="nav-link">DATABANKS</Link>
              <Link to="/register" className="nav-link" style={{ color: 'var(--primary)' }}>[ REGISTER ]</Link>
            </div>
          </nav>

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/databanks" element={<Databanks />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
