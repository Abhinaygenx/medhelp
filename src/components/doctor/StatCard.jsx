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
      text: 'text-[#3b82f6]',
      iconBg: 'bg-[#2563ff]/20 text-[#3b82f6] border border-[#2563ff]/30 shadow-[#2563ff]/10',
      badge: 'bg-[#2563ff]/15 text-[#3b82f6] border border-[#2563ff]/25'
    },
    emerald: {
      text: 'text-[#10b981]',
      iconBg: 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 shadow-[#10b981]/10',
      badge: 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25'
    },
    amber: {
      text: 'text-[#f59e0b]',
      iconBg: 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30 shadow-[#f59e0b]/10',
      badge: 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/25'
    },
    red: {
      text: 'text-[#ef4444]',
      iconBg: 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30 shadow-[#ef4444]/10',
      badge: 'bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/25'
    }
  }

  const theme = colorMap[color] || colorMap.blue

  return (
    <GlassCard className="p-6 space-y-3" hoverGlow={true}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-3 rounded-2xl ${theme.iconBg} shadow-sm`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-extrabold text-[#f8fafc] font-['Space_Grotesk'] tracking-tight">
          {value}
        </p>

        {trend && (
          <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 ${theme.badge}`}>
            <TrendingUp className="w-3.5 h-3.5" />
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] text-[#94a3b8] font-medium">{subtitle}</p>
      )}
    </GlassCard>
  )
}
