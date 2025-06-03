import React from 'react';

// Componente AlphabetCard
export function AlphabetCard({ letter, filter }) {
  const renderLetter = () => {
    switch (filter) {
      case 'maiusculas':
        return letter.maiuscula;
      case 'minusculas':
        return letter.minuscula;
      default:
        return `${letter.maiuscula} ${letter.minuscula}`;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        {renderLetter()}
      </div>
      <div className="text-lg mb-2">{letter.latin || '-'}</div>
      <div className="text-gray-600 dark:text-gray-300 italic">"{letter.pronuncia}"</div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">{letter.exemplo}</div>
    </div>
  );
}

export default AlphabetCard;