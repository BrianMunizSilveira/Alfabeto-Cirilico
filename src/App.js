import { useState } from 'react';
import Header from './components/Header.jsx';
import LearningMode from './components/LearningMode.jsx';
import PracticeMode from './components/PracticeMode.jsx';
import Footer from './components/Footer.jsx';
import './components/styles/App.css';

function App() {
  const [activeMode, setActiveMode] = useState('aprender');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? '' : 'dark');
    localStorage.setItem('modoEscuro', !darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        <div className="mode-selector">
          <button className={activeMode === 'aprender' ? 'active' : ''} onClick={() => setActiveMode('aprender')}>
            Aprender
          </button>
          <button className={activeMode === 'praticar' ? 'active' : ''} onClick={() => setActiveMode('praticar')}>
            Praticar
          </button>
          <button className={activeMode === 'testar' ? 'active' : ''} onClick={() => setActiveMode('testar')}>
            Testar
          </button>
        </div>

        {activeMode === 'aprender' && <LearningMode />}
        {activeMode === 'praticar' && <PracticeMode />}
      </main>

      <Footer />
    </div>
  );
}

export default App;