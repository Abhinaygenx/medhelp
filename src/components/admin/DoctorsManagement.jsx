import React, { useState } from 'react'
import { Stethoscope, Search, Plus, Trash2 } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
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
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Stethoscope className="w-5 h-5 text-[var(--brand-600)]" /> Doctor Credential & Staff Management
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Manage practitioner onboarding, verification statuses, and department schedules.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm text-white hover:opacity-95"
          style={{ background: 'var(--brand-600)' }}
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Search Filter Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search doctors by name or specialization..."
          className="w-full rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
          style={{
            background: 'var(--surface-page)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-primary)'
          }}
        />
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doc => (
          <div 
            key={doc.id} 
            className="p-5 rounded-2xl space-y-4 transition-all"
            style={{
              background: 'var(--surface-page)',
              border: '1px solid var(--border-light)'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={doc.avatar} 
                  alt={doc.name} 
                  className="w-12 h-12 rounded-xl object-cover" 
                  style={{ border: '1px solid var(--border-light)' }}
                />
                <div>
                  <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{doc.name}</h4>
                  <p className="text-xs font-semibold text-[var(--brand-600)]">{doc.specialization}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{doc.qualification}</p>
                </div>
              </div>

              <Badge variant={doc.isVerified ? 'success' : 'warning'} size="sm">
                {doc.isVerified ? 'Verified MD' : 'Pending'}
              </Badge>
            </div>

            <div 
              className="p-3 rounded-xl text-xs space-y-1.5"
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-light)'
              }}
            >
              <p className="flex justify-between" style={{ color: 'var(--text-muted)' }}>
                <span>Hospital:</span> <strong style={{ color: 'var(--text-primary)' }}>{doc.hospital}</strong>
              </p>
              <p className="flex justify-between" style={{ color: 'var(--text-muted)' }}>
                <span>Experience:</span> <strong style={{ color: 'var(--text-primary)' }}>{doc.experienceYears} Years</strong>
              </p>
              <p className="flex justify-between" style={{ color: 'var(--text-muted)' }}>
                <span>Consult Fee:</span> <strong className="text-[var(--brand-600)] font-bold">${doc.consultationFee}</strong>
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => onToggleVerification && onToggleVerification(doc.id)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                style={{
                  background: doc.isVerified ? 'var(--surface-card)' : 'var(--brand-600)',
                  color: doc.isVerified ? 'var(--text-secondary)' : '#ffffff',
                  border: '1px solid var(--border-light)'
                }}
              >
                {doc.isVerified ? 'Revoke Status' : 'Approve Doctor'}
              </button>

              <button
                type="button"
                onClick={() => handleDeleteDoctor(doc.id, doc.name)}
                className="p-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50 border border-red-200 dark:border-red-800/40 cursor-pointer transition-all"
                aria-label={`Delete doctor ${doc.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD DOCTOR MODAL */}
      {showAddModal && (
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
              Register New Hospital Doctor
            </h3>
            
            <form onSubmit={handleAddDoctorSubmit} className="space-y-3">
              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Doctor Full Name</label>
                <input
                  type="text"
                  value={newDoc.name}
                  onChange={(e) => setNewDoc({...newDoc, name: e.target.value})}
                  placeholder="e.g. Dr. Alexander Vance"
                  className="w-full rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  required
                />
              </div>

              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Specialization</label>
                <select
                  value={newDoc.specialization}
                  onChange={(e) => setNewDoc({...newDoc, specialization: e.target.value})}
                  className="w-full rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
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
                  <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Experience (Yrs)</label>
                  <input
                    type="number"
                    value={newDoc.experienceYears}
                    onChange={(e) => setNewDoc({...newDoc, experienceYears: e.target.value})}
                    className="w-full rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-page)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Consult Fee ($)</label>
                  <input
                    type="number"
                    value={newDoc.consultationFee}
                    onChange={(e) => setNewDoc({...newDoc, consultationFee: e.target.value})}
                    className="w-full rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-page)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)} 
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

