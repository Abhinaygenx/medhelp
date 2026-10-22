import React, { useState } from 'react'
import { 
  FileText, 
  Pill, 
  TestTube, 
  Plus, 
  Upload, 
  Search, 
  Download, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Filter,
  User,
  ShieldCheck
} from 'lucide-react'
import { Badge } from '../common/Badge'
import StaffClinicalUploadModal from '../common/StaffClinicalUploadModal'
import GlassCard from '../common/GlassCard'
import toast from 'react-hot-toast'

export default function StaffClinicalManager({
  patients = [],
  doctors = [],
  runningMedications = [],
  scheduledTests = [],
  patientDocuments = [],
  onAddMedication,
  onScheduleTest,
  onUploadDocument
}) {
  const [activeSection, setActiveSection] = useState('medications') // 'medications' | 'tests' | 'documents'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTab, setModalTab] = useState('medication')
  const [searchTerm, setSearchTerm] = useState('')

  const openModal = (tab) => {
    setModalTab(tab)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions for Staff */}
      <GlassCard className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="brand" size="sm">
              <ShieldCheck size={12} />
              <span>Hospital Clinical Operations</span>
            </Badge>
          </div>
          <h1 className="text-2xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Patient Clinical Orders & Document Uploads
          </h1>
          <p className="text-xs mt-1 max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Staff portal for uploading official clinical records & prescriptions, assigning running daily medications, and scheduling diagnostic tests for patients.
          </p>
        </div>

        {/* 3 Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => openModal('document')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-sm hover:opacity-90 transition-all"
            style={{ background: 'var(--brand-600)' }}
          >
            <Upload size={14} />
            <span>Upload Document / Rx</span>
          </button>

          <button
            type="button"
            onClick={() => openModal('medication')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-sm hover:opacity-90 transition-all bg-emerald-600 hover:bg-emerald-700"
          >
            <Pill size={14} />
            <span>Prescribe Medication</span>
          </button>

          <button
            type="button"
            onClick={() => openModal('test')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-sm hover:opacity-90 transition-all bg-teal-600 hover:bg-teal-700"
          >
            <TestTube size={14} />
            <span>Schedule Test</span>
          </button>
        </div>
      </GlassCard>

      {/* Navigation Pills */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl"
        style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSection('medications')}
            className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
            style={{
              background: activeSection === 'medications' ? 'var(--brand-600)' : 'var(--surface-page)',
              color: activeSection === 'medications' ? '#ffffff' : 'var(--text-secondary)',
              border: activeSection === 'medications' ? '1px solid var(--brand-600)' : '1px solid var(--border-light)'
            }}
          >
            <Pill size={14} />
            <span>Running Medications ({runningMedications.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('tests')}
            className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
            style={{
              background: activeSection === 'tests' ? 'var(--brand-600)' : 'var(--surface-page)',
              color: activeSection === 'tests' ? '#ffffff' : 'var(--text-secondary)',
              border: activeSection === 'tests' ? '1px solid var(--brand-600)' : '1px solid var(--border-light)'
            }}
          >
            <TestTube size={14} />
            <span>Scheduled Tests ({scheduledTests.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('documents')}
            className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
            style={{
              background: activeSection === 'documents' ? 'var(--brand-600)' : 'var(--surface-page)',
              color: activeSection === 'documents' ? '#ffffff' : 'var(--text-secondary)',
              border: activeSection === 'documents' ? '1px solid var(--brand-600)' : '1px solid var(--border-light)'
            }}
          >
            <FileText size={14} />
            <span>Uploaded Documents ({patientDocuments.length})</span>
          </button>
        </div>

        <div className="relative w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]" />
          <input
            type="text"
            placeholder="Search records or patient..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
            style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      {/* SECTION 1: RUNNING MEDICATIONS TABLE */}
      {activeSection === 'medications' && (
        <GlassCard className="overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-light)' }}>
            <div>
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                Active Patient Medication Regimens
              </h3>
              <p className="text-xs text-[var(--text-muted)]">Currently ongoing prescriptions visible in patient daily schedules.</p>
            </div>
            <button
              onClick={() => openModal('medication')}
              className="text-xs font-bold text-[var(--brand-600)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Medication</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }} className="uppercase font-semibold border-b">
                <tr>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Medicine & Strength</th>
                  <th className="py-3 px-4">Dosage</th>
                  <th className="py-3 px-4">Daily Schedule</th>
                  <th className="py-3 px-4">Prescribing Doctor</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
                {runningMedications
                  .filter(m => m.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || m.medicineName.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(med => (
                    <tr key={med.id} className="hover:bg-[var(--brand-50)] transition-colors">
                      <td className="py-3.5 px-4 font-bold" style={{ color: 'var(--text-primary)' }}>{med.patientName}</td>
                      <td className="py-3.5 px-4 font-semibold text-[var(--brand-600)]">{med.medicineName}</td>
                      <td className="py-3.5 px-4">{med.dosage}</td>
                      <td className="py-3.5 px-4 font-medium text-[var(--text-secondary)]">{med.frequency}</td>
                      <td className="py-3.5 px-4 text-[var(--text-muted)]">{med.prescribedBy}</td>
                      <td className="py-3.5 px-4 font-mono">{med.duration}</td>
                      <td className="py-3.5 px-4 text-right">
                        <Badge variant="success" size="sm">{med.status || 'Active'}</Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* SECTION 2: SCHEDULED TESTS TABLE */}
      {activeSection === 'tests' && (
        <GlassCard className="overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-light)' }}>
            <div>
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                Scheduled Patient Clinical Tests & Laboratory Requisitions
              </h3>
              <p className="text-xs text-[var(--text-muted)]">Upcoming diagnostic procedures, fasting guidelines, and status.</p>
            </div>
            <button
              onClick={() => openModal('test')}
              className="text-xs font-bold text-[var(--brand-600)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus size={14} />
              <span>Schedule New Test</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }} className="uppercase font-semibold border-b">
                <tr>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Test / Procedure</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Scheduled Date & Slot</th>
                  <th className="py-3 px-4">Preparation Protocol</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
                {scheduledTests
                  .filter(t => t.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || t.testName.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(tst => (
                    <tr key={tst.id} className="hover:bg-[var(--brand-50)] transition-colors">
                      <td className="py-3.5 px-4 font-bold" style={{ color: 'var(--text-primary)' }}>{tst.patientName}</td>
                      <td className="py-3.5 px-4 font-semibold text-[var(--brand-600)]">{tst.testName}</td>
                      <td className="py-3.5 px-4 text-[var(--text-muted)]">{tst.department}</td>
                      <td className="py-3.5 px-4 font-mono font-medium">{tst.scheduledDate} • {tst.timeSlot}</td>
                      <td className="py-3.5 px-4 text-[11px] text-[var(--text-secondary)] max-w-xs truncate">{tst.preparation}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant={tst.priority === 'Urgent' ? 'danger' : 'default'} size="sm">{tst.priority}</Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Badge variant={tst.status === 'Completed' ? 'success' : 'brand'} size="sm">{tst.status}</Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* SECTION 3: UPLOADED DOCUMENTS TABLE */}
      {activeSection === 'documents' && (
        <GlassCard className="overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-light)' }}>
            <div>
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                Hospital Clinical Document Vault
              </h3>
              <p className="text-xs text-[var(--text-muted)]">Prescriptions, clinical consultation notes, and discharge summaries uploaded for patients.</p>
            </div>
            <button
              onClick={() => openModal('document')}
              className="text-xs font-bold text-[var(--brand-600)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Upload size={14} />
              <span>Upload New Document</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }} className="uppercase font-semibold border-b">
                <tr>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Issued By</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">File Specs</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
                {patientDocuments
                  .filter(d => d.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || d.title.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(doc => (
                    <tr key={doc.id} className="hover:bg-[var(--brand-50)] transition-colors">
                      <td className="py-3.5 px-4 font-bold" style={{ color: 'var(--text-primary)' }}>{doc.patientName}</td>
                      <td className="py-3.5 px-4 font-semibold text-[var(--brand-600)]">{doc.title}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant="brand" size="sm">{doc.category}</Badge>
                      </td>
                      <td className="py-3.5 px-4 text-[var(--text-muted)]">{doc.doctorName}</td>
                      <td className="py-3.5 px-4 font-mono">{doc.date}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[var(--text-muted)]">{doc.fileType} • {doc.fileSize}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Downloading ${doc.title}...`)}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold text-[var(--brand-700)] bg-[var(--brand-50)] border border-[var(--brand-200)] hover:bg-[var(--brand-100)] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Download size={12} />
                          <span>View/Get</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* Staff Upload Modal */}
      <StaffClinicalUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patients={patients}
        doctors={doctors}
        initialTab={modalTab}
        onUploadDocument={onUploadDocument}
        onAddMedication={onAddMedication}
        onScheduleTest={onScheduleTest}
      />
    </div>
  )
}
