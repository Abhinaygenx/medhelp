import React, { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PatientSidebar from './PatientSidebar'
import PatientHeader from './PatientHeader'
import PatientDashboard from './PatientDashboard'
import AppointmentBooking from './AppointmentBooking'
import MedicalTimeline from './MedicalTimeline'

import PatientPortal from '../PatientPortal'
import AISymptomChecker from '../AISymptomChecker'
import HealthScoreCard from '../HealthScoreCard'
import EmergencyAlertBanner from '../EmergencyAlertBanner'
import PatientNeonCard from '../common/PatientNeonCard'
import InvoiceModal from '../common/InvoiceModal'
import { Badge } from '../common/Badge'
import { 
  Activity, 
  BrainCircuit, 
  AlertTriangle, 
  LineChart, 
  HeartPulse, 
  ShieldAlert, 
  Settings, 
  FileText, 
  CreditCard,
  Calendar, 
  Info, 
  User, 
  CheckCircle2, 
  Sparkles,
  Download
} from 'lucide-react'

export default function PatientLayout({ 
  doctors = [], 
  appointments = [], 
  prescriptions = [], 
  patients = [], 
  bills = [],
  labReports = [],
  notifications = [], 
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
    email: 'srikar0406@gmail.com',
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
              prescriptionsCount={prescriptions.length}
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

              {/* Existing Bookings List */}
              <PatientNeonCard className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Your Consultation History</h3>
                  <Badge variant="brand" size="sm">{appointments.length} Consultations</Badge>
                </div>

                <PatientPortal
                  doctors={doctors}
                  appointments={appointments}
                  prescriptions={prescriptions}
                  patients={patients}
                  onBookAppointment={onBookAppointment}
                  onOpenTeleconsultation={onOpenTeleconsultation}
                  onViewPrescription={onViewPrescription}
                />
              </PatientNeonCard>
            </div>
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

          {/* MEDICAL RECORDS */}
          {activeMenu === 'medical-records' && (
            <PatientNeonCard className="p-6 space-y-6">
              <div className="border-b pb-4" style={{ borderColor: 'var(--border-light)' }}>
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <FileText className="w-5 h-5 text-[var(--brand-600)]" /> Digital Medical Records & Prescriptions
                </h2>
                <p className="text-xs text-[var(--text-muted)]">HIPAA compliant digital prescription vault and medical history records.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prescriptions.length === 0 ? (
                  <div className="col-span-2 p-8 text-center rounded-2xl border border-dashed text-xs"
                    style={{ borderColor: 'var(--border-default)', color: 'var(--text-muted)' }}
                  >
                    No medical records or prescriptions found.
                  </div>
                ) : (
                  prescriptions.map(rx => (
                    <div key={rx.id} className="p-5 rounded-2xl space-y-3"
                      style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)' }}
                    >
                      <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border-light)' }}>
                        <span className="font-bold text-xs text-[var(--brand-600)]">Rx #{rx.id}</span>
                        <Badge variant="success" size="sm">Verified MD</Badge>
                      </div>
                      <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                        {rx.doctorName} ({rx.doctorSpecialization})
                      </p>
                      <p className="text-xs p-2.5 rounded-xl border text-[var(--text-secondary)]"
                        style={{ background: 'var(--surface-card)', borderColor: 'var(--border-light)' }}
                      >
                        Diagnosis: {rx.diagnosis}
                      </p>
                      <button
                        onClick={() => onViewPrescription(rx)}
                        className="w-full font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                        style={{ background: 'var(--brand-600)', color: '#ffffff' }}
                      >
                        View Official Prescription
                      </button>
                    </div>
                  ))
                )}
              </div>
            </PatientNeonCard>
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
                              className="px-3 py-1.5 rounded-xl font-bold border inline-flex items-center space-x-1.5 cursor-pointer"
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

          {/* HEALTH INFORMATION */}
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
                  <h4 className="font-bold text-teal-800">Sleep Hygiene</h4>
                  <p className="text-teal-950">Aim for 7.5 to 8 hours uninterrupted sleep. Avoid blue-light screen exposure 45 mins prior to bedtime.</p>
                </div>
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

          {/* AI SYMPTOM CHECKER */}
          {activeMenu === 'ai-symptom-checker' && (
            <PatientNeonCard className="p-6 space-y-6">
              <AISymptomChecker 
                onRecommendBooking={() => {
                  handleSelectMenu('appointments')
                }}
              />
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

          {/* HEALTH SCORE */}
          {activeMenu === 'health-score' && (
            <PatientNeonCard className="p-6 space-y-6">
              <HealthScoreCard />
            </PatientNeonCard>
          )}

          {/* HEALTH INSIGHTS */}
          {activeMenu === 'health-insights' && (
            <PatientNeonCard className="p-6 space-y-6">
              <div className="border-b pb-4" style={{ borderColor: 'var(--border-light)' }}>
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <LineChart className="w-5 h-5 text-[var(--brand-600)]" /> Clinical Health Insights & Trend Analytics
                </h2>
                <p className="text-xs text-[var(--text-muted)]">AI-driven predictive analytics based on historical vital readings and consultation history.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl border bg-emerald-50 border-emerald-200 space-y-2">
                  <h4 className="font-bold text-emerald-800">Cardiovascular Trend</h4>
                  <p className="text-emerald-950">Resting heart rate has improved by 4% over the last 30 days (avg 72 bpm).</p>
                </div>
                <div className="p-5 rounded-2xl border" style={{ background: 'var(--brand-50)', borderColor: 'var(--brand-200)' }}>
                  <h4 className="font-bold text-[var(--brand-700)]">Consultation Frequency</h4>
                  <p className="text-[var(--text-secondary)]">Routine follow-ups completed on schedule. 100% adherence to digital prescriptions.</p>
                </div>
                <div className="p-5 rounded-2xl border bg-teal-50 border-teal-200 space-y-2">
                  <h4 className="font-bold text-teal-800">Overall Well-Being</h4>
                  <p className="text-teal-950">Health Score is 88/100 (Optimal Range). Low risk profile for chronic indicators.</p>
                </div>
              </div>
            </PatientNeonCard>
          )}

          {/* HEALTH MONITORING */}
          {activeMenu === 'health-monitoring' && (
            <PatientNeonCard className="p-6 space-y-6">
              <div className="border-b pb-4" style={{ borderColor: 'var(--border-light)' }}>
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <HeartPulse className="w-5 h-5 text-emerald-600" /> Real-Time Health Telemetry & IoT Monitoring
                </h2>
                <p className="text-xs text-[var(--text-muted)]">Live monitoring data synchronized from smart health sensors and wearable devices.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-5 rounded-2xl border" style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}>
                  <span className="text-[var(--text-muted)] font-medium">Heart Rate</span>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>72 <span className="text-xs text-[var(--text-muted)] font-normal">BPM</span></p>
                  <span className="text-[10px] text-emerald-600 font-bold">Normal Rhythm</span>
                </div>
                <div className="p-5 rounded-2xl border" style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}>
                  <span className="text-[var(--text-muted)] font-medium">Blood Pressure</span>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>120/80 <span className="text-xs text-[var(--text-muted)] font-normal">mmHg</span></p>
                  <span className="text-[10px] text-emerald-600 font-bold">Ideal Reading</span>
                </div>
                <div className="p-5 rounded-2xl border" style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}>
                  <span className="text-[var(--text-muted)] font-medium">SpO2 Oxygen</span>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>99%</p>
                  <span className="text-[10px] text-emerald-600 font-bold">Optimal</span>
                </div>
                <div className="p-5 rounded-2xl border" style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}>
                  <span className="text-[var(--text-muted)] font-medium">Body Temperature</span>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>98.6°F</p>
                  <span className="text-[10px] text-emerald-600 font-bold">Afebrile</span>
                </div>
              </div>
            </PatientNeonCard>
          )}

          {/* RISK INDICATORS */}
          {activeMenu === 'risk-indicators' && (
            <PatientNeonCard className="p-6 space-y-6">
              <div className="border-b pb-4" style={{ borderColor: 'var(--border-light)' }}>
                <h2 className="text-xl font-bold flex items-center gap-2 text-amber-600">
                  <ShieldAlert className="w-5 h-5 text-amber-600" /> Clinical Risk Factors & Preventive Matrix
                </h2>
                <p className="text-xs text-[var(--text-muted)]">Automated clinical risk stratification derived from EMR and AI triage algorithms.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl border bg-emerald-50 border-emerald-200 space-y-2">
                  <h4 className="font-bold text-emerald-800">Cardiovascular Risk</h4>
                  <p className="font-bold text-emerald-900">LOW RISK (3%)</p>
                  <p className="text-emerald-800 text-[11px]">BP and lipid profile within normal thresholds.</p>
                </div>
                <div className="p-5 rounded-2xl border bg-emerald-50 border-emerald-200 space-y-2">
                  <h4 className="font-bold text-emerald-800">Metabolic Risk</h4>
                  <p className="font-bold text-emerald-900">LOW RISK (5%)</p>
                  <p className="text-emerald-800 text-[11px]">Blood glucose telemetry indicates non-diabetic range.</p>
                </div>
                <div className="p-5 rounded-2xl border" style={{ background: 'var(--brand-50)', borderColor: 'var(--brand-200)' }}>
                  <h4 className="font-bold text-[var(--brand-700)]">Respiratory Risk</h4>
                  <p className="font-bold text-[var(--brand-900)]">NORMAL (2%)</p>
                  <p className="text-[var(--text-secondary)] text-[11px]">No acute complaints or SpO2 drops.</p>
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
                    <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Two-Factor Authentication (2FA)</p>
                    <p className="text-[11px] text-[var(--text-muted)]">Require OTP verification during patient login session</p>
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
