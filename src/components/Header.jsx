import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export default function Header({ darkMode, toggleDarkMode }) {
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <header>
      <h1>Алфавит Русский</h1>
      <p>Aprenda o alfabeto cirílico russo de forma interativa</p>
      <button
        id='modo-escuro-btn'
        aria-label='Alternar modo escuro'
        onClick={toggleDarkMode}
      >
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        {darkMode ? ' Modo Claro' : ' Modo Escuro'}
      </button>
    </header>
  );
}