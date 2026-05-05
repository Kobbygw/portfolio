import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import './assets/styles/global.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      {/* Additional sections will be added here */}
      <Footer />
    </div>
  );
}

export default App;
