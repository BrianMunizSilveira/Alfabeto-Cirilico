import { useState, useEffect } from 'react';
import alphabetData from '../components/data/alphabetData';

export default function TestMode() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const questionTypes = ['pronuncia-letra', 'letra-pronuncia', 'exemplo-letra'];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const correctLetter = alphabetData[Math.floor(Math.random() * alphabetData.length)];
    
    // Gerar opções incorretas
    let incorrectOptions = [];
    while (incorrectOptions.length < 3) {
      const randomLetter = alphabetData[Math.floor(Math.random() * alphabetData.length)];
      if (randomLetter !== correctLetter && !incorrectOptions.includes(randomLetter)) {
        incorrectOptions.push(randomLetter);
      }
    }
    
    // Misturar opções
    const allOptions = [correctLetter, ...incorrectOptions]
      .sort(() => Math.random() - 0.5)
      .map(letter => ({
        letter,
        display: type === 'letra-pronuncia' ? letter.pronuncia : letter.maiuscula
      }));
    
    const questionText = type === 'pronuncia-letra' 
      ? `Pronúncia: "${correctLetter.pronuncia}"`
      : type === 'letra-pronuncia'
      ? `Letra: ${correctLetter.maiuscula}`
      : `Exemplo: ${correctLetter.exemplo.split(' ')[0]}`;
    
    setCurrentQuestion({
      text: questionText,
      options: allOptions,
      correctIndex: allOptions.findIndex(opt => opt.letter === correctLetter),
      type
    });
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleOptionSelect = (index) => {
    if (showFeedback) return;
    
    setSelectedOption(index);
    setShowFeedback(true);
    
    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  return (
    <section id="testar" className="modo-conteudo">
      <div className="teste-container">
        <div className="pergunta-teste">
          <p>Qual é a letra que corresponde a:</p>
          <p className="pergunta-texto">{currentQuestion?.text}</p>
        </div>
        
        <div className="opcoes-teste">
          {currentQuestion?.options.map((option, index) => (
            <div
              key={index}
              className={`opcao-teste ${
                showFeedback
                  ? index === currentQuestion.correctIndex
                    ? 'correta'
                    : index === selectedOption
                    ? 'incorreta'
                    : ''
                  : ''
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              {option.display}
            </div>
          ))}
        </div>
        
        {showFeedback && (
          <div className="feedback-teste">
            <p className={`resultado ${
              selectedOption === currentQuestion.correctIndex ? 'correta' : 'incorreta'
            }`}>
              {selectedOption === currentQuestion.correctIndex ? 'Correto! ✅' : 'Incorreto! ❌'}
            </p>
            <p className="explicacao">
              {currentQuestion.options[currentQuestion.correctIndex].letter.maiuscula}{' '}
              {currentQuestion.options[currentQuestion.correctIndex].letter.minuscula} - Pronúncia: "
              {currentQuestion.options[currentQuestion.correctIndex].letter.pronuncia}", Exemplo:{' '}
              {currentQuestion.options[currentQuestion.correctIndex].letter.exemplo}
            </p>
          </div>
        )}
        
        <button id="proxima-pergunta" onClick={generateNewQuestion}>
          Próxima Pergunta
        </button>
      </div>
    </section>
  );
};