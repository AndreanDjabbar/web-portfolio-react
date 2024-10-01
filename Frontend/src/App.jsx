import './App.css';
import Feedback from './sections/Feedback/Feedback';
import Footer from './sections/Footer/Footer';
import Contact from './sections/Contact/Contact';
import Hero from './sections/Hero/Hero';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills/Skills';
import Navigation from './sections/Navigation/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <Feedback />
      <Footer />

    </>
  );
}

export default App;
