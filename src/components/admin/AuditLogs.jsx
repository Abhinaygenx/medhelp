import React, { useState } from 'react'
import { FileText, Search, ShieldCheck } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'

export default function AuditLogs({ auditLogs = [] }) {
  const [searchQuery, setSearchQuery] = useState('')

  const logsToDisplay = auditLogs.length > 0 ? auditLogs : [
    { id: 'log-1', actorName: 'Super Admin', actorRole: 'Admin', action: 'VERIFY_DOCTOR', target: 'Dr. Robert Ford (Cardiology)', timestamp: new Date().toISOString() },
    { id: 'log-2', actorName: 'Eleanor Vance', actorRole: 'Patient', action: 'BOOK_APPOINTMENT', target: 'Dr. Robert Ford for 2026-08-15', timestamp: new Date().toISOString() },
    { id: 'log-3', actorName: 'Dr. Robert Ford', actorRole: 'Doctor', action: 'ISSUE_PRESCRIPTION', target: 'Issued Rx #rx-991 for Eleanor Vance', timestamp: new Date().toISOString() }
  ]

  const filteredLogs = logsToDisplay.filter(l => 
    (l.actorName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.action || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.target || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <FileText className="w-5 h-5 text-[var(--brand-600)]" /> HIPAA Compliance & Security Audit Logs
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Immutable audit trail tracking login activity, EMR modifications, and administrative actions.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audit trail..."
            className="w-full rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
            style={{
              background: 'var(--surface-page)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-primary)'
            }}
          />
        </div>
      </div>

      <div className="divide-y text-xs rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border-light)' }}>
        {filteredLogs.map(log => (
          <div 
            key={log.id} 
            className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[var(--brand-50)] transition-colors"
            style={{ background: 'var(--surface-card)' }}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs" style={{ color: 'var(--brand-600)' }}>{log.action}</span>
                <Badge variant="default" size="sm">{log.actorRole}</Badge>
              </div>
              <p style={{ color: 'var(--text-primary)' }}>
                <span className="font-semibold">{log.actorName}</span> → <span style={{ color: 'var(--text-secondary)' }}>{log.target}</span>
              </p>
            </div>
            <span className="text-[10px] font-mono self-start sm:self-center" style={{ color: 'var(--text-muted)' }}>
              {new Date(log.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

    </AdminNeonCard>
  )
}
