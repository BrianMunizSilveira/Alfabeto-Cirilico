import React from 'react'
import { useState } from 'react'
import AlphabetCard from './AlphabetCard'
import alphabetData from '../data/alphabetData'

// Componente LearningMode
export function LearningMode () {
  const [filter, setFilter] = useState('todos')

  const filteredAlphabet = alphabetData.filter(letter => {
    switch (filter) {
      case 'maiusculas':
        return true
      case 'minusculas':
        return true
      case 'semelhantes':
        return (
          letter.latin &&
          letter.latin.length === 1 &&
          /^[A-Za-z]$/.test(letter.latin)
        )
      case 'diferentes':
        return (
          !letter.latin ||
          letter.latin.length !== 1 ||
          !/^[A-Za-z]$/.test(letter.latin)
        )
      default:
        return true
    }
  })

  const filterOptions = [
    { key: 'todos', label: 'Todos' },
    { key: 'maiusculas', label: 'Maiúsculas' },
    { key: 'minusculas', label: 'Minúsculas' },
    { key: 'semelhantes', label: 'Semelhantes ao Latim' },
    { key: 'diferentes', label: 'Diferentes do Latim' }
  ]

  return (
    <div>
      <div className='filter-container'>
        {filterOptions.map(option => (
          <button
            key={option.key}
            onClick={() => setFilter(option.key)}
            className={`filter-btn ${
              filter === option.key ? 'active' : 'inactive'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className='alphabet-grid'>
        {filteredAlphabet.length > 0 ? (
          filteredAlphabet.map((letter, index) => (
            <AlphabetCard key={index} letter={letter} filter={filter} />
          ))
        ) : (
          <div className="empty-state">
            Nenhuma letra encontrada com este filtro.
          </div>
        )}
      </div>
    </div>
  )
}

export default LearningMode
