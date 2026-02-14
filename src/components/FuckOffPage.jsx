function FuckOffPage({ onBack }) {
  return (
    <div className="card">
      <h1>Wrong person.</h1>
      <p style={{ fontSize: '1.1rem', color: '#666', margin: '16px 0 8px' }}>
        This wasn't made for you. Not even close.
      </p>
      <p style={{ fontSize: '1.5rem', fontWeight: '700', margin: '8px 0 16px' }}>
        Fuck off.
      </p>
      <div style={{
        width: '220px',
        aspectRatio: '1',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #ddd',
        margin: '0 auto 16px',
      }}>
        <img
          src="/images/FO.jpg"
          alt="Fuck off"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <p style={{ fontSize: '0.85rem', color: '#999', margin: '0 0 20px' }}>
        You are not the person I'm looking for!
      </p>
      <button className="btn btn-outline" onClick={onBack}>
        Bui
      </button>
    </div>
  )
}

export default FuckOffPage
