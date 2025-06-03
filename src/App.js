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
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-6xl mx-auto px-4 pb-8">
        {/* Seletor de Modo */}
        <div className="flex justify-center gap-2 mb-8">
          {modes.map(mode => (
            <button
              key={mode.key}
              onClick={() => setActiveMode(mode.key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeMode === mode.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
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

      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}