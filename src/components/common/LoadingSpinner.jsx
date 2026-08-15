import React from 'react'
import { Loader2 } from 'lucide-react'

export default function LoadingSpinner({ text = 'Processing...', size = 'sm', className = '' }) {
  return (
    <div className={`inline-flex items-center space-x-2 text-blue-600 font-semibold text-xs ${className}`}>
      <Loader2 className={`animate-spin ${size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4'}`} />
      {text && <span>{text}</span>}
    </div>
  )
}
