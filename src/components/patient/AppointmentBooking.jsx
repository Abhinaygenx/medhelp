import React, { useState, useMemo } from 'react'
import { 
  Calendar, 
  Clock, 
  Stethoscope, 
  Search, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  User, 
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { Badge } from '../common/Badge'
import toast from 'react-hot-toast'

const TIME_SLOTS = {
  morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:15 AM'],
  afternoon: ['01:30 PM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM'],
  evening: ['05:00 PM', '05:45 PM', '06:30 PM', '07:15 PM']
}

export default function AppointmentBooking({ 
  doctors = [], 
  onBookAppointment,
  onBookingComplete 
}) {
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || '')
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  })
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM')
  const [symptoms, setSymptoms] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpec, setSelectedSpec] = useState('All')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const specialties = useMemo(() => {
    const set = new Set(doctors.map(d => d.specialization).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [doctors])

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (doc.specialization || '').toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSpec = selectedSpec === 'All' || doc.specialization === selectedSpec
      return matchesSearch && matchesSpec
    })
  }, [doctors, searchQuery, selectedSpec])

  const activeDoctor = useMemo(() => {
    return doctors.find(d => d.id === selectedDoctorId) || doctors[0]
  }, [doctors, selectedDoctorId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!activeDoctor || !selectedDate || !selectedSlot || !symptoms.trim()) {
      toast.error('Please complete all required fields')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      onBookAppointment({
        doctorId: activeDoctor.id,
        doctorName: activeDoctor.name,
        doctorSpecialization: activeDoctor.specialization,
        appointmentDate: selectedDate,
        timeSlot: selectedSlot,
        symptoms: symptoms.trim()
      })
      setIsSubmitting(false)
      toast.success(`Consultation booked with ${activeDoctor.name} on ${selectedDate} at ${selectedSlot}!`, {
        icon: '📅'
      })
      if (onBookingComplete) onBookingComplete()
    }, 400)
  }

  return (
    <div className="space-y-6">
      {/* Step Banner */}
      <div 
        className="p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{
          background: 'linear-gradient(135deg, var(--brand-700) 0%, var(--brand-900) 100%)',
          color: '#ffffff'
        }}
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
          >
            <Sparkles size={14} />
            <span>Interactive Scheduling</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">
            Book an Online Medical Consultation
          </h2>
          <p className="text-xs text-blue-100 max-w-xl">
            Choose your specialist, pick your preferred date & time slot, and enter your chief medical complaint.
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-2xl font-black">{doctors.length}</span>
          <p className="text-xs text-blue-200">Specialists On Duty</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Doctor Selection (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl space-y-4"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Stethoscope size={16} className="text-[var(--brand-600)]" />
                1. Select Specialist
              </h3>
              <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                {filteredDoctors.length} available
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]" />
              <input
                type="text"
                placeholder="Search by doctor or specialty..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                style={{
                  background: 'var(--surface-page)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {/* Specialty filter pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {specialties.map(spec => (
                <button
                  type="button"
                  key={spec}
                  onClick={() => setSelectedSpec(spec)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-all"
                  style={{
                    background: selectedSpec === spec ? 'var(--brand-600)' : 'var(--surface-page)',
                    color: selectedSpec === spec ? '#ffffff' : 'var(--text-muted)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  {spec}
                </button>
              ))}
            </div>

            {/* Doctor Radio List */}
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {filteredDoctors.map(doc => {
                const isSelected = doc.id === selectedDoctorId
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className="p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between"
                    style={{
                      background: isSelected ? 'var(--brand-50)' : 'var(--surface-page)',
                      border: isSelected ? '2px solid var(--brand-600)' : '1px solid var(--border-light)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.avatar || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80"}
                        alt={doc.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>{doc.name}</p>
                          {doc.isVerified && <ShieldCheck size={13} className="text-teal-600" />}
                        </div>
                        <p className="text-[11px] text-[var(--brand-600)] font-semibold">{doc.specialization}</p>
                        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{doc.experienceYears || '10'} yrs exp • ${doc.consultationFee || '120'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 text-[11px] font-bold text-amber-500">
                        <Star size={12} className="fill-amber-400" />
                        <span>{doc.rating || '4.9'}</span>
                      </div>
                      <div 
                        className="w-4 h-4 rounded-full flex items-center justify-center border"
                        style={{
                          borderColor: isSelected ? 'var(--brand-600)' : 'var(--border-default)',
                          background: isSelected ? 'var(--brand-600)' : 'transparent'
                        }}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Date, Slot & Symptoms (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl space-y-5"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
          >
            {/* 2. Choose Date */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Calendar size={16} className="text-[var(--brand-600)]" />
                  2. Choose Consultation Date
                </h3>
                <span className="text-xs font-mono font-semibold text-[var(--brand-600)]">
                  {selectedDate}
                </span>
              </div>

              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                style={{
                  background: 'var(--surface-page)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)'
                }}
                required
              />
            </div>

            {/* 3. Choose Time Slot */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Clock size={16} className="text-[var(--brand-600)]" />
                  3. Select Time Slot
                </h3>
                <span className="text-xs font-mono font-semibold text-[var(--brand-600)]">
                  Selected: {selectedSlot}
                </span>
              </div>

              {/* Slot categories */}
              <div className="space-y-3">
                {Object.entries(TIME_SLOTS).map(([period, slots]) => (
                  <div key={period} className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      {period}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {slots.map(slot => {
                        const isSelected = selectedSlot === slot
                        return (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className="py-2 px-2 text-center text-xs font-semibold rounded-xl cursor-pointer transition-all"
                            style={{
                              background: isSelected ? 'var(--brand-600)' : 'var(--surface-page)',
                              color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                              border: isSelected ? '1px solid var(--brand-600)' : '1px solid var(--border-light)',
                              boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                            }}
                          >
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Symptoms / Notes */}
            <div>
              <h3 className="font-bold text-sm flex items-center gap-2 mb-2" style={{ color: 'var(--text-primary)' }}>
                <AlertCircle size={16} className="text-[var(--brand-600)]" />
                4. Symptoms & Chief Complaints
              </h3>
              <textarea
                value={symptoms}
                onChange={e => setSymptoms(e.target.value)}
                rows={3}
                placeholder="Describe your current symptoms, pain location, duration, and any existing medications..."
                className="w-full p-3 text-xs rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                style={{
                  background: 'var(--surface-page)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)'
                }}
                required
              />
            </div>

            {/* Review & Submit */}
            <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ borderColor: 'var(--border-light)' }}
            >
              <div className="text-xs">
                <span style={{ color: 'var(--text-muted)' }}>Consultation Fee:</span>
                <span className="ml-2 font-extrabold text-base text-[var(--brand-600)]">
                  ${activeDoctor?.consultationFee || '120'}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] ml-1">(Includes Video Call & Rx)</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:opacity-90 disabled:opacity-50"
                style={{
                  background: 'var(--brand-600)',
                  color: '#ffffff',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                {isSubmitting ? (
                  <span>Booking slot…</span>
                ) : (
                  <>
                    <span>Confirm Consultation</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
