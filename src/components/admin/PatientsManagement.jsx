import React, { useState } from 'react'
import { Users, Search, Plus, Trash2, HeartPulse, FileText, UserPlus } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
import toast from 'react-hot-toast'

export default function PatientsManagement({ patients = [], doctors = [], onRegisterPatient, onUpdatePatientStatus }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedHistory, setSelectedHistory] = useState(null)

  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    phone: '+1 (555) 019-2834',
    bloodGroup: 'O+',
    assignedDoctor: 'Dr. Robert Ford',
    insuranceProvider: 'BlueCross Health Insurance',
    admissionStatus: 'Outpatient'
  })

  const filteredPatients = patients.filter(p => 
    (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.email && p.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.id && p.id.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    if (!newPatient.name.trim()) return

    const created = {
      id: `pat-${Date.now().toString().slice(-4)}`,
      ...newPatient,
      allergies: 'None',
      registeredDate: new Date().toLocaleDateString()
    }

    if (onRegisterPatient) {
      onRegisterPatient(created)
    }
    toast.success(`Patient ${created.name} registered into EMR system!`)
    setShowModal(false)
    setNewPatient({ name: '', email: '', phone: '+1 (555) 019-2834', bloodGroup: 'O+', assignedDoctor: 'Dr. Robert Ford', insuranceProvider: 'BlueCross Health Insurance', admissionStatus: 'Outpatient' })
  }

  const toggleAdmissionStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Admitted (ICU)' ? 'Discharged' : 'Admitted (ICU)'
    if (onUpdatePatientStatus) {
      onUpdatePatientStatus(id, nextStatus)
    }
    toast.success(`Patient status updated to: ${nextStatus}`)
  }

  return (
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Users className="w-5 h-5 text-[var(--brand-600)]" /> Patient Registration & EMR Directory
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Manage patient intake, assigned doctors, insurance policies, and admission statuses.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm text-white hover:opacity-95"
          style={{ background: 'var(--brand-600)' }}
        >
          <UserPlus className="w-4 h-4 text-white" />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Patient Name, ID, or Email..."
          className="w-full rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
          style={{
            background: 'var(--surface-page)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-primary)'
          }}
        />
      </div>

      {/* Patients Table View */}
      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--border-light)' }}>
        <table className="w-full text-left text-xs">
          <thead style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }} className="uppercase font-semibold border-b">
            <tr>
              <th className="py-3.5 px-4">Patient Name & ID</th>
              <th className="py-3.5 px-4">Blood & Contact</th>
              <th className="py-3.5 px-4">Assigned Doctor</th>
              <th className="py-3.5 px-4">Insurance Provider</th>
              <th className="py-3.5 px-4">Admission Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
            {filteredPatients.map(pat => (
              <tr key={pat.id} className="hover:bg-[var(--brand-50)] transition-colors">
                <td className="py-4 px-4 font-bold" style={{ color: 'var(--text-primary)' }}>
                  <p>{pat.name}</p>
                  <span className="text-[10px] font-mono text-[var(--brand-600)]">{pat.id}</span>
                </td>
                <td className="py-4 px-4">
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Blood: {pat.bloodGroup || 'O+'}</p>
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{pat.phone || '+1 555-0192'}</p>
                </td>
                <td className="py-4 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>{pat.assignedDoctor || 'Dr. Robert Ford'}</td>
                <td className="py-4 px-4" style={{ color: 'var(--text-secondary)' }}>{pat.insuranceProvider || 'BlueCross Health'}</td>
                <td className="py-4 px-4">
                  <Badge 
                    variant={pat.admissionStatus === 'Admitted (ICU)' ? 'danger' : 'success'} 
                    size="sm"
                  >
                    {pat.admissionStatus || 'Outpatient'}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-right space-x-2">
                  <button
                    type="button"
                    onClick={() => toggleAdmissionStatus(pat.id, pat.admissionStatus)}
                    className="px-3 py-1.5 rounded-xl font-bold border transition-all cursor-pointer hover:bg-[var(--neutral-100)]"
                    style={{
                      background: 'var(--surface-page)',
                      color: 'var(--text-secondary)',
                      borderColor: 'var(--border-light)'
                    }}
                  >
                    Toggle Ward
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHistory(pat)}
                    className="px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer text-white shadow-sm hover:opacity-95"
                    style={{ background: 'var(--brand-600)' }}
                  >
                    View EHR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REGISTER PATIENT MODAL */}
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
              className="font-extrabold text-base border-b pb-3"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-light)' }}
            >
              Register New Hospital Patient
            </h3>
            
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Patient Full Name</label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  placeholder="e.g. John Doe"
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
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                <input
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  placeholder="e.g. john@example.com"
                  className="w-full rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Blood Group</label>
                  <select
                    value={newPatient.bloodGroup}
                    onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})}
                    className="w-full rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-page)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Admission Status</label>
                  <select
                    value={newPatient.admissionStatus}
                    onChange={(e) => setNewPatient({...newPatient, admissionStatus: e.target.value})}
                    className="w-full rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-page)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="Outpatient">Outpatient</option>
                    <option value="Admitted (ICU)">Admitted (ICU)</option>
                    <option value="General Ward">General Ward</option>
                  </select>
                </div>
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
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW EHR MODAL */}
      {selectedHistory && (
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
              EMR Medical History — {selectedHistory.name}
            </h3>
            
            <div className="space-y-3">
              <div 
                className="p-3 rounded-xl"
                style={{
                  background: 'var(--surface-page)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <p className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-muted)' }}>Medical Conditions & Allergies</p>
                <p className="font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>{selectedHistory.allergies || 'Penicillin, Peanuts'}</p>
              </div>

              <div 
                className="p-3 rounded-xl"
                style={{
                  background: 'var(--surface-page)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <p className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-muted)' }}>Primary Attending Physician</p>
                <p className="font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>{selectedHistory.assignedDoctor || 'Dr. Robert Ford'}</p>
              </div>

              <div 
                className="p-3 rounded-xl"
                style={{
                  background: 'var(--surface-page)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <p className="text-[10px] uppercase font-bold" style={{ color: 'var(--text-muted)' }}>Insurance Policy Claims</p>
                <p className="font-bold mt-0.5 text-emerald-600 dark:text-emerald-400">{selectedHistory.insuranceProvider || 'BlueCross Active Policy #8892'}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedHistory(null)}
              className="w-full py-2.5 rounded-xl font-bold cursor-pointer transition-all border"
              style={{
                background: 'var(--surface-page)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-light)'
              }}
            >
              Close EMR View
            </button>
          </div>
        </div>
      )}

    </AdminNeonCard>
  )
}

