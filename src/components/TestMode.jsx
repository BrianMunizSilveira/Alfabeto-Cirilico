import React, { useState, useEffect, useCallback, useMemo } from 'react'
import alphabetData from '../data/alphabetData'

// Ícones SVG
const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
)

const FlameIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
)

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m0-6h6m-6 0H6m12.22-6.22l-4.24 4.24M10.02 10.02l-4.24 4.24m12.44 0l-4.24-4.24M10.02 13.98l-4.24-4.24" />
  </svg>
)

const ResetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
)

const QUESTION_TYPES = [
  { id: 'pronuncia-letra', weight: 2, label: 'Pronúncia → Letra' },
  { id: 'letra-pronuncia', weight: 2, label: 'Letra → Pronúncia' },
  { id: 'exemplo-letra', weight: 1.5, label: 'Palavra → Letra' },
  { id: 'som-letra', weight: 1.5, label: 'Som → Letra' },
  { id: 'letra-som', weight: 1, label: 'Letra → Som' },
  { id: 'palavra-completa', weight: 1, label: 'Completar Palavra' }
]

const DIFFICULTY_LEVELS = {
  facil: { options: 3, label: 'Fácil' },
  medio: { options: 4, label: 'Médio' },
  dificil: { options: 5, label: 'Difícil' }
}

// Utilitários
const getDisplay = (letter, type) => {
  switch (type) {
    case 'letra-pronuncia':
      return letter.pronuncia
    case 'pronuncia-letra':
    case 'exemplo-letra':
    case 'palavra-completa':
    case 'som-letra':
      return `${letter.maiuscula} ${letter.minuscula}`
    case 'letra-som':
      return letter.pronuncia
    default:
      return ''
  }
}

const generateIncorrectOptions = (correctLetter, type, allLetters, numOptions = 3) => {
  const incorrectOptions = []
  const filteredLetters = allLetters.filter(letter => {
    if (letter === correctLetter) return false
    if (type.includes('pronuncia') || type.includes('som')) {
      if (letter.pronuncia === correctLetter.pronuncia) return false
    }
    return true
  })

  const shuffled = [...filteredLetters].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, numOptions)
}

const findWordsWithLetter = (targetLetter, allLetters) => {
  const words = []
  const usedWords = new Set()
  
  allLetters.forEach(letter => {
    if (letter.exemplo && letter.exemplo.toLowerCase().includes(
      targetLetter.letra?.toLowerCase() || targetLetter.minuscula
    )) {
      const cleanWord = letter.exemplo.split(' ')[0]
      if (!usedWords.has(cleanWord) && cleanWord.length > 2) {
        words.push({
          word: cleanWord,
          translation: letter.traducao || '',
          letter: letter
        })
        usedWords.add(cleanWord)
      }
    }
  })
  
  return words.slice(0, 5)
}

const generateQuestion = (difficulty, enabledTypes) => {
  const availableTypes = QUESTION_TYPES.filter(t => enabledTypes.includes(t.id))
  const totalWeight = availableTypes.reduce((sum, t) => sum + t.weight, 0)
  let random = Math.random() * totalWeight
  
  let selectedType = availableTypes[0].id
  for (const type of availableTypes) {
    random -= type.weight
    if (random <= 0) {
      selectedType = type.id
      break
    }
  }

  const correctLetter = alphabetData[Math.floor(Math.random() * alphabetData.length)]
  const numOptions = DIFFICULTY_LEVELS[difficulty].options
  const incorrectOptions = generateIncorrectOptions(correctLetter, selectedType, alphabetData, numOptions - 1)

  const allOptions = [correctLetter, ...incorrectOptions]
    .sort(() => Math.random() - 0.5)
    .map(letter => ({
      letter,
      display: getDisplay(letter, selectedType)
    }))

  let questionText = ''
  let questionDetails = null

  switch (selectedType) {
    case 'pronuncia-letra':
      questionText = 'Como se escreve a letra com esta pronúncia?'
      questionDetails = `"${correctLetter.pronuncia}"`
      break
    case 'letra-pronuncia':
      questionText = 'Qual é a pronúncia desta letra?'
      questionDetails = `${correctLetter.maiuscula} ${correctLetter.minuscula}`
      break
    case 'exemplo-letra':
      questionText = 'Qual letra está presente na palavra?'
      questionDetails = `"${correctLetter.exemplo}"`
      break
    case 'som-letra':
      questionText = 'Qual letra produz este som?'
      questionDetails = `"${correctLetter.pronuncia}"`
      break
    case 'letra-som':
      questionText = 'Qual é o som desta letra?'
      questionDetails = `${correctLetter.maiuscula} ${correctLetter.minuscula}`
      break
    case 'palavra-completa':
      questionText = 'Complete a palavra com a letra correta:'
      const words = findWordsWithLetter(correctLetter, alphabetData)
      if (words.length > 0) {
        const targetWord = words[0].word
        const letterIndex = targetWord.toLowerCase().indexOf(
          correctLetter.letra?.toLowerCase() || correctLetter.minuscula
        )
        if (letterIndex !== -1) {
          const hiddenWord = targetWord.substring(0, letterIndex) + '___' + 
                           targetWord.substring(letterIndex + 1)
          questionDetails = `"${hiddenWord}" (${words[0].translation})`
        } else {
          questionDetails = `"${correctLetter.exemplo}"`
        }
      } else {
        questionDetails = `"${correctLetter.exemplo}"`
      }
      break
    default:
      questionText = 'Qual é a alternativa correta?'
  }

  return {
    text: questionText,
    details: questionDetails,
    options: allOptions,
    correctIndex: allOptions.findIndex(opt => opt.letter === correctLetter),
    type: selectedType,
    correctLetter
  }
}

export function TestMode() {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [difficulty, setDifficulty] = useState('medio')
  const [enabledTypes, setEnabledTypes] = useState(QUESTION_TYPES.map(t => t.id))
  const [showSettings, setShowSettings] = useState(false)
  const [history, setHistory] = useState([])
  const [animating, setAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const generateNewQuestion = useCallback(() => {
    const question = generateQuestion(difficulty, enabledTypes)
    setCurrentQuestion(question)
    setSelectedOption(null)
    setShowFeedback(false)
  }, [difficulty, enabledTypes])

  useEffect(() => {
    generateNewQuestion()
    // eslint-disable-next-line
  }, [])

  const handleOptionSelect = (index) => {
    if (showFeedback || animating) return

    setAnimating(true)
    setSelectedOption(index)
    setShowFeedback(true)
    setTotalQuestions(prev => prev + 1)

    const isCorrect = index === currentQuestion.correctIndex
    
    setHistory(prev => [...prev, {
      question: currentQuestion.text,
      correct: isCorrect,
      timestamp: Date.now()
    }].slice(-20))

    if (isCorrect) {
      setScore(prev => prev + 1)
      setStreak(prev => {
        const newStreak = prev + 1
        if (newStreak > maxStreak) setMaxStreak(newStreak)
        return newStreak
      })
    } else {
      setStreak(0)
    }

    setTimeout(() => setAnimating(false), 300)
  }

  const handleNextQuestion = () => {
    setIsLoading(true)
    setTimeout(() => {
      generateNewQuestion()
      setIsLoading(false)
    }, 300)
  }

  const handleReset = () => {
    if (window.confirm('Deseja reiniciar o teste? Seu progresso será perdido.')) {
      setScore(0)
      setTotalQuestions(0)
      setStreak(0)
      setMaxStreak(0)
      setHistory([])
      generateNewQuestion()
    }
  }

  const getStreakMessage = () => {
    if (streak === 0) return ''
    if (streak >= 10) return ' 🔥🔥🔥 Imparável!'
    if (streak >= 7) return ' 🔥🔥🔥 Incrível!'
    if (streak >= 5) return ' 🔥🔥 Excelente!'
    if (streak >= 3) return ' 🔥 Sequência!'
    return ''
  }

  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0
  const recentAccuracy = useMemo(() => {
    if (history.length < 5) return null
    const recent = history.slice(-10)
    const correct = recent.filter(h => h.correct).length
    return Math.round((correct / recent.length) * 100)
  }, [history])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'var(--bg-secondary)',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--bg-secondary)',
          padding: '30px',
          color: 'var(--text-primary)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '700' }}>
              Teste de Alfabeto
            </h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px',
                  cursor: 'pointer',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Configurações"
              >
                <SettingsIcon />
              </button>
              <button
                onClick={handleReset}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px',
                  cursor: 'pointer',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Reiniciar"
              >
                <ResetIcon />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '15px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <TrophyIcon />
                <span style={{ fontSize: '12px', opacity: 0.9 }}>Pontuação</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>
                {score}/{totalQuestions}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>
                {accuracy}% acerto
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '15px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <FlameIcon />
                <span style={{ fontSize: '12px', opacity: 0.9 }}>Sequência</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>
                {streak} {streak >= 3 && '🔥'}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>
                Máximo: {maxStreak}
              </div>
            </div>

            {recentAccuracy !== null && (
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                padding: '15px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                  <TrendingUpIcon />
                  <span style={{ fontSize: '12px', opacity: 0.9 }}>Últimas 10</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>
                  {recentAccuracy}%
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>
                  Taxa recente
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div style={{
            padding: '20px',
            background: '#f8f9fa',
            borderBottom: '1px solid #e9ecef'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Configurações</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Dificuldade:
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {Object.entries(DIFFICULTY_LEVELS).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setDifficulty(key)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: '2px solid',
                      borderColor: difficulty === key ? '#667eea' : '#dee2e6',
                      background: difficulty === key ? '#667eea' : 'white',
                      color: difficulty === key ? 'white' : '#495057',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}
                  >
                    {val.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Tipos de Pergunta:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {QUESTION_TYPES.map(type => (
                  <label
                    key={type.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      background: enabledTypes.includes(type.id) ? '#e7f3ff' : '#f8f9fa',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      border: '2px solid',
                      borderColor: enabledTypes.includes(type.id) ? '#667eea' : '#dee2e6'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={enabledTypes.includes(type.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEnabledTypes([...enabledTypes, type.id])
                        } else if (enabledTypes.length > 1) {
                          setEnabledTypes(enabledTypes.filter(t => t !== type.id))
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                    {type.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Question */}
        <div style={{ padding: '40px' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px',
            opacity: animating ? 0.5 : 1,
            transform: animating ? 'scale(0.95)' : 'scale(1)',
            transition: 'all 0.2s ease'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '15px'
            }}>
              {currentQuestion?.text}
            </h3>
            {currentQuestion?.details && (
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                color: 'var(--primary-600)',
                padding: '20px',
                background: '#f7fafc',
                borderRadius: '12px',
                display: 'inline-block'
              }}>
                {currentQuestion.details}
              </div>
            )}
          </div>

          {/* Options */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${currentQuestion?.options.length > 4 ? '140px' : '160px'}, 1fr))`,
            gap: '15px',
            marginBottom: '30px'
          }}>
            {currentQuestion?.options.map((option, index) => {
              let bgColor = 'white'
              let borderColor = '#e2e8f0'
              let textColor = '#2d3748'
              let transform = 'scale(1)'
              let boxShadow = '0 2px 8px rgba(0,0,0,0.1)'

              if (showFeedback) {
                if (index === currentQuestion.correctIndex) {
                  bgColor = '#48bb78'
                  borderColor = '#48bb78'
                  textColor = 'white'
                  transform = 'scale(1.05)'
                  boxShadow = '0 10px 30px rgba(72, 187, 120, 0.4)'
                } else if (index === selectedOption) {
                  bgColor = '#f56565'
                  borderColor = '#f56565'
                  textColor = 'white'
                } else {
                  bgColor = '#f7fafc'
                  borderColor = '#e2e8f0'
                  textColor = '#a0aec0'
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={showFeedback}
                  style={{
                    padding: '20px 10px',
                    fontSize: '22px',
                    fontWeight: '700',
                    borderRadius: '12px',
                    border: `3px solid ${borderColor}`,
                    background: bgColor,
                    color: textColor,
                    cursor: showFeedback ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    transform,
                    boxShadow
                  }}
                >
                  {option.display}
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {showFeedback && currentQuestion && (
            <div style={{
              background: selectedOption === currentQuestion.correctIndex ? '#f0fff4' : '#fff5f5',
              border: `2px solid ${selectedOption === currentQuestion.correctIndex ? '#48bb78' : '#f56565'}`,
              borderRadius: '12px',
              padding: '25px',
              marginBottom: '20px',
              animation: 'slideIn 0.3s ease'
            }}>
              <div style={{
                fontSize: '20px',
                fontWeight: '700',
                color: selectedOption === currentQuestion.correctIndex ? '#22543d' : '#742a2a',
                marginBottom: '15px'
              }}>
                {selectedOption === currentQuestion.correctIndex
                  ? `✅ Correto!${getStreakMessage()}`
                  : '❌ Incorreto!'}
              </div>
              
              <div style={{
                background: 'white',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <div style={{ fontSize: '16px', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '20px' }}>
                    {currentQuestion.correctLetter.maiuscula}{' '}
                    {currentQuestion.correctLetter.minuscula}
                  </strong>
                  {' '}- Pronúncia: <strong>"{currentQuestion.correctLetter.pronuncia}"</strong>
                </div>
                <div style={{ fontSize: '16px', color: '#4a5568' }}>
                  Exemplo: {currentQuestion.correctLetter.exemplo}
                </div>
                {currentQuestion.correctLetter.observacao && (
                  <div style={{
                    marginTop: '10px',
                    padding: '10px',
                    background: '#edf2f7',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#2d3748'
                  }}>
                    💡 {currentQuestion.correctLetter.observacao}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={handleNextQuestion}
            disabled={isLoading}
            className={`next-question-btn${isLoading ? ' loading' : ''}`}
          >
            {isLoading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Carregando...
              </>
            ) : (
              'Próxima Pergunta →'
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default TestMode