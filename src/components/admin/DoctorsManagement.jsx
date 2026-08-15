import React, { useState } from 'react'
import { Stethoscope, Search, UserCheck, UserX, Plus, Edit, Trash2, ShieldCheck, Mail, Phone, Clock } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import toast from 'react-hot-toast'

export default function DoctorsManagement({ doctors = [], onToggleVerification, onAddDoctor, onDeleteDoctor }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  // Form State for Adding Doctor
  const [newDoc, setNewDoc] = useState({
    name: '',
    specialization: 'Cardiology',
    qualification: 'MD, FACC',
    hospital: 'Apollo Main Hospital',
    experienceYears: '10',
    consultationFee: '150'
  })

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddDoctorSubmit = (e) => {
    e.preventDefault()
    if (!newDoc.name.trim()) return

    const created = {
      id: `doc-${Date.now()}`,
      ...newDoc,
      experienceYears: Number(newDoc.experienceYears) || 5,
      consultationFee: Number(newDoc.consultationFee) || 100,
      isVerified: true,
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
    }

    if (onAddDoctor) {
      onAddDoctor(created)
    }
    toast.success(`Doctor ${created.name} registered & verified successfully!`)
    setShowAddModal(false)
    setNewDoc({ name: '', specialization: 'Cardiology', qualification: 'MD, FACC', hospital: 'Apollo Main Hospital', experienceYears: '10', consultationFee: '150' })
  }

  const handleDeleteDoctor = (id, name) => {
    if (onDeleteDoctor) {
      onDeleteDoctor(id)
    }
    toast.success(`Doctor ${name} deleted from system registry.`)
  }

  return (
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-[#E5FF00]" /> Doctor Credential & Staff Management
          </h2>
          <p className="text-xs text-[#9CA3AF]">Manage practitioner onboarding, verification statuses, and department schedules.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          style={{
            background: '#E5FF00',
            color: '#0B0F19',
            boxShadow: '0 0 15px rgba(229, 255, 0, 0.45)'
          }}
          className="font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4 text-[#0B0F19]" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Search Filter Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search doctors by name or specialization..."
          className="w-full bg-[#0B0F19] border border-[#374151] rounded-2xl pl-10 pr-4 py-2 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#E5FF00]"
        />
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="p-5 rounded-2xl bg-[#111827] border border-[#374151] space-y-4 hover:border-[#E5FF00]/40 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-2xl object-cover border border-[#374151]" />
                <div>
                  <h4 className="font-bold text-sm text-[#F9FAFB]">{doc.name}</h4>
                  <p className="text-xs font-semibold text-[#E5FF00]">{doc.specialization}</p>
                  <p className="text-[10px] text-[#9CA3AF]">{doc.qualification}</p>
                </div>
              </div>

              {doc.isVerified ? (
                <span className="px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-[10px] font-bold">
                  Verified MD
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 text-[10px] font-bold">
                  Pending
                </span>
              )}
            </div>

            <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#374151] text-xs space-y-1">
              <p className="flex justify-between text-[#9CA3AF]"><span>Hospital:</span> <strong className="text-[#F9FAFB]">{doc.hospital}</strong></p>
              <p className="flex justify-between text-[#9CA3AF]"><span>Experience:</span> <strong className="text-[#F9FAFB]">{doc.experienceYears} Years</strong></p>
              <p className="flex justify-between text-[#9CA3AF]"><span>Consult Fee:</span> <strong className="text-[#E5FF00]">${doc.consultationFee}</strong></p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => onToggleVerification && onToggleVerification(doc.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  doc.isVerified ? 'bg-[#374151] text-[#9CA3AF]' : 'bg-[#E5FF00] text-[#0B0F19]'
                }`}
              >
                {doc.isVerified ? 'Revoke Status' : 'Approve Doctor'}
              </button>

              <button
                type="button"
                onClick={() => handleDeleteDoctor(doc.id, doc.name)}
                className="p-2 rounded-xl bg-[#EF4444]/15 text-[#EF4444] hover:bg-[#EF4444]/30 border border-[#EF4444]/30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD DOCTOR MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1F2937] rounded-3xl border border-[#374151] p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-[#F9FAFB] font-['Space_Grotesk'] border-b border-[#374151] pb-3">
              Register New Hospital Doctor
            </h3>
            
            <form onSubmit={handleAddDoctorSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Doctor Full Name</label>
                <input
                  type="text"
                  value={newDoc.name}
                  onChange={(e) => setNewDoc({...newDoc, name: e.target.value})}
                  placeholder="e.g. Dr. Alexander Vance"
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5FF00]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Specialization</label>
                <select
                  value={newDoc.specialization}
                  onChange={(e) => setNewDoc({...newDoc, specialization: e.target.value})}
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5FF00]"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#9CA3AF] block mb-1">Experience (Yrs)</label>
                  <input
                    type="number"
                    value={newDoc.experienceYears}
                    onChange={(e) => setNewDoc({...newDoc, experienceYears: e.target.value})}
                    className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#9CA3AF] block mb-1">Consult Fee ($)</label>
                  <input
                    type="number"
                    value={newDoc.consultationFee}
                    onChange={(e) => setNewDoc({...newDoc, consultationFee: e.target.value})}
                    className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl bg-[#111827] text-[#9CA3AF] font-bold">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ background: '#E5FF00', color: '#0B0F19' }}
                  className="font-extrabold px-4 py-2 rounded-xl"
                >
                  Save & Verify Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminNeonCard>
  )
}
