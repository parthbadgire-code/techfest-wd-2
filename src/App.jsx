import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene from './Scene';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.utils.toArray('.info-card').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* HUD Border System */}
      <div className="hud-border">
        <div className="hud-corner hud-tl"></div>
        <div className="hud-corner hud-tr"></div>
        <div className="hud-corner hud-bl"></div>
        <div className="hud-corner hud-br"></div>
      </div>
      
      <div className="scanlines"></div>

      {/* 3D Background */}
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
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '10px' }}>01</div>
            <div>SCROLL TO DESCEND</div>
          </div>
        </div>

        {/* Main Central Content */}
        <div className="main-content">
          <nav className="navbar">
            <div className="logo">TECHFEST</div>
            <div className="nav-links">
              <a href="#about" className="nav-link">NEXUS</a>
              <a href="#events" className="nav-link">EVENTS</a>
              <a href="#sponsors" className="nav-link">DATABANKS</a>
              <a href="#register" className="nav-link" style={{ color: 'var(--primary)' }}>[ REGISTER ]</a>
            </div>
          </nav>

          <section className="hero-section">
            <h1 className="hero-title">ENTER THE<br/><span className="accent">SIMULATION</span></h1>
            <p className="hero-desc">
              Asia's largest science and technology festival. Experience a fully interactive 3D environment designed for the next generation of web interfaces.
            </p>
            <div>
              <button className="btn">INITIALIZE</button>
            </div>
          </section>

          <h2 className="section-title">CORE MODULES</h2>
          
          <div className="content-grid">
            <div className="info-card">
              <h3>ROBOTICS</h3>
              <p>Witness autonomous machines battle for supremacy in the grand arena. Engage with cutting-edge mechatronics and AI logic processors.</p>
            </div>
            <div className="info-card">
              <h3>EXHIBITIONS</h3>
              <p>Explore international tech exhibits showcasing the bleeding edge of quantum computing, space exploration, and cybernetics.</p>
            </div>
            <div className="info-card">
              <h3>IDEATES</h3>
              <p>Solve real-world crises through technological innovation. Pitch your solutions to global leaders and secure venture funding.</p>
            </div>
            <div className="info-card">
              <h3>LECTURES</h3>
              <p>Download knowledge directly from Nobel Laureates, industry pioneers, and the brightest minds shaping our future reality.</p>
            </div>
          </div>

          <div style={{ height: '20vh' }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
