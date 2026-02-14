import { useState } from 'react'

// Each tier maps to a specific image + congrats message
function getTier(score) {
  if (score >= 9) return { tag: 'S Tier', img: '/images/Love.jpg', msg: "ถือว่าเธอรักเรา", congrats: "เอาความรักเราไป" }
  if (score >= 7) return { tag: 'A Tier', img: '/images/Love.jpg', msg: "เธอรักเราใข้ได้", congrats: "เอาความรักเราไป" }
  if (score >= 5) return { tag: 'B Tier', img: '/images/Love.jpg', msg: "เธอรักเราพอประมาณ", congrats: "เอาความรักพอประมาณเราไป" }
  if (score >= 3) return { tag: 'C Tier', img: '/images/FO.jpg', msg: "เธอไม่รักเรา", congrats: "จบกันแค่นี้" }
  if (score >= 1) return { tag: 'D Tier', img: '/images/FO.jpg', msg: "เธอไม่รักเราาาาาา", congrats: "ลาก่อน" }
  return { tag: 'F Tier', img: null, msg: "มันจบแล้วครับนาย", congrats: null }
}

function TreasureBox({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bottom box */}
      <rect x="12" y="50" width="76" height="36" rx="4" fill="#8B5E3C" stroke="#6B3F1F" strokeWidth="2" />
      {/* Wood grain lines */}
      <line x1="20" y1="60" x2="80" y2="60" stroke="#6B3F1F" strokeWidth="0.8" opacity="0.4" />
      <line x1="20" y1="72" x2="80" y2="72" stroke="#6B3F1F" strokeWidth="0.8" opacity="0.4" />
      {/* Lid */}
      <path d="M8 38 C8 30, 20 22, 50 22 C80 22, 92 30, 92 38 L92 50 L8 50 Z" fill="#A0704C" stroke="#6B3F1F" strokeWidth="2" />
      {/* Lid band - gold */}
      <rect x="8" y="44" width="84" height="8" rx="1" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
      {/* Center lock - gold */}
      <rect x="42" y="38" width="16" height="24" rx="3" fill="#FFD700" stroke="#DAA520" strokeWidth="1.5" />
      <circle cx="50" cy="52" r="3" fill="#8B5E3C" />
      {/* Keyhole */}
      <rect x="49" y="53" width="2" height="5" rx="1" fill="#8B5E3C" />
      {/* Lid shine */}
      <path d="M18 34 Q34 26, 50 25" stroke="#fff" strokeWidth="1.5" opacity="0.3" fill="none" />
      {/* Corner studs - gold */}
      <circle cx="22" cy="66" r="3.5" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
      <circle cx="78" cy="66" r="3.5" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
      {/* Sparkles */}
      <text x="88" y="25" fontSize="12" opacity="0.8">&#10022;</text>
      <text x="4" y="20" fontSize="8" opacity="0.5">&#10022;</text>
      <text x="78" y="12" fontSize="6" opacity="0.6">&#10022;</text>
    </svg>
  )
}

function TreasureBoxOpen({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bottom box */}
      <rect x="12" y="55" width="76" height="34" rx="4" fill="#8B5E3C" stroke="#6B3F1F" strokeWidth="2" />
      {/* Wood grain */}
      <line x1="20" y1="65" x2="80" y2="65" stroke="#6B3F1F" strokeWidth="0.8" opacity="0.4" />
      <line x1="20" y1="76" x2="80" y2="76" stroke="#6B3F1F" strokeWidth="0.8" opacity="0.4" />
      {/* Gold band on box */}
      <rect x="12" y="55" width="76" height="6" rx="1" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
      {/* Corner studs */}
      <circle cx="22" cy="72" r="3.5" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
      <circle cx="78" cy="72" r="3.5" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
      {/* Lid - tilted open */}
      <path d="M8 55 L5 22 C5 14, 18 6, 50 6 C82 6, 95 14, 95 22 L92 55" fill="#A0704C" stroke="#6B3F1F" strokeWidth="2" opacity="0.0" />
      <g transform="rotate(-35, 8, 55)">
        <path d="M8 38 C8 30, 20 22, 50 22 C80 22, 92 30, 92 38 L92 50 L8 50 Z" fill="#A0704C" stroke="#6B3F1F" strokeWidth="2" />
        <rect x="8" y="44" width="84" height="8" rx="1" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
        <path d="M18 34 Q34 26, 50 25" stroke="#fff" strokeWidth="1.5" opacity="0.3" fill="none" />
      </g>
      {/* Glow from inside */}
      <ellipse cx="50" cy="55" rx="28" ry="8" fill="#FFD700" opacity="0.3" />
      <ellipse cx="50" cy="55" rx="16" ry="5" fill="#FFF8E1" opacity="0.5" />
      {/* Sparkles */}
      <text x="42" y="48" fontSize="10" opacity="0.9">&#10022;</text>
      <text x="56" y="42" fontSize="8" opacity="0.7">&#10022;</text>
      <text x="34" y="40" fontSize="6" opacity="0.6">&#10022;</text>
      <text x="60" y="50" fontSize="7" opacity="0.8">&#10022;</text>
      <text x="88" y="18" fontSize="10" opacity="0.6">&#10022;</text>
      <text x="2" y="30" fontSize="7" opacity="0.4">&#10022;</text>
    </svg>
  )
}

// phases: idle -> shaking -> opened -> revealed
function ResultPage({ score, onRestart }) {
  const tier = getTier(score)
  const [phase, setPhase] = useState('idle')
  const [imageError, setImageError] = useState(false)

  const handleOpen = () => {
    if (phase !== 'idle') return
    setPhase('shaking')
    setTimeout(() => setPhase('opened'), 1200)
    setTimeout(() => setPhase('revealed'), 3200)
  }

  return (
    <div className="card">
      {/* Score */}
      <div style={{
        fontSize: '3rem',
        fontWeight: '700',
        lineHeight: 1,
        marginBottom: '4px',
      }}>
        {score}/10
      </div>
      <div style={{
        display: 'inline-block',
        padding: '4px 16px',
        border: '2px solid #111',
        borderRadius: '4px',
        fontWeight: '700',
        fontSize: '0.9rem',
        marginBottom: '16px',
      }}>
        {tier.tag}
      </div>
      <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '24px' }}>
        {tier.msg}
      </p>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 0 20px' }} />

      {/* Treasure Box Area */}
      <div style={{ marginBottom: '24px', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {!tier.img ? (
          <p style={{ fontSize: '0.95rem', color: '#999' }}>
            You got nothing. Zero correct, zero prize. Absolutely deserved.
          </p>
        ) : phase === 'idle' ? (
          <>
            <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '16px' }}>
              You earned a prize. Click to open it. Or don't. I don't care.
            </p>
            <button
              onClick={handleOpen}
              style={{
                width: '160px',
                height: '160px',
                borderRadius: '8px',
                border: 'none',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.15s',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <TreasureBox size={80} />
              <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#111' }}>Open</span>
            </button>
          </>
        ) : phase === 'shaking' ? (
          <div style={{
            width: '160px',
            height: '160px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: "'Inter', sans-serif",
            animation: 'box-shake 0.4s ease infinite',
          }}>
            <TreasureBox size={80} />
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#111' }}>Opening...</span>
          </div>
        ) : phase === 'opened' ? (
          <div style={{ textAlign: 'center', animation: 'tadahh-in 0.4s ease forwards' }}>
            <TreasureBoxOpen size={120} />
            <p style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '8px', animation: 'fade-up 0.4s ease 0.3s both' }}>Ja ehhhh</p>
            <p style={{ fontSize: '0.85rem', color: '#999', animation: 'fade-up 0.4s ease 0.6s both' }}>Triam Rub Prize</p>
          </div>
        ) : (
          /* revealed */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '240px',
              aspectRatio: '1',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #ddd',
              background: '#f9f9f9',
              margin: '0 auto 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'reveal-image 0.8s ease forwards',
            }}>
              {imageError ? (
                <span style={{ fontSize: '0.85rem', color: '#999' }}>Photo unlocked</span>
              ) : (
                <img
                  src={tier.img}
                  alt="Your prize"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <p style={{
              fontSize: '0.9rem',
              color: '#444',
              fontWeight: '500',
              animation: 'fade-up 0.5s ease 0.3s both',
            }}>
              {tier.congrats}
            </p>
          </div>
        )}
      </div>

      <button className="btn" onClick={onRestart}>
        Try again ma
      </button>

      <p style={{ marginTop: '14px', fontSize: '0.8rem', color: '#bbb' }}>
        (Gor ma di kub)
      </p>
    </div>
  )
}

export default ResultPage
