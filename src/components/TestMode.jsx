import React, { useState, useEffect } from 'react';
import alphabetData from '../data/alphabetData';
// Componente TestMode
export function TestMode() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
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
      type,
      correctLetter
    });
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleOptionSelect = (index) => {
    if (showFeedback) return;
    
    setSelectedOption(index);
    setShowFeedback(true);
    setTotalQuestions(prev => prev + 1);
    
    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    generateNewQuestion();
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Pontuação */}
      <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
        <p className="text-lg font-semibold">
          Pontuação: {score} / {totalQuestions} 
          {totalQuestions > 0 && (
            <span className="ml-2 text-sm">
              ({Math.round((score / totalQuestions) * 100)}%)
            </span>
          )}
        </p>
      </div>

      {/* Pergunta */}
      <div className="mb-6 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
        <p className="text-lg mb-4">Qual é a letra que corresponde a:</p>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {currentQuestion?.text}
        </p>
      </div>
      
      {/* Opções */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {currentQuestion?.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={showFeedback}
            className={`p-4 text-2xl font-bold rounded-lg border-2 transition-all duration-300 ${
              showFeedback
                ? index === currentQuestion.correctIndex
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : index === selectedOption
                  ? 'bg-red-100 border-red-500 text-red-700'
                  : 'bg-gray-100 border-gray-300 text-gray-500'
                : 'bg-white hover:bg-blue-50 border-gray-300 hover:border-blue-500 text-gray-800 cursor-pointer'
            }`}
          >
            {option.display}
          </button>
        ))}
      </div>
      
      {/* Feedback */}
      {showFeedback && (
        <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <p className={`text-xl font-bold mb-2 ${
            selectedOption === currentQuestion.correctIndex ? 'text-green-600' : 'text-red-600'
          }`}>
            {selectedOption === currentQuestion.correctIndex ? 'Correto! ✅' : 'Incorreto! ❌'}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>{currentQuestion.correctLetter.maiuscula} {currentQuestion.correctLetter.minuscula}</strong> - 
            Pronúncia: "{currentQuestion.correctLetter.pronuncia}", 
            Exemplo: {currentQuestion.correctLetter.exemplo}
          </p>
        </div>
      )}
      
      {/* Botão Próxima Pergunta */}
      <button
        onClick={handleNextQuestion}
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors duration-300"
      >
        Próxima Pergunta
      </button>
    </div>
  );
}

export default TestMode;