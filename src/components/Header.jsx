import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export default function Header ({ darkMode, toggleDarkMode }) {
  return (
    <header>
      <h1>Алфавит Русский</h1>
      <p>Aprenda o alfabeto cirílico russo de forma interativa</p>
      <button
        id='modo-escuro-btn'
        arial-label='Alternar modo escuro'
        onClick={toggleDarkMode}
      >
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        {darkMode ? 'Modo Claro' : 'Modo Escuro'}
      </button>
    </header>
  )
}
