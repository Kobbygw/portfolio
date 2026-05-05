import React from 'react';
import Typewriter from '../components/UI/Typewriter';
import AsciiPortrait from '../components/AsciiPortrait/AsciiPortrait';
import profilePng from '../assets/images/profile.png';
import profileJpg from '../assets/images/profile.jpg';

const Hero: React.FC = () => {
  return (
    <main className="hero-container">
      <section className="hero-content">
        {/* <div className="intro-badge">AWS Certified Solutions Architect</div> */}
        <h1>
          <Typewriter phrases={['hi, edmund here', 'welcome!']} waitTime={2000} />
          <span className="cursor">|</span>
        </h1>
        <h2>Software engineer and artist based in Accra</h2>
        <p>
          Specializing in scalable, event-driven architectures and mission-critical shared services. 
          Expert in AWS and Python, with a focus on 99.9% reliability and comprehensive LGTM observability.
        </p>
        <div className="cta-group">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="mailto:edmundasamoah611@gmail.com" className="btn btn-secondary">Get in Touch</a>
        </div>
      </section>
      
      <section className="hero-visual">
        <AsciiPortrait imageSrc={profilePng} fallbackSrc={profileJpg} />
      </section>
    </main>
  );
};

export default Hero;
