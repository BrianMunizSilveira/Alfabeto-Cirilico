import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LearningMode from './components/LearningMode';
import PracticeMode from './components/PracticeMode';
import TestMode from './components/TestMode';

// Componente Principal da Aplicação
export default function App() {
  const [activeMode, setActiveMode] = useState('aprender');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const modes = [
    { key: 'aprender', label: 'Aprender', icon: '📚' },
    { key: 'praticar', label: 'Praticar', icon: '🎯' },
    { key: 'testar', label: 'Testar', icon: '🧠' }
  ];

  return (
    <>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1rem 2rem' }}>
          {/* Seletor de Modo */}
          <div className="mode-selector">
            {modes.map(mode => (
              <button
                key={mode.key}
                onClick={() => setActiveMode(mode.key)}
                className={`mode-btn ${activeMode === mode.key ? 'active' : 'inactive'}`}
              >
                <span>{mode.icon}</span>
                {mode.label}
              </button>
            ))}
          </div>

          {/* Conteúdo dos Modos */}
          {activeMode === 'aprender' && <LearningMode />}
          {activeMode === 'praticar' && <PracticeMode />}
          {activeMode === 'testar' && <TestMode />}
        </main>

        <Footer />
      </div>
    </>
  );
}