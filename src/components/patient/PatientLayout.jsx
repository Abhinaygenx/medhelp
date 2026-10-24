import React, { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PatientSidebar from './PatientSidebar'
import PatientHeader from './PatientHeader'
import PatientDashboard from './PatientDashboard'
import AppointmentBooking from './AppointmentBooking'
import MedicalTimeline from './MedicalTimeline'
import RunningMedications from './RunningMedications'
import ScheduledTests from './ScheduledTests'
import PatientDocuments from './PatientDocuments'

import EmergencyAlertBanner from '../EmergencyAlertBanner'
import PatientNeonCard from '../common/PatientNeonCard'
import InvoiceModal from '../common/InvoiceModal'
import { Badge } from '../common/Badge'
import { 
  Activity, 
  AlertTriangle, 
  Settings, 
  FileText, 
  CreditCard,
  Calendar, 
  Info, 
  User, 
  CheckCircle2, 
  Sparkles,
  Download,
  Pill,
  TestTube,
  Clock,
  Video
} from 'lucide-react'

export default function PatientLayout({ 
  doctors = [], 
  appointments = [], 
  prescriptions = [], 
  patients = [], 
  bills = [],
  labReports = [],
  notifications = [], 
  runningMedications = [],
  scheduledTests = [],
  patientDocuments = [],
  onBookAppointment, 
  onOpenTeleconsultation, 
  onViewPrescription, 
  onLogout 
}) {
  const location = useLocation()
  const navigate = useNavigate()

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeInvoice, setActiveInvoice] = useState(null)

  // Derive active menu id from URL location path
  const activeMenu = useMemo(() => {
    const path = location.pathname.replace('/patient/', '').replace('/patient', '')
    if (!path || path === 'dashboard') return 'dashboard'
    return path
  }, [location.pathname])

  const handleSelectMenu = (menuId) => {
    const targetPath = `/patient/${menuId}`
    if (location.pathname !== targetPath) {
      navigate(targetPath)
    }
  }

  const patientProfile = patients[0] || {
    name: 'Eleanor Vance',
    email: 'eleanor.vance@medhelp.health',
    bloodGroup: 'O+',
    allergies: 'Penicillin, Peanuts'
  }

  const nextAppointment = useMemo(() => {
    return appointments.find(a => a.status === 'approved' || a.status === 'pending') || null
  }, [appointments])

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        background: 'var(--surface-page)', 
        color: 'var(--text-primary)',
        display: 'flex' 
      }}
    >
      {/* 1. Sidebar */}
      <PatientSidebar
        activeMenu={activeMenu}
        onSelectMenu={handleSelectMenu}
        onLogout={onLogout}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Viewport */}
      <div className="flex-1 lg:ml-[260px] min-h-screen flex flex-col transition-all">
        {/* Header */}
        <PatientHeader
          patientName={patientProfile.name}
          patientRole="Patient"
          avatarUrl={patientProfile.avatar}
          notifications={notifications}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onLogout={onLogout}
        />

        {/* Dynamic Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <EmergencyAlertBanner currentRole="patient" />

          {/* DASHBOARD */}
          {activeMenu === 'dashboard' && (
            <PatientDashboard
              patientProfile={patientProfile}
              nextAppointment={nextAppointment}
              appointmentsCount={appointments.length}
              runningMedications={runningMedications}
              scheduledTests={scheduledTests}
              patientDocuments={patientDocuments}
              onSelectMenu={handleSelectMenu}
              onOpenTeleconsultation={onOpenTeleconsultation}
              onBookAppointmentClick={() => handleSelectMenu('appointments')}
            />
          )}

          {/* APPOINTMENT BOOKING WITH TIME SLOTS */}
          {activeMenu === 'appointments' && (
            <div className="space-y-6">
              <AppointmentBooking
                doctors={doctors}
                onBookAppointment={onBookAppointment}
                onBookingComplete={() => {}}
              />

              {/* Consultation History */}
              <PatientNeonCard className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Your Consultation History</h3>
                    <p className="text-xs text-[var(--text-muted)]">Past appointments, scheduled video slots, and clinical reviews</p>
                  </div>
                  <Badge variant="brand" size="sm">{appointments.length} Consultations</Badge>
                </div>

                {appointments.length === 0 ? (
                  <div className="text-center py-8 space-y-2">
                    <Calendar className="w-8 h-8 mx-auto text-[var(--text-muted)] opacity-60" />
                    <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>No consultation history found.</p>
                  </div>
                ) : (
                  <div className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
                    {appointments.map((apt) => {
                      const isApproved = apt.status === 'approved'
                      const isCompleted = apt.status === 'completed'
                      const isPending = apt.status === 'pending'
                      
                      return (
                        <div key={apt.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--surface-page)] transition-colors px-3 rounded-xl">
                          <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-[var(--brand-50)] text-[var(--brand-600)] dark:bg-[var(--brand-950)]/40 dark:text-[var(--brand-400)] border border-[var(--brand-200)]/60 font-bold flex items-center justify-center shrink-0 text-xs">
                              {apt.doctorName ? apt.doctorName.replace('Dr. ', '').slice(0, 2).toUpperCase() : 'DR'}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                                  {apt.doctorName || 'Assigned Specialist'}
                                </h4>
                                {isApproved && <Badge variant="success" size="sm">Approved & Ready</Badge>}
                                {isPending && <Badge variant="warning" size="sm">Pending Review</Badge>}
                                {isCompleted && <Badge variant="info" size="sm">Completed</Badge>}
                                {apt.status === 'cancelled' && <Badge variant="danger" size="sm">Cancelled</Badge>}
                              </div>
                              <p className="text-xs font-medium text-[var(--brand-600)]">{apt.doctorSpecialization || 'Clinical Consultation'}</p>
                              
                              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[var(--text-muted)]">
                                <span className="flex items-center gap-1 font-medium">
                                  <Calendar className="w-3.5 h-3.5" /> {apt.appointmentDate}
                                </span>
                                <span className="flex items-center gap-1 font-medium">
                                  <Clock className="w-3.5 h-3.5" /> {apt.timeSlot}
                                </span>
                                {apt.reason && (
                                  <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--surface-page)] border border-[var(--border-light)]">
                                    {apt.reason}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            {isApproved && (
                              <button
                                type="button"
                                onClick={() => onOpenTeleconsultation(apt)}
                                className="font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 text-white shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                                style={{ background: 'var(--brand-600)' }}
                              >
                                <Video className="w-3.5 h-3.5" />
                                <span>Join Video Consult</span>
                              </button>
                            )}
                            {isCompleted && (
                              <button
                                type="button"
                                onClick={() => handleSelectMenu('documents')}
                                className="font-semibold px-3.5 py-2 rounded-xl text-xs border flex items-center gap-1.5 cursor-pointer hover:bg-[var(--surface-page)] transition-all"
                                style={{
                                  background: 'var(--surface-card)',
                                  borderColor: 'var(--border-default)',
                                  color: 'var(--text-primary)'
                                }}
                              >
                                <FileText className="w-3.5 h-3.5 text-[var(--brand-600)]" />
                                <span>Records & Rx</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </PatientNeonCard>
            </div>
          )}

          {/* RUNNING MEDICATIONS */}
          {activeMenu === 'medications' && (
            <RunningMedications medications={runningMedications} />
          )}

          {/* SCHEDULED CLINICAL TESTS */}
          {activeMenu === 'scheduled-tests' && (
            <ScheduledTests tests={scheduledTests} />
          )}

          {/* MEDICAL DOCUMENTS & PRESCRIPTIONS VAULT */}
          {(activeMenu === 'documents' || activeMenu === 'medical-records') && (
            <PatientDocuments 
              documents={patientDocuments} 
              prescriptions={prescriptions} 
            />
          )}

          {/* MEDICAL TIMELINE */}
          {activeMenu === 'timeline' && (
            <MedicalTimeline
              appointments={appointments}
              prescriptions={prescriptions}
              labReports={labReports}
              patient={patientProfile}
            />
          )}

          {/* BILLING & INVOICES */}
          {activeMenu === 'billing' && (
            <PatientNeonCard className="p-6 space-y-6">
              <div className="border-b pb-4 flex items-center justify-between" style={{ borderColor: 'var(--border-light)' }}>
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <CreditCard className="w-5 h-5 text-[var(--brand-600)]" /> Patient Billing, Invoices & Claims
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">View hospital invoices generated for OPD consultations, pharmacy, and hospital stays.</p>
                </div>
                <Badge variant="brand" size="md">{bills.length} Invoices</Badge>
              </div>

              <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--border-light)' }}>
                <table className="w-full text-left text-xs">
                  <thead style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }} className="uppercase font-semibold border-b">
                    <tr>
                      <th className="py-3.5 px-4">Invoice ID & Date</th>
                      <th className="py-3.5 px-4">Service Rendered</th>
                      <th className="py-3.5 px-4">Amount ($)</th>
                      <th className="py-3.5 px-4">Payment Status</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
                    {bills.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-xs text-[var(--text-muted)]">
                          No hospital invoices generated yet.
                        </td>
                      </tr>
                    ) : (
                      bills.map(bill => (
                        <tr key={bill.id} className="hover:bg-[var(--brand-50)] transition-colors">
                          <td className="py-4 px-4 font-bold text-[var(--brand-600)]">
                            <p>#{bill.id}</p>
                            <span className="text-[10px] text-[var(--text-muted)] font-mono">{bill.date}</span>
                          </td>
                          <td className="py-4 px-4 font-medium" style={{ color: 'var(--text-primary)' }}>{bill.service}</td>
                          <td className="py-4 px-4 font-extrabold text-[var(--brand-600)]">${bill.amount}</td>
                          <td className="py-4 px-4">
                            <Badge variant={bill.status === 'Paid' ? 'success' : 'warning'} size="sm">
                              {bill.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => setActiveInvoice(bill)}
                              className="px-3 py-1.5 rounded-xl font-bold border inline-flex items-center space-x-1.5 cursor-pointer hover:bg-[var(--brand-50)] transition-colors"
                              style={{
                                background: 'var(--surface-card)',
                                color: 'var(--brand-700)',
                                borderColor: 'var(--border-light)'
                              }}
                            >
                              <Download size={13} />
                              <span>PDF Invoice</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </PatientNeonCard>
          )}

          {/* PROFILE */}
          {activeMenu === 'profile' && (
            <PatientNeonCard className="p-6 space-y-6">
              <div className="border-b pb-4" style={{ borderColor: 'var(--border-light)' }}>
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <User className="w-5 h-5 text-[var(--brand-600)]" /> Patient Profile & EMR Details
                </h2>
                <p className="text-xs text-[var(--text-muted)]">Verified electronic medical record details and clinical notes.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl border" style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}>
                  <span className="text-[var(--text-muted)] font-medium">Patient Name</span>
                  <p className="font-bold text-sm mt-0.5" style={{ color: 'var(--text-primary)' }}>{patientProfile.name}</p>
                </div>
                <div className="p-4 rounded-2xl border" style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}>
                  <span className="text-[var(--text-muted)] font-medium">Registered Email</span>
                  <p className="font-bold text-sm mt-0.5" style={{ color: 'var(--text-primary)' }}>{patientProfile.email}</p>
                </div>
                <div className="p-4 rounded-2xl border" style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}>
                  <span className="text-[var(--text-muted)] font-medium">Blood Group</span>
                  <p className="font-bold text-sm mt-0.5 text-[var(--brand-600)]">{patientProfile.bloodGroup || 'O+'}</p>
                </div>
                <div className="p-4 rounded-2xl border" style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}>
                  <span className="text-[var(--text-muted)] font-medium">Known Allergies</span>
                  <p className="font-bold text-sm mt-0.5 text-amber-600">{patientProfile.allergies}</p>
                </div>
              </div>
            </PatientNeonCard>
          )}

          {/* EMERGENCY ALERTS */}
          {activeMenu === 'emergency-alerts' && (
            <PatientNeonCard className="p-6 space-y-6">
              <div className="border-b pb-4 flex items-center justify-between" style={{ borderColor: 'var(--border-light)' }}>
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2 text-red-600">
                    <AlertTriangle className="w-5 h-5 text-red-600" /> Emergency Alerts & Response Monitor
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">Real-time critical triage hotline with 5-minute response SLA guarantees.</p>
                </div>
                <Badge variant="danger" size="md">Priority SLA Active</Badge>
              </div>

              <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-xs space-y-3">
                <h4 className="font-bold text-red-800 text-sm">Need Urgent Emergency Care?</h4>
                <p className="text-red-700 leading-relaxed">If you are experiencing severe chest pain, extreme shortness of breath, sudden numbness, or loss of consciousness, please immediately dial local emergency services (911 / 108) or click below to trigger immediate hospital ER alert dispatch.</p>
                <button
                  onClick={() => alert('Emergency dispatch notification sent to hospital ER team!')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs cursor-pointer"
                >
                  Trigger Hospital ER Escalation
                </button>
              </div>
            </PatientNeonCard>
          )}

          {/* CLINICAL GUIDELINES */}
          {activeMenu === 'health-information' && (
            <PatientNeonCard className="p-6 space-y-6">
              <div className="border-b pb-4" style={{ borderColor: 'var(--border-light)' }}>
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Info className="w-5 h-5 text-[var(--brand-600)]" /> Patient Health Information & Guidelines
                </h2>
                <p className="text-xs text-[var(--text-muted)]">Official medical advice, preventive guidelines, and clinical emergency SOPs.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl space-y-2 border" style={{ background: 'var(--brand-50)', borderColor: 'var(--brand-200)' }}>
                  <h4 className="font-bold text-[var(--brand-700)]">Cardiology Guidelines</h4>
                  <p className="text-[var(--text-secondary)]">Maintain daily physical activity of 30+ mins, keep sodium under 2g/day, monitor resting heart rate.</p>
                </div>
                <div className="p-5 rounded-2xl space-y-2 border bg-emerald-50 border-emerald-200">
                  <h4 className="font-bold text-emerald-800">Nutrition & Hydration</h4>
                  <p className="text-emerald-950">Drink at least 2.5L water daily. Balanced intake of lean proteins, fiber, and antioxidant-rich foods.</p>
                </div>
                <div className="p-5 rounded-2xl space-y-2 border bg-teal-50 border-teal-200">
                  <h4 className="font-bold text-teal-800">Medication Adherence</h4>
                  <p className="text-teal-950">Always complete antibiotic courses as prescribed. Report any adverse reactions immediately.</p>
                </div>
              </div>
            </PatientNeonCard>
          )}

          {/* SETTINGS */}
          {activeMenu === 'settings' && (
            <PatientNeonCard className="p-6 space-y-6">
              <div className="border-b pb-4" style={{ borderColor: 'var(--border-light)' }}>
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Settings className="w-5 h-5 text-[var(--brand-600)]" /> Portal Settings & Preferences
                </h2>
                <p className="text-xs text-[var(--text-muted)]">Configure notification alerts, privacy preferences, and security settings.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl border flex items-center justify-between"
                  style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}
                >
                  <div>
                    <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Email & SMS Appointment Reminders</p>
                    <p className="text-[11px] text-[var(--text-muted)]">Receive automated alerts 24 hours prior to scheduled consultations</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[var(--brand-600)] rounded" />
                </div>

                <div className="p-4 rounded-2xl border flex items-center justify-between"
                  style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}
                >
                  <div>
                    <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Prescription & Lab Result Notifications</p>
                    <p className="text-[11px] text-[var(--text-muted)]">Get notified immediately when test results or prescriptions are uploaded</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[var(--brand-600)] rounded" />
                </div>
              </div>
            </PatientNeonCard>
          )}
        </main>
      </div>

      {/* Invoice Modal for Printable PDF */}
      {activeInvoice && (
        <InvoiceModal bill={activeInvoice} onClose={() => setActiveInvoice(null)} />
      )}
    </div>
  )
}
