import React, { useState } from 'react'
import { Users, Search, Plus, Edit, Trash2, ShieldCheck, HeartPulse, FileText, UserPlus } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
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
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#E5FF00]" /> Patient Registration & EMR Directory
          </h2>
          <p className="text-xs text-[#9CA3AF]">Manage patient intake, assigned doctors, insurance policies, and admission statuses.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{ background: '#E5FF00', color: '#0B0F19', boxShadow: '0 0 15px rgba(229, 255, 0, 0.45)' }}
          className="font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
        >
          <UserPlus className="w-4 h-4 text-[#0B0F19]" />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Patient Name, ID, or Email..."
          className="w-full bg-[#0B0F19] border border-[#374151] rounded-2xl pl-10 pr-4 py-2 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#E5FF00]"
        />
      </div>

      {/* Patients Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#111827] text-[#9CA3AF] uppercase font-semibold border-y border-[#374151]">
            <tr>
              <th className="py-3.5 px-4">Patient Name & ID</th>
              <th className="py-3.5 px-4">Blood & Contact</th>
              <th className="py-3.5 px-4">Assigned Doctor</th>
              <th className="py-3.5 px-4">Insurance Provider</th>
              <th className="py-3.5 px-4">Admission Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#374151] text-[#9CA3AF]">
            {filteredPatients.map(pat => (
              <tr key={pat.id} className="hover:bg-[#111827]/60 transition-colors">
                <td className="py-4 px-4 font-bold text-[#F9FAFB]">
                  <p>{pat.name}</p>
                  <span className="text-[10px] font-mono text-[#E5FF00]">{pat.id}</span>
                </td>
                <td className="py-4 px-4">
                  <p className="text-[#F9FAFB] font-semibold">Blood: {pat.bloodGroup || 'O+'}</p>
                  <p className="text-[11px] text-[#9CA3AF]">{pat.phone || '+1 555-0192'}</p>
                </td>
                <td className="py-4 px-4 font-semibold text-[#F9FAFB]">{pat.assignedDoctor || 'Dr. Robert Ford'}</td>
                <td className="py-4 px-4 text-[#9CA3AF]">{pat.insuranceProvider || 'BlueCross Health'}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                    pat.admissionStatus === 'Admitted (ICU)' 
                      ? 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30 animate-pulse'
                      : 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30'
                  }`}>
                    {pat.admissionStatus || 'Outpatient'}
                  </span>
                </td>
                <td className="py-4 px-4 text-right space-x-2">
                  <button
                    type="button"
                    onClick={() => toggleAdmissionStatus(pat.id, pat.admissionStatus)}
                    className="px-3 py-1.5 rounded-xl bg-[#0B0F19] hover:bg-[#111827] text-[#E5FF00] font-bold border border-[#374151]"
                  >
                    Toggle Ward Status
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHistory(pat)}
                    className="px-3 py-1.5 rounded-xl bg-[#111827] hover:bg-[#374151] text-[#F9FAFB] font-bold border border-[#374151]"
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
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1F2937] rounded-3xl border border-[#374151] p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-[#F9FAFB] font-['Space_Grotesk'] border-b border-[#374151] pb-3">
              Register New Hospital Patient
            </h3>
            
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Patient Full Name</label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5FF00]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Email Address</label>
                <input
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  placeholder="e.g. john@example.com"
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#9CA3AF] block mb-1">Blood Group</label>
                  <select
                    value={newPatient.bloodGroup}
                    onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})}
                    className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#9CA3AF] block mb-1">Admission Status</label>
                  <select
                    value={newPatient.admissionStatus}
                    onChange={(e) => setNewPatient({...newPatient, admissionStatus: e.target.value})}
                    className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Outpatient">Outpatient</option>
                    <option value="Admitted (ICU)">Admitted (ICU)</option>
                    <option value="General Ward">General Ward</option>
                  </select>
                </div>
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
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW EHR MODAL */}
      {selectedHistory && (
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1F2937] rounded-3xl border border-[#374151] p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-[#F9FAFB] font-['Space_Grotesk'] border-b border-[#374151] pb-3">
              EMR Medical History — {selectedHistory.name}
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-[#0B0F19] border border-[#374151]">
                <p className="text-[10px] text-[#9CA3AF] uppercase font-bold">Medical Conditions & Allergies</p>
                <p className="font-bold text-[#E5FF00] mt-0.5">{selectedHistory.allergies || 'Penicillin, Peanuts'}</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#0B0F19] border border-[#374151]">
                <p className="text-[10px] text-[#9CA3AF] uppercase font-bold">Primary Attending Physician</p>
                <p className="font-bold text-[#F9FAFB] mt-0.5">{selectedHistory.assignedDoctor || 'Dr. Robert Ford'}</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#0B0F19] border border-[#374151]">
                <p className="text-[10px] text-[#9CA3AF] uppercase font-bold">Insurance Policy Claims</p>
                <p className="font-bold text-[#22C55E] mt-0.5">{selectedHistory.insuranceProvider || 'BlueCross Active Policy #8892'}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedHistory(null)}
              className="w-full py-2.5 rounded-xl bg-[#111827] text-[#F9FAFB] font-bold border border-[#374151]"
            >
              Close EMR View
            </button>
          </div>
        </div>
      )}

    </AdminNeonCard>
  )
}
