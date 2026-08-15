import React, { useState } from 'react'
import { FileText, Download, Clock, Activity, FileCheck, Stethoscope } from 'lucide-react'
import { loadData } from '../../services/storageService'
import { INITIAL_MEDICAL_RECORDS } from '../../data/medicalRecords'
import toast from 'react-hot-toast'

export default function MedicalRecords() {
  const [records] = useState(() => loadData('medical_records', INITIAL_MEDICAL_RECORDS))

  // 1. Working Individual Report Download Logic
  const handleDownloadReport = (record) => {
    try {
      const blob = new Blob(
        [JSON.stringify(record, null, 2)],
        { type: 'application/json' }
      )

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${record.id}-report.json`
      a.click()
      URL.revokeObjectURL(url)

      toast.success(`Downloaded clinical report ${record.id}-report.json!`)
    } catch (e) {
      toast.error('Failed to download report.')
    }
  }

  // 2. Working Export All Charts Logic
  const handleExportAllCharts = () => {
    try {
      const blob = new Blob(
        [JSON.stringify(records, null, 2)],
        { type: 'application/json' }
      )

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `all-medical-charts-${Date.now().toString().slice(-4)}.json`
      a.click()
      URL.revokeObjectURL(url)

      toast.success('Successfully exported all medical charts!')
    } catch (e) {
      toast.error('Failed to export medical charts.')
    }
  }

  return (
    <div className="bg-[#0D1B2A]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-lg p-6 space-y-6 animate-in fade-in duration-200 text-slate-100">
      
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white font-['Space_Grotesk'] flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" /> Clinical Medical Records Archive
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Chronological visit history, physician diagnosis notes, vitals telemetry, and downloadable treatment summaries.</p>
        </div>

        <button
          type="button"
          onClick={handleExportAllCharts}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-blue-500/25"
        >
          <Download className="w-4 h-4" />
          <span>Export All Charts (JSON)</span>
        </button>
      </div>

      {/* Visit History Timeline (Scrollable Area) */}
      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {records.map((rec) => (
          <div key={rec.id} className="relative pl-6 border-l-2 border-blue-500/40 space-y-3">
            
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-slate-900 ring-4 ring-blue-500/20" />

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                    {rec.id}
                  </span>
                  <h3 className="font-extrabold text-white text-sm mt-1">{rec.patientName}</h3>
                </div>
                <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>{rec.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Diagnosis Notes</span>
                  <p className="font-bold text-white bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {rec.diagnosis}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Vitals Recorded</span>
                  <p className="font-bold text-blue-400 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono">
                    {rec.vitals}
                  </p>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Treatment Summary & RX Plan</span>
                <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  {rec.treatment}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleDownloadReport(rec)}
                  className="bg-slate-900 hover:bg-slate-800 text-blue-400 border border-slate-800 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Individual Report</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
