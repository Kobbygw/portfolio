import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          EDMUND<span className="highlight-brown">.A</span>
        </div>
        <div className="social-links">
          <a href="https://github.com/Kobbygw" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
          <a href="https://www.linkedin.com/in/edmundasamoah/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
          {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a> */}
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} edmund. all rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
