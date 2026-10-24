import React from 'react'
import GlassCard from '../common/GlassCard'

export default function StatCard({ 
  title, 
  value, 
  color = 'blue', 
  icon: Icon, 
  trend, 
  subtitle 
}) {
  const colorMap = {
    blue: {
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-200/80 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/60',
      badge: 'bg-blue-50 text-blue-700 border border-blue-200/80 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/60'
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200/80 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/60',
      badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/60'
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-200/80 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/60',
      badge: 'bg-amber-50 text-amber-700 border border-amber-200/80 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/60'
    },
    red: {
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-200/80 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800/60',
      badge: 'bg-rose-50 text-rose-700 border border-rose-200/80 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800/60'
    }
  }

  const theme = colorMap[color] || colorMap.blue

  return (
    <GlassCard className="p-5 flex flex-col justify-between" hoverGlow={true}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${theme.iconBg} shadow-xs`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2 mt-auto">
        <p className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)', lineHeight: 1 }}>
          {value}
        </p>

        {trend && (
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shrink-0 ${theme.badge}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-80" />
            <span>{trend}</span>
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] font-medium mt-2.5" style={{ color: 'var(--text-muted)' }}>
          {subtitle}
        </p>
      )}
    </GlassCard>
  )
}
