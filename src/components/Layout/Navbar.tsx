import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo" onClick={closeMenu}>
          EDMUND<span className="highlight-brown">.A</span>
        </a>

        {/* Hamburger Toggle */}
        <button 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
          type="button"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#experience" className="nav-link" onClick={closeMenu}>Experience</a>
          <a href="#projects" className="nav-link" onClick={closeMenu}>Work</a>
          <a href="#skills" className="nav-link" onClick={closeMenu}>Expertise</a>
          <a href="mailto:edmundasamoah611@gmail.com" className="nav-link nav-cta" onClick={closeMenu}>Contact</a>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
    </nav>
  );
};

export default Navbar;
