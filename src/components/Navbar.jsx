import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="branding" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/images/Lifeline Main Logo.png" alt="Lifeline Healthcare Global Options Logo" style={{ height: '50px' }} />
          <div className="logo" style={{ fontSize: '1.2rem', lineHeight: '1.2' }}>LIFELINE<br /><span style={{ fontSize: '0.8rem', fontWeight: '400', letterSpacing: '1px' }}>HEALTHCARE GLOBAL</span></div>
        </Link>

        <div className="mobile-toggle" onClick={toggleMenu} style={{ display: 'none', cursor: 'pointer', color: 'white' }}>
          {isOpen ? <X /> : <Menu />}
        </div>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About Us</Link>

          <div className="dropdown">
            <div className="nav-link dropdown-toggle">
              Our Entities <ChevronDown size={14} />
            </div>
            <div className="dropdown-menu">
              <Link to="/login" className="dropdown-item">
                Lifeline Hospital (EMR)
              </Link>
              <Link to="/shop" className="dropdown-item">
                Lifeline Pharmacy
              </Link>
            </div>
          </div>

          <Link to="/services" className={`nav-link ${isActive('/services')}`}>Medical Services</Link>
          <Link to="/facilities" className={`nav-link ${isActive('/facilities')}`}>Facilities</Link>
          <Link to="/health-corner" className={`nav-link ${isActive('/health-corner')}`}>Health Corner</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
          <Link to="/login" className={`nav-link ${isActive('/login')}`} title="Patient/Staff Portal" style={{ backgroundColor: '#2563EB', color: '#fff', padding: '0.5rem 1.2rem', borderRadius: '8px', marginLeft: '1rem' }}>Portal</Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
