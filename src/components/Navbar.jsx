import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Stethoscope } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entitiesOpen, setEntitiesOpen] = useState(false);
  const location = useLocation();

  const closeAll = () => { setIsOpen(false); setEntitiesOpen(false); };
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
      background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(14px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      padding: '0.75rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* ── LOGO ── */}
        <Link to="/" onClick={closeAll} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '42px', height: '42px', background: '#1D4ED8', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Stethoscope size={24} color="#fff" />
          </div>
          <div style={{ lineHeight: '1.15' }}>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: '800', fontSize: '1.05rem', color: '#fff', letterSpacing: '1px' }}>
              LIFELINE
            </div>
            <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: '400', fontSize: '0.65rem', color: '#60A5FA', letterSpacing: '2px', textTransform: 'uppercase' }}>
              HEALTHCARE GLOBAL
            </div>
          </div>
        </Link>

        {/* ── HAMBURGER (mobile) ── */}
        <button
          onClick={() => setIsOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: 'none', background: 'none', border: 'none',
            color: '#fff', cursor: 'pointer', padding: '0.4rem'
          }}
          className="nav-hamburger"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* ── NAV LINKS ── */}
        <div className={`nav-links-wrapper ${isOpen ? 'nav-open' : ''}`}>

          <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeAll}>Home</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={closeAll}>About</Link>

          {/* Our Entities dropdown */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setEntitiesOpen(true)}
            onMouseLeave={() => setEntitiesOpen(false)}
          >
            <div className="nav-link" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={() => setEntitiesOpen(o => !o)}>
              Our Entities <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: entitiesOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </div>
            {entitiesOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                background: '#1E293B', minWidth: '230px', borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)', padding: '0.5rem 0',
                border: '1px solid rgba(255,255,255,0.08)', zIndex: 999
              }}>
                <Link to="/hospital" onClick={closeAll} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.85rem 1.25rem', color: 'rgba(255,255,255,0.75)',
                  fontSize: '0.875rem', textDecoration: 'none', transition: 'all 0.2s',
                  borderBottom: '1px solid rgba(255,255,255,0.06)'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(29,78,216,0.15)'; e.currentTarget.style.color = '#60A5FA'; e.currentTarget.style.paddingLeft = '1.6rem'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.paddingLeft = '1.25rem'; }}
                >
                  <Stethoscope size={16} color="#60A5FA" />
                  <div>
                    <div style={{ fontWeight: '700' }}>Lifeline Hospital</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.6 }}>Full EMR System</div>
                  </div>
                </Link>
                <Link to="/shop" onClick={closeAll} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.85rem 1.25rem', color: 'rgba(255,255,255,0.75)',
                  fontSize: '0.875rem', textDecoration: 'none', transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(15,118,110,0.15)'; e.currentTarget.style.color = '#34D399'; e.currentTarget.style.paddingLeft = '1.6rem'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.paddingLeft = '1.25rem'; }}
                >
                  <div style={{ width: '16px', height: '16px', background: '#0F766E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#fff', fontSize: '10px', fontWeight: '900' }}>Rx</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: '700' }}>Lifeline Pharmacy</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.6 }}>Online Drug Store</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link to="/services" className={`nav-link ${isActive('/services')}`} onClick={closeAll}>Services</Link>
          <Link to="/facilities" className={`nav-link ${isActive('/facilities')}`} onClick={closeAll}>Facilities</Link>
          <Link to="/health-corner" className={`nav-link ${isActive('/health-corner')}`} onClick={closeAll}>Health Corner</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={closeAll}>Contact</Link>

          <Link to="/login" onClick={closeAll} style={{
            background: '#1D4ED8', color: '#fff', padding: '0.55rem 1.35rem',
            borderRadius: '8px', fontWeight: '700', fontSize: '0.875rem',
            textDecoration: 'none', transition: 'background 0.2s', whiteSpace: 'nowrap'
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#1E3A8A'}
            onMouseLeave={e => e.currentTarget.style.background = '#1D4ED8'}
          >
            Staff Portal
          </Link>
        </div>
      </div>

      {/* Mobile nav styles */}
      <style>{`
        .nav-hamburger { display: none !important; }
        .nav-links-wrapper {
          display: flex; align-items: center; gap: 1.5rem; flex-wrap: nowrap;
        }
        .nav-link {
          color: rgba(255,255,255,0.78); font-weight: 500; font-size: 0.88rem;
          text-decoration: none; transition: color 0.2s; white-space: nowrap;
        }
        .nav-link:hover, .nav-link.active { color: #60A5FA; }
        @media (max-width: 960px) {
          .nav-hamburger { display: flex !important; }
          .nav-links-wrapper {
            position: fixed; top: 68px; left: 0; width: 100%;
            background: #0F172A; flex-direction: column; align-items: flex-start;
            padding: 1.5rem; gap: 0.5rem;
            border-top: 1px solid rgba(255,255,255,0.08);
            transform: translateY(-110%); opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            pointer-events: none; overflow-y: auto; max-height: calc(100vh - 68px);
          }
          .nav-links-wrapper.nav-open {
            transform: translateY(0); opacity: 1; pointer-events: all;
          }
          .nav-link { padding: 0.6rem 0; font-size: 1rem; width: 100%; border-bottom: 1px solid rgba(255,255,255,0.05); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
