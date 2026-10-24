import React from 'react'
import { 
  Calendar, 
  FileText, 
  Pill, 
  TestTube, 
  Clock, 
  ArrowRight, 
  Stethoscope, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Eye,
  Sparkles,
  ShieldCheck
} from 'lucide-react'
import PatientNeonCard from '../common/PatientNeonCard'
import { Badge } from '../common/Badge'

export default function PatientDashboard({ 
  patientProfile = {}, 
  nextAppointment, 
  appointmentsCount = 0, 
  runningMedications = [],
  scheduledTests = [],
  patientDocuments = [],
  onSelectMenu, 
  onOpenTeleconsultation,
  onBookAppointmentClick
}) {
  const activeMeds = runningMedications.filter(m => m.patientName === patientProfile.name || !m.patientName || m.patientName === 'Eleanor Vance')
  const upcomingTests = scheduledTests.filter(t => t.patientName === patientProfile.name || !t.patientName || t.patientName === 'Eleanor Vance')
  const patientDocs = patientDocuments.filter(d => d.patientName === patientProfile.name || !d.patientName || d.patientName === 'Eleanor Vance')

  return (
    <div className="space-y-6 animate-in fade-in duration-200">

      {/* 1. HERO BANNER */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-md)',
          color: '#ffffff'
        }}
        className="p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(255, 255, 255, 0.18)', backdropFilter: 'blur(8px)', color: '#ffffff' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hospital Patient Portal</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">
              Welcome back, {patientProfile.name || 'Eleanor'}!
            </h1>
            
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-lg">
              View your active running medications, check scheduled clinical tests, access certified medical records, and connect with your doctors.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onBookAppointmentClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer shadow-md transition-all duration-150 hover:bg-slate-50 active:scale-95"
                style={{
                  background: '#ffffff',
                  color: '#1d4ed8',
                  border: '1px solid #ffffff',
                  whiteSpace: 'nowrap',
                  lineHeight: '1.25rem',
                  minHeight: '40px',
                  boxSizing: 'border-box'
                }}
              >
                <Calendar className="w-4 h-4 shrink-0" style={{ color: '#1d4ed8' }} />
                <span className="font-bold text-xs" style={{ color: '#1d4ed8' }}>Book Appointment</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectMenu('medications')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-all duration-150 hover:bg-white/15 active:scale-95 text-white"
                style={{
                  background: 'rgba(255, 255, 255, 0.14)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                  backdropFilter: 'blur(8px)',
                  whiteSpace: 'nowrap',
                  lineHeight: '1.25rem',
                  minHeight: '40px',
                  boxSizing: 'border-box'
                }}
              >
                <Pill className="w-4 h-4 shrink-0 text-white" />
                <span className="font-bold text-xs text-white">Running Medications ({activeMeds.length})</span>
              </button>
            </div>
          </div>

          {/* Right Hero Badge */}
          <div className="shrink-0 hidden md:block">
            <div className="w-40 h-36 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 flex flex-col items-center justify-center text-center space-y-2 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center border border-white/30 text-white">
                <Stethoscope className="w-7 h-7" />
              </div>
              <p className="text-xs font-extrabold text-white">OPD Care Active</p>
              <span className="text-[10px] text-teal-200 font-bold">EMR ID: PAT-1042</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STAT SUMMARY CARDS (4 FOCUSED CLINICAL CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Card 1: Next Appointment */}
        <PatientNeonCard 
          onClick={() => onSelectMenu('appointments')}
          className="p-5 cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-50)] text-[var(--brand-600)] flex items-center justify-center border border-[var(--brand-200)] group-hover:bg-[var(--brand-600)] group-hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <Badge variant={nextAppointment ? 'brand' : 'default'} size="sm">
              {nextAppointment ? 'Upcoming' : 'None'}
            </Badge>
          </div>
          <div>
            <h3 className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Next Appointment</h3>
            <p className="text-sm font-bold truncate mt-0.5" style={{ color: 'var(--text-primary)' }}>
              {nextAppointment ? nextAppointment.doctorName : 'No Active Booking'}
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
              {nextAppointment ? `${nextAppointment.appointmentDate} • ${nextAppointment.timeSlot}` : 'Click to schedule a visit'}
            </p>
          </div>
        </PatientNeonCard>

        {/* Card 2: Running Medications */}
        <PatientNeonCard 
          onClick={() => onSelectMenu('medications')}
          className="p-5 cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Pill className="w-5 h-5" />
            </div>
            <Badge variant="success" size="sm">Active</Badge>
          </div>
          <div>
            <h3 className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Running Medications</h3>
            <p className="text-lg font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
              {activeMeds.length} Active Prescriptions
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
              Daily dosage regimen tracked
            </p>
          </div>
        </PatientNeonCard>

        {/* Card 3: Scheduled Tests */}
        <PatientNeonCard 
          onClick={() => onSelectMenu('scheduled-tests')}
          className="p-5 cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <TestTube className="w-5 h-5" />
            </div>
            <Badge variant="brand" size="sm">Laboratory</Badge>
          </div>
          <div>
            <h3 className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Scheduled Tests</h3>
            <p className="text-lg font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
              {upcomingTests.length} Pending Lab Orders
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
              Pathology & Diagnostics
            </p>
          </div>
        </PatientNeonCard>

        {/* Card 4: Medical Documents */}
        <PatientNeonCard 
          onClick={() => onSelectMenu('documents')}
          className="p-5 cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <Badge variant="brand" size="sm">EMR Vault</Badge>
          </div>
          <div>
            <h3 className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Medical Documents</h3>
            <p className="text-lg font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
              {patientDocs.length} Verified Files
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
              Clinical notes, scans & Rx
            </p>
          </div>
        </PatientNeonCard>

      </div>

      {/* 3. TWO COLUMN CLINICAL HIGHLIGHTS: RUNNING MEDICATIONS + SCHEDULED TESTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Column 1: Running Medications Schedule */}
        <div 
          className="p-6 rounded-2xl space-y-4"
          style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
        >
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Pill size={16} />
              </div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Running Medications (Active)</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Prescribed daily medicine timings and dosages</p>
              </div>
            </div>
            <button
              onClick={() => onSelectMenu('medications')}
              className="text-xs font-bold text-[var(--brand-600)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {activeMeds.slice(0, 3).map(med => (
              <div
                key={med.id}
                className="p-3.5 rounded-xl border flex items-center justify-between gap-3"
                style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}
              >
                <div className="space-y-0.5">
                  <p className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>{med.medicineName}</p>
                  <p className="text-[11px] text-[var(--text-muted)]">{med.dosage} • {med.frequency}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">{med.instructions}</p>
                </div>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Scheduled Diagnostic Tests */}
        <div 
          className="p-6 rounded-2xl space-y-4"
          style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
        >
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <TestTube size={16} />
              </div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Scheduled Clinical Tests</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Upcoming laboratory visits and test requirements</p>
              </div>
            </div>
            <button
              onClick={() => onSelectMenu('scheduled-tests')}
              className="text-xs font-bold text-[var(--brand-600)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingTests.slice(0, 3).map(test => (
              <div
                key={test.id}
                className="p-3.5 rounded-xl border flex items-start justify-between gap-3"
                style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}
              >
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>{test.testName}</p>
                    {test.priority === 'Urgent' && <Badge variant="danger" size="sm">Urgent</Badge>}
                  </div>
                  <p className="text-[11px] text-[var(--brand-600)] font-semibold">{test.department}</p>
                  <p className="text-[10px] font-mono text-[var(--text-muted)]">{test.scheduledDate} • {test.timeSlot}</p>
                  <div className="text-[10px] font-medium text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 inline-block leading-normal">
                    {test.preparation}
                  </div>
                </div>
                <Badge variant={test.status === 'Completed' ? 'success' : 'brand'} size="sm">{test.status}</Badge>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. RECENT CLINICAL DOCUMENTS & E-PRESCRIPTIONS */}
      <div 
        className="p-6 rounded-2xl space-y-4"
        style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
      >
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText size={16} />
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Recent Clinical Documents & Official Prescriptions</h3>
              <p className="text-[11px] text-[var(--text-muted)]">Verified files uploaded by attending doctors and hospital specialists</p>
            </div>
          </div>
          <button
            onClick={() => onSelectMenu('documents')}
            className="text-xs font-bold text-[var(--brand-600)] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Document Vault</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="divide-y text-xs" style={{ borderColor: 'var(--border-light)' }}>
          {patientDocs.slice(0, 3).map(doc => (
            <div key={doc.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--brand-50)', color: 'var(--brand-600)' }}
                >
                  <FileText size={16} />
                </div>
                <div>
                  <p className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>{doc.title}</p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {doc.category} • Issued by {doc.doctorName} • {doc.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="brand" size="sm">{doc.category}</Badge>
                <button
                  type="button"
                  onClick={() => alert(`Opening ${doc.title}...`)}
                  className="px-3 py-1.5 rounded-xl font-bold border text-[var(--brand-700)] hover:bg-[var(--brand-50)] transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--border-light)' }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
