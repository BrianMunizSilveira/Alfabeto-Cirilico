import React, { useState } from 'react'
import alphabetData from '../data/alphabetData'
export function PracticeMode () {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [shuffleMode, setShuffleMode] = useState(false)
  const [usedIndices, setUsedIndices] = useState([])

  const currentLetter = alphabetData[currentLetterIndex]

  const getRandomLetterIndex = () => {
    if (usedIndices.length === alphabetData.length) {
      setUsedIndices([])
    }

    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * alphabetData.length)
    } while (shuffleMode && usedIndices.includes(randomIndex))

    if (shuffleMode) {
      setUsedIndices([...usedIndices, randomIndex])
    }

    return randomIndex
  }

  const nextLetter = () => {
    setIsFlipped(false)
    setShowHint(false)
    const nextIndex = shuffleMode
      ? getRandomLetterIndex()
      : (currentLetterIndex + 1) % alphabetData.length
    setCurrentLetterIndex(nextIndex)
  }

  const prevLetter = () => {
    setIsFlipped(false)
    setShowHint(false)
    setCurrentLetterIndex(prev =>
      prev === 0 ? alphabetData.length - 1 : prev - 1
    )
  }

  const toggleShuffle = () => {
    setShuffleMode(!shuffleMode)
    setUsedIndices([])
  }

  return (
    <div className='practice-container'>
      <div className='card-container'>
        <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
          {/* Frente do Card */}
          <div className='card-face'>
            <div className='card-letter'>
              {currentLetter.maiuscula} {currentLetter.minuscula}
            </div>
            {showHint && (
              <div className='hint-box'>
                <p>Equivalente latino: {currentLetter.latin || 'N/A'}</p>
              </div>
            )}
            <div className='card-controls'>
              <button
                onClick={() => setShowHint(!showHint)}
                className='card-btn hint-btn'
              >
                {showHint ? 'Ocultar Dica' : 'Mostrar Dica'}
              </button>
              <button
                onClick={() => setIsFlipped(true)}
                className='card-btn flip-btn'
              >
                Ver Pronúncia
              </button>
            </div>
          </div>

          {/* Verso do Card */}
          <div className='card-face card-back'>
            <h3>Detalhes:</h3>
            <div style={{ textAlign: 'left' }}>
              <p>
                <strong>Letra:</strong> {currentLetter.maiuscula}{' '}
                {currentLetter.minuscula}
              </p>
              <p>
                <strong>Pronúncia:</strong> "{currentLetter.pronuncia}"
              </p>
              <p>
                <strong>Exemplo:</strong> {currentLetter.exemplo}
              </p>
              {currentLetter.latin && (
                <p>
                  <strong>Equivalente latino:</strong> {currentLetter.latin}
                </p>
              )}
            </div>
            <button
              onClick={() => setIsFlipped(false)}
              className='card-btn back-btn'
            >
              Voltar
            </button>
          </div>
        </div>
      </div>

      {/* Controles de Navegação */}
      <div className='nav-controls'>
        <button
          onClick={prevLetter}
          className='nav-btn prev-btn'
          disabled={shuffleMode}
        >
          ← Anterior
        </button>
        <button
          onClick={toggleShuffle}
          className={`nav-btn shuffle-btn ${shuffleMode ? 'active' : ''}`}
        >
          {shuffleMode ? 'Modo Aleatório ✓' : 'Modo Aleatório'}
        </button>
        <button onClick={nextLetter} className='nav-btn next-btn'>
          Próxima →
        </button>
      </div>

      <div className='counter'>
        Letra {currentLetterIndex + 1} de {alphabetData.length}
      </div>
    </div>
  )
}

export default PracticeMode
