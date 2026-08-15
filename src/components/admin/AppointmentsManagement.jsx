import React, { useState } from 'react'
import { CalendarDays, Search, CheckCircle2, XCircle, Clock, Filter, RefreshCcw, Video } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
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

  return (
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-[#E5FF00]" /> Hospital Appointment Scheduling & Approval Desk
          </h2>
          <p className="text-xs text-[#9CA3AF]">Monitor, approve, reschedule, and assign doctors to patient consultation slots.</p>
        </div>

        <div className="flex items-center space-x-2">
          {['All', 'Approved', 'Pending', 'Completed', 'Cancelled'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              style={filterStatus === st ? { background: '#E5FF00', color: '#0B0F19' } : {}}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st ? 'shadow-md' : 'bg-[#111827] text-[#9CA3AF] hover:text-white border border-[#374151]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Patient or Doctor name..."
          className="w-full bg-[#0B0F19] border border-[#374151] rounded-2xl pl-10 pr-4 py-2 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#E5FF00]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#111827] text-[#9CA3AF] uppercase font-semibold border-y border-[#374151]">
            <tr>
              <th className="py-3.5 px-4">Appt ID & Date</th>
              <th className="py-3.5 px-4">Patient Name</th>
              <th className="py-3.5 px-4">Assigned Doctor</th>
              <th className="py-3.5 px-4">Chief Complaint</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Approval Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#374151] text-[#9CA3AF]">
            {filtered.map(apt => (
              <tr key={apt.id} className="hover:bg-[#111827]/60 transition-colors">
                <td className="py-4 px-4 font-bold text-[#E5FF00]">
                  <p>#{apt.id}</p>
                  <span className="text-[10px] text-[#9CA3AF] font-mono">{apt.appointmentDate} • {apt.timeSlot}</span>
                </td>
                <td className="py-4 px-4 font-bold text-[#F9FAFB]">{apt.patientName}</td>
                <td className="py-4 px-4 font-semibold text-[#F9FAFB]">{apt.doctorName}</td>
                <td className="py-4 px-4 max-w-xs truncate text-[#9CA3AF]">{apt.symptoms || 'General Checkup'}</td>
                <td className="py-4 px-4">
                  {apt.status === 'approved' && <span className="px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 font-bold text-[10px]">APPROVED</span>}
                  {apt.status === 'pending' && <span className="px-2.5 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 font-bold text-[10px]">PENDING</span>}
                  {apt.status === 'completed' && <span className="px-2.5 py-0.5 rounded-full bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30 font-bold text-[10px]">COMPLETED</span>}
                  {apt.status === 'cancelled' && <span className="px-2.5 py-0.5 rounded-full bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30 font-bold text-[10px]">CANCELLED</span>}
                </td>
                <td className="py-4 px-4 text-right space-x-2">
                  {apt.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(apt.id, 'approved')}
                      className="px-3 py-1 rounded-xl bg-[#22C55E] text-[#0B0F19] font-bold text-[11px]"
                    >
                      Approve
                    </button>
                  )}
                  {apt.status !== 'cancelled' && (
                    <button
                      onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                      className="px-3 py-1 rounded-xl bg-[#EF4444]/20 text-[#EF4444] font-bold text-[11px] border border-[#EF4444]/30"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </AdminNeonCard>
  )
}
