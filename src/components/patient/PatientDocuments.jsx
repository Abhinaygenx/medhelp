import React, { useState } from 'react'
import { FileText, Download, Eye, Calendar, User, Search, Filter, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Badge } from '../common/Badge'

export default function PatientDocuments({ documents = [], prescriptions = [] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [previewDoc, setPreviewDoc] = useState(null)

  const categories = ['All', 'Prescription', 'Clinical Note', 'Lab Report', 'Discharge Summary', 'Radiology Scan']

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || doc.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div 
        className="p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          background: 'linear-gradient(135deg, var(--brand-700) 0%, var(--brand-900) 100%)',
          color: '#ffffff',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md mb-2">
            <FileText size={14} />
            <span>HIPAA-Compliant EMR Records</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            Medical Records, Prescriptions & Uploaded Documents
          </h2>
          <p className="text-xs text-blue-100 max-w-xl mt-1 leading-relaxed">
            All clinical consultation notes, diagnostic lab sheets, and official digital prescriptions issued by hospital doctors and clinical staff.
          </p>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-3xl font-black">{documents.length}</span>
          <p className="text-xs text-blue-200">Verified Files</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl"
        style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
      >
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]" />
          <input
            type="text"
            placeholder="Search documents, doctor notes, or prescriptions..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
            style={{
              background: 'var(--surface-page)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              type="button"
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all"
              style={{
                background: categoryFilter === cat ? 'var(--brand-600)' : 'var(--surface-page)',
                color: categoryFilter === cat ? '#ffffff' : 'var(--text-secondary)',
                border: categoryFilter === cat ? '1px solid var(--brand-600)' : '1px solid var(--border-light)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.length === 0 ? (
          <div 
            className="col-span-2 p-12 text-center rounded-2xl border border-dashed"
            style={{ background: 'var(--surface-card)', borderColor: 'var(--border-default)', color: 'var(--text-muted)' }}
          >
            <FileText className="w-10 h-10 mx-auto text-[var(--neutral-400)] mb-3" />
            <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>No medical documents found</h4>
            <p className="text-xs mt-1">Uploaded reports and official doctor prescriptions will appear here.</p>
          </div>
        ) : (
          filteredDocs.map(doc => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl space-y-4 transition-all hover:shadow-md flex flex-col justify-between"
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3 border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'var(--brand-50)', color: 'var(--brand-600)', border: '1px solid var(--brand-200)' }}
                    >
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                        {doc.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Issued by <strong className="text-[var(--text-secondary)]">{doc.doctorName || 'Attending Physician'}</strong>
                      </p>
                    </div>
                  </div>

                  <Badge variant="brand" size="sm">
                    {doc.category}
                  </Badge>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed p-3 rounded-xl border"
                  style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}
                >
                  {doc.summary}
                </p>
              </div>

              <div className="pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border-light)' }}>
                <div className="flex items-center gap-2 text-[var(--text-muted)] font-mono text-[11px]">
                  <Calendar size={13} />
                  <span>{doc.date}</span>
                  <span className="opacity-40">•</span>
                  <span>{doc.fileSize || 'PDF'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(doc)}
                    className="px-3 py-1.5 rounded-xl font-bold border flex items-center gap-1.5 cursor-pointer hover:bg-[var(--brand-50)] transition-colors"
                    style={{ borderColor: 'var(--border-light)', color: 'var(--brand-700)' }}
                  >
                    <Eye size={13} />
                    <span>View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert(`Downloading ${doc.title} (${doc.fileSize || 'PDF'})...`)}
                    className="px-3 py-1.5 rounded-xl font-bold text-white flex items-center gap-1.5 cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ background: 'var(--brand-600)' }}
                  >
                    <Download size={13} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-2xl p-6 space-y-4 shadow-2xl"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-600)]">{previewDoc.category}</span>
                <h3 className="font-bold text-base mt-0.5" style={{ color: 'var(--text-primary)' }}>{previewDoc.title}</h3>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="text-[var(--text-muted)] hover:opacity-75">✕</button>
            </div>

            <div className="p-4 rounded-xl space-y-3 text-xs border"
              style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}
            >
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Patient Name:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{previewDoc.patientName}</strong>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Attending Practitioner:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{previewDoc.doctorName}</strong>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Document Date:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{previewDoc.date}</strong>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>File Specifications:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{previewDoc.fileType} • {previewDoc.fileSize}</strong>
              </div>
              <div className="pt-2 border-t" style={{ borderColor: 'var(--border-light)' }}>
                <span className="font-bold text-[var(--text-secondary)] block mb-1">Clinical Summary / Directives:</span>
                <p className="leading-relaxed text-[var(--text-secondary)]">{previewDoc.summary}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Downloading ${previewDoc.title}...`)
                  setPreviewDoc(null)
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                style={{ background: 'var(--brand-600)' }}
              >
                <Download size={13} />
                <span>Download Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
