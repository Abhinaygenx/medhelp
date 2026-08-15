import React, { useState } from 'react'
import { Pill, Save, Printer, RotateCcw, Plus, Trash2, CheckCircle2, Download, AlertCircle } from 'lucide-react'
import { loadData, saveData } from '../../services/storageService'
import { validatePrescriptionForm } from '../../services/validationService'
import { simulateApiCall } from '../../services/mockApi'
import LoadingSpinner from '../common/LoadingSpinner'
import toast from 'react-hot-toast'

export default function PrescriptionPanel({ onCreatePrescription }) {
  const [prescriptions, setPrescriptions] = useState(() => loadData('doctor_prescriptions', []))
  
  const [patientName, setPatientName] = useState('Eleanor Vance')
  const [diagnosis, setDiagnosis] = useState('Essential Hypertension & Fatigue')
  const [notes, setNotes] = useState('Take medications after meals. Recheck BP in 14 days.')
  const [medicines, setMedicines] = useState([
    { name: 'Amlodipine Besylate', dosage: '5 mg', frequency: 'Once Daily (OD)', duration: '30 Days' },
    { name: 'Multivitamin Complex', dosage: '1 Tablet', frequency: 'Once Daily (OD)', duration: '30 Days' }
  ])

  const [formErrors, setFormErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleAddMedicine = () => {
    setMedicines(prev => [
      ...prev,
      { name: '', dosage: '', frequency: 'Once Daily (OD)', duration: '14 Days' }
    ])
  }

  const handleRemoveMedicine = (index) => {
    setMedicines(prev => prev.filter((_, i) => i !== index))
  }

  const handleMedChange = (index, field, value) => {
    setMedicines(prev => prev.map((med, i) => i === index ? { ...med, [field]: value } : med))
  }

  const handleClear = () => {
    setPatientName('')
    setDiagnosis('')
    setNotes('')
    setMedicines([])
    setFormErrors({})
  }

  // 1. Action: Save Prescription to LocalStorage
  const handleSave = async (e) => {
    e.preventDefault()
    const { isValid, errors } = validatePrescriptionForm({ patientName, diagnosis, medicines })

    if (!isValid) {
      setFormErrors(errors)
      toast.error('Please fix form validation errors before saving.')
      return
    }

    setFormErrors({})
    setIsLoading(true)

    try {
      const newRx = {
        id: `rx-${Date.now().toString().slice(-4)}`,
        issuedAt: new Date().toISOString(),
        patientName,
        diagnosis,
        medicines,
        notes,
        doctorName: 'Dr. Robert Ford',
        doctorSpecialization: 'Cardiology'
      }

      await simulateApiCall(newRx)

      const updated = [newRx, ...prescriptions]
      setPrescriptions(updated)
      saveData('doctor_prescriptions', updated)

      if (onCreatePrescription) {
        onCreatePrescription({
          appointmentId: `apt-${Date.now().toString().slice(-4)}`,
          patientId: 'pat-1',
          ...newRx
        })
      }

      toast.success(`Digital prescription Rx #${newRx.id} saved for ${patientName}!`)
    } catch (err) {
      toast.error('Failed to save prescription.')
    } finally {
      setIsLoading(false)
    }
  }

  // 2. Action: Print Prescription
  const handlePrint = () => {
    window.print()
  }

  // 3. Action: Download PDF / Text File Blob
  const handleDownloadPDF = () => {
    try {
      const prescriptionText = `
=================================================
       VIRTUAL HEALTHCARE CONSULTATION PORTAL
       MEDISPHERE CLINICAL PRESCRIPTION RECORD
=================================================
Date: ${new Date().toLocaleDateString()}
Doctor: Dr. Robert Ford (MD, Cardiology)
License ID: MD-USA-99882104

PATIENT DETAILS:
-------------------------------------------------
Patient Name: ${patientName || 'N/A'}
Diagnosis: ${diagnosis || 'N/A'}

PRESCRIBED MEDICATIONS:
-------------------------------------------------
${medicines.map((m, idx) => `${idx + 1}. ${m.name} - ${m.dosage} | ${m.frequency} | ${m.duration}`).join('\n')}

PHYSICIAN ADVICE & NOTES:
-------------------------------------------------
${notes || 'None'}

=================================================
Signed: Dr. Robert Ford, MD
Digitally Verified & Authorized
=================================================
      `

      const blob = new Blob([prescriptionText], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Prescription-${patientName.replace(/\s+/g, '_')}-${Date.now().toString().slice(-4)}.txt`
      a.click()
      URL.revokeObjectURL(url)

      toast.success('Prescription file downloaded!')
    } catch (e) {
      toast.error('Failed to download prescription.')
    }
  }

  return (
    <div className="bg-[#0D1B2A]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-lg p-6 space-y-6 animate-in fade-in duration-200 text-slate-100">
      
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-400" /> Digital Prescription Workflow
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Issue e-prescriptions, validate dosages, download files, and print physical receipts.</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleClear}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1 border border-slate-800 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Form</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="bg-slate-900 hover:bg-slate-800 text-blue-400 font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1 border border-slate-800 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1 transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download File</span>
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSave} className="space-y-5 text-xs">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-300 block mb-1">Patient Name *</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="e.g. Eleanor Vance"
              className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none ${
                formErrors.patientName ? 'border-red-500 bg-red-500/10' : 'border-slate-800 focus:border-blue-500'
              }`}
            />
            {formErrors.patientName && <p className="text-red-400 text-[10px] mt-1 font-semibold">{formErrors.patientName}</p>}
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">Clinical Diagnosis *</label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Essential Hypertension Stage 1"
              className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none ${
                formErrors.diagnosis ? 'border-red-500 bg-red-500/10' : 'border-slate-800 focus:border-blue-500'
              }`}
            />
            {formErrors.diagnosis && <p className="text-red-400 text-[10px] mt-1 font-semibold">{formErrors.diagnosis}</p>}
          </div>
        </div>

        {/* Medicines Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-extrabold text-white text-xs">Prescribed Medications *</label>
            <button
              type="button"
              onClick={handleAddMedicine}
              className="text-xs text-blue-400 font-bold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Medicine</span>
            </button>
          </div>

          {formErrors.medicines && <p className="text-red-400 text-[10px] font-semibold">{formErrors.medicines}</p>}

          <div className="space-y-2">
            {medicines.map((med, index) => (
              <div key={index} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    value={med.name}
                    onChange={(e) => handleMedChange(index, 'name', e.target.value)}
                    placeholder="Medicine Name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  {formErrors[`med_${index}_name`] && <p className="text-red-400 text-[9px] font-semibold">{formErrors[`med_${index}_name`]}</p>}
                </div>

                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={med.dosage}
                    onChange={(e) => handleMedChange(index, 'dosage', e.target.value)}
                    placeholder="Dosage (5 mg)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  {formErrors[`med_${index}_dosage`] && <p className="text-red-400 text-[9px] font-semibold">{formErrors[`med_${index}_dosage`]}</p>}
                </div>

                <div className="sm:col-span-3">
                  <input
                    type="text"
                    value={med.frequency}
                    onChange={(e) => handleMedChange(index, 'frequency', e.target.value)}
                    placeholder="Frequency (OD / BD)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={med.duration}
                    onChange={(e) => handleMedChange(index, 'duration', e.target.value)}
                    placeholder="Duration (30 Days)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveMedicine(index)}
                  className="sm:col-span-1 p-1 text-slate-500 hover:text-red-400 justify-self-end"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="font-bold text-slate-300 block mb-1">Additional Physician Notes & Instructions</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Special instructions for patient..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500 resize-none h-20"
          />
        </div>

        {/* Save Button */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md shadow-blue-500/25 disabled:opacity-50"
          >
            {isLoading ? (
              <LoadingSpinner text="Saving Prescription..." />
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Issue Prescription</span>
              </>
            )}
          </button>
        </div>

      </form>

      {/* PREVIOUS SAVED PRESCRIPTIONS VAULT */}
      <div className="pt-6 border-t border-slate-800 space-y-3">
        <h3 className="font-extrabold text-white text-sm font-['Space_Grotesk']">
          Previously Issued Prescriptions ({prescriptions.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {prescriptions.length === 0 ? (
            <p className="text-slate-500 text-xs italic col-span-2">No prescriptions issued yet in this session.</p>
          ) : (
            prescriptions.map(rx => (
              <div key={rx.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-400">Rx #{rx.id}</span>
                  <span className="text-[10px] text-slate-500">{new Date(rx.issuedAt).toLocaleDateString()}</span>
                </div>
                <p className="font-bold text-white">{rx.patientName}</p>
                <p className="text-slate-400 truncate">Diagnosis: {rx.diagnosis}</p>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}
