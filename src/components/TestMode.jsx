import React, { useState, useEffect } from 'react'
import alphabetData from '../data/alphabetData'

// Função utilitária para exibir a opção correta conforme o tipo de pergunta
const getDisplay = (letter, type) => {
  switch (type) {
    case 'letra-pronuncia':
      return letter.pronuncia
    case 'pronuncia-letra':
    case 'exemplo-letra':
      return `${letter.maiuscula} ${letter.minuscula}`
    default:
      return ''
  }
}

// Função para gerar opções incorretas sem repetições ou ambiguidade
const generateIncorrectOptions = (correctLetter, type, allLetters, numOptions = 3) => {
  const incorrectOptions = []
  while (incorrectOptions.length < numOptions) {
    const randomLetter = allLetters[Math.floor(Math.random() * allLetters.length)]
    if (
      randomLetter !== correctLetter &&
      !incorrectOptions.includes(randomLetter) &&
      getDisplay(randomLetter, type) !== getDisplay(correctLetter, type)
    ) {
      incorrectOptions.push(randomLetter)
    }
  }
  return incorrectOptions
}

export function TestMode () {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    generateNewQuestion()
    // eslint-disable-next-line
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

    // Gera opções incorretas filtradas
    const incorrectOptions = generateIncorrectOptions(correctLetter, type, alphabetData)

    // Mistura opções e define o que será exibido
    const allOptions = [correctLetter, ...incorrectOptions]
      .sort(() => Math.random() - 0.5)
      .map(letter => ({
        letter,
        display: getDisplay(letter, type)
      }))

    // Define enunciado da pergunta
    let questionText = ''
    switch (type) {
      case 'pronuncia-letra':
        questionText = `Pronúncia: "${correctLetter.pronuncia}"`
        break
      case 'letra-pronuncia':
        questionText = `Letra: ${correctLetter.maiuscula} ${correctLetter.minuscula}`
        break
      case 'exemplo-letra':
        questionText = `Exemplo: ${correctLetter.exemplo}`
        break
      default:
        questionText = ''
    }

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
    setIsLoading(true)
    setTimeout(() => {
      generateNewQuestion()
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className='test-container'>
      {/* Pontuação */}
      <div className='score-box'>
        <p>
          Pontuação: {score} / {totalQuestions}
          {totalQuestions > 0 && (
            <span> ({Math.round((score / totalQuestions) * 100)}%)</span>
          )}
        </p>
      </div>

      {/* Pergunta */}
      <div className='question-box'>
        <p>Qual é a alternativa correta?</p>
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
      <div className='next-question-overlay'>
        <button
          onClick={handleNextQuestion}
          className={`next-question-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Próxima Pergunta'}
          {isLoading && <span className='spinner' aria-hidden='true'></span>}
        </button>
      </div>
    </div>
  )
}

export default TestMode
