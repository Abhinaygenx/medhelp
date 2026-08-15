import React from 'react'
import { 
  AlertTriangle, 
  Siren, 
  PhoneCall, 
  X, 
  Clock,
  ShieldAlert
} from 'lucide-react'

export default function EmergencyAlertBanner({ emergencyCases, onRespondEmergency, onDismiss }) {
  if (!emergencyCases || emergencyCases.length === 0) return null

  const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="rounded-2xl bg-gradient-to-r from-red-950 via-rose-950 to-slate-950 border-2 border-red-500/60 p-5 shadow-2xl shadow-red-900/30 relative overflow-hidden space-y-4">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-red-500/30 pb-3 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="relative p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400">
            <Siren className="w-6 h-6 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
                Priority: CRITICAL
              </span>
              <h3 className="font-extrabold text-red-100 text-sm sm:text-base font-['Space_Grotesk'] flex items-center gap-1.5">
                <span>Emergency Escalation Queue ({emergencyCases.length})</span>
              </h3>
            </div>
            <p className="text-xs text-red-300/90 mt-0.5">Automated AI Triage detected severe clinical symptoms requiring immediate doctor dispatch.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex flex-col text-right text-[11px]">
            <span className="text-red-300 font-bold flex items-center gap-1 justify-end">
              <Clock className="w-3 h-3 text-red-400" />
              Escalated: {formattedTime}
            </span>
            <span className="text-red-400 font-extrabold uppercase">Response SLA: 5 Minutes</span>
          </div>

          {onDismiss && (
            <button 
              onClick={onDismiss} 
              aria-label="Dismiss emergency alert"
              className="p-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/40 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Emergency Cases List (Auto-sorted to top) */}
      <div className="space-y-2.5 relative z-10">
        {emergencyCases.map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-slate-950/90 border border-red-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-red-200 text-sm">Patient: {item.patientName || item.patient}</span>
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-mono">Appt #{item.id || 'CRITICAL'}</span>
                <span className="text-[10px] text-red-400 font-semibold">• Response SLA: 5 Mins</span>
              </div>
              <p className="text-slate-200 italic bg-red-950/60 px-3 py-1.5 rounded-lg border border-red-500/30">
                "{item.symptoms || item.complaint}"
              </p>
            </div>

            <div className="flex items-center space-x-2 self-end sm:self-center">
              <button
                onClick={() => onRespondEmergency && onRespondEmergency(item)}
                aria-label={`Dispatch doctor for ${item.patientName || item.patient}`}
                className="bg-red-500 hover:bg-red-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xs flex items-center space-x-1.5 shadow-lg shadow-red-500/40"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Immediate Doctor Dispatch</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
