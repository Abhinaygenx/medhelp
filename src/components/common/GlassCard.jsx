import React from 'react'

export default function GlassCard({ children, className = '', hoverGlow = true, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-light)',
        borderRadius: '20px',
        boxShadow: 'var(--shadow-md)',
        backdropFilter: 'blur(12px)',
        color: 'var(--text-primary)'
      }}
      className={`
        transition-all duration-300
        ${hoverGlow ? 'hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 hover:border-[var(--brand-300)]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
