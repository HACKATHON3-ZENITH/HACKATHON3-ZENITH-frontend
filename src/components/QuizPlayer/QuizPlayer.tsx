import React, { useState } from 'react';
import styles from './QuizPlayer.module.css';
import { clsx } from 'clsx';

interface Option {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback?: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface QuizPlayerProps {
  questions: Question[];
  onComplete?: (score: number) => void;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ questions, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const option = currentQuestion.options.find(o => o.id === optionId);
    if (option?.isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      onComplete?.(score + (currentQuestion.options.find(o => o.id === selectedOptionId)?.isCorrect ? 1 : 0));
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className={styles['quiz-container']}>
      <div className={styles['quiz-progress']}>Question {currentStep + 1} sur {questions.length}</div>
      <div className={styles['quiz-progress-bar']}>
        <div className={styles['quiz-progress-fill']} style={{ width: `${progress}%` }} />
      </div>

      <h2 className={styles['quiz-question']}>{currentQuestion.text}</h2>

      <div className={styles['quiz-options']}>
        {currentQuestion.options.map((option, index) => {
          const letter = String.fromCharCode(65 + index);
          const isSelected = selectedOptionId === option.id;
          const showCorrect = isAnswered && option.isCorrect;
          const showWrong = isAnswered && isSelected && !option.isCorrect;

          return (
            <button
              key={option.id}
              className={clsx(
                styles['quiz-option'],
                isSelected && styles['quiz-option--selected'],
                showCorrect && styles['quiz-option--correct'],
                showWrong && styles['quiz-option--wrong'],
                isAnswered && styles['quiz-option--disabled']
              )}
              onClick={() => handleSelect(option.id)}
              disabled={isAnswered}
            >
              <span className={styles['quiz-option__letter']}>{letter}</span>
              <span className={styles['quiz-option__label']}>{option.label}</span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className={styles['quiz-footer']}>
          <div className={clsx(
            styles['quiz-feedback'],
            currentQuestion.options.find(o => o.id === selectedOptionId)?.isCorrect 
              ? styles['quiz-feedback--correct'] 
              : styles['quiz-feedback--wrong']
          )}>
            <strong>{currentQuestion.options.find(o => o.id === selectedOptionId)?.isCorrect ? 'Correct !' : 'Incorrect'}</strong>
            <p>{currentQuestion.options.find(o => o.id === selectedOptionId)?.feedback}</p>
          </div>
          
          <button className={styles['quiz-next-btn']} onClick={handleNext}>
            {currentStep < questions.length - 1 ? 'Question suivante →' : 'Terminer le quiz'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPlayer;
