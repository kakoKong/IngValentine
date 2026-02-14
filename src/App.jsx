import { useState } from 'react'
import LandingPage from './components/LandingPage'
import FuckOffPage from './components/FuckOffPage'
import QuizPage from './components/QuizPage'
import ResultPage from './components/ResultPage'

function App() {
  const [page, setPage] = useState('landing')
  const [score, setScore] = useState(0)

  const handleVerified = () => {
    setPage('quiz')
  }

  const handleFail = () => {
    setPage('fuckoff')
  }

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore)
    setPage('result')
  }

  const handleRestart = () => {
    setPage('landing')
    setScore(0)
  }

  return (
    <div className="page-container" key={page}>
      {page === 'landing' && <LandingPage onSubmit={handleVerified} onFail={handleFail} />}
      {page === 'fuckoff' && <FuckOffPage onBack={handleRestart} />}
      {page === 'quiz' && <QuizPage onComplete={handleQuizComplete} />}
      {page === 'result' && <ResultPage score={score} onRestart={handleRestart} />}
    </div>
  )
}

export default App
