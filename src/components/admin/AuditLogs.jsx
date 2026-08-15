import React, { useState } from 'react'
import { FileText, Search, ShieldCheck, Lock, Activity } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'

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
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#E5FF00]" /> HIPAA Compliance & Security Audit Logs
          </h2>
          <p className="text-xs text-[#9CA3AF]">Immutable audit trail tracking login activity, EMR modifications, and administrative actions.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audit trail..."
            className="w-full bg-[#0B0F19] border border-[#374151] rounded-2xl pl-10 pr-4 py-2 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#E5FF00]"
          />
        </div>
      </div>

      <div className="divide-y divide-[#374151] text-xs">
        {filteredLogs.map(log => (
          <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#111827]/50 p-2 rounded-xl transition-colors">
            <div className="space-y-0.5">
              <p className="font-bold text-[#E5FF00]">{log.action}</p>
              <p className="text-[#F9FAFB]">{log.actorName} ({log.actorRole}) → <span className="text-[#9CA3AF]">{log.target}</span></p>
            </div>
            <span className="text-[10px] text-[#9CA3AF] font-mono self-start sm:self-center">
              {new Date(log.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

    </AdminNeonCard>
  )
}
