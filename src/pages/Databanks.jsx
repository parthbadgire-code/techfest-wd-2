import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Databanks() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.data-node', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ paddingTop: '10vh' }}>
      <h1 className="section-title" style={{ textAlign: 'left', marginTop: 0 }}>GLOBAL <span className="accent">DATABANKS</span></h1>
      <p style={{ color: '#888', marginBottom: '3rem' }}>Accessing verified sponsor modules and corporate partners for Techfest 2026.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="info-card data-node" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{ width: '50px', height: '50px', background: i % 2 === 0 ? 'var(--primary)' : '#fff', margin: '0 auto 1rem', borderRadius: '50%', opacity: 0.2 }}></div>
            <h4 style={{ fontFamily: 'var(--font-mono)' }}>CORP_ENTITY_{i}</h4>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Tier {i % 3 + 1} Sponsor</p>
          </div>
        ))}
      </div>
      
      <div style={{ height: '20vh' }}></div>
    </div>
  );
}
