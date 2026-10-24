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
    <GlassCard className="p-4 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] font-['Space_Grotesk'] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" /> Today's Appointment Queue & Telehealth
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5 font-medium">Manage patient queue, launch telehealth video rooms, reschedule slots, and complete consultations.</p>
        </div>

        {/* Real-time Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient name or symptoms..."
            className="w-full bg-[var(--surface-page)] border border-[var(--border-light)] rounded-2xl pl-9 pr-3 py-1.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[var(--surface-page)] p-3.5 rounded-2xl border border-[var(--border-light)]">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="font-bold text-[var(--text-primary)]">Status:</span>
          {['All', 'Approved', 'In-Progress', 'Pending', 'Completed'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                filterStatus === status 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-[var(--surface-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-light)]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-bold text-[var(--text-primary)]">Dept:</span>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="bg-[var(--surface-card)] border border-[var(--border-light)] rounded-xl px-3 py-1 font-semibold text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Neurology">Neurology</option>
          </select>
        </div>
      </div>

      {/* Table Layout */}
      <div className="overflow-x-auto rounded-2xl border border-[var(--border-light)]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--surface-page)] text-[var(--text-muted)] uppercase tracking-wider font-semibold border-b border-[var(--border-light)]">
            <tr>
              <th className="py-3 px-4">Patient Name</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Chief Complaints</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border-light)] text-[var(--text-primary)] font-medium">
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-[var(--text-muted)]">
                  No appointments found matching current filter criteria.
                </td>
              </tr>
            ) : (
              filteredAppointments.map(apt => (
                <tr key={apt.id} className="hover:bg-[var(--surface-page)]/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[var(--text-primary)] flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 font-extrabold flex items-center justify-center text-xs border border-blue-500/25 shrink-0">
                      {apt.patientName.charAt(0)}
                    </div>
                    <div>
                      <p>{apt.patientName}</p>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">{apt.id}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-[var(--text-primary)]">
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      {apt.appointmentDate} • {apt.timeSlot}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-[var(--text-muted)]">{apt.department || 'Cardiology'}</td>

                  <td className="py-3.5 px-4 max-w-xs truncate text-[var(--text-muted)]" title={apt.symptoms}>
                    {apt.symptoms || 'General Checkup'}
                  </td>

                  <td className="py-3.5 px-4">
                    {apt.status === 'in-progress' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/25 font-bold text-[10px] uppercase shadow-sm animate-pulse">
                        In Progress
                      </span>
                    )}
                    {apt.status === 'approved' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-500/25 font-bold text-[10px] uppercase">
                        Scheduled
                      </span>
                    )}
                    {apt.status === 'pending' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 font-bold text-[10px] uppercase">
                        Pending
                      </span>
                    )}
                    {apt.status === 'completed' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-bold text-[10px] uppercase">
                        Completed
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                    {loadingId === apt.id ? (
                      <LoadingSpinner text="Updating..." />
                    ) : (
                      <>
                        {apt.status !== 'completed' && apt.status !== 'in-progress' && (
                          <button
                            type="button"
                            onClick={() => handleStartConsultation(apt)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm inline-flex items-center space-x-1"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Start Consult</span>
                          </button>
                        )}

                        {apt.status === 'in-progress' && (
                          <button
                            type="button"
                            onClick={() => handleCompleteAppointment(apt.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm inline-flex items-center space-x-1"
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
                            className="bg-[var(--surface-page)] hover:bg-[var(--border-light)] text-[var(--text-primary)] font-bold px-2.5 py-1.5 rounded-xl border border-[var(--border-light)] transition-all inline-flex items-center space-x-1"
                          >
                            <RefreshCcw className="w-3 h-3 text-[var(--text-muted)]" />
                            <span>Reschedule</span>
                          </button>
                        )}

                        {apt.status === 'completed' && (
                          <span className="text-[var(--text-muted)] font-semibold italic text-[11px]">
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[var(--surface-card)] rounded-3xl border border-[var(--border-light)] shadow-2xl max-w-md w-full p-6 space-y-4 text-xs text-[var(--text-primary)]">
            <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-3">
              <h3 className="font-extrabold text-[var(--text-primary)] text-sm font-['Space_Grotesk']">
                Reschedule Appointment
              </h3>
              <button type="button" onClick={() => setRescheduleApt(null)} className="p-1.5 rounded-xl bg-[var(--surface-page)] text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[var(--text-muted)] font-medium">
              Rescheduling appointment for <strong className="text-blue-600 dark:text-blue-400">{rescheduleApt.patientName}</strong>
            </p>

            {modalError && (
              <div className="p-3 rounded-2xl bg-red-500/15 border border-red-500/25 text-red-600 dark:text-red-400 font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleRescheduleSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-[var(--text-primary)] block mb-1">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-[var(--surface-page)] border border-[var(--border-light)] rounded-2xl px-3.5 py-2 text-[var(--text-primary)] font-medium focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[var(--text-primary)] block mb-1">New Time Slot</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-[var(--surface-page)] border border-[var(--border-light)] rounded-2xl px-3.5 py-2 text-[var(--text-primary)] font-medium focus:outline-none focus:border-blue-500"
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
                <label className="font-bold text-[var(--text-primary)] block mb-1">Reason for Rescheduling</label>
                <textarea
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  placeholder="Provide reason for rescheduling..."
                  className="w-full bg-[var(--surface-page)] border border-[var(--border-light)] rounded-2xl p-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 h-20 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setRescheduleApt(null)}
                  className="px-4 py-2 rounded-2xl bg-[var(--surface-page)] text-[var(--text-muted)] hover:text-[var(--text-primary)] font-bold border border-[var(--border-light)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-2xl transition-all shadow-sm"
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


