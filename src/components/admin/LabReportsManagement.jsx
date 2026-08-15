import React, { useState } from 'react'
import { TestTube, Search, Upload, Download, CheckCircle2, Clock, FileText } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
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
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <TestTube className="w-5 h-5 text-[#E5FF00]" /> Pathology & Radiology Lab Reports
          </h2>
          <p className="text-xs text-[#9CA3AF]">Upload, verify, and dispatch digital diagnostic lab test results.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{ background: '#E5FF00', color: '#0B0F19', boxShadow: '0 0 15px rgba(229, 255, 0, 0.45)' }}
          className="font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
        >
          <Upload className="w-4 h-4 text-[#0B0F19]" />
          <span>Upload Lab Report</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#111827] text-[#9CA3AF] uppercase font-semibold border-y border-[#374151]">
            <tr>
              <th className="py-3.5 px-4">Report ID & Date</th>
              <th className="py-3.5 px-4">Patient Name</th>
              <th className="py-3.5 px-4">Test Diagnostic Type</th>
              <th className="py-3.5 px-4">Pathologist Tech</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">PDF Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#374151] text-[#9CA3AF]">
            {labReports.map(rep => (
              <tr key={rep.id} className="hover:bg-[#111827]/60 transition-colors">
                <td className="py-4 px-4 font-bold text-[#E5FF00]">
                  <p>#{rep.id}</p>
                  <span className="text-[10px] text-[#9CA3AF] font-mono">{rep.date}</span>
                </td>
                <td className="py-4 px-4 font-bold text-[#F9FAFB]">{rep.patientName}</td>
                <td className="py-4 px-4 font-semibold text-[#F9FAFB]">{rep.testType}</td>
                <td className="py-4 px-4 text-[#9CA3AF]">{rep.technician}</td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    rep.status === 'Completed' ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30' : 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
                  }`}>
                    {rep.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => handleDownload(rep.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#0B0F19] hover:bg-[#111827] text-[#E5FF00] font-bold border border-[#374151] inline-flex items-center space-x-1"
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
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1F2937] rounded-3xl border border-[#374151] p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-[#F9FAFB] font-['Space_Grotesk'] border-b border-[#374151] pb-3">
              Upload Official Lab Diagnostic Report
            </h3>
            
            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Patient Name</label>
                <input
                  type="text"
                  value={newReport.patientName}
                  onChange={(e) => setNewReport({...newReport, patientName: e.target.value})}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5FF00]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Test Diagnostic Type</label>
                <input
                  type="text"
                  value={newReport.testType}
                  onChange={(e) => setNewReport({...newReport, testType: e.target.value})}
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#0B0F19] border border-dashed border-[#374151] text-center space-y-1">
                <Upload className="w-6 h-6 text-[#E5FF00] mx-auto" />
                <p className="font-bold text-[#F9FAFB]">Attach PDF File</p>
                <p className="text-[10px] text-[#9CA3AF]">Max file size: 10MB</p>
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
