import React, { useState } from 'react'
import { Bed, Users, Plus, CheckCircle2, AlertCircle, UserCheck } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
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
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <Bed className="w-5 h-5 text-[#E5FF00]" /> ICU & Ward Bed Allocation System
          </h2>
          <p className="text-xs text-[#9CA3AF]">Manage hospital room occupancy, ICU bed dispatch, and patient discharge release.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 font-bold">
            {availableCount} Beds Available
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30 font-bold">
            {occupiedCount} Beds Occupied
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {beds.map(bed => (
          <div key={bed.id} className="p-5 rounded-2xl bg-[#111827] border border-[#374151] space-y-4 hover:border-[#E5FF00]/40 transition-all">
            <div className="flex items-center justify-between border-b border-[#374151] pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[#F9FAFB] font-['Space_Grotesk']">{bed.roomNo}</h3>
                <p className="text-xs text-[#9CA3AF]">{bed.ward}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                bed.status === 'Available' ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30' : 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30'
              }`}>
                {bed.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-[#9CA3AF]">
              <p className="flex justify-between"><span>Current Occupant:</span> <strong className="text-[#F9FAFB]">{bed.patientName || 'None (Vacant)'}</strong></p>
              <p className="flex justify-between"><span>Assigned Date:</span> <strong className="text-[#E5FF00]">{bed.assignedDate || 'N/A'}</strong></p>
            </div>

            {bed.status === 'Available' ? (
              <button
                onClick={() => { setSelectedBed(bed); setShowModal(true); }}
                style={{ background: '#E5FF00', color: '#0B0F19' }}
                className="w-full py-2.5 rounded-xl font-extrabold text-xs transition-all hover:scale-[1.02]"
              >
                Assign Bed to Patient
              </button>
            ) : (
              <button
                onClick={() => handleReleaseBedClick(bed.id, bed.roomNo)}
                className="w-full py-2.5 rounded-xl bg-[#EF4444]/15 hover:bg-[#EF4444]/30 text-[#EF4444] border border-[#EF4444]/30 font-bold text-xs transition-colors"
              >
                Discharge & Release Bed
              </button>
            )}
          </div>
        ))}
      </div>

      {showModal && selectedBed && (
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1F2937] rounded-3xl border border-[#374151] p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-[#F9FAFB] font-['Space_Grotesk'] border-b border-[#374151] pb-3">
              Assign Bed {selectedBed.roomNo} ({selectedBed.ward})
            </h3>
            
            <form onSubmit={handleAssignBedSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Patient Name</label>
                <input
                  type="text"
                  value={patientInput}
                  onChange={(e) => setPatientInput(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5FF00]"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl bg-[#111827] text-[#9CA3AF] font-bold">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ background: '#E5FF00', color: '#0B0F19' }}
                  className="font-extrabold px-4 py-2 rounded-xl"
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
