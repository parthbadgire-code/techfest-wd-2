import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, Code2, Globe2 } from 'lucide-react';
import Scene from './Scene';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animations for sections
      const sections = gsap.utils.toArray('.content-block');
      
      sections.forEach((sec, i) => {
        gsap.to(sec, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Camera parallax effect based on scroll mapped to body
      const updateCamera = () => {
        const scrollY = window.scrollY;
        // In a real setup, we might pass this to R3F using a store, 
        // but for now our Scene uses default camera that we can optionally move.
        // We'll keep it simple and let the 3D scene react to time and mouse natively.
      };
      
      window.addEventListener('scroll', updateCamera);
      return () => window.removeEventListener('scroll', updateCamera);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* 3D Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
          <Scene />
          <Preload all />
        </Canvas>
      </div>

      {/* HTML Overlay UI */}
      <div className="ui-container">
        <nav className="navbar">
          <div className="logo">
            <Globe2 className="accent" size={28} />
            TECHFEST
          </div>
          <div className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#events" className="nav-link">Events</a>
            <a href="#register" className="nav-link">Register</a>
          </div>
        </nav>

        <section className="section" id="hero">
          <div className="content-block" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
            <h1 className="title">BEYOND <br/><span className="accent">DIMENSIONS</span></h1>
            <p className="subtitle">Asia's Largest Science and Technology Festival. Experience the convergence of reality and imagination.</p>
            <button className="btn">ENTER THE NEXUS</button>
          </div>
          
          <div className="scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <span className="scroll-text">SCROLL</span>
          </div>
        </section>

        <section className="section align-right" id="about">
          <div className="content-block">
            <h2 className="title" style={{ fontSize: '3rem' }}><span className="accent">01.</span> DISCOVER</h2>
            <p className="subtitle">
              Techfest is the annual science and technology festival of Indian Institute of Technology Bombay. 
              We are pushing the boundaries of what's possible on the web with interactive 3D experiences.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <MousePointer2 className="accent" />
              <span>Interactive Nodes</span>
            </div>
          </div>
        </section>

        <section className="section" id="events">
          <div className="content-block">
            <h2 className="title" style={{ fontSize: '3rem' }}><span className="accent">02.</span> ENGAGE</h2>
            <p className="subtitle">
              From intense robotics competitions to deep-tech workshops and international exhibits. 
              Witness the future unravel before your eyes.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Code2 className="accent" />
              <span>Hackathons & Coding</span>
            </div>
          </div>
        </section>

        <section className="section align-right" style={{ paddingBottom: '5rem' }} id="register">
          <div className="content-block" style={{ textAlign: 'center', margin: '0 auto', alignItems: 'center' }}>
            <h2 className="title" style={{ fontSize: '4rem' }}>JOIN THE <span className="accent">FUTURE</span></h2>
            <p className="subtitle">Registrations are now open for all events.</p>
            <button className="btn" style={{ width: '100%' }}>REGISTER NOW</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
