import React, { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PatientSidebar from './PatientSidebar'
import PatientHeader from './PatientHeader'
import PatientDashboard from './PatientDashboard'

import PatientPortal from '../PatientPortal'
import AISymptomChecker from '../AISymptomChecker'
import HealthScoreCard from '../HealthScoreCard'
import EmergencyAlertBanner from '../EmergencyAlertBanner'
import PatientNeonCard from '../common/PatientNeonCard'
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
  Sparkles
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

  // Mobile Sidebar Open Drawer State
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Derive active menu id from URL location path (e.g. /patient/appointments -> 'appointments')
  const activeMenu = useMemo(() => {
    const path = location.pathname.replace('/patient/', '').replace('/patient', '')
    if (!path || path === 'dashboard') return 'dashboard'
    return path
  }, [location.pathname])

  // Handle menu selection and route navigation
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
    <div className="min-h-screen bg-[#020B08] font-['Plus_Jakarta_Sans',sans-serif] flex text-[#F8FAFC]">
      
      {/* 1. FIXED LEFT SIDEBAR COMPONENT (w-[270px] bg-[#04140F]) */}
      <PatientSidebar
        activeMenu={activeMenu}
        onSelectMenu={handleSelectMenu}
        onLogout={onLogout}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. DYNAMIC MAIN CONTENT AREA (OFFSET BY SIDEBAR WIDTH 270px) */}
      <div className="flex-1 lg:ml-[270px] min-h-screen flex flex-col transition-all">
        
        {/* Sticky Top Header Component */}
        <PatientHeader
          patientName={patientProfile.name}
          patientRole="Patient"
          avatarUrl={patientProfile.avatar}
          notifications={notifications}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onLogout={onLogout}
        />

        {/* Dynamic Inner Content Body based on Active Route */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">

          {/* EMERGENCY ALERTS BANNER FOR PATIENT SAFETY */}
          <EmergencyAlertBanner currentRole="patient" />

          {/* SECTION 1: DASHBOARD MAIN OVERVIEW */}
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

          {/* SECTION 2: APPOINTMENTS & DOCTOR SEARCH */}
          {activeMenu === 'appointments' && (
            <PatientNeonCard className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#113328] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#F8FAFC] font-['Space_Grotesk']">
                    Book & Manage Appointments
                  </h2>
                  <p className="text-xs text-[#A7B3AD]">Connect with top doctors, choose slots, and join video consultations.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#00FF66]/10 text-[#00FF66] text-xs font-bold border border-[#00FF66]/20">
                  {appointments.length} Total Consultations
                </span>
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
          )}

          {/* SECTION 3: MEDICAL RECORDS */}
          {activeMenu === 'medical-records' && (
            <PatientNeonCard className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#113328] pb-4">
                <h2 className="text-xl font-extrabold text-[#F8FAFC] font-['Space_Grotesk'] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#00FF66]" /> Digital Medical Records & Prescriptions
                </h2>
                <p className="text-xs text-[#A7B3AD]">HIPAA compliant digital prescription vault and medical history records.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prescriptions.length === 0 ? (
                  <div className="col-span-2 p-8 text-center bg-[#04140F] rounded-2xl border border-[#113328] text-[#6B7C75] text-xs">
                    No medical records or prescriptions found.
                  </div>
                ) : (
                  prescriptions.map(rx => (
                    <div key={rx.id} className="p-5 rounded-2xl bg-[#04140F] border border-[#113328] space-y-3">
                      <div className="flex items-center justify-between border-b border-[#113328] pb-2">
                        <span className="font-bold text-xs text-[#00FF66]">Rx #{rx.id}</span>
                        <span className="text-[10px] text-[#22C55E] bg-[#22C55E]/15 px-2 py-0.5 rounded-full font-bold border border-[#22C55E]/25">Verified MD</span>
                      </div>
                      <p className="text-xs font-bold text-[#F8FAFC]">{rx.doctorName} ({rx.doctorSpecialization})</p>
                      <p className="text-xs text-[#A7B3AD] bg-[#071A14] p-2.5 rounded-xl border border-[#113328]">Diagnosis: {rx.diagnosis}</p>
                      <button
                        onClick={() => onViewPrescription(rx)}
                        style={{
                          background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
                          color: '#04140F'
                        }}
                        className="w-full font-extrabold py-2 rounded-xl text-xs transition-colors shadow-md"
                      >
                        View Official Prescription PDF
                      </button>
                    </div>
                  ))
                )}
              </div>
            </PatientNeonCard>
          )}

          {/* SECTION 3B: BILLING & INVOICES */}
          {activeMenu === 'billing' && (
            <PatientNeonCard className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#113328] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#F8FAFC] font-['Space_Grotesk'] flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#00FF66]" /> Patient Billing, Invoices & Claims
                  </h2>
                  <p className="text-xs text-[#A7B3AD]">View hospital invoices generated for OPD consultations, pharmacy, and hospital stays.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#00FF66]/10 text-[#00FF66] text-xs font-bold border border-[#00FF66]/20">
                  {bills.length} Invoices
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#04140F] text-[#A7B3AD] uppercase font-semibold border-y border-[#113328]">
                    <tr>
                      <th className="py-3.5 px-4">Invoice ID & Date</th>
                      <th className="py-3.5 px-4">Service Rendered</th>
                      <th className="py-3.5 px-4">Amount ($)</th>
                      <th className="py-3.5 px-4">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#113328] text-[#A7B3AD]">
                    {bills.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-xs text-[#6B7C75]">
                          No hospital invoices generated yet.
                        </td>
                      </tr>
                    ) : (
                      bills.map(bill => (
                        <tr key={bill.id} className="hover:bg-[#071A14] transition-colors">
                          <td className="py-4 px-4 font-bold text-[#00FF66]">
                            <p>#{bill.id}</p>
                            <span className="text-[10px] text-[#A7B3AD] font-mono">{bill.date}</span>
                          </td>
                          <td className="py-4 px-4 text-[#F8FAFC] font-medium">{bill.service}</td>
                          <td className="py-4 px-4 font-extrabold text-[#00FF66]">${bill.amount}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              bill.status === 'Paid' ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30' : 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
                            }`}>
                              {bill.status === 'Paid' ? 'PAID' : 'PENDING'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </PatientNeonCard>
          )}

          {/* SECTION 4: HEALTH INFORMATION */}
          {activeMenu === 'health-information' && (
            <PatientNeonCard className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#113328] pb-4">
                <h2 className="text-xl font-extrabold text-[#F8FAFC] font-['Space_Grotesk'] flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#00FF66]" /> Patient Health Information & Guidelines
                </h2>
                <p className="text-xs text-[#A7B3AD]">Official medical advice, preventive guidelines, and clinical emergency SOPs.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 space-y-2">
                  <h4 className="font-bold text-[#3B82F6]">Cardiology Guidelines</h4>
                  <p className="text-[#A7B3AD]">Maintain daily physical activity of 30+ mins, keep sodium under 2g/day, monitor resting heart rate.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 space-y-2">
                  <h4 className="font-bold text-[#22C55E]">Nutrition & Hydration</h4>
                  <p className="text-[#A7B3AD]">Drink at least 2.5L water daily. Balanced intake of lean proteins, fiber, and antioxidant-rich berries.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#00FF66]/10 border border-[#00FF66]/20 space-y-2">
                  <h4 className="font-bold text-[#00FF66]">Sleep Hygiene</h4>
                  <p className="text-[#A7B3AD]">Aim for 7.5 to 8 hours uninterrupted REM sleep. Avoid screen exposure 45 mins prior to sleep.</p>
                </div>
              </div>
            </PatientNeonCard>
          )}

          {/* SECTION 5: PATIENT PROFILE */}
          {activeMenu === 'profile' && (
            <PatientNeonCard className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#113328] pb-4">
                <h2 className="text-xl font-extrabold text-[#F8FAFC] font-['Space_Grotesk'] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#00FF66]" /> Patient Profile & EMR Settings
                </h2>
                <p className="text-xs text-[#A7B3AD]">Manage medical history, emergency contacts, and personal information.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#04140F] border border-[#113328]">
                  <span className="text-[#6B7C75] font-medium">Patient Name</span>
                  <p className="font-bold text-[#F8FAFC] text-sm mt-0.5">{patientProfile.name}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#04140F] border border-[#113328]">
                  <span className="text-[#6B7C75] font-medium">Registered Email</span>
                  <p className="font-bold text-[#F8FAFC] text-sm mt-0.5">{patientProfile.email}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#04140F] border border-[#113328]">
                  <span className="text-[#6B7C75] font-medium">Blood Group</span>
                  <p className="font-bold text-[#00FF66] text-sm mt-0.5">{patientProfile.bloodGroup || 'O+'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#04140F] border border-[#113328]">
                  <span className="text-[#6B7C75] font-medium">Known Allergies</span>
                  <p className="font-bold text-[#F59E0B] text-sm mt-0.5">{patientProfile.allergies}</p>
                </div>
              </div>
            </PatientNeonCard>
          )}

          {/* ADVANCED FEATURE 1: AI SYMPTOM CHECKER */}
          {activeMenu === 'ai-symptom-checker' && (
            <PatientNeonCard className="p-6 sm:p-8 space-y-6">
              <AISymptomChecker 
                onRecommendBooking={(specialist, textSymptoms) => {
                  handleSelectMenu('appointments')
                }}
              />
            </PatientNeonCard>
          )}

          {/* ADVANCED FEATURE 2: EMERGENCY ALERTS */}
          {activeMenu === 'emergency-alerts' && (
            <PatientNeonCard className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#113328] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#F8FAFC] font-['Space_Grotesk'] flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#EF4444]" /> Emergency Alerts & Response Monitor
                  </h2>
                  <p className="text-xs text-[#A7B3AD]">Real-time critical triage hotline with 5-minute response SLA guarantees.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#EF4444]/15 text-[#EF4444] text-xs font-bold border border-[#EF4444]/25 animate-pulse">
                  Priority SLA Active
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/20 text-xs space-y-3">
                <h4 className="font-bold text-[#EF4444] text-sm">Need Urgent Emergency Care?</h4>
                <p className="text-[#A7B3AD]">If you are experiencing severe chest pain, extreme shortness of breath, sudden numbness, or loss of consciousness, please immediately dial local emergency services (911 / 108) or click below to trigger immediate hospital ER alert dispatch.</p>
                <button
                  onClick={() => alert('Emergency dispatch notification sent to hospital ER team!')}
                  className="bg-[#EF4444] hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs"
                >
                  Trigger Hospital ER Escalation
                </button>
              </div>
            </PatientNeonCard>
          )}

          {/* ADVANCED FEATURE 3: HEALTH SCORE */}
          {activeMenu === 'health-score' && (
            <PatientNeonCard className="p-6 sm:p-8 space-y-6">
              <HealthScoreCard />
            </PatientNeonCard>
          )}

          {/* ADVANCED FEATURE 4: HEALTH INSIGHTS */}
          {activeMenu === 'health-insights' && (
            <PatientNeonCard className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#113328] pb-4">
                <h2 className="text-xl font-extrabold text-[#F8FAFC] font-['Space_Grotesk'] flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-[#00FF66]" /> Clinical Health Insights & Trend Analytics
                </h2>
                <p className="text-xs text-[#A7B3AD]">AI-driven predictive analytics based on historical vital readings and consultation history.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-[#00FF66]/10 border border-[#00FF66]/20 space-y-2">
                  <h4 className="font-bold text-[#00FF66]">Cardiovascular Trend</h4>
                  <p className="text-[#A7B3AD]">Resting heart rate has improved by 4% over the last 30 days (avg 72 bpm).</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 space-y-2">
                  <h4 className="font-bold text-[#3B82F6]">Consultation Frequency</h4>
                  <p className="text-[#A7B3AD]">Routine follow-ups completed on schedule. 100% adherence to digital prescriptions.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 space-y-2">
                  <h4 className="font-bold text-[#22C55E]">Overall Well-Being</h4>
                  <p className="text-[#A7B3AD]">Health Score is 88/100 (Optimal Range). Low risk profile for chronic indicators.</p>
                </div>
              </div>
            </PatientNeonCard>
          )}

          {/* ADVANCED FEATURE 5: HEALTH MONITORING */}
          {activeMenu === 'health-monitoring' && (
            <PatientNeonCard className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#113328] pb-4">
                <h2 className="text-xl font-extrabold text-[#F8FAFC] font-['Space_Grotesk'] flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-[#22C55E]" /> Real-Time Health Telemetry & IoT Monitoring
                </h2>
                <p className="text-xs text-[#A7B3AD]">Live monitoring data synchronized from smart health sensors and wearable devices.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-[#04140F] border border-[#113328] space-y-1">
                  <span className="text-[#6B7C75] font-medium">Heart Rate</span>
                  <p className="text-xl font-bold text-[#F8FAFC]">72 <span className="text-xs text-[#6B7C75] font-normal">BPM</span></p>
                  <span className="text-[10px] text-[#22C55E] font-bold">Normal Rhythm</span>
                </div>
                <div className="p-5 rounded-2xl bg-[#04140F] border border-[#113328] space-y-1">
                  <span className="text-[#6B7C75] font-medium">Blood Pressure</span>
                  <p className="text-xl font-bold text-[#F8FAFC]">120/80 <span className="text-xs text-[#6B7C75] font-normal">mmHg</span></p>
                  <span className="text-[10px] text-[#22C55E] font-bold">Ideal Reading</span>
                </div>
                <div className="p-5 rounded-2xl bg-[#04140F] border border-[#113328] space-y-1">
                  <span className="text-[#6B7C75] font-medium">Blood Oxygen (SpO2)</span>
                  <p className="text-xl font-bold text-[#F8FAFC]">99%</p>
                  <span className="text-[10px] text-[#22C55E] font-bold">Excellent Oxygenation</span>
                </div>
                <div className="p-5 rounded-2xl bg-[#04140F] border border-[#113328] space-y-1">
                  <span className="text-[#6B7C75] font-medium">Body Temperature</span>
                  <p className="text-xl font-bold text-[#F8FAFC]">98.6°F</p>
                  <span className="text-[10px] text-[#22C55E] font-bold">Normal Range</span>
                </div>
              </div>
            </PatientNeonCard>
          )}

          {/* ADVANCED FEATURE 6: RISK INDICATORS */}
          {activeMenu === 'risk-indicators' && (
            <PatientNeonCard className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#113328] pb-4">
                <h2 className="text-xl font-extrabold text-[#F8FAFC] font-['Space_Grotesk'] flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-[#F59E0B]" /> Clinical Risk Factors & Preventive Matrix
                </h2>
                <p className="text-xs text-[#A7B3AD]">Automated clinical risk stratification derived from EMR and AI triage algorithms.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 space-y-2">
                  <h4 className="font-bold text-[#22C55E]">Cardiovascular Risk</h4>
                  <p className="text-[#F8FAFC] font-bold">LOW RISK (3%)</p>
                  <p className="text-[#A7B3AD] text-[11px]">BP and lipid profile within normal thresholds.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 space-y-2">
                  <h4 className="font-bold text-[#22C55E]">Metabolic Risk</h4>
                  <p className="text-[#F8FAFC] font-bold">LOW RISK (5%)</p>
                  <p className="text-[#A7B3AD] text-[11px]">Blood glucose telemetry indicates non-diabetic range.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 space-y-2">
                  <h4 className="font-bold text-[#3B82F6]">Respiratory Risk</h4>
                  <p className="text-[#F8FAFC] font-bold">NORMAL (2%)</p>
                  <p className="text-[#A7B3AD] text-[11px]">No acute respiratory complaints or SpO2 drops.</p>
                </div>
              </div>
            </PatientNeonCard>
          )}

          {/* OTHERS: SETTINGS */}
          {activeMenu === 'settings' && (
            <PatientNeonCard className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#113328] pb-4">
                <h2 className="text-xl font-extrabold text-[#F8FAFC] font-['Space_Grotesk'] flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#00FF66]" /> Portal Settings & Preferences
                </h2>
                <p className="text-xs text-[#A7B3AD]">Configure notification alerts, privacy preferences, and security settings.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#04140F] border border-[#113328] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#F8FAFC]">Email Notifications</p>
                    <p className="text-[#A7B3AD] text-[11px]">Receive appointment updates and prescription reminders via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#00FF66] rounded border-[#113328] bg-[#020B08]" />
                </div>

                <div className="p-4 rounded-2xl bg-[#04140F] border border-[#113328] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#F8FAFC]">Two-Factor Authentication (2FA)</p>
                    <p className="text-[#A7B3AD] text-[11px]">Require OTP verification during patient login</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#00FF66] rounded border-[#113328] bg-[#020B08]" />
                </div>
              </div>
            </PatientNeonCard>
          )}

        </main>

      </div>

    </div>
  )
}
