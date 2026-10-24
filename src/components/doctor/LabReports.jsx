import React, { useState } from 'react'
import { TestTube, Upload, FileCheck, Clock, Eye, Download, CheckCircle2 } from 'lucide-react'
import { loadData, saveData } from '../../services/storageService'
import { simulateApiCall } from '../../services/mockApi'
import { INITIAL_LAB_REPORTS } from '../../data/seedData'
import toast from 'react-hot-toast'

export default function LabReports({ labReports: propLabReports = [] }) {
  const localLabReports = loadData('hms_lab_reports', INITIAL_LAB_REPORTS)
  const reportsData = propLabReports.length > 0 ? propLabReports : localLabReports

  const [reports, setReports] = useState(reportsData)
  const [activeTab, setActiveTab] = useState('pending') // 'pending' | 'completed'
  const [loadingId, setLoadingId] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  // 1. Action: Mark as Reviewed
  const handleMarkReviewed = async (reportId) => {
    setLoadingId(reportId)
    try {
      await simulateApiCall(reportId)
      const reviewedAt = new Date().toLocaleString()
      const updated = reports.map(r => {
        if (r.id === reportId) {
          return { ...r, status: 'completed', reviewedAt }
        }
        return r
      })
      setReports(updated)
      saveData('doctor_lab_reports', updated)
      toast.success(`Lab Report ${reportId} marked as REVIEWED at ${reviewedAt}!`)
    } catch (e) {
      toast.error('Failed to mark report as reviewed.')
    } finally {
      setLoadingId(null)
    }
  }

  // 2. Action: Upload File Input
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)
    try {
      await simulateApiCall(file)
      const newReport = {
        id: `LAB-${Date.now().toString().slice(-3)}`,
        patientName: 'Eleanor Vance',
        testName: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, ' '),
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        urgency: 'Normal',
        fileName: file.name
      }

      const updated = [newReport, ...reports]
      setReports(updated)
      saveData('doctor_lab_reports', updated)
      toast.success(`Uploaded lab file "${file.name}" successfully!`)
    } catch (err) {
      toast.error('Failed to upload lab report file.')
    } finally {
      setIsUploading(false)
      e.target.value = null
    }
  }

  const filtered = reports.filter(r => r.status === activeTab)

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--border-light)] shadow-sm p-4 sm:p-6 space-y-6 animate-in fade-in duration-200 text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="border-b border-[var(--border-light)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] font-['Space_Grotesk'] flex items-center gap-2">
            <TestTube className="w-5 h-5 text-blue-500" /> Pathology & Diagnostic Lab Reports
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Review incoming laboratory investigation reports and upload new clinical test orders.</p>
        </div>

        {/* Upload Button */}
        <label className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? 'Uploading File...' : 'Upload Lab File (.pdf, .png)'}</span>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-[var(--border-light)] space-x-4">
        <button
          type="button"
          onClick={() => setActiveTab('pending')}
          className={`pb-2 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'pending' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          Pending Review ({reports.filter(r => r.status === 'pending').length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('completed')}
          className={`pb-2 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'completed' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          Completed Archive ({reports.filter(r => r.status === 'completed').length})
        </button>
      </div>

      {/* Reports List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {filtered.length === 0 ? (
          <p className="text-[var(--text-muted)] text-xs italic col-span-2 py-4">No lab reports found in this category.</p>
        ) : (
          filtered.map(r => (
            <div key={r.id} className="p-4 sm:p-5 rounded-2xl border border-[var(--border-light)] bg-[var(--surface-page)] hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-2">
                  <span className="font-bold text-[var(--text-primary)]">{r.patientName}</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                    r.status === 'pending' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25'
                  }`}>
                    {r.status}
                  </span>
                </div>
                <p className="font-extrabold text-blue-600 dark:text-blue-400">{r.testName}</p>
                <p className="text-[var(--text-muted)]">File Attachment: <strong className="text-[var(--text-primary)] font-mono">{r.fileName}</strong></p>
                <p className="text-[var(--text-muted)]">Report Date: <strong className="text-[var(--text-primary)]">{r.date}</strong></p>
                {r.reviewedAt && <p className="text-emerald-600 dark:text-emerald-400 font-medium">Reviewed At: {r.reviewedAt}</p>}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[var(--text-muted)]">ID: {r.id}</span>
                
                <div className="flex items-center space-x-2">
                  {r.status === 'pending' && (
                    <button
                      type="button"
                      disabled={loadingId === r.id}
                      onClick={() => handleMarkReviewed(r.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-1 shadow-sm disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{loadingId === r.id ? 'Reviewing...' : 'Mark Reviewed'}</span>
                    </button>
                  )}

                  {r.status === 'completed' && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Reviewed
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  )
}
