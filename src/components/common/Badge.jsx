import React from 'react'

export function Badge({ 
  children, 
  variant = 'default', // 'default' | 'success' | 'warning' | 'danger' | 'info' | 'brand'
  size = 'md',        // 'sm' | 'md' | 'lg'
  className = '',
  style = {}
}) {
  const styles = {
    default: { background: 'var(--neutral-100)', color: 'var(--neutral-700)', border: '1px solid var(--neutral-200)' },
    brand:   { background: 'var(--brand-50)',   color: 'var(--brand-700)',   border: '1px solid var(--brand-200)' },
    success: { background: '#ecfdf5',           color: '#065f46',           border: '1px solid #a7f3d0' },
    warning: { background: '#fffbeb',           color: '#92400e',           border: '1px solid #fde68a' },
    danger:  { background: '#fef2f2',           color: '#991b1b',           border: '1px solid #fecaca' },
    info:    { background: '#f0f9ff',           color: '#075985',           border: '1px solid #bae6fd' },
  }

  const sizes = {
    sm: { padding: '2px 8px', fontSize: '0.6875rem' },
    md: { padding: '4px 10px', fontSize: '0.75rem' },
    lg: { padding: '6px 14px', fontSize: '0.8125rem' },
  }

  const selectedStyle = styles[variant] || styles.default
  const selectedSize = sizes[size] || sizes.md

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${className}`}
      style={{
        ...selectedStyle,
        ...selectedSize,
        lineHeight: 1.2,
        ...style
      }}
    >
      {children}
    </span>
  )
}

export default Badge
