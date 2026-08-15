import React, { useState } from 'react'
import DoctorSidebar from './doctor/DoctorSidebar'
import DoctorHeader from './doctor/DoctorHeader'
import DoctorDashboard from './doctor/DoctorDashboard'
import TodayAppointments from './doctor/TodayAppointments'
import PatientRecords from './doctor/PatientRecords'
import MedicalRecords from './doctor/MedicalRecords'
import PrescriptionPanel from './doctor/PrescriptionPanel'
import LabReports from './doctor/LabReports'
import ScheduleManager from './doctor/ScheduleManager'
import MessagesPanel from './doctor/MessagesPanel'
import DoctorProfile from './doctor/DoctorProfile'

export default function DoctorPortal({ 
  doctorProfile = { name: 'Dr. Robert Ford', specialization: 'Cardiology' }, 
  appointments = [], 
  prescriptions = [], 
  patients = [],
  labReports = [],
  medicines = [],
  onUpdateAppointmentStatus, 
  onCreatePrescription, 
  onOpenTeleconsultation,
  onLogout 
}) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Switch statement for rendering active module content
  const renderActiveContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DoctorDashboard
            doctorProfile={doctorProfile}
            appointments={appointments}
            onSelectTab={setActiveTab}
            onOpenTeleconsultation={onOpenTeleconsultation}
          />
        )
      case 'appointments':
        return (
          <TodayAppointments
            appointments={appointments}
            onUpdateStatus={onUpdateAppointmentStatus}
            onOpenTeleconsultation={onOpenTeleconsultation}
          />
        )
      case 'patients':
        return <PatientRecords patients={patients} onSelectTab={setActiveTab} />
      case 'records':
        return <MedicalRecords prescriptions={prescriptions} />
      case 'prescriptions':
        return (
          <PrescriptionPanel
            prescriptions={prescriptions}
            patients={patients}
            medicines={medicines}
            onCreatePrescription={onCreatePrescription}
          />
        )
      case 'labreports':
        return <LabReports labReports={labReports} />
      case 'schedule':
        return <ScheduleManager />
      case 'messages':
        return <MessagesPanel />
      case 'profile':
        return <DoctorProfile doctorProfile={doctorProfile} />
      default:
        return (
          <DoctorDashboard
            doctorProfile={doctorProfile}
            appointments={appointments}
            onSelectTab={setActiveTab}
            onOpenTeleconsultation={onOpenTeleconsultation}
          />
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#020817] via-[#061124] to-[#0b172a] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. FIXED VERTICAL SIDEBAR COMPONENT (w-[280px] bg-[#020b1f]) */}
      <DoctorSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLogout={onLogout}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. DYNAMIC MAIN CONTENT VIEWPORT (OFFSET BY 280px / w-[280px]) */}
      <div className="flex-1 lg:ml-[280px] min-h-screen flex flex-col transition-all">
        
        {/* Sticky Top Header Component */}
        <DoctorHeader
          doctorName={doctorProfile.name}
          doctorDept={`${doctorProfile.specialization || 'Cardiology'} Department`}
          avatarUrl={doctorProfile.avatar}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onLogout={onLogout}
        />

        {/* Dynamic Inner Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {renderActiveContent()}
        </main>

      </div>

    </div>
  )
}
