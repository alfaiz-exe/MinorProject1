import './CSS/App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Feature from './Feature'
import Article_C from './Article_C'
import Article_J from './Article_J'
import Article_P from './Article_P'
import Topic from './Topic'
import Articles from './Articles'
import Quiz from './Quiz'
import QuizSubjects from './QuizSubjects'
import Pdf from './Pdf'
import Notepad from './Notepad'
import Signup from './Signup'
import Signin from './Signin'
import Token from './token'
import Therapy from './Therapy'
import Background from './Background'
import Front from './Front' 
import Foter from './Foter'

function App() {
  const isLogin = Boolean(Token.getToken())
  return (
    <>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/signin" element={isLogin ? <Navigate to="/" /> : <Signin />} />
        <Route path="/signup" element={isLogin ? <Navigate to="/" /> : <Signup />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/therapy" element={<Therapy />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/c/Articles" element={<Article_C />} />
        <Route path="/javascript/Articles" element={<Article_J />} />
        <Route path="/python/Articles" element={<Article_P />} />
        <Route path="/note" element={<Notepad />} />
        <Route path="/quiz/subjects" element={<QuizSubjects />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/topic" element={<Topic />} />
      </Routes>
    </>
  )
}

export default App
