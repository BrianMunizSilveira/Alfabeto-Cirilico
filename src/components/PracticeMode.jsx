import { useState } from 'react'
import alphabetData from '../components/data/alphabetData'

export default function PracticeMode () {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentLetter = alphabetData[currentLetterIndex]

  const nextLetter = () => {
    setIsFlipped(false)
    setCurrentLetterIndex(prev => (prev + 1) % alphabetData.length)
  };

  return (
    <section id='praticar' className='modo-conteudo'>
      <div className='pratica-container'>
        <div className={`pratica-carta ${isFlipped ? 'virou' : ''}`}>
          <div className='carta-frente'>
            <p className='letra-pratica'>{currentLetter.maiuscula}</p>
            <button className='virar-carta' onClick={() => setIsFlipped(true)}>
              Ver Pronúncia
            </button>
          </div>
          <div className='carta-verso'>
            <p className='pronuncia'>Pronúncia: "{currentLetter.pronuncia}"</p>
            <p className='exemplo'>Exemplo: {currentLetter.exemplo}</p>
            <button className='virar-carta' onClick={() => setIsFlipped(false)}>
              Voltar
            </button>
          </div>
        </div>
        <div className='controles-pratica'>
          <button id='proxima-carta' onClick={nextLetter}>
            Próxima Letra <i className='fas fa-arrow-right'></i>
          </button>
        </div>
      </div>
    </section>
  );
};
