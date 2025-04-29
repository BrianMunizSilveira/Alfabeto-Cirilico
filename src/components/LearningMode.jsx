import { useState } from 'react'
import alphabetData from '../components/data/alphabetData'
import AlphabetCard from './AlphabetCard'

export default function LearningMode () {
  const [filter, setFilter] = useState('todos')

  const filteredAlphabet = alphabetData.filter(letter => {
    switch (filter) {
      case 'maiusculas':
        return true // Mostramos apenas maiúsculas no render
      case 'minusculas':
        return true // Mostramos apenas minúsculas no render
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

  return (
    <section id='aprender' className='modo-conteudo ativo'>
      <div className='filtros'>
        {['todos', 'minusculas', 'semelhantes', 'diferentes'].map(filtro => (
          <button
            key={filtro}
            className={`filtro-btn ${filter === filtro ? 'active' : ''}`}
            onClick={() => setFilter(filtro)}
          >
            {filtro.charAt(0).toUpperCase() + filtro.slice(1)}
          </button>
        ))}
      </div>

      <div className='alfabeto-container'>
        {filteredAlphabet.length > 0 ? (
          filteredAlphabet.map((letter, index) => (
            <AlphabetCard key={index} letter={letter} filter={filter} />
          ))
        ) : (
          <p className='sem-resultados'>
            Nenhuma letra encontrada com este filtro.
          </p>
        )}
      </div>
    </section>
  )
}
