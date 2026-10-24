import React, { useState } from 'react'
import { Users, Search, Filter, Eye, FileText, Calendar, Plus, XCircle, Phone, Mail } from 'lucide-react'
import { loadData } from '../../services/storageService'
import { INITIAL_PATIENTS } from '../../data/seedData'
import toast from 'react-hot-toast'

export default function PatientRecords({ patients: propPatients = [], onSelectTab }) {
  const localPatients = loadData('hms_patients', INITIAL_PATIENTS)
  const patientList = propPatients.length > 0 ? propPatients : localPatients

  const [searchTerm, setSearchTerm] = useState('')
  const [genderFilter, setGenderFilter] = useState('All')
  
  // History Modal State
  const [selectedPatientHistory, setSelectedPatientHistory] = useState(null)

  const filteredPatients = patientList.filter(p => {
    const term = searchTerm.toLowerCase()
    const matchesSearch = (p.name || '').toLowerCase().includes(term) || 
                          (p.id || '').toLowerCase().includes(term) || 
                          (p.phone && p.phone.includes(term)) ||
                          (p.email && p.email.toLowerCase().includes(term)) ||
                          (p.condition && p.condition.toLowerCase().includes(term))
    const matchesGender = genderFilter === 'All' || p.gender === genderFilter
    return matchesSearch && matchesGender
  })

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--border-light)] shadow-sm p-4 sm:p-6 space-y-6 animate-in fade-in duration-200 text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] font-['Space_Grotesk'] flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" /> Registered Patient Directory & EHR Records
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Real-time search across patient name, ID, phone, email, and historical chart notes.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, phone, email..."
              className="w-full bg-[var(--surface-page)] border border-[var(--border-light)] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="bg-[var(--surface-page)] border border-[var(--border-light)] rounded-xl px-3 py-1.5 text-xs text-[var(--text-primary)] font-semibold focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {filteredPatients.map(p => (
          <div key={p.id} className="p-5 rounded-2xl border border-[var(--border-light)] bg-[var(--surface-page)] hover:shadow-md hover:border-blue-500/40 transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between border-b border-[var(--border-light)] pb-2.5">
                <div>
                  <h3 className="font-extrabold text-[var(--text-primary)] text-sm">{p.name}</h3>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">{p.id}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold text-[10px]">
                  {p.bloodGroup || 'O+'}
                </span>
              </div>

              <div className="space-y-1.5 text-[var(--text-muted)]">
                <p>Age / Gender: <strong className="text-[var(--text-primary)]">{p.age || (p.dob ? new Date().getFullYear() - new Date(p.dob).getFullYear() : '32')} Yrs • {p.gender}</strong></p>
                <p>Primary Diagnosis: <strong className="text-blue-600 dark:text-blue-400">{p.condition || (p.name === 'Eleanor Vance' ? 'Essential Hypertension' : 'Cardiovascular Screening')}</strong></p>
                <p className="flex items-center gap-1"><Phone className="w-3 h-3 text-[var(--text-muted)]" /> {p.phone || p.emergencyContact || '+1 (555) 234-5678'}</p>
                <p className="flex items-center gap-1"><Mail className="w-3 h-3 text-[var(--text-muted)]" /> {p.email}</p>
                <p>Last Clinical Visit: <strong className="text-[var(--text-primary)]">{p.lastVisit || '2026-08-14'}</strong></p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-[var(--border-light)] grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedPatientHistory(p)}
                className="bg-[var(--surface-card)] hover:bg-[var(--border-light)] text-[var(--text-primary)] border border-[var(--border-light)] font-bold py-1.5 rounded-xl text-[11px] transition-all flex items-center justify-center space-x-1"
              >
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                <span>View History</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toast.success(`Opening prescription module for ${p.name}`)
                  if (onSelectTab) onSelectTab('prescriptions')
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 rounded-xl text-[11px] transition-all flex items-center justify-center space-x-1 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Prescribe</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PATIENT HISTORY MODAL */}
      {selectedPatientHistory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--border-light)] shadow-2xl max-w-xl w-full p-6 space-y-4 text-xs text-[var(--text-primary)] animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-3">
              <div>
                <h3 className="font-extrabold text-[var(--text-primary)] text-base font-['Space_Grotesk']">
                  Medical Record Chart — {selectedPatientHistory.name}
                </h3>
                <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold">Medical ID: {selectedPatientHistory.id} • {selectedPatientHistory.bloodGroup}</p>
              </div>
              <button type="button" onClick={() => setSelectedPatientHistory(null)} className="p-1 rounded-lg bg-[var(--surface-page)] text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
              <div className="p-3.5 rounded-xl bg-[var(--surface-page)] border border-[var(--border-light)] space-y-1">
                <span className="font-bold text-[var(--text-muted)] uppercase text-[10px]">Patient Vitals & Allergies</span>
                <p>Known Allergies: <strong className="text-red-500">{Array.isArray(selectedPatientHistory.allergies) ? selectedPatientHistory.allergies.join(', ') : (selectedPatientHistory.allergies || 'Penicillin')}</strong></p>
                <p>Phone: {selectedPatientHistory.phone || selectedPatientHistory.emergencyContact || '+1 (555) 234-5678'}</p>
                <p>Email: {selectedPatientHistory.email}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-1">
                <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px]">Previous Consultations & Diagnoses</span>
                <p className="font-bold text-[var(--text-primary)]">{selectedPatientHistory.condition || (selectedPatientHistory.name === 'Eleanor Vance' ? 'Essential Hypertension Stage 1' : 'Cardiovascular Screening')}</p>
                <p className="text-[var(--text-muted)]">Last Visit: {selectedPatientHistory.lastVisit || '2026-08-14'}</p>
                <p className="text-[var(--text-muted)] italic">"Patient shows good treatment response. Continue current OPD regime."</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedPatientHistory(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm"
              >
                Close Chart
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
