import React from 'react'

export default function AdminNeonCard({ children, className = '', hoverGlow = true, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-light)',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-sm)',
        color: 'var(--text-primary)'
      }}
      className={`
        transition-all duration-200
        ${hoverGlow ? 'hover:-translate-y-0.5 hover:border-[var(--brand-300)] hover:shadow-[var(--shadow-md)]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
