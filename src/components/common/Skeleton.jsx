import React from 'react'

export function Skeleton({ 
  className = '', 
  width, 
  height, 
  borderRadius = '8px', 
  style = {} 
}) {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        background: 'var(--neutral-200)',
        width: width || '100%',
        height: height || '20px',
        borderRadius,
        ...style
      }}
    />
  )
}

export function SkeletonCard() {
  return (
    <div 
      className="p-6 rounded-2xl flex flex-col gap-4"
      style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
    >
      <div className="flex items-center gap-3">
        <Skeleton width="48px" height="48px" borderRadius="12px" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton width="60%" height="16px" />
          <Skeleton width="40%" height="12px" />
        </div>
      </div>
      <Skeleton width="100%" height="40px" borderRadius="10px" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton width="30%" height="14px" />
        <Skeleton width="20%" height="14px" />
      </div>
    </div>
  )
}

export default Skeleton
