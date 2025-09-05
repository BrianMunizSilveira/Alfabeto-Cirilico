import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LearningMode from './components/LearningMode';
import PracticeMode from './components/PracticeMode';
import TestMode from './components/TestMode';

// Importando o novo arquivo de estilos
import './styles/modern.css';

// Componente Principal da Aplicação
export default function App() {
  const [activeMode, setActiveMode] = useState('aprender');
  const [darkMode, setDarkMode] = useState(() => {
    // Verifica se há preferência salva no localStorage
    const savedPreference = localStorage.getItem('darkMode');
    // Verifica a preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Retorna a preferência salva ou a preferência do sistema
    return savedPreference !== null ? JSON.parse(savedPreference) : prefersDark;
  });

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };
  
  // Atualiza a classe no elemento html quando o modo escuro muda
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const modes = [
    { key: 'aprender', label: 'Aprender', icon: '📚' },
    { key: 'praticar', label: 'Praticar', icon: '🎯' },
    { key: 'testar', label: 'Testar', icon: '🧠' }
  ];

  return (
    <>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="container">
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