import React from 'react';
import { useState } from 'react';
import AlphabetCard from './AlphabetCard';
import alphabetData from '../data/alphabetData';


// Componente LearningMode
export function LearningMode() {
  const [filter, setFilter] = useState('todos');

  const filteredAlphabet = alphabetData.filter(letter => {
    switch (filter) {
      case 'maiusculas':
        return true;
      case 'minusculas':
        return true;
      case 'semelhantes':
        return letter.latin && letter.latin.length === 1 && /^[A-Za-z]$/.test(letter.latin);
      case 'diferentes':
        return !letter.latin || letter.latin.length !== 1 || !/^[A-Za-z]$/.test(letter.latin);
      default:
        return true;
    }
  });

  const filterOptions = [
    { key: 'todos', label: 'Todos' },
    { key: 'maiusculas', label: 'Maiúsculas' },
    { key: 'minusculas', label: 'Minúsculas' },
    { key: 'semelhantes', label: 'Semelhantes ao Latim' },
    { key: 'diferentes', label: 'Diferentes do Latim' }
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {filterOptions.map(option => (
          <button
            key={option.key}
            onClick={() => setFilter(option.key)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 hover:-translate-y-1 ${
              filter === option.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredAlphabet.length > 0 ? (
          filteredAlphabet.map((letter, index) => (
            <AlphabetCard key={index} letter={letter} filter={filter} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
            Nenhuma letra encontrada com este filtro.
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningMode;