import React from 'react';
import { useNavigate } from 'react-router-dom';
import quizBank from './DATA/Q';
import Navbar from './Navbar';
import './CSS/QuizSelect.css';

const QuizSubjects = () => {
  const navigate = useNavigate();
  const subjects = Object.entries(quizBank).map(([key, value]) => ({
    key,
    title: value.title,
  }));

  return (
    <div className="quiz-select-page">
      <Navbar />
      <div className="quiz-select-hero">
        <p className="eyebrow">Quiz Mode</p>
        <h1 className="quiz-select-title">Choose your subject to start the quiz.</h1>
        <p className="quiz-select-lede">Matches the Read Article subjects: C, Python, and JavaScript.</p>
      </div>

      <div className="quiz-select-grid">
        {subjects.map((subject) => (
          <button
            key={subject.key}
            className="quiz-select-card"
            onClick={() => navigate(`/quiz?subject=${subject.key}`)}
          >
            <div className="quiz-select-card-title">{subject.title}</div>
            <div className="quiz-select-card-action">Start Quiz →</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizSubjects;
