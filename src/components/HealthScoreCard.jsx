import React, { useState, useCallback, useMemo } from 'react'
import { 
  HeartPulse, 
  Activity, 
  Moon, 
  Droplets, 
  ShieldCheck, 
  RefreshCw,
  Zap,
  Heart
} from 'lucide-react'

const HealthScoreCard = React.memo(function HealthScoreCard() {
  const [metrics, setMetrics] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    sleepHours: 7.5,
    hydrationLiters: 2.4,
    healthScore: 88,
    heartHealthPct: 92,
    sleepQualityPct: 85,
    activityLevelPct: 78
  })

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefreshSync = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        heartRate: Math.floor(68 + Math.random() * 8),
        sleepHours: Number((7.0 + Math.random() * 1.0).toFixed(1)),
        hydrationLiters: Number((2.2 + Math.random() * 0.5).toFixed(1)),
        heartHealthPct: Math.floor(88 + Math.random() * 8),
        sleepQualityPct: Math.floor(80 + Math.random() * 12),
        activityLevelPct: Math.floor(75 + Math.random() * 15)
      }))
      setIsRefreshing(false)
    }, 600)
  }, [])

  // Circular ring calculation memoized
  const ringParams = useMemo(() => {
    const score = metrics.healthScore
    const radius = 36
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (score / 100) * circumference
    return { score, circumference, strokeDashoffset }
  }, [metrics.healthScore])

  return (
    <div className="space-y-6 text-[#F8FAFC]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#113328] pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#00FF66]/15 border border-[#00FF66]/30 flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-[#00FF66]" />
          </div>
          <div>
            <h3 className="font-bold text-[#F8FAFC] text-base font-['Space_Grotesk']">
              Smart Health Telemetry & Vital Card
            </h3>
            <p className="text-xs text-[#A7B3AD]">IoT wearable sync • Live patient telemetry metrics</p>
          </div>
        </div>

        <button
          onClick={handleRefreshSync}
          aria-label="Sync smart band telemetry metrics"
          style={{
            background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
            color: '#04140F'
          }}
          className="font-extrabold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xs flex items-center space-x-1.5 shadow-md"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#04140F] ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Sync Telemetry</span>
        </button>
      </div>

      {/* Score & Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        
        {/* Circular Ring Score */}
        <div className="md:col-span-2 p-5 rounded-2xl bg-[#04140F] border border-[#113328] flex items-center space-x-4 shadow-xl">
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="36"
                className="text-[#020B08] stroke-current"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="36"
                className="text-[#00FF66] stroke-current transition-all duration-1000 ease-out"
                strokeWidth="7"
                strokeDasharray={ringParams.circumference}
                strokeDashoffset={ringParams.strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-bold font-['Space_Grotesk'] text-[#F8FAFC]">{ringParams.score}%</span>
              <span className="text-[9px] uppercase font-extrabold text-[#00FF66] tracking-wider">Score</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 text-[10px] font-bold inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Optimal Health</span>
            </span>
            <h4 className="font-bold text-[#F8FAFC] text-sm">Vitals Stable</h4>
            <p className="text-[11px] text-[#A7B3AD]">All 4 telemetry parameters within ideal clinical reference range.</p>
          </div>
        </div>

        {/* 4 Telemetry Metric Widgets */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#04140F] border border-[#113328] space-y-1 hover:border-[#EF4444]/40 transition-all">
            <div className="flex items-center justify-between text-[#EF4444]">
              <HeartPulse className="w-4 h-4" />
              <span className="text-[9px] font-bold text-[#6B7C75] uppercase">BPM</span>
            </div>
            <p className="text-base font-bold text-[#F8FAFC] font-['Space_Grotesk']">{metrics.heartRate} <span className="text-xs font-normal text-[#6B7C75]">bpm</span></p>
            <p className="text-[10px] text-[#6B7C75]">Resting Pulse</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#04140F] border border-[#113328] space-y-1 hover:border-[#00FF66]/40 transition-all">
            <div className="flex items-center justify-between text-[#00FF66]">
              <Activity className="w-4 h-4" />
              <span className="text-[9px] font-bold text-[#6B7C75] uppercase">BP</span>
            </div>
            <p className="text-base font-bold text-[#F8FAFC] font-['Space_Grotesk']">{metrics.bloodPressure}</p>
            <p className="text-[10px] text-[#6B7C75]">mmHg (Normal)</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#04140F] border border-[#113328] space-y-1 hover:border-[#3B82F6]/40 transition-all">
            <div className="flex items-center justify-between text-[#3B82F6]">
              <Moon className="w-4 h-4" />
              <span className="text-[9px] font-bold text-[#6B7C75] uppercase">Sleep</span>
            </div>
            <p className="text-base font-bold text-[#F8FAFC] font-['Space_Grotesk']">{metrics.sleepHours} <span className="text-xs font-normal text-[#6B7C75]">hrs</span></p>
            <p className="text-[10px] text-[#6B7C75]">Deep Rest</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#04140F] border border-[#113328] space-y-1 hover:border-[#00FF66]/40 transition-all">
            <div className="flex items-center justify-between text-[#00FF66]">
              <Droplets className="w-4 h-4" />
              <span className="text-[9px] font-bold text-[#6B7C75] uppercase">Water</span>
            </div>
            <p className="text-base font-bold text-[#F8FAFC] font-['Space_Grotesk']">{metrics.hydrationLiters} <span className="text-xs font-normal text-[#6B7C75]">L</span></p>
            <p className="text-[10px] text-[#6B7C75]">Daily Intake</p>
          </div>
        </div>

      </div>

      {/* Animated Progress Bars Section */}
      <div className="pt-2 border-t border-[#113328] grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Heart Health */}
        <div className="space-y-1.5 p-3 rounded-2xl bg-[#04140F] border border-[#113328]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#A7B3AD] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#EF4444]" /> Heart Health
            </span>
            <span className="font-bold text-[#EF4444]">{metrics.heartHealthPct}%</span>
          </div>
          <div className="w-full bg-[#020B08] rounded-full h-2.5 overflow-hidden border border-[#113328]">
            <div 
              className="bg-[#EF4444] h-2.5 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${metrics.heartHealthPct}%` }}
            />
          </div>
        </div>

        {/* Sleep Quality */}
        <div className="space-y-1.5 p-3 rounded-2xl bg-[#04140F] border border-[#113328]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#A7B3AD] flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-[#3B82F6]" /> Sleep Quality
            </span>
            <span className="font-bold text-[#3B82F6]">{metrics.sleepQualityPct}%</span>
          </div>
          <div className="w-full bg-[#020B08] rounded-full h-2.5 overflow-hidden border border-[#113328]">
            <div 
              className="bg-[#3B82F6] h-2.5 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${metrics.sleepQualityPct}%` }}
            />
          </div>
        </div>

        {/* Activity Level */}
        <div className="space-y-1.5 p-3 rounded-2xl bg-[#04140F] border border-[#113328]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#A7B3AD] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#00FF66]" /> Activity Level
            </span>
            <span className="font-bold text-[#00FF66]">{metrics.activityLevelPct}%</span>
          </div>
          <div className="w-full bg-[#020B08] rounded-full h-2.5 overflow-hidden border border-[#113328]">
            <div 
              className="bg-[#00FF66] h-2.5 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${metrics.activityLevelPct}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  )
})

export default HealthScoreCard
