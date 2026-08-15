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
    <div className="bg-[#0D1B2A]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-lg p-6 space-y-6 animate-in fade-in duration-200 text-slate-100">
      
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white font-['Space_Grotesk'] flex items-center gap-2">
            <TestTube className="w-5 h-5 text-blue-400" /> Pathology & Diagnostic Lab Reports
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Review incoming laboratory investigation reports and upload new clinical test orders.</p>
        </div>

        {/* Upload Button */}
        <label className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-blue-500/25 cursor-pointer">
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
      <div className="flex border-b border-slate-800 space-x-4">
        <button
          type="button"
          onClick={() => setActiveTab('pending')}
          className={`pb-2 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'pending' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          Pending Review ({reports.filter(r => r.status === 'pending').length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('completed')}
          className={`pb-2 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'completed' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          Completed Archive ({reports.filter(r => r.status === 'completed').length})
        </button>
      </div>

      {/* Reports List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {filtered.length === 0 ? (
          <p className="text-slate-500 text-xs italic col-span-2 py-4">No lab reports found in this category.</p>
        ) : (
          filtered.map(r => (
            <div key={r.id} className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 transition-all space-y-3 flex flex-col justify-between shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white">{r.patientName}</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                    r.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {r.status}
                  </span>
                </div>
                <p className="font-extrabold text-blue-400">{r.testName}</p>
                <p className="text-slate-400">File Attachment: <strong className="text-white font-mono">{r.fileName}</strong></p>
                <p className="text-slate-400">Report Date: <strong className="text-slate-200">{r.date}</strong></p>
                {r.reviewedAt && <p className="text-emerald-400 font-medium">Reviewed At: {r.reviewedAt}</p>}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">ID: {r.id}</span>
                
                <div className="flex items-center space-x-2">
                  {r.status === 'pending' && (
                    <button
                      type="button"
                      disabled={loadingId === r.id}
                      onClick={() => handleMarkReviewed(r.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center space-x-1 shadow-sm disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{loadingId === r.id ? 'Reviewing...' : 'Mark Reviewed'}</span>
                    </button>
                  )}

                  {r.status === 'completed' && (
                    <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Reviewed
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
