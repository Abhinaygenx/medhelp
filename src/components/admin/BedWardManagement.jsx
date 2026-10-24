import React, { useState } from 'react'
import { Bed, Users, Plus, CheckCircle2, AlertCircle } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
import toast from 'react-hot-toast'

export default function BedWardManagement({ beds = [], onAssignBed, onReleaseBed }) {
  const [showModal, setShowModal] = useState(false)
  const [selectedBed, setSelectedBed] = useState(null)
  const [patientInput, setPatientInput] = useState('')

  const handleAssignBedSubmit = (e) => {
    e.preventDefault()
    if (!selectedBed || !patientInput.trim()) return

    if (onAssignBed) {
      onAssignBed(selectedBed.id, patientInput)
    }
    toast.success(`Bed ${selectedBed.roomNo} assigned to ${patientInput}!`)
    setShowModal(false)
    setSelectedBed(null)
    setPatientInput('')
  }

  const handleReleaseBedClick = (id, roomNo) => {
    if (onReleaseBed) {
      onReleaseBed(id)
    }
    toast.success(`Bed ${roomNo} released & sanitized!`)
  }

  const occupiedCount = beds.filter(b => b.status === 'Occupied').length
  const availableCount = beds.filter(b => b.status === 'Available').length

  return (
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Bed className="w-5 h-5 text-[var(--brand-600)]" /> ICU & Ward Bed Allocation System
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Manage hospital room occupancy, ICU bed dispatch, and patient discharge release.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <Badge variant="success" size="sm">
            {availableCount} Beds Available
          </Badge>
          <Badge variant="danger" size="sm">
            {occupiedCount} Beds Occupied
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {beds.map(bed => (
          <div 
            key={bed.id} 
            className="p-5 rounded-2xl space-y-4 transition-all"
            style={{
              background: 'var(--surface-page)',
              border: '1px solid var(--border-light)'
            }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
              <div>
                <h3 className="font-extrabold text-base" style={{ color: 'var(--text-primary)' }}>{bed.roomNo}</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{bed.ward}</p>
              </div>
              <Badge variant={bed.status === 'Available' ? 'success' : 'danger'} size="sm">
                {bed.status}
              </Badge>
            </div>

            <div className="space-y-1.5 text-xs">
              <p className="flex justify-between" style={{ color: 'var(--text-muted)' }}>
                <span>Current Occupant:</span> <strong style={{ color: 'var(--text-primary)' }}>{bed.patientName || 'None (Vacant)'}</strong>
              </p>
              <p className="flex justify-between" style={{ color: 'var(--text-muted)' }}>
                <span>Assigned Date:</span> <strong className="text-[var(--brand-600)] font-bold">{bed.assignedDate || 'N/A'}</strong>
              </p>
            </div>

            {bed.status === 'Available' ? (
              <button
                onClick={() => { setSelectedBed(bed); setShowModal(true); }}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white shadow-sm cursor-pointer hover:opacity-95 transition-all"
                style={{ background: 'var(--brand-600)' }}
              >
                Assign Bed to Patient
              </button>
            ) : (
              <button
                onClick={() => handleReleaseBedClick(bed.id, bed.roomNo)}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50 border border-red-200 dark:border-red-800/40 cursor-pointer transition-colors"
              >
                Discharge & Release Bed
              </button>
            )}
          </div>
        ))}
      </div>

      {showModal && selectedBed && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="rounded-2xl p-6 max-w-md w-full space-y-4 text-xs shadow-xl"
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border-light)'
            }}
          >
            <h3 
              className="font-extrabold text-base border-b pb-3"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-light)' }}
            >
              Assign Bed {selectedBed.roomNo} ({selectedBed.ward})
            </h3>
            
            <form onSubmit={handleAssignBedSubmit} className="space-y-3">
              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Patient Name</label>
                <input
                  type="text"
                  value={patientInput}
                  onChange={(e) => setPatientInput(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
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
                  className="font-bold px-4 py-2 rounded-xl text-white shadow-sm cursor-pointer hover:opacity-95"
                  style={{ background: 'var(--brand-600)' }}
                >
                  Confirm Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminNeonCard>
  )
}
