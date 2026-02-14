import { useState } from 'react'

const questions = [
  {
    question: "Where did we first meet",
    options: ['อาบอบนวด', 'ซ่อง', 'Nung Chill at Manchester', 'University'],
    correct: 2,
  },
  {
    question: 'How handsome am I?',
    options: ['Very Handsome', 'Super Handsome', 'Wowza Handsome', 'All Correct'],
    correct: 3,
  },
  {
    question: "What's my favourite word to you?",
    options: ['Puad Kee', 'It will be better', 'Maiii', 'All Correct'],
    correct: 3,
  },
  {
    question: 'What do I want from you the most?',
    options: ['Your Happiness', 'Silence', 'Freedom', 'All Correct'],
    correct: 3,
  },
  {
    question: "Ter ruk rao mai",
    options: ['Ruk', 'Mai ruk', 'Suek', 'Mai bork'],
    correct: 0,
  },
  {
    question: 'Ruk kae nhai',
    options: ['Suek', 'Mak', 'Nid ng', 'Somtum'],
    correct: 1,
  },
  {
    question: "Ruk t sood leoi rue plao",
    options: ['Mai', 'Chai', 'T sood', 'Mai roo'],
    correct: 2,
  },
  {
    question: 'Mai Chuer',
    options: ['Rueng khong mg', 'Ja', 'Mai roo mg la', 'Done'],
    correct: 3,
  },
  {
    question: 'Ready for the last question?',
    options: ['Yes', 'Nah', 'NoNo', 'No'],
    correct: 0,
  },
  {
    question: 'Will you split the bill with me :)?',
    options: ['Yes', 'Of course', 'Absolutely', 'All of the above (pick this or else...)'],
    correct: 3,
  },
]

const correctResponses = [
  'Chalard Nuk na',
  'D mak',
  'Close one',
  'Good!',
  'Mai Chuer',
  'Mai!!!',
  'Maiiiiiiii',
  'Almost Done',
  'Good!',
  'Deaw send QR Code Hai',
]

const wrongResponses = [
  'Wrong. What kind of partner are you?',
  'Dissappoint wa',
  'Sad',
  'Khor pai tiew gub puen na',
  'Wrong!',
  'Wrong again!',
  'Wrong!!!!!!!',
  '...',
  'Still yes',
  'Deaw request money in Make hai',
]

function getTier(score) {
  if (score >= 9) return { label: 'S', tag: 'S Tier' }
  if (score >= 7) return { label: 'A', tag: 'A Tier' }
  if (score >= 5) return { label: 'B', tag: 'B Tier' }
  if (score >= 3) return { label: 'C', tag: 'C Tier' }
  if (score >= 1) return { label: 'D', tag: 'D Tier' }
  return { label: 'F', tag: 'F Tier' }
}

function QuizPage({ onComplete }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [power, setPower] = useState(0) // 0 to 100, starts at 0
  const [selected, setSelected] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const q = questions[currentQ]
  const progressPercent = ((currentQ + 1) / questions.length) * 100
  const tier = getTier(score)

  const handleAnswer = (index) => {
    if (showFeedback) return
    setSelected(index)
    setShowFeedback(true)

    const isCorrect = index === q.correct
    const newScore = isCorrect ? score + 1 : score

    if (isCorrect) {
      setScore(newScore)
      setPower((p) => Math.min(100, p + 10))
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1)
        setSelected(null)
        setShowFeedback(false)
      } else {
        onComplete(newScore)
      }
    }, 1500)
  }

  const getOptionStyle = (index) => {
    const base = {
      width: '100%',
      padding: '12px 16px',
      fontSize: '0.95rem',
      fontFamily: "'Inter', sans-serif",
      border: '1px solid #ccc',
      borderRadius: '6px',
      background: '#fff',
      cursor: showFeedback ? 'default' : 'pointer',
      textAlign: 'left',
      transition: 'all 0.15s',
    }
    if (!showFeedback) return base
    if (index === q.correct) return { ...base, borderColor: '#111', background: '#111', color: '#fff' }
    if (index === selected) return { ...base, borderColor: '#999', background: '#f5f5f5', color: '#999', textDecoration: 'line-through' }
    return base
  }

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
      {/* Vertical Power Bar */}
      <div style={{
        width: '40px',
        minHeight: '400px',
        background: '#eee',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        border: '1px solid #ddd',
      }}>
        {/* Fill: from bottom, height = power% */}
        {(() => {
          // power 0-100. Color: 0 = red, 50 = green, 100 = blue
          const t = power / 100
          let r, g, b
          if (t <= 0.5) {
            // red(239,68,68) -> green(34,197,94)
            const s = t / 0.5
            r = Math.round(239 + (34 - 239) * s)
            g = Math.round(68 + (197 - 68) * s)
            b = Math.round(68 + (94 - 68) * s)
          } else {
            // green(34,197,94) -> blue(59,130,246)
            const s = (t - 0.5) / 0.5
            r = Math.round(34 + (59 - 34) * s)
            g = Math.round(197 + (130 - 197) * s)
            b = Math.round(94 + (246 - 94) * s)
          }
          const fillColor = `rgb(${r},${g},${b})`

          return (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: `${power}%`,
              background: fillColor,
              transition: 'all 0.5s ease',
            }} />
          )
        })()}
        {/* Power label */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          transform: 'translateY(-50%)',
          textAlign: 'center',
          fontSize: '0.65rem',
          fontWeight: '700',
          color: '#111',
          zIndex: 2,
          background: 'rgba(255,255,255,0.7)',
          padding: '2px 0',
        }}>
          {power}
        </div>
        {/* Top / Bottom labels */}
        <div style={{
          position: 'absolute',
          top: '6px',
          left: 0,
          width: '100%',
          textAlign: 'center',
          fontSize: '0.55rem',
          fontWeight: '600',
          color: '#3b82f6',
          zIndex: 2,
        }}>100</div>
        <div style={{
          position: 'absolute',
          bottom: '6px',
          left: 0,
          width: '100%',
          textAlign: 'center',
          fontSize: '0.55rem',
          fontWeight: '600',
          color: '#ef4444',
          zIndex: 2,
        }}>0</div>
      </div>

      {/* Quiz Content */}
      <div className="card" style={{ textAlign: 'left', flex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.85rem', color: '#999' }}>
            {currentQ + 1} / {questions.length}
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
            {score} pts &middot; {tier.tag}
          </span>
        </div>

        {/* Question Progress Bar (thin) */}
        <div style={{
          width: '100%',
          height: '4px',
          background: '#eee',
          borderRadius: '2px',
          marginBottom: '24px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: '#999',
            borderRadius: '2px',
            transition: 'width 0.4s ease',
          }} />
        </div>

        {/* Question */}
        <h2 style={{ marginBottom: '20px', fontSize: '1.15rem' }}>{q.question}</h2>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              style={getOptionStyle(i)}
              onClick={() => handleAnswer(i)}
              onMouseEnter={(e) => { if (!showFeedback) e.target.style.borderColor = '#111' }}
              onMouseLeave={(e) => { if (!showFeedback) e.target.style.borderColor = '#ccc' }}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <p style={{ marginTop: '16px', fontSize: '0.9rem', color: selected === q.correct ? '#111' : '#999' }}>
            {selected === q.correct
              ? correctResponses[currentQ]
              : `${wrongResponses[currentQ]} It was: ${q.options[q.correct]}`}
          </p>
        )}
      </div>
    </div>
  )
}

export default QuizPage
