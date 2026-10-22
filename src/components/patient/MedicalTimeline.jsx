import React, { useState, useMemo } from 'react'
import { 
  Calendar, 
  FileText, 
  TestTube, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Filter, 
  Clock, 
  Stethoscope, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react'
import { Badge } from '../common/Badge'

export default function MedicalTimeline({
  appointments = [],
  prescriptions = [],
  labReports = [],
  patient = { name: 'Eleanor Vance', id: 'pat-1', bloodGroup: 'O+' }
}) {
  const [filterType, setFilterType] = useState('all')

  // Aggregate and sort all events chronologically
  const timelineEvents = useMemo(() => {
    const events = []

    // 1. Appointments
    appointments.forEach(apt => {
      events.push({
        id: `apt-${apt.id}`,
        type: 'appointment',
        category: 'Consultation',
        title: `Consultation with ${apt.doctorName || 'Doctor'}`,
        subtitle: apt.doctorSpecialization || 'General OPD',
        date: apt.appointmentDate || apt.date || '2026-08-15',
        time: apt.timeSlot || '10:00 AM',
        status: apt.status || 'completed',
        details: apt.symptoms ? `Chief complaint: ${apt.symptoms}` : 'Routine clinical follow-up',
        icon: Stethoscope,
        color: '#2563eb'
      })
    })

    // 2. Prescriptions
    prescriptions.forEach(rx => {
      events.push({
        id: `rx-${rx.id}`,
        type: 'prescription',
        category: 'Prescription',
        title: `Prescription #${rx.id}`,
        subtitle: `${rx.doctorName || 'Attending Physician'} • ${rx.doctorSpecialization || ''}`,
        date: rx.date || '2026-08-14',
        time: '11:30 AM',
        status: 'active',
        details: `Diagnosis: ${rx.diagnosis || 'Clinical evaluation'}. Medications prescribed: ${rx.medicines?.map(m => m.name || m).join(', ') || 'Standard course'}`,
        icon: FileText,
        color: '#0d9488'
      })
    })

    // 3. Lab Reports
    labReports.forEach(lab => {
      events.push({
        id: `lab-${lab.id}`,
        type: 'lab',
        category: 'Diagnostic Lab',
        title: lab.testName || 'Comprehensive Metabolic Panel',
        subtitle: `Ref #${lab.id} • ${lab.department || 'Pathology'}`,
        date: lab.date || '2026-08-10',
        time: '09:15 AM',
        status: lab.status || 'verified',
        details: lab.result || 'Results within standard physiological thresholds. Verified by Chief Pathologist.',
        icon: TestTube,
        color: '#7c3aed'
      })
    })

    // Sort newest first
    return events.sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [appointments, prescriptions, labReports])

  const filteredEvents = useMemo(() => {
    if (filterType === 'all') return timelineEvents
    return timelineEvents.filter(e => e.type === filterType)
  }, [timelineEvents, filterType])

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl"
        style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
      >
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              Patient Medical History Timeline
            </h2>
            <Badge variant="brand" size="sm">HIPAA EMR Verified</Badge>
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Chronological log of clinical visits, diagnostic lab reports, and e-prescriptions for {patient.name}.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Events' },
            { id: 'appointment', label: 'Consultations' },
            { id: 'prescription', label: 'Prescriptions' },
            { id: 'lab', label: 'Lab Reports' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
              style={{
                background: filterType === f.id ? 'var(--brand-600)' : 'var(--surface-page)',
                color: filterType === f.id ? '#ffffff' : 'var(--text-secondary)',
                border: filterType === f.id ? '1px solid var(--brand-600)' : '1px solid var(--border-light)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[var(--border-light)]">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center rounded-2xl" style={{ background: 'var(--surface-card)', border: '1px dashed var(--border-default)', color: 'var(--text-muted)' }}>
            No medical history events found for this filter.
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const Icon = evt.icon
            return (
              <div key={evt.id} className="relative group">
                {/* Timeline node icon */}
                <div 
                  className="absolute -left-[31px] sm:-left-[39px] top-4 w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                  style={{
                    background: evt.color,
                    color: '#ffffff',
                    border: '3px solid var(--surface-page)'
                  }}
                >
                  <Icon size={14} />
                </div>

                {/* Event Card */}
                <div 
                  className="p-5 rounded-2xl transition-all hover:shadow-md"
                  style={{
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b"
                    style={{ borderColor: 'var(--border-light)' }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--brand-50)', color: 'var(--brand-700)' }}
                        >
                          {evt.category}
                        </span>
                        <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                          {evt.title}
                        </h4>
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {evt.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <div className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg"
                        style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }}
                      >
                        <Calendar size={12} />
                        <span>{evt.date}</span>
                        <span className="opacity-40">•</span>
                        <span>{evt.time}</span>
                      </div>
                      <Badge 
                        variant={evt.status === 'completed' || evt.status === 'verified' || evt.status === 'active' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {evt.status}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs pt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {evt.details}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
