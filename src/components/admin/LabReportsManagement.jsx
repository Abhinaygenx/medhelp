import React, { useState } from 'react'
import { TestTube, Search, Upload, Download } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
import toast from 'react-hot-toast'

export default function LabReportsManagement({ labReports = [], onUploadLabReport }) {
  const [showModal, setShowModal] = useState(false)
  const [newReport, setNewReport] = useState({ patientName: '', testType: 'Full Body Diagnostic', technician: 'Dr. Sarah Connor' })

  const handleUploadSubmit = (e) => {
    e.preventDefault()
    if (!newReport.patientName.trim()) return

    const created = {
      id: `lab-${Date.now().toString().slice(-4)}`,
      patientName: newReport.patientName,
      testType: newReport.testType,
      date: new Date().toLocaleDateString(),
      status: 'Completed',
      technician: newReport.technician
    }

    if (onUploadLabReport) {
      onUploadLabReport(created)
    }
    toast.success(`Lab Test Report #${created.id} uploaded!`)
    setShowModal(false)
    setNewReport({ patientName: '', testType: 'Full Body Diagnostic', technician: 'Dr. Sarah Connor' })
  }

  const handleDownload = (id) => {
    toast.success(`Downloading Official PDF Lab Report #${id}...`)
  }

  return (
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <TestTube className="w-5 h-5 text-[var(--brand-600)]" /> Pathology & Radiology Lab Reports
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Upload, verify, and dispatch digital diagnostic lab test results.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm text-white hover:opacity-95"
          style={{ background: 'var(--brand-600)' }}
        >
          <Upload className="w-4 h-4 text-white" />
          <span>Upload Lab Report</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--border-light)' }}>
        <table className="w-full text-left text-xs">
          <thead style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }} className="uppercase font-semibold border-b">
            <tr>
              <th className="py-3.5 px-4">Report ID & Date</th>
              <th className="py-3.5 px-4">Patient Name</th>
              <th className="py-3.5 px-4">Test Diagnostic Type</th>
              <th className="py-3.5 px-4">Pathologist Tech</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">PDF Download</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
            {labReports.map(rep => (
              <tr key={rep.id} className="hover:bg-[var(--brand-50)] transition-colors">
                <td className="py-4 px-4 font-bold text-[var(--brand-600)]">
                  <p>#{rep.id}</p>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{rep.date}</span>
                </td>
                <td className="py-4 px-4 font-bold" style={{ color: 'var(--text-primary)' }}>{rep.patientName}</td>
                <td className="py-4 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>{rep.testType}</td>
                <td className="py-4 px-4" style={{ color: 'var(--text-secondary)' }}>{rep.technician}</td>
                <td className="py-4 px-4">
                  <Badge variant={rep.status === 'Completed' ? 'success' : 'warning'} size="sm">
                    {rep.status}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => handleDownload(rep.id)}
                    className="px-3 py-1.5 rounded-xl font-bold border text-xs cursor-pointer transition-all hover:bg-[var(--neutral-100)] inline-flex items-center space-x-1.5"
                    style={{
                      background: 'var(--surface-page)',
                      color: 'var(--brand-600)',
                      borderColor: 'var(--border-light)'
                    }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
              Upload Official Lab Diagnostic Report
            </h3>
            
            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Patient Name</label>
                <input
                  type="text"
                  value={newReport.patientName}
                  onChange={(e) => setNewReport({...newReport, patientName: e.target.value})}
                  placeholder="e.g. Eleanor Vance"
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
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Test Diagnostic Type</label>
                <input
                  type="text"
                  value={newReport.testType}
                  onChange={(e) => setNewReport({...newReport, testType: e.target.value})}
                  className="w-full rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  required
                />
              </div>

              <div 
                className="p-5 rounded-xl border border-dashed text-center space-y-1.5"
                style={{
                  background: 'var(--surface-page)',
                  borderColor: 'var(--border-light)'
                }}
              >
                <Upload className="w-6 h-6 text-[var(--brand-600)] mx-auto" />
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Attach PDF File</p>
                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Max file size: 10MB</p>
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
                  Upload Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminNeonCard>
  )
}
