import React from 'react';

// Componente Header
export function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="bg-blue-900 text-white text-center py-8 mb-8 relative">
      <h1 className="text-4xl font-bold mb-2">Алфавит Русский</h1>
      <p className="text-lg opacity-90">Aprenda o alfabeto cirílico russo de forma interativa</p>
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 flex items-center gap-2"
      >
        {darkMode ? '☀️' : '🌙'}
        {darkMode ? ' Modo Claro' : ' Modo Escuro'}
      </button>
    </header>
  );
}

export default Header;