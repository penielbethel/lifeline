import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Facebook, Twitter, Linkedin,
  Instagram, Stethoscope, ChevronRight
} from 'lucide-react';

const Footer = ({
  companyName,
  aboutText,
  address,
  registration,
  email,
  phone,
  quickLinks,
  ctaText,
  ctaLink
}) => {
  return (
    <footer style={{
      background: '#0F172A',
      color: '#fff',
      borderTop: '4px solid #1D4ED8',
      padding: '4rem 0 0',
    }}>
      <div className="container">

        {/* ── MAIN GRID ────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem 2rem',
          paddingBottom: '3rem',
        }}>

          {/* Col 1 — Company info */}
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div style={{
                width: '40px', height: '40px', background: '#1D4ED8',
                borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <Stethoscope size={22} color="#fff" />
              </div>
              <div style={{ lineHeight: '1.2' }}>
                <div style={{ fontWeight: '900', fontSize: '0.95rem', color: '#fff', letterSpacing: '1px' }}>LIFELINE</div>
                <div style={{ fontSize: '0.6rem', color: '#60A5FA', letterSpacing: '2px' }}>HEALTHCARE GLOBAL</div>
              </div>
            </div>

            {aboutText && (
              <p style={{
                color: '#94A3B8', fontSize: '0.875rem', lineHeight: '1.7',
                margin: '0 0 1rem', maxWidth: '280px'
              }}>
                {aboutText}
              </p>
            )}

            {registration && (
              <p style={{ color: '#64748B', fontSize: '0.78rem', margin: '0 0 1.25rem' }}>
                <span style={{ color: '#60A5FA', fontWeight: '700' }}>RC:</span> {registration}
              </p>
            )}

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Instagram, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href}
                  style={{
                    width: '36px', height: '36px', background: 'rgba(255,255,255,0.06)',
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#94A3B8', transition: 'background 0.2s, color 0.2s', flexShrink: 0
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1D4ED8'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#94A3B8'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Head Office */}
          <div>
            <h4 style={{ color: '#60A5FA', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Head Office
            </h4>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <MapPin size={16} color="#60A5FA" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{
                color: '#94A3B8', fontSize: '0.875rem', lineHeight: '1.65',
                margin: 0, wordBreak: 'break-word'
              }}>
                {address}
              </p>
            </div>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h4 style={{ color: '#60A5FA', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href={`mailto:${email}`} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                color: '#94A3B8', fontSize: '0.875rem', textDecoration: 'none',
                transition: 'color 0.2s', wordBreak: 'break-all'
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#60A5FA'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >
                <Mail size={15} style={{ flexShrink: 0, marginTop: '2px' }} /> {email}
              </a>
              <a href={`tel:${phone}`} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                color: '#94A3B8', fontSize: '0.875rem', textDecoration: 'none',
                transition: 'color 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#60A5FA'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >
                <Phone size={15} style={{ flexShrink: 0 }} /> {phone}
              </a>
            </div>
          </div>

          {/* Col 4 — Quick Links */}
          <div>
            <h4 style={{ color: '#60A5FA', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Quick Links
            </h4>
            {quickLinks && (
              <ul style={{ padding: 0, margin: '0 0 1.5rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    {link.url.startsWith('/') ? (
                      <Link to={link.url} style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        color: '#94A3B8', fontSize: '0.875rem', textDecoration: 'none',
                        transition: 'color 0.2s, paddingLeft 0.2s'
                      }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#60A5FA'; e.currentTarget.style.paddingLeft = '4px'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.paddingLeft = '0'; }}
                      >
                        <ChevronRight size={13} style={{ flexShrink: 0, color: '#1D4ED8' }} />
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.url} style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        color: '#94A3B8', fontSize: '0.875rem', textDecoration: 'none',
                        transition: 'color 0.2s'
                      }}
                        onMouseEnter={e => e.currentTarget.style.color = '#60A5FA'}
                        onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                      >
                        <ChevronRight size={13} style={{ flexShrink: 0, color: '#1D4ED8' }} />
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {ctaText && (
              <Link to={ctaLink || '/contact'} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#1D4ED8', color: '#fff', padding: '0.65rem 1.25rem',
                borderRadius: '8px', fontWeight: '700', fontSize: '0.85rem',
                textDecoration: 'none', transition: 'background 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#1E3A8A'}
                onMouseLeave={e => e.currentTarget.style.background = '#1D4ED8'}
              >
                {ctaText} <ChevronRight size={14} />
              </Link>
            )}
          </div>

        </div>

        {/* ── BOTTOM BAR ────────────────────────────────────────── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '1.5rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <p style={{ color: '#475569', fontSize: '0.78rem', margin: 0 }}>
            © {new Date().getFullYear()} {companyName}. All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            {[['Privacy Policy', '/privacy'], ['Terms of Use', '/terms']].map(([label, url]) => (
              <Link key={url} to={url} style={{ color: '#475569', fontSize: '0.78rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#60A5FA'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Responsive style overrides */}
      <style>{`
        /* Footer grid — fluid, min 200px per col */
        /* At ≤ 600px: 2 columns */
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        /* At ≤ 420px (iPhone SE): single column, everything stacks */
        @media (max-width: 420px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
