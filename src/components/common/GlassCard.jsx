import React from 'react'

export default function GlassCard({ children, className = '', hoverGlow = true, onClick }) {
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
        ${hoverGlow ? 'hover:shadow-md hover:border-[var(--brand-200)]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
