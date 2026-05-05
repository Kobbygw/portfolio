import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">
          EDMUND<span className="highlight-brown">.A</span>
        </a>
        <div className="nav-links">
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#projects" className="nav-link">Work</a>
          <a href="#skills" className="nav-link">Expertise</a>
          <a href="mailto:edmundasamoah611@gmail.com" className="nav-link nav-cta">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
