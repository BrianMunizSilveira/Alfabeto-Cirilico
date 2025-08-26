import React from 'react'

// Componente AlphabetCard
export function AlphabetCard ({ letter, filter, onPlayAudio }) {
  const renderLetter = () => {
    switch (filter) {
      case 'maiusculas':
        return letter.maiuscula
      case 'minusculas':
        return letter.minuscula
      default:
        return `${letter.maiuscula} ${letter.minuscula}`
    }
  }

  return (
    <div className='alphabet-card'>
      {/* Cabeçalho com letra e botão de áudio */}
      <div className='card-header'>
        <div className='letter'>{renderLetter()}</div>
        <button 
          className='audio-btn'
          onClick={onPlayAudio}
          title={`Ouvir pronúncia: ${letter.pronuncia}`}
        >
          🔊
        </button>
      </div>
      
      {/* Resto das informações */}
      <div className='latin'>{letter.latin || '-'}</div>
      <div className='pronuncia'>"{letter.pronuncia}"</div>
      <div className='exemplo'>{letter.exemplo}</div>
    </div>
  )
}

export default AlphabetCard