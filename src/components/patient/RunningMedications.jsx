import React from 'react'
import { Pill, Clock, AlertCircle, CheckCircle2, Calendar, User, ShieldCheck } from 'lucide-react'
import { Badge } from '../common/Badge'

export default function RunningMedications({ medications = [], onOpenUploadModal }) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div 
        className="p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          background: 'linear-gradient(135deg, var(--brand-700) 0%, var(--brand-900) 100%)',
          color: '#ffffff',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md mb-2">
            <Pill size={14} />
            <span>Active Prescription Regimen</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            Running Medications & Daily Dosage Schedule
          </h2>
          <p className="text-xs text-blue-100 max-w-xl mt-1 leading-relaxed">
            All active medications currently prescribed by your attending physicians. Take strictly as directed and follow dietary guidelines.
          </p>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-3xl font-black">{medications.length}</span>
          <p className="text-xs text-blue-200">Active Prescriptions</p>
        </div>
      </div>

      {/* Medication Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {medications.length === 0 ? (
          <div 
            className="col-span-2 p-12 text-center rounded-2xl border border-dashed"
            style={{ background: 'var(--surface-card)', borderColor: 'var(--border-default)', color: 'var(--text-muted)' }}
          >
            <Pill className="w-10 h-10 mx-auto text-[var(--neutral-400)] mb-3" />
            <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>No active running medications</h4>
            <p className="text-xs mt-1">When your doctor issues or renews a clinical prescription, it will appear here.</p>
          </div>
        ) : (
          medications.map(med => (
            <div
              key={med.id}
              className="p-5 rounded-2xl space-y-4 transition-all hover:shadow-md"
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div className="flex items-start justify-between gap-3 border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--brand-50)', color: 'var(--brand-600)', border: '1px solid var(--brand-200)' }}
                  >
                    <Pill size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {med.medicineName}
                    </h3>
                    <p className="text-xs text-[var(--brand-600)] font-semibold mt-0.5">
                      {med.dosage} • {med.duration || '30 Days'}
                    </p>
                  </div>
                </div>

                <Badge variant={med.status === 'Active' ? 'success' : 'default'} size="sm">
                  {med.status || 'Active'}
                </Badge>
              </div>

              {/* Schedule Timing Pills */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                  Prescribed Daily Regimen:
                </span>
                <div className="p-3 rounded-xl border flex items-center justify-between"
                  style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}
                >
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-[var(--brand-600)]" />
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                      {med.frequency}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    Since {med.startDate || 'Recent'}
                  </span>
                </div>
              </div>

              {/* Doctor & Instructions */}
              <div className="space-y-1.5 text-xs">
                {med.instructions && (
                  <p className="p-2.5 rounded-xl text-[11px] leading-relaxed text-[var(--text-secondary)]"
                    style={{ background: 'var(--brand-50)', border: '1px solid var(--brand-100)' }}
                  >
                    <strong className="text-[var(--brand-900)]">Instructions: </strong>
                    {med.instructions}
                  </p>
                )}
                <div className="flex items-center justify-between pt-1 text-[11px] text-[var(--text-muted)]">
                  <span>Prescribed by: <strong className="text-[var(--text-secondary)]">{med.prescribedBy || 'Attending Physician'}</strong></span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 size={12} />
                    <span>In-Stock / Filled</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
