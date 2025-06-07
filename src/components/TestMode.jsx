import React, { useState, useEffect } from 'react'
import alphabetData from '../data/alphabetData'
// Componente TestMode
export function TestMode () {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    generateNewQuestion()
  }, [])

  const generateNewQuestion = () => {
    const questionTypes = [
      'pronuncia-letra',
      'letra-pronuncia',
      'exemplo-letra'
    ]
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)]
    const correctLetter =
      alphabetData[Math.floor(Math.random() * alphabetData.length)]

    // Gerar opções incorretas
    let incorrectOptions = []
    while (incorrectOptions.length < 3) {
      const randomLetter =
        alphabetData[Math.floor(Math.random() * alphabetData.length)]
      if (
        randomLetter !== correctLetter &&
        !incorrectOptions.includes(randomLetter)
      ) {
        incorrectOptions.push(randomLetter)
      }
    }

    // Misturar opções
    const allOptions = [correctLetter, ...incorrectOptions]
      .sort(() => Math.random() - 0.5)
      .map(letter => ({
        letter,
        display:
          type === 'letra-pronuncia' ? letter.pronuncia : letter.maiuscula
      }))

    const questionText =
      type === 'pronuncia-letra'
        ? `Pronúncia: "${correctLetter.pronuncia}"`
        : type === 'letra-pronuncia'
        ? `Letra: ${correctLetter.maiuscula}`
        : `Exemplo: ${correctLetter.exemplo.split(' ')[0]}`

    setCurrentQuestion({
      text: questionText,
      options: allOptions,
      correctIndex: allOptions.findIndex(opt => opt.letter === correctLetter),
      type,
      correctLetter
    })
    setSelectedOption(null)
    setShowFeedback(false)
  }

  const handleOptionSelect = index => {
    if (showFeedback) return

    setSelectedOption(index)
    setShowFeedback(true)
    setTotalQuestions(prev => prev + 1)

    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    generateNewQuestion()
  }

  return (
    <div className='test-container'>
      {/* Pontuação */}
      <div className='score-box'>
        <p>
          Pontuação: {score} / {totalQuestions}
          {totalQuestions > 0 && (
            <span>({Math.round((score / totalQuestions) * 100)}%)</span>
          )}
        </p>
      </div>

      {/* Pergunta */}
      <div className='question-box'>
        <p>Qual é a letra que corresponde a:</p>
        <p>{currentQuestion?.text}</p>
      </div>

      {/* Opções */}
      <div className='options-grid'>
        {currentQuestion?.options.map((option, index) => {
          let btnClass = 'default'
          if (showFeedback) {
            if (index === currentQuestion.correctIndex) {
              btnClass = 'correct'
            } else if (index === selectedOption) {
              btnClass = 'incorrect'
            } else {
              btnClass = 'disabled'
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={showFeedback}
              className={`option-btn ${btnClass}`}
            >
              {option.display}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className='feedback-box'>
          <p
            className={
              selectedOption === currentQuestion.correctIndex
                ? 'feedback-correct'
                : 'feedback-incorrect'
            }
          >
            {selectedOption === currentQuestion.correctIndex
              ? 'Correto! ✅'
              : 'Incorreto! ❌'}
          </p>
          <p>
            <strong>
              {currentQuestion.correctLetter.maiuscula}{' '}
              {currentQuestion.correctLetter.minuscula}
            </strong>{' '}
            - Pronúncia: "{currentQuestion.correctLetter.pronuncia}", Exemplo:{' '}
            {currentQuestion.correctLetter.exemplo}
          </p>
        </div>
      )}

      {/* Botão Próxima Pergunta */}
      <button onClick={handleNextQuestion} className='next-question-btn'>
        Próxima Pergunta
      </button>
    </div>
  )
}

export default TestMode
