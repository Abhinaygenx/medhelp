import React, { useState } from 'react'
import { AlertTriangle, Siren, PhoneCall, Plus, CheckCircle2, Clock } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
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
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#EF4444] font-['Space_Grotesk'] flex items-center gap-2">
            <Siren className="w-5 h-5 text-[#EF4444] animate-bounce" /> Hospital Emergency Alert & Triage Hotline
          </h2>
          <p className="text-xs text-[#9CA3AF]">Broadcast emergency hospital alerts, dispatch ER medical teams, and track 5-minute SLAs.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-[#EF4444] hover:bg-red-600 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-lg shadow-red-500/40 hover:scale-105 transition-all"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Trigger Emergency Alert</span>
        </button>
      </div>

      <div className="space-y-4">
        {emergencyAlerts.map(er => (
          <div key={er.id} className="p-5 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-[#EF4444] text-sm font-['Space_Grotesk']">CRITICAL: {er.patientName}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EF4444] text-[#0B0F19] text-[10px] font-extrabold uppercase">SLA: {er.sla}</span>
              </div>
              <p className="text-xs text-[#F9FAFB] font-semibold">{er.condition}</p>
              <p className="text-[11px] text-[#9CA3AF] font-mono">Location: {er.location}</p>
            </div>

            <button
              onClick={() => resolveEmergency(er.id, er.patientName)}
              className="px-4 py-2 rounded-xl bg-[#22C55E] text-[#0B0F19] font-extrabold text-xs shrink-0"
            >
              Resolve & Dispatch ER
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1F2937] rounded-3xl border border-[#EF4444]/50 p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-[#EF4444] font-['Space_Grotesk'] border-b border-[#374151] pb-3">
              Trigger Immediate Hospital ER Alert
            </h3>
            
            <form onSubmit={handleTriggerAlertSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Patient Name</label>
                <input
                  type="text"
                  value={newEr.patientName}
                  onChange={(e) => setNewEr({...newEr, patientName: e.target.value})}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#EF4444]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Clinical Emergency Symptoms</label>
                <textarea
                  value={newEr.condition}
                  onChange={(e) => setNewEr({...newEr, condition: e.target.value})}
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl p-3 text-white h-20 resize-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Hospital Location / Ward</label>
                <input
                  type="text"
                  value={newEr.location}
                  onChange={(e) => setNewEr({...newEr, location: e.target.value})}
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl bg-[#111827] text-[#9CA3AF] font-bold">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-[#EF4444] text-white font-extrabold px-4 py-2 rounded-xl"
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
