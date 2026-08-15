import React from 'react'

export default function PatientNeonCard({ children, className = '', hoverGlow = true }) {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #071A14 0%, #0A211A 100%)',
        border: '1px solid #E5FF0030',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.02)'
      }}
      className={`
        transition-all duration-300
        ${hoverGlow ? 'hover:-translate-y-0.5 hover:border-[#E5FF00]/50 hover:shadow-[0_8px_24px_rgba(229,255,0,0.15),0_4px_20px_rgba(0,0,0,0.45)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
