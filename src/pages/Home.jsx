import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <section className="hero-section">
        <h1 className="hero-title">ENTER THE<br/><span className="accent">SIMULATION</span></h1>
        <p className="hero-desc">
          Asia's largest science and technology festival. Experience a fully interactive 3D environment designed for the next generation of web interfaces.
        </p>
        <div>
          <Link to="/events"><button className="btn">INITIALIZE</button></Link>
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
    </motion.div>
  );
}
