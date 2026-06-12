import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Register() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reg-form', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ paddingTop: '10vh', display: 'flex', justifyContent: 'center' }}>
      <div className="info-card reg-form" style={{ width: '100%', maxWidth: '600px', borderTop: '4px solid var(--secondary)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--secondary)', fontSize: '2rem' }}>SECURE ACCESS</h1>
        <p style={{ color: '#888', marginBottom: '2rem' }}>Enter credentials to register for the Techfest network.</p>
        
        <form onSubmit={(e) => { e.preventDefault(); alert('Registration Protocol Initiated!'); }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>IDENTIFIER (NAME)</label>
            <input type="text" required style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', padding: '1rem', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>COMM-LINK (EMAIL)</label>
            <input type="email" required style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', padding: '1rem', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>PRIMARY DIRECTIVE (EVENT)</label>
            <select style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', padding: '1rem', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }}>
              <option value="robowars">ROBOWARS</option>
              <option value="coding">ICL (CODING)</option>
              <option value="exhibit">EXHIBITION PASS</option>
            </select>
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>INITIATE UPLOAD</button>
        </form>
      </div>
    </div>
  );
}
