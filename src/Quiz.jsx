import React, { useState, useEffect, useRef } from 'react';
import './CSS/Quiz.css';
import quizBank from './DATA/Q';
import { useNavigate, useSearchParams } from 'react-router-dom'; 

function Quiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [subject, setSubject] = useState('c');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [cheatCount, setCheatCount] = useState(0);
  const [disqualified, setDisqualified] = useState(false);

  const [eventCount, setEventCount] = useState(0); 
  const timerRef = useRef(null);
  const subjectData = quizBank[subject] || quizBank.c;
  const questions = subjectData.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const navigate = useNavigate(); 
  const validSubject = (value) => ['c', 'python', 'javascript'].includes(value);

  useEffect(() => {
    const handleCheatAttempt = (reason) => {
      setCheatCount((prev) => {
        const next = prev + 1;
        if (next === 1) {
          alert('Please stay on this tab. Leaving the quiz will end it.');
        }
        if (next >= 2) {
          clearInterval(timerRef.current);
          setDisqualified(true);
          setQuizFinished(true);
        }
        return next;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleCheatAttempt('hidden');
      }
    };

    const handleBlur = () => handleCheatAttempt('blur');

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    const initial = searchParams.get('subject');
    if (initial && validSubject(initial)) {
      setSubject(initial);
    } else {
      navigate('/quiz/subjects');
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    setTimeLeft(10); 
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex, subject]);

  useEffect(() => {
    if (quizFinished) {
      clearInterval(timerRef.current);
    }
  }, [quizFinished]);

  useEffect(() => {
    clearInterval(timerRef.current);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setQuizFinished(false);
    setTimeLeft(10);
    setSearchParams({ subject });
  }, [subject]);

  useEffect(() => {
    if (timeLeft === 0 && selectedOption === null) {
      handleNext(); 
    }
  }, [timeLeft]);

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    clearInterval(timerRef.current);

    if (currentQuestion.options[optionIndex].isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    clearInterval(timerRef.current);
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedOption(null);
      setShowExplanation(false);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const totalQuestions = questions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  if (quizFinished) {
    return (
      <div className="quiz-container scoreboard">
        {disqualified ? (
          <>
            <h2>🚫 Quiz Ended</h2>
            <p>Switching tabs or leaving the page ended your attempt.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '12px' }}>
              <button className="next-button" onClick={() => navigate('/')}>Go to Home</button>
              <button className="next-button" onClick={() => navigate('/quiz/subjects')}>Start again</button>
            </div>
          </>
        ) : (
          <>
            <h2>🎉 Quiz Completed!</h2>
            <p>You answered <strong>{correctCount}</strong> out of <strong>{totalQuestions}</strong> questions correctly.</p>
            <p>Your Score: <strong>{percentage}%</strong></p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '12px' }}>
              <button className="next-button" onClick={() => navigate('/')}>Go to Home</button>
              <button className="next-button" onClick={() => navigate('/quiz/subjects')}>Try another subject</button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="biggest">
      <div className="quiz-container responsive">
        <div className="question-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="eyebrow">{subjectData.title} Quiz</span>
          <button className="next-button" onClick={() => navigate('/quiz/subjects')}>
            Change subject
          </button>
        </div>
        <div className="question-container">
          <h2 className="question">{currentQuestion.question}</h2>
          <p className="timer">Time left: {timeLeft}s</p>
        </div>

        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option ${
                selectedOption === index
                  ? option.isCorrect
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => handleOptionClick(index)}
              disabled={selectedOption !== null}
            >
              <span
                className={`indicator ${
                  selectedOption === index
                    ? option.isCorrect
                      ? 'correct-indicator'
                      : 'incorrect-indicator'
                    : ''
                }`}
              ></span>
              {option.text}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="explanation-container">
            <h3 className="explanation-title">Explanation</h3>
            <p className="explanation-text">{currentQuestion.explanation}</p>
            <button className="next-button" onClick={handleNext}>
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;