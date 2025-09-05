import React from 'react'

export function Header ({ darkMode, toggleDarkMode }) {
  return (
    <header className='header'>
      <h1>Алфавит Русский</h1>
      <p>Aprenda o alfabeto cirílico russo de forma interativa</p>
      <button 
        className='dark-mode-toggle'
        onClick={toggleDarkMode}
        aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
      >
        {darkMode ? '☀️' : '🌙'} {darkMode ? 'Modo Claro' : 'Modo Escuro'}
      </button>
    </header>
  )
}

export default Header
