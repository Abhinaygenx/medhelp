import React from 'react'
import { TrendingUp } from 'lucide-react'
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
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800',
      badge: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800'
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
      badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
      badge: 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
    },
    red: {
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800',
      badge: 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800'
    }
  }

  const theme = colorMap[color] || colorMap.blue

  return (
    <GlassCard className="p-6 space-y-3" hoverGlow={true}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{title}</span>
        {Icon && (
          <div className={`p-3 rounded-2xl ${theme.iconBg} shadow-sm`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          {value}
        </p>

        {trend && (
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 ${theme.badge}`}>
            <TrendingUp className="w-3.5 h-3.5" />
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
      )}
    </GlassCard>
  )
}
