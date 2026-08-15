import React from 'react'

export default function GlassCard({ children, className = '', hoverGlow = true }) {
  return (
    <div
      className={`
        bg-[#081225]/90
        backdrop-blur-xl
        border border-[#162742]
        rounded-3xl
        shadow-[0_8px_32px_rgba(2,8,23,0.45)]
        ${hoverGlow ? 'hover:shadow-[0_0_0_1px_rgba(37,99,255,0.15),0_10px_30px_rgba(37,99,255,0.12)] hover:-translate-y-1 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
