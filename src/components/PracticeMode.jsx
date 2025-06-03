import React, { useState } from 'react';
import alphabetData from '../data/alphabetData';

// Componente PracticeMode
export function PracticeMode() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [usedIndices, setUsedIndices] = useState([]);

  const currentLetter = alphabetData[currentLetterIndex];

  const getRandomLetterIndex = () => {
    if (usedIndices.length === alphabetData.length) {
      setUsedIndices([]);
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * alphabetData.length);
    } while (shuffleMode && usedIndices.includes(randomIndex));

    if (shuffleMode) {
      setUsedIndices([...usedIndices, randomIndex]);
    }

    return randomIndex;
  };

  const nextLetter = () => {
    setIsFlipped(false);
    setShowHint(false);
    const nextIndex = shuffleMode 
      ? getRandomLetterIndex()
      : (currentLetterIndex + 1) % alphabetData.length;
    setCurrentLetterIndex(nextIndex);
  };

  const prevLetter = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentLetterIndex(prev => 
      prev === 0 ? alphabetData.length - 1 : prev - 1
    );
  };

  const toggleShuffle = () => {
    setShuffleMode(!shuffleMode);
    setUsedIndices([]);
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8 perspective-1000">
        <div className={`relative w-full h-80 transform-style-preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Frente do Card */}
          <div className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-xl p-8 backface-hidden flex flex-col justify-center items-center">
            <div className="text-8xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {currentLetter.maiuscula} {currentLetter.minuscula}
            </div>
            {showHint && (
              <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  Equivalente latino: {currentLetter.latin || 'N/A'}
                </p>
              </div>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-300"
              >
                {showHint ? 'Ocultar Dica' : 'Mostrar Dica'}
              </button>
              <button
                onClick={() => setIsFlipped(true)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
              >
                Ver Pronúncia
              </button>
            </div>
          </div>

          {/* Verso do Card */}
          <div className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-xl p-8 backface-hidden rotate-y-180 flex flex-col justify-center items-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Detalhes:</h3>
            <div className="space-y-3 text-lg">
              <p><strong>Letra:</strong> {currentLetter.maiuscula} {currentLetter.minuscula}</p>
              <p><strong>Pronúncia:</strong> "{currentLetter.pronuncia}"</p>
              <p><strong>Exemplo:</strong> {currentLetter.exemplo}</p>
              {currentLetter.latin && (
                <p><strong>Equivalente latino:</strong> {currentLetter.latin}</p>
              )}
            </div>
            <button
              onClick={() => setIsFlipped(false)}
              className="mt-6 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>

      {/* Controles de Navegação */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          onClick={prevLetter}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
          disabled={shuffleMode}
        >
          ← Anterior
        </button>
        <button
          onClick={toggleShuffle}
          className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
            shuffleMode 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
          }`}
        >
          {shuffleMode ? 'Modo Aleatório ✓' : 'Modo Aleatório'}
        </button>
        <button
          onClick={nextLetter}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
        >
          Próxima →
        </button>
      </div>

      <div className="text-gray-600 dark:text-gray-400">
        Letra {currentLetterIndex + 1} de {alphabetData.length}
      </div>
    </div>
  );
}

export default PracticeMode;