import React, { useState } from 'react'
import { CalendarDays, Search, CheckCircle2, XCircle, Clock } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
import toast from 'react-hot-toast'

export default function AppointmentsManagement({ appointments = [], doctors = [], onUpdateStatus }) {
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = appointments.filter(a => {
    const matchesStatus = filterStatus === 'All' || (a.status || '').toLowerCase() === filterStatus.toLowerCase()
    const matchesSearch = (a.patientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (a.doctorName || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleUpdateStatus = (id, status) => {
    if (onUpdateStatus) {
      onUpdateStatus(id, status)
    } else {
      toast.success(`Appointment #${id} set to: ${status.toUpperCase()}`)
    }
  }

  const getStatusBadgeVariant = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'approved': return 'success'
      case 'pending': return 'warning'
      case 'completed': return 'brand'
      case 'cancelled': return 'danger'
      default: return 'default'
    }
  }

  return (
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <CalendarDays className="w-5 h-5 text-[var(--brand-600)]" /> Hospital Appointment Scheduling & Approval Desk
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Monitor, approve, reschedule, and assign doctors to patient consultation slots.
          </p>
        </div>

        <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
          {['All', 'Approved', 'Pending', 'Completed', 'Cancelled'].map(st => {
            const isActive = filterStatus === st
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                style={{
                  background: isActive ? 'var(--brand-600)' : 'var(--surface-page)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--brand-600)' : 'var(--border-light)',
                  boxShadow: isActive ? 'var(--shadow-xs)' : 'none'
                }}
              >
                {st}
              </button>
            )
          })}
        </div>
      </div>

      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Patient or Doctor name..."
          className="w-full rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
          style={{
            background: 'var(--surface-page)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-primary)'
          }}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--border-light)' }}>
        <table className="w-full text-left text-xs">
          <thead style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }} className="uppercase font-semibold border-b">
            <tr>
              <th className="py-3.5 px-4">Appt ID & Date</th>
              <th className="py-3.5 px-4">Patient Name</th>
              <th className="py-3.5 px-4">Assigned Doctor</th>
              <th className="py-3.5 px-4">Chief Complaint</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Approval Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                  No appointments found for current filter.
                </td>
              </tr>
            ) : (
              filtered.map(apt => (
                <tr key={apt.id} className="hover:bg-[var(--brand-50)] transition-colors">
                  <td className="py-4 px-4 font-bold text-[var(--brand-600)]">
                    <p>#{apt.id}</p>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{apt.appointmentDate} • {apt.timeSlot}</span>
                  </td>
                  <td className="py-4 px-4 font-bold" style={{ color: 'var(--text-primary)' }}>{apt.patientName}</td>
                  <td className="py-4 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>{apt.doctorName}</td>
                  <td className="py-4 px-4 max-w-xs truncate" style={{ color: 'var(--text-secondary)' }}>{apt.symptoms || 'General Checkup'}</td>
                  <td className="py-4 px-4">
                    <Badge variant={getStatusBadgeVariant(apt.status)} size="sm">
                      {(apt.status || 'pending').toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    {apt.status !== 'approved' && (
                      <button
                        onClick={() => handleUpdateStatus(apt.id, 'approved')}
                        className="px-3 py-1.5 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 cursor-pointer transition-all"
                      >
                        Approve
                      </button>
                    )}
                    {apt.status !== 'cancelled' && (
                      <button
                        onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                        className="px-3 py-1.5 rounded-xl font-bold text-xs bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 cursor-pointer transition-all"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </AdminNeonCard>
  )
}

