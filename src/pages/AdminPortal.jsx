import React, { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'
import Topbar from '../components/admin/Topbar'
import AdminDashboard from '../components/admin/AdminDashboard'
import DoctorsManagement from '../components/admin/DoctorsManagement'
import PatientsManagement from '../components/admin/PatientsManagement'
import AppointmentsManagement from '../components/admin/AppointmentsManagement'
import DepartmentsManagement from '../components/admin/DepartmentsManagement'
import PharmacyManagement from '../components/admin/PharmacyManagement'
import LabReportsManagement from '../components/admin/LabReportsManagement'
import BedWardManagement from '../components/admin/BedWardManagement'
import BillingManagement from '../components/admin/BillingManagement'
import AnalyticsReports from '../components/admin/AnalyticsReports'
import EmergencyAlerts from '../components/admin/EmergencyAlerts'
import NotificationsCenter from '../components/admin/NotificationsCenter'
import AuditLogs from '../components/admin/AuditLogs'
import StaffRolesManagement from '../components/admin/StaffRolesManagement'
import SystemSettings from '../components/admin/SystemSettings'
import ThemeSettings from '../components/admin/ThemeSettings'
import LogoutSection from '../components/admin/LogoutSection'

export default function AdminPortal({ 
  doctors = [], 
  patients = [], 
  appointments = [], 
  prescriptions = [], 
  auditLogs = [], 
  departments = [],
  medicines = [],
  labReports = [],
  beds = [],
  bills = [],
  emergencyAlerts = [],
  notifications = [],
  staffList = [],
  systemSettings = {},
  onToggleDoctorVerification, 
  onAddDoctor,
  onDeleteDoctor,
  onRegisterPatient,
  onUpdatePatientStatus,
  onUpdateAppointmentStatus,
  onAddDepartment,
  onToggleDepartmentStatus,
  onAddMedicine,
  onRestockMedicine,
  onUploadLabReport,
  onAssignBed,
  onReleaseBed,
  onGenerateBill,
  onMarkBillPaid,
  onTriggerEmergency,
  onResolveEmergency,
  onSendBroadcast,
  onAddStaff,
  onSaveSettings,
  isFirebaseConnected = true,
  onLogout 
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Derive active menu section from location URL with route alias normalization
  const activeTab = useMemo(() => {
    const path = location.pathname.replace('/admin/', '').replace('/admin', '').toLowerCase()
    if (!path || path === 'dashboard') return 'dashboard'
    if (path === 'lab-reports') return 'lab'
    if (path === 'beds-wards') return 'beds'
    if (path === 'emergency-alerts') return 'emergency'
    if (path === 'audit-logs') return 'logs'
    if (path === 'staff-roles') return 'staff'
    return path
  }, [location.pathname])

  const handleSelectTab = (tabId) => {
    if (tabId === 'logout') {
      navigate('/admin/logout')
      return
    }
    const targetPath = `/admin/${tabId}`
    if (location.pathname !== targetPath) {
      navigate(targetPath)
    }
  }

  const emergencyCount = useMemo(() => {
    return emergencyAlerts.length
  }, [emergencyAlerts])

  // Exact Component Mapping Dictionary
  const componentMap = {
    dashboard: (
      <AdminDashboard
        doctors={doctors}
        patients={patients}
        appointments={appointments}
        prescriptions={prescriptions}
        beds={beds}
        bills={bills}
        emergencyAlerts={emergencyAlerts}
        auditLogs={auditLogs}
        onSelectTab={handleSelectTab}
      />
    ),
    doctors: (
      <DoctorsManagement
        doctors={doctors}
        onToggleVerification={onToggleDoctorVerification}
        onAddDoctor={onAddDoctor}
        onDeleteDoctor={onDeleteDoctor}
      />
    ),
    patients: (
      <PatientsManagement
        patients={patients}
        doctors={doctors}
        onRegisterPatient={onRegisterPatient}
        onUpdatePatientStatus={onUpdatePatientStatus}
      />
    ),
    appointments: (
      <AppointmentsManagement
        appointments={appointments}
        doctors={doctors}
        onUpdateStatus={onUpdateAppointmentStatus}
      />
    ),
    departments: (
      <DepartmentsManagement
        departments={departments}
        doctors={doctors}
        onAddDepartment={onAddDepartment}
        onToggleDepartmentStatus={onToggleDepartmentStatus}
      />
    ),
    pharmacy: (
      <PharmacyManagement
        medicines={medicines}
        onAddMedicine={onAddMedicine}
        onRestockMedicine={onRestockMedicine}
      />
    ),
    lab: (
      <LabReportsManagement
        labReports={labReports}
        onUploadLabReport={onUploadLabReport}
      />
    ),
    beds: (
      <BedWardManagement
        beds={beds}
        onAssignBed={onAssignBed}
        onReleaseBed={onReleaseBed}
      />
    ),
    billing: (
      <BillingManagement
        bills={bills}
        onGenerateBill={onGenerateBill}
        onMarkBillPaid={onMarkBillPaid}
      />
    ),
    analytics: (
      <AnalyticsReports
        doctors={doctors}
        patients={patients}
        appointments={appointments}
        bills={bills}
      />
    ),
    emergency: (
      <EmergencyAlerts
        emergencyAlerts={emergencyAlerts}
        onTriggerEmergency={onTriggerEmergency}
        onResolveEmergency={onResolveEmergency}
      />
    ),
    notifications: (
      <NotificationsCenter
        notifications={notifications}
        onSendBroadcast={onSendBroadcast}
      />
    ),
    logs: (
      <AuditLogs auditLogs={auditLogs} />
    ),
    staff: (
      <StaffRolesManagement
        staffList={staffList}
        onAddStaff={onAddStaff}
      />
    ),
    settings: (
      <SystemSettings
        systemSettings={systemSettings}
        onSaveSettings={onSaveSettings}
        isFirebaseConnected={isFirebaseConnected}
      />
    ),
    theme: <ThemeSettings />,
    logout: <LogoutSection onLogout={onLogout} onCancel={() => handleSelectTab('dashboard')} />
  }

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        background: 'var(--surface-page)', 
        color: 'var(--text-primary)',
        display: 'flex' 
      }}
    >
      
      {/* 1. FIXED LEFT SIDEBAR (Desktop 260px, Mobile Drawer) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onLogout={onLogout}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. DYNAMIC MAIN CONTENT VIEWPORT */}
      <div className="flex-1 lg:ml-[260px] min-h-screen flex flex-col transition-all">
        
        {/* Sticky Topbar */}
        <Topbar
          adminName="Super Admin"
          isFirebaseConnected={isFirebaseConnected}
          emergencyCount={emergencyCount}
          notifications={notifications}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onLogout={onLogout}
        />

        {/* Dynamic Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {componentMap[activeTab] || componentMap.dashboard}
        </main>

      </div>

    </div>
  )
}
