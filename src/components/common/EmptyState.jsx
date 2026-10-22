import React from 'react'
import { FolderOpen } from 'lucide-react'

export function EmptyState({
  icon: Icon = FolderOpen,
  title = 'No records found',
  description = 'There is currently no data to display in this view.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-12 rounded-2xl ${className}`}
      style={{
        background: 'var(--surface-card)',
        border: '1px dashed var(--border-default)',
      }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: 'var(--brand-50)',
          color: 'var(--brand-600)',
          border: '1px solid var(--brand-200)',
        }}
      >
        <Icon size={28} />
      </div>
      <h3
        className="font-bold text-base mb-1"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h3>
      <p
        className="text-xs max-w-sm mb-5"
        style={{ color: 'var(--text-muted)' }}
      >
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all"
          style={{
            background: 'var(--brand-600)',
            color: '#ffffff',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
