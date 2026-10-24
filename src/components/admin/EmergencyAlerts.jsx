import React, { useState } from 'react'
import { AlertTriangle, Siren, PhoneCall, Plus, CheckCircle2, Clock } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
import toast from 'react-hot-toast'

export default function EmergencyAlerts({ emergencyAlerts = [], onTriggerEmergency, onResolveEmergency }) {
  const [showModal, setShowModal] = useState(false)
  const [newEr, setNewEr] = useState({ patientName: '', condition: 'Severe Respiratory Distress', location: 'ER Trauma Room 1' })

  const handleTriggerAlertSubmit = (e) => {
    e.preventDefault()
    if (!newEr.patientName.trim()) return

    const created = {
      id: `er-${Date.now().toString().slice(-3)}`,
      patientName: newEr.patientName,
      condition: newEr.condition,
      location: newEr.location,
      sla: '5 Mins',
      status: 'Active Dispatch'
    }

    if (onTriggerEmergency) {
      onTriggerEmergency(created)
    }
    toast.error(`CRITICAL EMERGENCY ALERT TRIGGERED FOR ${created.patientName.toUpperCase()}!`, {
      style: { background: '#EF4444', color: '#FFFFFF', fontWeight: 'bold' }
    })
    setShowModal(false)
    setNewEr({ patientName: '', condition: 'Severe Respiratory Distress', location: 'ER Trauma Room 1' })
  }

  const resolveEmergency = (id, patient) => {
    if (onResolveEmergency) {
      onResolveEmergency(id)
    }
    toast.success(`Emergency case for ${patient} marked RESOLVED & DISPATCHED.`)
  }

  return (
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 text-red-600 dark:text-red-400">
            <Siren className="w-5 h-5 text-red-600 dark:text-red-400 animate-bounce" /> Hospital Emergency Alert & Triage Hotline
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Broadcast emergency hospital alerts, dispatch ER medical teams, and track 5-minute SLAs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm hover:opacity-95 transition-all cursor-pointer"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Trigger Emergency Alert</span>
        </button>
      </div>

      <div className="space-y-4">
        {emergencyAlerts.length === 0 ? (
          <div className="py-12 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
            No active emergency alerts at this time.
          </div>
        ) : (
          emergencyAlerts.map(er => (
            <div 
              key={er.id} 
              className="p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              style={{
                background: 'rgba(239, 68, 68, 0.06)',
                border: '1px solid rgba(239, 68, 68, 0.25)'
              }}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-red-600 dark:text-red-400 text-sm">CRITICAL: {er.patientName}</span>
                  <Badge variant="danger" size="sm">SLA: {er.sla}</Badge>
                </div>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{er.condition}</p>
                <p className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>Location: {er.location}</p>
              </div>

              <button
                onClick={() => resolveEmergency(er.id, er.patientName)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-sm transition-all"
              >
                Resolve & Dispatch ER
              </button>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="rounded-2xl p-6 max-w-md w-full space-y-4 text-xs shadow-xl"
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border-light)'
            }}
          >
            <h3 
              className="font-extrabold text-base border-b pb-3 text-red-600 dark:text-red-400"
              style={{ borderColor: 'var(--border-light)' }}
            >
              Trigger Immediate Hospital ER Alert
            </h3>
            
            <form onSubmit={handleTriggerAlertSubmit} className="space-y-3">
              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Patient Name</label>
                <input
                  type="text"
                  value={newEr.patientName}
                  onChange={(e) => setNewEr({...newEr, patientName: e.target.value})}
                  placeholder="e.g. John Doe"
                  className="w-full rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  required
                />
              </div>

              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Clinical Emergency Symptoms</label>
                <textarea
                  value={newEr.condition}
                  onChange={(e) => setNewEr({...newEr, condition: e.target.value})}
                  className="w-full rounded-xl p-3 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  required
                />
              </div>

              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Hospital Location / Ward</label>
                <input
                  type="text"
                  value={newEr.location}
                  onChange={(e) => setNewEr({...newEr, location: e.target.value})}
                  className="w-full rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  required
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="px-4 py-2 rounded-xl font-bold border cursor-pointer hover:bg-[var(--neutral-100)]"
                  style={{
                    background: 'var(--surface-page)',
                    color: 'var(--text-muted)',
                    borderColor: 'var(--border-light)'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl cursor-pointer shadow-sm transition-all"
                >
                  Broadcast ER Dispatch Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminNeonCard>
  )
}
