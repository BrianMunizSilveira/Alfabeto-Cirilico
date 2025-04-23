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
        <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        {darkMode ? 'Modo Claro' : 'Modo Escuro'}
      </button>
    </header>
  )
};
