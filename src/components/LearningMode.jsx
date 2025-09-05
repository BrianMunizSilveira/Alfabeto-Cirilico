import React, { useState, useCallback, useRef } from 'react'
import AlphabetCard from './AlphabetCard'
import alphabetData from '../data/alphabetData'

// Componente LearningMode Otimizado
export function LearningMode() {
  const [filter, setFilter] = useState('todos')
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
  const audioRef = useRef(null) // Reutiliza o mesmo elemento de áudio

  // Função otimizada para habilitar áudio (só chama uma vez)
  const enableAudio = useCallback(() => {
    if (!isAudioEnabled) {
      setIsAudioEnabled(true)
      console.log('🔓 Áudio habilitado pelo usuário')
    }
  }, [isAudioEnabled])

  // Função principal de áudio otimizada
  const playAudio = useCallback((letter) => {
    // Habilita áudio na primeira interação
    enableAudio()
    
    console.log('🎵 Tocando:', letter.minuscula)
    
    // Para áudio atual se estiver tocando
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    
    // Atualiza estado visual
    setCurrentlyPlaying(letter.minuscula)
    
    // Cria/reutiliza elemento de áudio
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.volume = 0.8
      audioRef.current.preload = 'auto'
    }
    
    const audio = audioRef.current
    const audioPath = `/assets/audio/${letter.minuscula}.mp3`
    
    // Event listeners (só adiciona uma vez)
    const handleSuccess = () => {
      console.log('✅ Tocando:', letter.minuscula)
    }
    
    const handleEnd = () => {
      console.log('✅ Terminou:', letter.minuscula)
      setCurrentlyPlaying(null)
    }
    
    const handleError = () => {
      console.log('❌ MP3 falhou, usando fallback TTS')
      setCurrentlyPlaying(null)
      
      // Fallback: TTS em português
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel()
        
        const speech = new SpeechSynthesisUtterance()
        speech.text = `Letra russa ${letter.pronuncia}`
        speech.lang = 'pt-BR'
        speech.rate = 0.8
        speech.volume = 0.8
        
        speech.onstart = () => setCurrentlyPlaying(`${letter.minuscula}-tts`)
        speech.onend = () => setCurrentlyPlaying(null)
        speech.onerror = () => {
          setCurrentlyPlaying(null)
          // Fallback final: alert
          alert(`🔊 ${letter.maiuscula}${letter.minuscula} - "${letter.pronuncia}"`)
        }
        
        speechSynthesis.speak(speech)
      } else {
        alert(`🔊 ${letter.maiuscula}${letter.minuscula} - "${letter.pronuncia}"`)
      }
    }
    
    // Remove listeners antigos e adiciona novos
    audio.removeEventListener('play', handleSuccess)
    audio.removeEventListener('ended', handleEnd)
    audio.removeEventListener('error', handleError)
    
    audio.addEventListener('play', handleSuccess)
    audio.addEventListener('ended', handleEnd)
    audio.addEventListener('error', handleError)
    
    // Tenta tocar
    audio.src = audioPath
    audio.play().catch(error => {
      console.log('❌ Play falhou:', error.name)
      
      if (error.name === 'NotAllowedError') {
        setCurrentlyPlaying(null)
        alert('🔒 Clique em qualquer lugar da página primeiro para habilitar áudio!')
      } else {
        handleError() // Usa fallback
      }
    })
    
  }, [enableAudio])

  // Função de filtro otimizada com useMemo seria ideal, mas vamos manter simples
  const filteredAlphabet = alphabetData.filter(letter => {
    switch (filter) {
      case 'maiusculas':
      case 'minusculas':
        return true
      case 'semelhantes':
        return letter.latin?.length === 1 && /^[A-Za-z]$/.test(letter.latin)
      case 'diferentes':
        return !letter.latin || letter.latin.length !== 1 || !/^[A-Za-z]$/.test(letter.latin)
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
    <div onClick={enableAudio}> {/* Habilita áudio com qualquer clique */}
      
      {/* Status do áudio */}
      <div className={`audio-status ${isAudioEnabled ? 'enabled' : 'disabled'}`}
           role="button"
           tabIndex={0}
           aria-label={isAudioEnabled ? 'Áudio habilitado' : 'Clique para habilitar áudio'}>
        <span role="img" aria-hidden="true">{isAudioEnabled ? '🔊' : '🔇'}</span>
        <span>
          {isAudioEnabled 
            ? (currentlyPlaying ? `Tocando: ${currentlyPlaying}` : 'Áudio pronto') 
            : 'Clique para habilitar áudio'
          }
        </span>
      </div>

      {/* Filtros */}
      <div className='filter-container'>
        {filterOptions.map(option => (
          <button
            key={option.key}
            onClick={() => setFilter(option.key)}
            className={`filter-btn ${filter === option.key ? 'active' : 'inactive'}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Grid de letras */}
      <div className='alphabet-grid'>
        {filteredAlphabet.length > 0 ? (
          filteredAlphabet.map((letter, index) => (
            <AlphabetCard 
              key={`${letter.minuscula}-${index}`}
              letter={letter} 
              filter={filter}
              onPlayAudio={() => playAudio(letter)}
              isPlaying={currentlyPlaying === letter.minuscula || currentlyPlaying === `${letter.minuscula}-tts`}
              style={{ animationDelay: `${index * 50}ms` }}
            />
          ))
        ) : (
          <div className="empty-state">
            <span role="img" aria-hidden="true">🔍</span>
            <p>Nenhuma letra encontrada com este filtro.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LearningMode