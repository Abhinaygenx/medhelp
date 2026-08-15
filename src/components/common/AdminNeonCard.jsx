import React from 'react'

export default function AdminNeonCard({ children, className = '', hoverGlow = true, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#1F2937',
        border: '1px solid #374151',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)'
      }}
      className={`
        transition-all duration-300
        ${hoverGlow ? 'hover:-translate-y-0.5 hover:border-[#E5FF00]/60 hover:shadow-[0_8px_25px_rgba(229,255,0,0.15),0_4px_20px_rgba(0,0,0,0.5)]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
