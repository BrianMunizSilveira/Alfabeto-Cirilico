import React, { useState } from 'react'

// Componente AlphabetCard
export function AlphabetCard ({ letter, filter, onPlayAudio }) {
  const [isPlaying, setIsPlaying] = useState(false);
  
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
  
  const handlePlayAudio = () => {
    setIsPlaying(true);
    onPlayAudio();
    
    // Resetar o estado após a animação
    setTimeout(() => {
      setIsPlaying(false);
    }, 1500);
  };

  return (
    <div className='alphabet-card fade-in'>
      {/* Cabeçalho com letra e botão de áudio */}
      <div className='card-header'>
        <div className='letter'>{renderLetter()}</div>
        <button 
          className={`audio-btn ${isPlaying ? 'playing' : ''}`}
          onClick={handlePlayAudio}
          title={`Ouvir pronúncia: ${letter.pronuncia}`}
          aria-label={`Ouvir pronúncia da letra ${letter.latin || renderLetter()}`}
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