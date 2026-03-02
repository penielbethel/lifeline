import React from 'react';

const Hero = ({ title, subtitle, bgImage, ctaButtons, minHeight = '55vh' }) => (
    <section style={{
        position: 'relative',
        minHeight,
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        paddingTop: '7rem'
    }}>
        {/* Overlay */}
        <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(29, 78, 216, 0.45) 100%)'
        }} />

        <div className="container hero-content" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '4rem 1.5rem' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', color: '#fff', margin: '0 0 1.25rem', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                {title}
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'rgba(255,255,255,0.75)', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: '1.7' }}>
                {subtitle}
            </p>

            {ctaButtons && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    {ctaButtons.map((btn, idx) => (
                        <a key={idx} href={btn.link} className={`btn ${btn.secondary ? 'btn-outline' : 'btn-primary'}`}>
                            {btn.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    </section>
);

export default Hero;
