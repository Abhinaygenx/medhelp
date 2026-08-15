import React, { useState } from 'react'
import { Calendar, Video, CheckCircle2, Clock, Search, Filter, RefreshCcw, XCircle, AlertCircle } from 'lucide-react'
import { loadData, saveData } from '../../services/storageService'
import { INITIAL_DOCTOR_APPOINTMENTS } from '../../data/appointments'
import { simulateApiCall } from '../../services/mockApi'
import GlassCard from '../common/GlassCard'
import LoadingSpinner from '../common/LoadingSpinner'
import toast from 'react-hot-toast'

export default function TodayAppointments({ 
  onOpenTeleconsultation 
}) {
  const [appointments, setAppointments] = useState(() => {
    return loadData('doctor_appointments', INITIAL_DOCTOR_APPOINTMENTS)
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterDept, setFilterDept] = useState('All')
  const [loadingId, setLoadingId] = useState(null)

  // Reschedule Modal State
  const [rescheduleApt, setRescheduleApt] = useState(null)
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [rescheduleReason, setRescheduleReason] = useState('')
  const [modalError, setModalError] = useState('')

  // 1. Action: Start Consultation
  const handleStartConsultation = async (apt) => {
    setLoadingId(apt.id)
    try {
      await simulateApiCall(apt)
      const updated = appointments.map(item => {
        if (item.id === apt.id) {
          return { ...item, status: 'in-progress' }
        }
        return item
      })
      setAppointments(updated)
      saveData('doctor_appointments', updated)
      toast.success(`Consultation started for ${apt.patientName}! Status: IN PROGRESS`)

      if (onOpenTeleconsultation) {
        onOpenTeleconsultation(apt)
      }
    } catch (e) {
      toast.error('Failed to start consultation.')
    } finally {
      setLoadingId(null)
    }
  }

  // 2. Action: Complete Appointment
  const handleCompleteAppointment = async (aptId) => {
    setLoadingId(aptId)
    try {
      await simulateApiCall(aptId)
      const completedAt = new Date().toLocaleString()
      const updated = appointments.map(item => {
        if (item.id === aptId) {
          return { ...item, status: 'completed', completedAt }
        }
        return item
      })
      setAppointments(updated)
      saveData('doctor_appointments', updated)
      toast.success(`Appointment marked COMPLETED at ${completedAt}!`)
    } catch (e) {
      toast.error('Failed to mark appointment completed.')
    } finally {
      setLoadingId(null)
    }
  }

  // 3. Action: Reschedule Appointment Submit
  const handleRescheduleSubmit = async (e) => {
    e.preventDefault()
    if (!newDate || !newTime) {
      setModalError('Please select both date and time slot.')
      return
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (new Date(newDate) < today) {
      setModalError('Reschedule date cannot be in the past.')
      return
    }

    setLoadingId(rescheduleApt.id)
    try {
      await simulateApiCall(rescheduleApt)
      const updated = appointments.map(item => {
        if (item.id === rescheduleApt.id) {
          return { 
            ...item, 
            appointmentDate: newDate, 
            timeSlot: newTime, 
            rescheduleReason,
            status: 'pending' 
          }
        }
        return item
      })
      setAppointments(updated)
      saveData('doctor_appointments', updated)
      toast.success(`Rescheduled ${rescheduleApt.patientName} for ${newDate} at ${newTime}`)
      setRescheduleApt(null)
      setNewDate('')
      setNewTime('')
      setRescheduleReason('')
      setModalError('')
    } catch (e) {
      toast.error('Failed to reschedule appointment.')
    } finally {
      setLoadingId(null)
    }
  }

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (apt.symptoms && apt.symptoms.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === 'All' || apt.status.toLowerCase() === filterStatus.toLowerCase().replace(' ', '-')
    const matchesDept = filterDept === 'All' || apt.department === filterDept
    return matchesSearch && matchesStatus && matchesDept
  })

  return (
    <GlassCard className="p-6 space-y-6 text-[#f8fafc]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#162742] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#3b82f6]" /> Today's Appointment Queue & Telehealth
          </h2>
          <p className="text-xs text-[#94a3b8] mt-0.5 font-medium">Manage patient queue, launch telehealth video rooms, reschedule slots, and complete consultations.</p>
        </div>

        {/* Real-time Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-[#64748b]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient name or symptoms..."
            className="w-full bg-[#061124] border border-[#162742] rounded-2xl pl-9 pr-3 py-1.5 text-xs text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#2563ff]"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[#061124] p-3.5 rounded-2xl border border-[#162742]">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-[#64748b]" />
          <span className="font-bold text-[#cbd5e1]">Status:</span>
          {['All', 'Approved', 'In-Progress', 'Pending', 'Completed'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                filterStatus === status 
                  ? 'bg-[#2563ff] text-white shadow-sm' 
                  : 'bg-[#081225] text-[#94a3b8] hover:bg-[#0b172a] border border-[#162742]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#cbd5e1]">Dept:</span>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="bg-[#081225] border border-[#162742] rounded-xl px-3 py-1 font-semibold text-[#cbd5e1] focus:outline-none"
          >
            <option value="All">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Neurology">Neurology</option>
          </select>
        </div>
      </div>

      {/* Table Layout */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#061124] text-[#94a3b8] uppercase tracking-wider font-semibold border-y border-[#162742]">
            <tr>
              <th className="py-4 px-4">Patient Name</th>
              <th className="py-4 px-4">Date & Time</th>
              <th className="py-4 px-4">Department</th>
              <th className="py-4 px-4">Chief Complaints</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#162742] text-[#cbd5e1] font-medium">
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-[#64748b]">
                  No appointments found matching current filter criteria.
                </td>
              </tr>
            ) : (
              filteredAppointments.map(apt => (
                <tr key={apt.id} className="hover:bg-[#061124]/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-white flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-2xl bg-[#2563ff]/15 text-[#3b82f6] font-extrabold flex items-center justify-center text-xs border border-[#2563ff]/25 shrink-0">
                      {apt.patientName.charAt(0)}
                    </div>
                    <div>
                      <p>{apt.patientName}</p>
                      <span className="text-[10px] font-mono text-[#64748b]">{apt.id}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-semibold text-[#cbd5e1]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#3b82f6]" />
                      {apt.appointmentDate} • {apt.timeSlot}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-[#94a3b8]">{apt.department || 'Cardiology'}</td>

                  <td className="py-4 px-4 max-w-xs truncate text-[#94a3b8]" title={apt.symptoms}>
                    {apt.symptoms || 'General Checkup'}
                  </td>

                  <td className="py-4 px-4">
                    {apt.status === 'in-progress' && (
                      <span className="px-3 py-1 rounded-full bg-[#2563ff]/15 text-[#3b82f6] border border-[#2563ff]/25 font-bold text-[10px] uppercase shadow-sm animate-pulse">
                        In Progress
                      </span>
                    )}
                    {apt.status === 'approved' && (
                      <span className="px-3 py-1 rounded-full bg-[#94a3b8]/15 text-[#cbd5e1] border border-[#94a3b8]/25 font-bold text-[10px] uppercase">
                        Scheduled
                      </span>
                    )}
                    {apt.status === 'pending' && (
                      <span className="px-3 py-1 rounded-full bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/25 font-bold text-[10px] uppercase">
                        Pending
                      </span>
                    )}
                    {apt.status === 'completed' && (
                      <span className="px-3 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25 font-bold text-[10px] uppercase">
                        Completed
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-right space-x-2">
                    {loadingId === apt.id ? (
                      <LoadingSpinner text="Updating..." />
                    ) : (
                      <>
                        {apt.status !== 'completed' && apt.status !== 'in-progress' && (
                          <button
                            type="button"
                            onClick={() => handleStartConsultation(apt)}
                            className="bg-[#2563ff] hover:bg-blue-500 text-white font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-md inline-flex items-center space-x-1"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Start Consult</span>
                          </button>
                        )}

                        {apt.status === 'in-progress' && (
                          <button
                            type="button"
                            onClick={() => handleCompleteAppointment(apt.id)}
                            className="bg-[#10b981] hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-md inline-flex items-center space-x-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Complete</span>
                          </button>
                        )}

                        {apt.status !== 'completed' && (
                          <button
                            type="button"
                            onClick={() => {
                              setRescheduleApt(apt)
                              setNewDate(apt.appointmentDate)
                              setNewTime(apt.timeSlot)
                              setModalError('')
                            }}
                            className="bg-[#0b172a] hover:bg-[#0d1b33] text-[#cbd5e1] font-bold px-3 py-1.5 rounded-xl border border-[#162742] transition-all inline-flex items-center space-x-1"
                          >
                            <RefreshCcw className="w-3 h-3 text-[#94a3b8]" />
                            <span>Reschedule</span>
                          </button>
                        )}

                        {apt.status === 'completed' && (
                          <span className="text-[#64748b] font-semibold italic text-[11px]">
                            Completed {apt.completedAt ? `(${apt.completedAt})` : ''}
                          </span>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* RESCHEDULE MODAL */}
      {rescheduleApt && (
        <div className="fixed inset-0 z-50 bg-[#020817]/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#081225] rounded-3xl border border-[#162742] shadow-[0_8px_32px_rgba(2,8,23,0.8)] max-w-md w-full p-6 space-y-4 text-xs text-[#f8fafc]">
            <div className="flex items-center justify-between border-b border-[#162742] pb-3">
              <h3 className="font-extrabold text-white text-sm font-['Space_Grotesk']">
                Reschedule Appointment
              </h3>
              <button type="button" onClick={() => setRescheduleApt(null)} className="p-1.5 rounded-xl bg-[#0b172a] text-[#94a3b8] hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[#cbd5e1] font-medium">
              Rescheduling appointment for <strong className="text-[#3b82f6]">{rescheduleApt.patientName}</strong>
            </p>

            {modalError && (
              <div className="p-3 rounded-2xl bg-[#ef4444]/15 border border-[#ef4444]/25 text-[#ef4444] font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#ef4444]" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleRescheduleSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-[#cbd5e1] block mb-1">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-[#020817] border border-[#162742] rounded-2xl px-3.5 py-2 text-white font-medium focus:outline-none focus:border-[#2563ff]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#cbd5e1] block mb-1">New Time Slot</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-[#020817] border border-[#162742] rounded-2xl px-3.5 py-2 text-white font-medium focus:outline-none focus:border-[#2563ff]"
                  required
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#cbd5e1] block mb-1">Reason for Rescheduling</label>
                <textarea
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  placeholder="Provide reason for rescheduling..."
                  className="w-full bg-[#020817] border border-[#162742] rounded-2xl p-3 text-white focus:outline-none focus:border-[#2563ff] h-20 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setRescheduleApt(null)}
                  className="px-4 py-2 rounded-2xl bg-[#0b172a] text-[#cbd5e1] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2563ff] hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-2xl transition-all shadow-md"
                >
                  Save Rescheduled Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </GlassCard>
  )
}
