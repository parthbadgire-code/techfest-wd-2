import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Events() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.event-item', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ paddingTop: '10vh' }}>
      <h1 className="section-title" style={{ textAlign: 'left', marginTop: 0 }}>ACTIVE <span className="accent">EVENTS</span></h1>
      
      <div className="event-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="info-card event-item">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <h3>ROBOWARS</h3>
            <span style={{ color: 'var(--secondary)' }}>[ COMBAT ARENA ]</span>
          </div>
          <p>The flagship robotics combat competition. Build heavy-weight machines to destroy opponents in a reinforced glass arena.</p>
          <button className="btn" style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '0.8rem' }}>VIEW RULES</button>
        </div>
        
        <div className="info-card event-item">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <h3>INTERNATIONAL CODING LEAGUE</h3>
            <span style={{ color: 'var(--primary)' }}>[ ALGORITHM ]</span>
          </div>
          <p>A 24-hour competitive programming marathon testing algorithms, data structures, and optimization under extreme pressure.</p>
          <button className="btn" style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '0.8rem' }}>VIEW RULES</button>
        </div>

        <div className="info-card event-item">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <h3>COZMO CLENCH</h3>
            <span style={{ color: '#fff' }}>[ AUTOMATION ]</span>
          </div>
          <p>Design a bot that can autonomously navigate complex tracks, grip objects, and place them with high precision.</p>
          <button className="btn" style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '0.8rem' }}>VIEW RULES</button>
        </div>
      </div>
      
      <div style={{ height: '20vh' }}></div>
    </div>
  );
}
