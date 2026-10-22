import React, { useState } from 'react'
import { 
  X, 
  Upload, 
  FileText, 
  Pill, 
  TestTube, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  Clock,
  User,
  ShieldCheck
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function StaffClinicalUploadModal({
  isOpen,
  onClose,
  patients = [],
  doctors = [],
  initialTab = 'document', // 'document' | 'medication' | 'test'
  onUploadDocument,
  onAddMedication,
  onScheduleTest
}) {
  const [activeTab, setActiveTab] = useState(initialTab)

  // Document form state
  const [docPatient, setDocPatient] = useState(patients[0]?.name || 'Eleanor Vance')
  const [docTitle, setDocTitle] = useState('')
  const [docCategory, setDocCategory] = useState('Prescription')
  const [docDoctor, setDocDoctor] = useState(doctors[0]?.name || 'Dr. Robert Ford')
  const [docSummary, setDocSummary] = useState('')
  const [fileName, setFileName] = useState('')

  // Medication form state
  const [medPatient, setMedPatient] = useState(patients[0]?.name || 'Eleanor Vance')
  const [medName, setMedName] = useState('')
  const [medDosage, setMedDosage] = useState('1 tablet')
  const [medFrequency, setMedFrequency] = useState('1-0-1 (Morning & Night, After Food)')
  const [medDoctor, setMedDoctor] = useState(doctors[0]?.name || 'Dr. Robert Ford')
  const [medDuration, setMedDuration] = useState('30 Days')
  const [medInstructions, setMedInstructions] = useState('')

  // Test form state
  const [testPatient, setTestPatient] = useState(patients[0]?.name || 'Eleanor Vance')
  const [testName, setTestName] = useState('')
  const [testDept, setTestDept] = useState('Pathology Laboratory')
  const [testDate, setTestDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 2)
    return d.toISOString().split('T')[0]
  })
  const [testTime, setTestTime] = useState('09:00 AM')
  const [testPrep, setTestPrep] = useState('Fasting for 8-10 hours prior to sample collection. Water is permitted.')
  const [testPriority, setTestPriority] = useState('Routine')
  const [testDoctor, setTestDoctor] = useState(doctors[0]?.name || 'Dr. Robert Ford')

  if (!isOpen) return null

  // 1. Submit Document
  const handleDocumentSubmit = (e) => {
    e.preventDefault()
    if (!docTitle.trim()) {
      toast.error('Please enter a document title')
      return
    }

    if (onUploadDocument) {
      onUploadDocument({
        patientName: docPatient,
        title: docTitle.trim(),
        category: docCategory,
        doctorName: docDoctor,
        summary: docSummary.trim() || 'Official patient medical document uploaded by attending clinical team.',
        fileType: fileName.endsWith('.png') || fileName.endsWith('.jpg') ? 'Image' : 'PDF',
        fileSize: '1.4 MB'
      })
    }
    toast.success(`Uploaded "${docTitle}" for ${docPatient}!`)
    onClose()
  }

  // 2. Submit Medication
  const handleMedicationSubmit = (e) => {
    e.preventDefault()
    if (!medName.trim()) {
      toast.error('Please enter a medicine name')
      return
    }

    if (onAddMedication) {
      onAddMedication({
        patientName: medPatient,
        medicineName: medName.trim(),
        dosage: medDosage,
        frequency: medFrequency,
        prescribedBy: medDoctor,
        duration: medDuration,
        instructions: medInstructions.trim() || 'Take as advised by prescribing physician.'
      })
    }
    toast.success(`Prescribed ${medName} for ${medPatient}!`)
    onClose()
  }

  // 3. Submit Scheduled Test
  const handleTestSubmit = (e) => {
    e.preventDefault()
    if (!testName.trim()) {
      toast.error('Please enter a test or diagnostic procedure name')
      return
    }

    if (onScheduleTest) {
      onScheduleTest({
        patientName: testPatient,
        testName: testName.trim(),
        department: testDept,
        scheduledDate: testDate,
        timeSlot: testTime,
        preparation: testPrep.trim() || 'Standard clinical procedure requirements.',
        priority: testPriority,
        orderedBy: testDoctor
      })
    }
    toast.success(`Scheduled ${testName} for ${testPatient}!`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
      >
        {/* Header */}
        <div 
          className="p-5 flex items-center justify-between border-b"
          style={{ borderColor: 'var(--border-light)', background: 'var(--surface-page)' }}
        >
          <div>
            <h3 className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <ShieldCheck className="w-5 h-5 text-[var(--brand-600)]" />
              Staff Clinical Order & Upload Hub
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Upload clinical documents, prescribe running medicines, or schedule patient diagnostic tests.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b text-xs font-semibold" style={{ borderColor: 'var(--border-light)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('document')}
            className="flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 cursor-pointer transition-all"
            style={{
              borderColor: activeTab === 'document' ? 'var(--brand-600)' : 'transparent',
              color: activeTab === 'document' ? 'var(--brand-600)' : 'var(--text-muted)',
              background: activeTab === 'document' ? 'var(--brand-50)' : 'transparent'
            }}
          >
            <Upload size={14} />
            <span>Upload Document / Rx</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('medication')}
            className="flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 cursor-pointer transition-all"
            style={{
              borderColor: activeTab === 'medication' ? 'var(--brand-600)' : 'transparent',
              color: activeTab === 'medication' ? 'var(--brand-600)' : 'var(--text-muted)',
              background: activeTab === 'medication' ? 'var(--brand-50)' : 'transparent'
            }}
          >
            <Pill size={14} />
            <span>Running Medication</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('test')}
            className="flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 cursor-pointer transition-all"
            style={{
              borderColor: activeTab === 'test' ? 'var(--brand-600)' : 'transparent',
              color: activeTab === 'test' ? 'var(--brand-600)' : 'var(--text-muted)',
              background: activeTab === 'test' ? 'var(--brand-50)' : 'transparent'
            }}
          >
            <TestTube size={14} />
            <span>Schedule Test / Lab</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* TAB 1: UPLOAD DOCUMENT */}
          {activeTab === 'document' && (
            <form onSubmit={handleDocumentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Target Patient</label>
                  <select
                    value={docPatient}
                    onChange={e => setDocPatient(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                    style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  >
                    {patients.map(p => (
                      <option key={p.id || p.name} value={p.name}>{p.name} ({p.id || 'Patient'})</option>
                    ))}
                    <option value="Eleanor Vance">Eleanor Vance (pat-1)</option>
                    <option value="Marcus Wright">Marcus Wright (pat-2)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Document Category</label>
                  <select
                    value={docCategory}
                    onChange={e => setDocCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                    style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  >
                    <option value="Prescription">Electronic Prescription (Rx)</option>
                    <option value="Clinical Note">Doctor Consultation Note & Assessment</option>
                    <option value="Lab Report">Diagnostic Lab & Biochemistry Report</option>
                    <option value="Radiology Scan">Radiology & Imaging (X-Ray / MRI / CT)</option>
                    <option value="Discharge Summary">Hospital Admission & Discharge Summary</option>
                    <option value="Insurance / Bill">Medical Claim / Insurance Voucher</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cardiology ECG Report & Sinus Rhythm Analysis"
                  value={docTitle}
                  onChange={e => setDocTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Attending Doctor / Staff Member</label>
                <select
                  value={docDoctor}
                  onChange={e => setDocDoctor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                >
                  {doctors.map(d => (
                    <option key={d.id || d.name} value={d.name}>{d.name} ({d.specialization})</option>
                  ))}
                  <option value="Dr. Robert Ford">Dr. Robert Ford (Cardiology)</option>
                  <option value="Dr. Sarah Connor">Dr. Sarah Connor (Neurology)</option>
                  <option value="Dr. Gregory House">Dr. Gregory House (General Medicine)</option>
                </select>
              </div>

              {/* Upload Dropzone */}
              <div>
                <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>File Attachment (PDF / JPG / PNG)</label>
                <div 
                  className="p-5 border-2 border-dashed rounded-2xl text-center cursor-pointer hover:bg-[var(--brand-50)] transition-colors flex flex-col items-center justify-center"
                  style={{ borderColor: 'var(--border-default)', background: 'var(--surface-page)' }}
                  onClick={() => document.getElementById('clinical-file-input')?.click()}
                >
                  <Upload className="w-8 h-8 text-[var(--brand-600)] mb-2" />
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {fileName ? fileName : 'Click to select or drop clinical file'}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Supports official medical PDFs, scanned requisitions, and diagnostic image files up to 25MB
                  </p>
                  <input
                    id="clinical-file-input"
                    type="file"
                    className="hidden"
                    onChange={e => {
                      if (e.target.files?.[0]) {
                        setFileName(e.target.files[0].name)
                        if (!docTitle) {
                          setDocTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ""))
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Clinical Observations / Summary Notes</label>
                <textarea
                  rows={2}
                  placeholder="Summary of findings, dosage instructions, or follow-up recommendations..."
                  value={docSummary}
                  onChange={e => setDocSummary(e.target.value)}
                  className="w-full p-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t" style={{ borderColor: 'var(--border-light)' }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl font-semibold cursor-pointer"
                  style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold cursor-pointer text-white flex items-center gap-1.5 transition-all shadow-sm"
                  style={{ background: 'var(--brand-600)' }}
                >
                  <Upload size={14} />
                  <span>Upload & Publish to Patient</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: RUNNING MEDICATION */}
          {activeTab === 'medication' && (
            <form onSubmit={handleMedicationSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Select Patient</label>
                  <select
                    value={medPatient}
                    onChange={e => setMedPatient(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                    style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  >
                    {patients.map(p => (
                      <option key={p.id || p.name} value={p.name}>{p.name} ({p.id || 'Patient'})</option>
                    ))}
                    <option value="Eleanor Vance">Eleanor Vance (pat-1)</option>
                    <option value="Marcus Wright">Marcus Wright (pat-2)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Prescribing Physician</label>
                  <select
                    value={medDoctor}
                    onChange={e => setMedDoctor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                    style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  >
                    {doctors.map(d => (
                      <option key={d.id || d.name} value={d.name}>{d.name} ({d.specialization})</option>
                    ))}
                    <option value="Dr. Robert Ford">Dr. Robert Ford (Cardiology)</option>
                    <option value="Dr. Sarah Connor">Dr. Sarah Connor (Neurology)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Medicine Brand & Strength</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Atorvastatin 20mg or Metformin 500mg"
                  value={medName}
                  onChange={e => setMedName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Unit Dosage</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1 tablet, 5ml"
                    value={medDosage}
                    onChange={e => setMedDosage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                    style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Course Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 30 Days, Ongoing"
                    value={medDuration}
                    onChange={e => setMedDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                    style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Daily Schedule</label>
                  <select
                    value={medFrequency}
                    onChange={e => setMedFrequency(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                    style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  >
                    <option value="1-0-1 (Morning & Night, After Food)">1-0-1 (Morning & Night, After Food)</option>
                    <option value="0-0-1 (Night Only, After Food)">0-0-1 (Night Only, After Food)</option>
                    <option value="1-0-0 (Morning Only, Before Food)">1-0-0 (Morning Only, Before Food)</option>
                    <option value="1-1-1 (Morning, Noon & Night)">1-1-1 (Morning, Noon & Night)</option>
                    <option value="Once Weekly (Every Sunday)">Once Weekly (Every Sunday)</option>
                    <option value="SOS / As Needed for Pain">SOS / As Needed for Pain</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Special Administration Instructions</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Take with a full glass of water. Do not skip evening dose."
                  value={medInstructions}
                  onChange={e => setMedInstructions(e.target.value)}
                  className="w-full p-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t" style={{ borderColor: 'var(--border-light)' }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl font-semibold cursor-pointer"
                  style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold cursor-pointer text-white flex items-center gap-1.5 transition-all shadow-sm"
                  style={{ background: 'var(--brand-600)' }}
                >
                  <Pill size={14} />
                  <span>Prescribe Running Medication</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: SCHEDULE CLINICAL TEST */}
          {activeTab === 'test' && (
            <form onSubmit={handleTestSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Patient</label>
                  <select
                    value={testPatient}
                    onChange={e => setTestPatient(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                    style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  >
                    {patients.map(p => (
                      <option key={p.id || p.name} value={p.name}>{p.name} ({p.id || 'Patient'})</option>
                    ))}
                    <option value="Eleanor Vance">Eleanor Vance (pat-1)</option>
                    <option value="Marcus Wright">Marcus Wright (pat-2)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Clinical Department</label>
                  <select
                    value={testDept}
                    onChange={e => setTestDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                    style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  >
                    <option value="Pathology Laboratory">Pathology & Biochemistry Lab</option>
                    <option value="Cardiology Diagnostics">Cardiology Diagnostics (ECG / Echo / TMT)</option>
                    <option value="Radiology & Imaging">Radiology (X-Ray / MRI / CT Scan)</option>
                    <option value="Pulmonology">Pulmonology (Spirometry / PFT)</option>
                    <option value="Neurology Diagnostics">Neurology (EEG / EMG)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Test / Investigation Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fasting Lipid Profile & Serum Creatinine"
                  value={testName}
                  onChange={e => setTestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Scheduled Date</label>
                  <input
                    type="date"
                    required
                    value={testDate}
                    onChange={e => setTestDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                    style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Time Slot</label>
                  <select
                    value={testTime}
                    onChange={e => setTestTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                    style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  >
                    <option value="08:00 AM">08:00 AM (Early Fasting)</option>
                    <option value="08:30 AM">08:30 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Priority Level</label>
                  <select
                    value={testPriority}
                    onChange={e => setTestPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                    style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                  >
                    <option value="Routine">Routine</option>
                    <option value="Urgent">Urgent / STAT</option>
                    <option value="Pre-Operative">Pre-Operative Clearance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Preparation & Fasting Guidelines</label>
                <textarea
                  rows={2}
                  value={testPrep}
                  onChange={e => setTestPrep(e.target.value)}
                  placeholder="e.g. 10 hours overnight fasting required. Hold morning insulin until sample drawn."
                  className="w-full p-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t" style={{ borderColor: 'var(--border-light)' }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl font-semibold cursor-pointer"
                  style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold cursor-pointer text-white flex items-center gap-1.5 transition-all shadow-sm"
                  style={{ background: 'var(--brand-600)' }}
                >
                  <TestTube size={14} />
                  <span>Confirm Test Schedule</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
