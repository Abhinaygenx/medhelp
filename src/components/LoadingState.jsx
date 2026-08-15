import React from 'react'
import { Inbox, FileText, Calendar, User, Stethoscope, Activity } from 'lucide-react'

// 1. Generic Skeleton Card Loader
export const LoadingCard = ({ height = "h-48", className = "" }) => {
  return (
    <div 
      aria-label="Loading content"
      className={`rounded-2xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl shadow-lg shadow-cyan-500/10 p-6 animate-pulse flex flex-col justify-between ${height} ${className}`}
    >
      <div className="space-y-3">
        <div className="h-4 bg-slate-800 rounded-lg w-1/3" />
        <div className="h-3 bg-slate-800/60 rounded-lg w-2/3" />
        <div className="h-3 bg-slate-800/40 rounded-lg w-1/2" />
      </div>
      <div className="h-10 bg-slate-800/80 rounded-xl w-full" />
    </div>
  )
}

// 2. Generic Empty State Component
export const EmptyState = ({ 
  title = "No data found", 
  description = "There are no items to display right now.",
  icon: Icon = Inbox,
  actionText,
  onAction
}) => {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl shadow-lg shadow-cyan-500/10 p-8 text-center space-y-4 my-4">
      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-slate-100 text-base font-['Space_Grotesk']">{title}</h4>
        <p className="text-xs text-slate-400 max-w-md mx-auto">{description}</p>
      </div>
      {actionText && onAction && (
        <button
          onClick={onAction}
          aria-label={actionText}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xs inline-flex items-center space-x-2"
        >
          <span>{actionText}</span>
        </button>
      )}
    </div>
  )
}

// 3. Appointment List Skeleton Loader
export const AppointmentSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-800 rounded w-1/4" />
            <div className="h-3 bg-slate-800/60 rounded w-1/2" />
          </div>
          <div className="h-9 bg-slate-800 rounded-xl w-28" />
        </div>
      ))}
    </div>
  )
}

// 4. Analytics Card Skeleton Loader
export const AnalyticsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5 space-y-3 animate-pulse">
          <div className="h-3 bg-slate-800 rounded w-1/2" />
          <div className="h-8 bg-slate-800/80 rounded w-2/3" />
          <div className="h-2 bg-slate-800/40 rounded w-1/3" />
        </div>
      ))}
    </div>
  )
}

// 5. Doctor List Skeleton Loader
export const DoctorCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <LoadingCard key={i} height="h-64" />
      ))}
    </div>
  )
}

// 6. Prescription Preview Skeleton Loader
export const PrescriptionSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2].map((i) => (
        <div key={i} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 animate-pulse space-y-4">
          <div className="h-4 bg-slate-800 rounded w-1/3" />
          <div className="h-16 bg-slate-950 rounded-xl" />
          <div className="h-8 bg-slate-800 rounded-xl w-1/2" />
        </div>
      ))}
    </div>
  )
}

export default LoadingCard
