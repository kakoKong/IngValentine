import { useState } from 'react'

function LandingPage({ onSubmit, onFail }) {
  const [step, setStep] = useState('name') // name -> confirm
  const [name, setName] = useState('')

  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    if (name.trim().toLowerCase() !== 'ing') {
      onFail()
      return
    }
    setStep('confirm')
  }

  const handleConfirmYes = () => {
    onSubmit()
  }

  const handleConfirmNo = () => {
    setStep('name')
    setName('')
  }

  if (step === 'name') {
    return (
      <div className="card">
        <h1>Kong's Valentine Gift</h1>
        <p className="subtitle">Prove it. But first, who are you?</p>
        <form onSubmit={handleNameSubmit}>
          <input
            type="text"
            placeholder="Who are you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <br />
          <button type="submit" className="btn">
            Ma
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="card">
      <h1>Hold on.</h1>
      <p className="subtitle">
        You said your name is <strong>"{name}"</strong>. You sure about that?
      </p>
      <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '24px' }}>
        Think carefully. Lying won't end well for you.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button className="btn" onClick={handleConfirmYes}>
          Yeah, that's me
        </button>
        <button className="btn btn-outline" onClick={handleConfirmNo}>
          Nah, let me retype
        </button>
      </div>
    </div>
  )
}

export default LandingPage
