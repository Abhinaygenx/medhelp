import React from 'react'
import { TestTube, Calendar, Clock, AlertCircle, CheckCircle2, ShieldCheck, Download, FileText } from 'lucide-react'
import { Badge } from '../common/Badge'

export default function ScheduledTests({ tests = [] }) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div 
        className="p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          background: 'linear-gradient(135deg, #0d9488 0%, #115e59 100%)',
          color: '#ffffff',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md mb-2">
            <TestTube size={14} />
            <span>Diagnostic & Laboratory Services</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            Scheduled Clinical Tests & Investigations
          </h2>
          <p className="text-xs text-teal-100 max-w-xl mt-1 leading-relaxed">
            Upcoming pathology, radiology scans, and cardiology tests ordered for you. Please check fasting and pre-test instructions before your appointment.
          </p>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-3xl font-black">{tests.length}</span>
          <p className="text-xs text-teal-200">Scheduled Orders</p>
        </div>
      </div>

      {/* Tests List */}
      <div className="space-y-4">
        {tests.length === 0 ? (
          <div 
            className="p-12 text-center rounded-2xl border border-dashed"
            style={{ background: 'var(--surface-card)', borderColor: 'var(--border-default)', color: 'var(--text-muted)' }}
          >
            <TestTube className="w-10 h-10 mx-auto text-[var(--neutral-400)] mb-3" />
            <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>No scheduled tests currently pending</h4>
            <p className="text-xs mt-1">Diagnostic lab requests ordered by hospital staff will be displayed here.</p>
          </div>
        ) : (
          tests.map(test => (
            <div
              key={test.id}
              className="p-5 rounded-2xl transition-all hover:shadow-md space-y-4"
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1' }}
                  >
                    <TestTube size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                        {test.testName}
                      </h3>
                      {test.priority === 'Urgent' && (
                        <Badge variant="danger" size="sm">Urgent / STAT</Badge>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {test.department} • Ordered by <strong className="text-[var(--text-secondary)]">{test.orderedBy || 'Attending Physician'}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-xl border"
                    style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)', color: 'var(--text-primary)' }}
                  >
                    <Calendar size={13} className="text-[var(--brand-600)]" />
                    <span>{test.scheduledDate}</span>
                    <span className="opacity-40">•</span>
                    <span>{test.timeSlot}</span>
                  </div>
                  <Badge variant={test.status === 'Completed' ? 'success' : 'brand'} size="md">
                    {test.status}
                  </Badge>
                </div>
              </div>

              {/* Guidelines & Findings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border space-y-1"
                  style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}
                >
                  <span className="text-[10px] uppercase font-bold text-amber-700 block flex items-center gap-1">
                    <AlertCircle size={12} />
                    <span>Preparation & Fasting Protocol:</span>
                  </span>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {test.preparation || 'No specific fasting required. Report to diagnostic lab on time.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl border space-y-1 flex flex-col justify-between"
                  style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}
                >
                  <span className="text-[10px] uppercase font-bold text-[var(--brand-700)] block flex items-center gap-1">
                    <ShieldCheck size={12} />
                    <span>Status & Laboratory Verification:</span>
                  </span>
                  <p className="text-[var(--text-secondary)]">
                    {test.findings ? test.findings : (test.status === 'Completed' ? 'Sample processed. Results verified by Chief Pathologist.' : 'Requisition confirmed in Hospital Laboratory System.')}
                  </p>
                  {test.status === 'Completed' && (
                    <button
                      type="button"
                      onClick={() => alert(`Downloading verified Lab Report for ${test.testName}...`)}
                      className="self-start text-[11px] font-bold text-[var(--brand-600)] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <Download size={12} />
                      <span>Download Certified Test Report (PDF)</span>
                    </button>
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
