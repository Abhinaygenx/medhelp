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
    <div className="bg-[#0D1B2A]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-lg p-6 space-y-6 animate-in fade-in duration-200 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" /> Registered Patient Directory & EHR Records
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time search across patient name, ID, phone, email, and historical chart notes.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center space-x-3">
          <div className="relative w-48 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, phone, email..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-semibold focus:outline-none focus:border-blue-500"
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
          <div key={p.id} className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-500/30 transition-all space-y-3 flex flex-col justify-between shadow-md">
            <div className="space-y-2">
              <div className="flex items-start justify-between border-b border-slate-800/80 pb-2.5">
                <div>
                  <h3 className="font-extrabold text-white text-sm">{p.name}</h3>
                  <span className="text-[10px] font-mono text-slate-500">{p.id}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold text-[10px]">
                  {p.bloodGroup || 'O+'}
                </span>
              </div>

              <div className="space-y-1 text-slate-300">
                <p>Age / Gender: <strong className="text-white">{p.age} Yrs • {p.gender}</strong></p>
                <p>Primary Diagnosis: <strong className="text-blue-400">{p.condition}</strong></p>
                <p className="flex items-center gap-1 text-slate-400"><Phone className="w-3 h-3 text-slate-500" /> {p.phone}</p>
                <p className="flex items-center gap-1 text-slate-400"><Mail className="w-3 h-3 text-slate-500" /> {p.email}</p>
                <p>Last Clinical Visit: <strong className="text-slate-200">{p.lastVisit}</strong></p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedPatientHistory(p)}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold py-1.5 rounded-xl text-[11px] transition-all flex items-center justify-center space-x-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View History</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toast.success(`Opening prescription module for ${p.name}`)
                  if (onSelectTab) onSelectTab('prescriptions')
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded-xl text-[11px] transition-all flex items-center justify-center space-x-1 shadow-sm"
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl max-w-xl w-full p-6 space-y-4 text-xs text-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-white text-base font-['Space_Grotesk']">
                  Medical Record Chart — {selectedPatientHistory.name}
                </h3>
                <p className="text-[11px] text-blue-400 font-bold">Medical ID: {selectedPatientHistory.id} • {selectedPatientHistory.bloodGroup}</p>
              </div>
              <button type="button" onClick={() => setSelectedPatientHistory(null)} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Patient Vitals & Allergies</span>
                <p className="text-slate-200">Known Allergies: <strong className="text-red-400">{selectedPatientHistory.allergies || 'Penicillin'}</strong></p>
                <p className="text-slate-200">Phone: {selectedPatientHistory.phone}</p>
                <p className="text-slate-200">Email: {selectedPatientHistory.email}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-1">
                <span className="font-bold text-blue-400 uppercase text-[10px]">Previous Consultations & Diagnoses</span>
                <p className="text-white font-bold">{selectedPatientHistory.condition}</p>
                <p className="text-slate-300">Last Visit: {selectedPatientHistory.lastVisit}</p>
                <p className="text-slate-400 italic">"Patient shows good treatment response. Continue current OPD regime."</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedPatientHistory(null)}
                className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
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
