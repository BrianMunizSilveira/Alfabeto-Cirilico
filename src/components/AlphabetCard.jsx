import React from 'react'

// Componente AlphabetCard
export function AlphabetCard ({ letter, filter }) {
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
      <div className='letter'>{renderLetter()}</div>
      <div className='latin'>{letter.latin || '-'}</div>
      <div className='pronuncia'>"{letter.pronuncia}"</div>
      <div className='exemplo'>{letter.exemplo}</div>
    </div>
  )
}

export default AlphabetCard
