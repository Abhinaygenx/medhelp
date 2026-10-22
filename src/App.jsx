import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { db, auth, signOut } from './firebase'
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query 
} from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import { Activity } from 'lucide-react'
import LandingPage from './components/LandingPage'
import { CLIENT } from './config/clientConfig'

// Import Data Seed & Core Components
import { 
  INITIAL_DOCTORS, 
  INITIAL_PATIENTS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_PRESCRIPTIONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_AUDIT_LOGS,
  INITIAL_DEPARTMENTS,
  INITIAL_MEDICINES,
  INITIAL_LAB_REPORTS,
  INITIAL_BEDS,
  INITIAL_BILLS,
  INITIAL_EMERGENCY_ALERTS,
  INITIAL_STAFF,
  INITIAL_SYSTEM_SETTINGS,
  INITIAL_RUNNING_MEDICATIONS,
  INITIAL_SCHEDULED_TESTS,
  INITIAL_PATIENT_DOCUMENTS
} from './data/seedData'
import { loadData, saveData } from './services/storageService'

import Navbar from './components/Navbar'
import PatientLayout from './components/patient/PatientLayout'
import DoctorPortal from './components/DoctorPortal'
import AdminPortal from './components/AdminPortal'
import LoginPage from './components/LoginPage'
import { LoadingCard } from './components/LoadingState'

// Lazy-load heavy modal components for optimal performance
const TeleconsultationModal = lazy(() => import('./components/TeleconsultationModal'))
const PrescriptionModal = lazy(() => import('./components/PrescriptionModal'))

// Helper: Map user role string to target dashboard route
const getDashboardPath = (roleStr) => {
  const r = (roleStr || '').toLowerCase()
  if (r === 'admin') return '/admin/dashboard'
  if (r === 'doctor') return '/doctor/dashboard'
  return '/patient/dashboard'
}

// Protected Route Component Guard
function ProtectedRoute({ allowedRole, currentUser, children }) {
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const userRole = (currentUser.role || '').toLowerCase()
  if (userRole !== allowedRole.toLowerCase()) {
    // Redirect user to their own role's dashboard if trying to access unauthorized route
    const userHomePath = getDashboardPath(userRole)
    return <Navigate to={userHomePath} replace />
  }

  return children
}

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  // Authentication State Restoration Loader
  const [isAuthRestoring, setIsAuthRestoring] = useState(true)

  // Current Logged-in User Session Object
  const [currentUser, setCurrentUser] = useState(null)

  // Active Role Persona: 'patient' | 'doctor' | 'admin'
  const [currentRole, setCurrentRole] = useState('patient')

  // Core Application Datasets (Synchronized with localStorage & Firestore)
  const [doctors, setDoctors] = useState(() => loadData('hms_doctors', INITIAL_DOCTORS))
  const [patients, setPatients] = useState(() => loadData('hms_patients', INITIAL_PATIENTS))
  const [appointments, setAppointments] = useState(() => loadData('hms_appointments', INITIAL_APPOINTMENTS))
  const [prescriptions, setPrescriptions] = useState(() => loadData('hms_prescriptions', INITIAL_PRESCRIPTIONS))
  const [notifications, setNotifications] = useState(() => loadData('hms_notifications', INITIAL_NOTIFICATIONS))
  const [auditLogs, setAuditLogs] = useState(() => loadData('hms_audit_logs', INITIAL_AUDIT_LOGS))
  const [departments, setDepartments] = useState(() => loadData('hms_departments', INITIAL_DEPARTMENTS))
  const [medicines, setMedicines] = useState(() => loadData('hms_medicines', INITIAL_MEDICINES))
  const [labReports, setLabReports] = useState(() => loadData('hms_lab_reports', INITIAL_LAB_REPORTS))
  const [beds, setBeds] = useState(() => loadData('hms_beds', INITIAL_BEDS))
  const [bills, setBills] = useState(() => loadData('hms_bills', INITIAL_BILLS))
  const [emergencyAlerts, setEmergencyAlerts] = useState(() => loadData('hms_emergency_alerts', INITIAL_EMERGENCY_ALERTS))
  const [staffList, setStaffList] = useState(() => loadData('hms_staff', INITIAL_STAFF))
  const [systemSettings, setSystemSettings] = useState(() => loadData('hms_settings', INITIAL_SYSTEM_SETTINGS))
  const [runningMedications, setRunningMedications] = useState(() => loadData('hms_running_meds', INITIAL_RUNNING_MEDICATIONS))
  const [scheduledTests, setScheduledTests] = useState(() => loadData('hms_scheduled_tests', INITIAL_SCHEDULED_TESTS))
  const [patientDocuments, setPatientDocuments] = useState(() => loadData('hms_patient_docs', INITIAL_PATIENT_DOCUMENTS))

  // Local Storage Persistence Sync
  useEffect(() => { saveData('hms_doctors', doctors) }, [doctors])
  useEffect(() => { saveData('hms_patients', patients) }, [patients])
  useEffect(() => { saveData('hms_appointments', appointments) }, [appointments])
  useEffect(() => { saveData('hms_prescriptions', prescriptions) }, [prescriptions])
  useEffect(() => { saveData('hms_notifications', notifications) }, [notifications])
  useEffect(() => { saveData('hms_audit_logs', auditLogs) }, [auditLogs])
  useEffect(() => { saveData('hms_departments', departments) }, [departments])
  useEffect(() => { saveData('hms_medicines', medicines) }, [medicines])
  useEffect(() => { saveData('hms_lab_reports', labReports) }, [labReports])
  useEffect(() => { saveData('hms_beds', beds) }, [beds])
  useEffect(() => { saveData('hms_bills', bills) }, [bills])
  useEffect(() => { saveData('hms_emergency_alerts', emergencyAlerts) }, [emergencyAlerts])
  useEffect(() => { saveData('hms_staff', staffList) }, [staffList])
  useEffect(() => { saveData('hms_settings', systemSettings) }, [systemSettings])
  useEffect(() => { saveData('hms_running_meds', runningMedications) }, [runningMedications])
  useEffect(() => { saveData('hms_scheduled_tests', scheduledTests) }, [scheduledTests])
  useEffect(() => { saveData('hms_patient_docs', patientDocuments) }, [patientDocuments])

  // Cloud Firestore Sync & Network Connection State
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(true)

  // Active Modals
  const [activeTeleconsultation, setActiveTeleconsultation] = useState(null)
  const [activePrescription, setActivePrescription] = useState(null)

  // Active Doctor Profile Context Mock
  const currentDoctorProfile = doctors[0]

  // Initial Auth Restoration Effect
  useEffect(() => {
    try {
      const savedLocal = localStorage.getItem('health_portal_user')
      const savedSession = sessionStorage.getItem('health_portal_user')
      let userObj = null
      if (savedLocal) userObj = JSON.parse(savedLocal)
      else if (savedSession) userObj = JSON.parse(savedSession)

      if (userObj && userObj.role) {
        setCurrentUser(userObj)
        setCurrentRole(userObj.role.toLowerCase())
      }
    } catch (e) {
      console.warn('Session restoration error:', e)
    } finally {
      setIsAuthRestoring(false)
    }
  }, [])

  // Synchronize route & persona when currentRole changes
  const handleRoleChange = useCallback((newRole) => {
    setCurrentRole(newRole)
    const newPath = getDashboardPath(newRole)
    if (location.pathname !== newPath) {
      navigate(newPath)
    }
  }, [location.pathname, navigate])

  // Online / Offline Network Disconnection Handlers
  useEffect(() => {
    const handleOnline = () => {
      toast.success("Network connection restored", {
        style: { background: '#0B1B4D', color: '#FFFFFF', border: '1px solid #2F54EB' },
        iconTheme: { primary: '#4F7BFF', secondary: '#0B1B4D' }
      })
      setIsFirebaseConnected(true)
    }

    const handleOffline = () => {
      toast.error("Network error — retrying", {
        style: { background: '#0B1B4D', color: '#FFFFFF', border: '1px solid #EF4444' },
        iconTheme: { primary: '#EF4444', secondary: '#0B1B4D' }
      })
      setIsFirebaseConnected(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Real-time Firestore Sync Listener (with safe error handling)
  useEffect(() => {
    let unsubscribe = () => {}
    try {
      const q = query(collection(db, 'appointments'))
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const fetchedApts = snapshot.docs.map(docSnap => ({
              id: docSnap.id,
              ...docSnap.data()
            }))
            setAppointments(fetchedApts)
          }
          setIsFirebaseConnected(true)
        },
        (err) => {
          console.warn('Firestore fallback mode active:', err.message)
          setIsFirebaseConnected(false)
        }
      )
    } catch (e) {
      console.warn('Firebase initialization offline fallback:', e)
      setIsFirebaseConnected(false)
    }
    return () => unsubscribe()
  }, [])

  // Handle Successful Login & Redirect to Role Dashboard
  const handleLoginSuccess = useCallback((userSession) => {
    setCurrentUser(userSession)
    const roleLower = userSession.role.toLowerCase()
    setCurrentRole(roleLower)
    const targetPath = getDashboardPath(roleLower)
    navigate(targetPath, { replace: true })
  }, [navigate])

  // Handle Logout & Redirect to Login Page
  const handleLogout = useCallback(() => {
    localStorage.removeItem('health_portal_user')
    sessionStorage.removeItem('health_portal_user')
    signOut(auth).catch(() => {})
    setCurrentUser(null)
    toast.success("Signed out successfully", {
      style: { background: '#0B1B4D', color: '#FFFFFF', border: '1px solid #2F54EB' }
    })
    navigate('/login', { replace: true })
  }, [navigate])

  // Action: Book New Appointment
  const handleBookAppointment = useCallback(async (newAptData) => {
    const newAppointment = {
      id: `apt-${Date.now().toString().slice(-4)}`,
      patientId: 'pat-1',
      patientName: currentUser?.name || 'Eleanor Vance',
      ...newAptData,
      status: 'pending',
      meetingLink: `https://meet.jit.si/mediconnect-consult-apt-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    }

    try {
      if (isFirebaseConnected) {
        await addDoc(collection(db, 'appointments'), newAppointment)
      }
    } catch (err) {
      console.warn('Writing to local state fallback:', err)
      toast.error("Network error — retrying", {
        style: { background: '#0f172a', color: '#f8fafc', border: '1px solid #f59e0b' }
      })
    }

    setAppointments(prev => [newAppointment, ...prev])

    const newNotif = {
      id: `notif-${Date.now()}`,
      userId: newAptData.doctorId,
      title: 'New Consultation Request',
      message: `${currentUser?.name || 'Eleanor Vance'} requested an appointment for ${newAptData.appointmentDate} at ${newAptData.timeSlot}.`,
      type: 'appointment_request',
      isRead: false,
      createdAt: new Date().toISOString()
    }
    setNotifications(prev => [newNotif, ...prev])

    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'pat-1',
      actorName: currentUser?.name || 'Eleanor Vance',
      actorRole: 'Patient',
      action: 'BOOK_APPOINTMENT',
      target: `Booked ${newAptData.doctorName} for ${newAptData.appointmentDate}`,
      timestamp: new Date().toISOString()
    }, ...prev])

    toast.success("Appointment booked successfully", {
      style: { background: '#0f172a', color: '#f8fafc', border: '1px solid #06b6d4' },
      iconTheme: { primary: '#06b6d4', secondary: '#0f172a' }
    })
  }, [isFirebaseConnected, currentUser])

  // Action: Update Appointment Status
  const handleUpdateAppointmentStatus = useCallback((appointmentId, newStatus) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === appointmentId) {
        return { ...apt, status: newStatus }
      }
      return apt
    }))

    toast.success("Doctor approval updated", {
      style: { background: '#0f172a', color: '#f8fafc', border: '1px solid #06b6d4' },
      iconTheme: { primary: '#06b6d4', secondary: '#0f172a' }
    })

    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'doc-1',
      actorName: 'Dr. Robert Ford',
      actorRole: 'Doctor',
      action: 'UPDATE_APPOINTMENT_STATUS',
      target: `Changed Appt #${appointmentId} status to ${newStatus}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Create Digital Prescription
  const handleCreatePrescription = useCallback((newRxData) => {
    const newRx = {
      id: `rx-${Date.now().toString().slice(-3)}`,
      issuedAt: new Date().toISOString(),
      ...newRxData
    }

    setPrescriptions(prev => [newRx, ...prev])
    handleUpdateAppointmentStatus(newRxData.appointmentId, 'completed')

    setNotifications(prev => [{
      id: `notif-${Date.now()}`,
      userId: newRxData.patientId,
      title: 'Digital Prescription Issued',
      message: `${newRxData.doctorName} issued a digital prescription for your consultation.`,
      type: 'prescription_issued',
      isRead: false,
      createdAt: new Date().toISOString()
    }, ...prev])

    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: newRxData.doctorId,
      actorName: newRxData.doctorName,
      actorRole: 'Doctor',
      action: 'ISSUE_PRESCRIPTION',
      target: `Issued Digital Rx #${newRx.id} for ${newRxData.patientName}`,
      timestamp: new Date().toISOString()
    }, ...prev])

    toast.success("Prescription generated successfully", {
      style: { background: '#0f172a', color: '#f8fafc', border: '1px solid #06b6d4' },
      iconTheme: { primary: '#06b6d4', secondary: '#0f172a' }
    })
  }, [handleUpdateAppointmentStatus])

  // Action: Admin Add Doctor
  const handleAddDoctor = useCallback((newDocData) => {
    setDoctors(prev => [newDocData, ...prev])
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'ADD_DOCTOR',
      target: `Added ${newDocData.name} (${newDocData.specialization})`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Admin Delete Doctor
  const handleDeleteDoctor = useCallback((doctorId) => {
    setDoctors(prev => prev.filter(d => d.id !== doctorId))
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'DELETE_DOCTOR',
      target: `Deleted Doctor ID #${doctorId}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Admin Toggle Doctor Verification Status
  const handleToggleDoctorVerification = useCallback((doctorId) => {
    setDoctors(prev => prev.map(d => {
      if (d.id === doctorId) {
        const nextStatus = !d.isVerified
        toast.success(`Doctor verification set to: ${nextStatus ? 'VERIFIED' : 'PENDING'}`)
        return { ...d, isVerified: nextStatus }
      }
      return d
    }))
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'TOGGLE_DOCTOR_VERIFICATION',
      target: `Toggled verification for Doctor ID #${doctorId}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Admin Register Patient
  const handleRegisterPatient = useCallback((newPatientData) => {
    setPatients(prev => [newPatientData, ...prev])
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'REGISTER_PATIENT',
      target: `Registered Patient ${newPatientData.name} (${newPatientData.id})`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Admin Update Patient Admission Status
  const handleUpdatePatientStatus = useCallback((patientId, nextStatus) => {
    setPatients(prev => prev.map(p => p.id === patientId ? { ...p, admissionStatus: nextStatus } : p))
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'UPDATE_PATIENT_STATUS',
      target: `Updated Patient ID #${patientId} status to ${nextStatus}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Admin Department Operations
  const handleAddDepartment = useCallback((newDeptData) => {
    setDepartments(prev => [...prev, newDeptData])
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'CREATE_DEPARTMENT',
      target: `Created Department ${newDeptData.name}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  const handleToggleDepartmentStatus = useCallback((deptId) => {
    setDepartments(prev => prev.map(d => d.id === deptId ? { ...d, status: d.status === 'Active' ? 'Maintenance' : 'Active' } : d))
  }, [])

  // Action: Pharmacy Operations
  const handleAddMedicine = useCallback((newMedData) => {
    setMedicines(prev => [newMedData, ...prev])
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'ADD_MEDICINE',
      target: `Added Medicine ${newMedData.name}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  const handleRestockMedicine = useCallback((medId, amount = 200) => {
    setMedicines(prev => prev.map(m => m.id === medId ? { ...m, stock: m.stock + amount } : m))
  }, [])

  // Action: Lab Report Upload
  const handleUploadLabReport = useCallback((newReportData) => {
    setLabReports(prev => [newReportData, ...prev])
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'UPLOAD_LAB_REPORT',
      target: `Uploaded Lab Report #${newReportData.id} for ${newReportData.patientName}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Bed / Ward Operations
  const handleAssignBed = useCallback((bedId, patientName) => {
    setBeds(prev => prev.map(b => b.id === bedId ? { ...b, status: 'Occupied', patientName, assignedDate: new Date().toLocaleDateString() } : b))
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'ASSIGN_BED',
      target: `Assigned Bed #${bedId} to ${patientName}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  const handleReleaseBed = useCallback((bedId) => {
    setBeds(prev => prev.map(b => b.id === bedId ? { ...b, status: 'Available', patientName: null, assignedDate: null } : b))
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'RELEASE_BED',
      target: `Discharged patient & released Bed #${bedId}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Billing Operations
  const handleGenerateBill = useCallback((newBillData) => {
    setBills(prev => [newBillData, ...prev])
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'GENERATE_BILL',
      target: `Generated Invoice #${newBillData.id} for ${newBillData.patientName} ($${newBillData.amount})`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  const handleMarkBillPaid = useCallback((billId) => {
    setBills(prev => prev.map(b => b.id === billId ? { ...b, status: 'Paid' } : b))
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'MARK_BILL_PAID',
      target: `Marked Invoice #${billId} as PAID`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Emergency Alert Operations
  const handleTriggerEmergency = useCallback((newErData) => {
    setEmergencyAlerts(prev => [newErData, ...prev])
    setNotifications(prev => [{
      id: `notif-${Date.now()}`,
      userId: 'admin-1',
      title: 'CRITICAL ER ALERT DISPATCHED',
      message: `Emergency alert triggered for ${newErData.patientName} (${newErData.condition}) at ${newErData.location}.`,
      type: 'emergency_alert',
      isRead: false,
      createdAt: new Date().toISOString()
    }, ...prev])
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'TRIGGER_EMERGENCY_ALERT',
      target: `Triggered ER Alert for ${newErData.patientName}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  const handleResolveEmergency = useCallback((erId) => {
    setEmergencyAlerts(prev => prev.filter(er => er.id !== erId))
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'RESOLVE_EMERGENCY',
      target: `Resolved ER Alert #${erId}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Broadcast Notifications
  const handleSendBroadcast = useCallback((newMsgData) => {
    const createdNotif = {
      id: `notif-${Date.now()}`,
      userId: 'broadcast',
      title: newMsgData.title,
      message: newMsgData.message,
      type: 'broadcast',
      isRead: false,
      createdAt: new Date().toISOString()
    }
    setNotifications(prev => [createdNotif, ...prev])
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'SEND_BROADCAST',
      target: `Dispatched broadcast "${newMsgData.title}" to ${newMsgData.targetRole}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Staff Management
  const handleAddStaff = useCallback((newStaffData) => {
    setStaffList(prev => [...prev, newStaffData])
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'ADD_STAFF',
      target: `Added staff member ${newStaffData.name} as ${newStaffData.role}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: System Settings Update
  const handleSaveSettings = useCallback((newSettingsData) => {
    setSystemSettings(newSettingsData)
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'admin-1',
      actorName: 'Hospital Admin',
      actorRole: 'Admin',
      action: 'UPDATE_SYSTEM_SETTINGS',
      target: 'Updated hospital system configurations',
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Add Running Medication
  const handleAddRunningMedication = useCallback((newMedData) => {
    const newMed = {
      id: `med-reg-${Date.now().toString().slice(-4)}`,
      status: 'Active',
      startDate: new Date().toISOString().split('T')[0],
      ...newMedData
    }
    setRunningMedications(prev => [newMed, ...prev])
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'staff-1',
      actorName: newMedData.prescribedBy || 'Clinical Staff',
      actorRole: 'Doctor',
      action: 'PRESCRIBE_MEDICATION',
      target: `Prescribed ${newMed.medicineName} for ${newMed.patientName}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Schedule Clinical Test
  const handleScheduleTest = useCallback((newTestData) => {
    const newTest = {
      id: `tst-${Date.now().toString().slice(-4)}`,
      status: 'Scheduled',
      ...newTestData
    }
    setScheduledTests(prev => [newTest, ...prev])
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'staff-1',
      actorName: newTestData.orderedBy || 'Clinical Staff',
      actorRole: 'Doctor',
      action: 'SCHEDULE_TEST',
      target: `Scheduled ${newTest.testName} for ${newTest.patientName}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Action: Upload Patient Document
  const handleUploadPatientDocument = useCallback((newDocData) => {
    const newDoc = {
      id: `doc-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      fileType: 'PDF',
      fileSize: '1.4 MB',
      ...newDocData
    }
    setPatientDocuments(prev => [newDoc, ...prev])
    setAuditLogs(prev => [{
      id: `log-${Date.now()}`,
      actorId: 'staff-1',
      actorName: newDocData.doctorName || 'Clinical Staff',
      actorRole: 'Staff',
      action: 'UPLOAD_PATIENT_DOCUMENT',
      target: `Uploaded ${newDoc.title} for ${newDoc.patientName}`,
      timestamp: new Date().toISOString()
    }, ...prev])
  }, [])

  // Loading Overlay while Auth Session is Restored
  if (isAuthRestoring) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--surface-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <div style={{ background: 'var(--surface-card)', padding: 40, borderRadius: 20, border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-xl)', textAlign: 'center', maxWidth: 320, width: '100%' }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--brand-50)', border: '1px solid var(--brand-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--brand-600)' }}>
            <Activity size={22} style={{ animation: 'spin 1s linear infinite' }} />
          </div>
          <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem', marginBottom: 4 }}>Loading MediCare Pro</h4>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Restoring your secure session…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const isPatientRoute = location.pathname.startsWith('/patient')
  const isDoctorRoute = location.pathname.startsWith('/doctor')
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isStandalonePortal = isPatientRoute || isDoctorRoute || isAdminRoute

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', background: 'var(--surface-page)', color: 'var(--text-primary)', display: 'flex', flexDirection: isStandalonePortal ? undefined : 'column' }}>
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.875rem' } }} />

      {/* Render Header Navbar ONLY if not in standalone portals */}
      {currentUser && !isStandalonePortal && (
        <Navbar
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          currentUser={currentUser}
          onLogout={handleLogout}
          notifications={notifications}
          isFirebaseConnected={isFirebaseConnected}
        />
      )}

      {/* Main Content Area with Protected Routes */}
      <main style={isStandalonePortal ? { width: '100%' } : { flex: 1, maxWidth: 1280, width: '100%', margin: '0 auto', padding: '32px 24px' }}>
        <Routes>
          {/* Public Landing Page */}
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to={getDashboardPath(currentUser.role)} replace />
              ) : (
                <LandingPage />
              )
            }
          />

          {/* Public / Unauthenticated Login Route */}
          <Route 
            path="/login" 
            element={
              currentUser ? (
                <Navigate to={getDashboardPath(currentUser.role)} replace />
              ) : (
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              )
            } 
          />

          {/* Protected Patient Sidebar Layout & Nested Routes */}
          <Route 
            path="/patient/*" 
            element={
              <ProtectedRoute allowedRole="patient" currentUser={currentUser}>
                <PatientLayout
                  doctors={doctors}
                  appointments={appointments}
                  prescriptions={prescriptions}
                  patients={patients}
                  bills={bills}
                  labReports={labReports}
                  notifications={notifications}
                  runningMedications={runningMedications}
                  scheduledTests={scheduledTests}
                  patientDocuments={patientDocuments}
                  onBookAppointment={handleBookAppointment}
                  onOpenTeleconsultation={setActiveTeleconsultation}
                  onViewPrescription={setActivePrescription}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            } 
          />

          {/* Protected Doctor Enterprise Portal Routes */}
          <Route 
            path="/doctor/*" 
            element={
              <ProtectedRoute allowedRole="doctor" currentUser={currentUser}>
                <DoctorPortal
                  doctorProfile={currentDoctorProfile}
                  appointments={appointments}
                  prescriptions={prescriptions}
                  patients={patients}
                  labReports={labReports}
                  medicines={medicines}
                  runningMedications={runningMedications}
                  scheduledTests={scheduledTests}
                  patientDocuments={patientDocuments}
                  onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                  onCreatePrescription={handleCreatePrescription}
                  onAddRunningMedication={handleAddRunningMedication}
                  onScheduleTest={handleScheduleTest}
                  onUploadPatientDocument={handleUploadPatientDocument}
                  onOpenTeleconsultation={setActiveTeleconsultation}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            } 
          />

          {/* Protected Admin Enterprise HMS Portal Routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRole="admin" currentUser={currentUser}>
                <AdminPortal
                  doctors={doctors}
                  patients={patients}
                  appointments={appointments}
                  prescriptions={prescriptions}
                  auditLogs={auditLogs}
                  departments={departments}
                  medicines={medicines}
                  labReports={labReports}
                  beds={beds}
                  bills={bills}
                  emergencyAlerts={emergencyAlerts}
                  notifications={notifications}
                  staffList={staffList}
                  systemSettings={systemSettings}
                  runningMedications={runningMedications}
                  scheduledTests={scheduledTests}
                  patientDocuments={patientDocuments}
                  onToggleDoctorVerification={handleToggleDoctorVerification}
                  onAddDoctor={handleAddDoctor}
                  onDeleteDoctor={handleDeleteDoctor}
                  onRegisterPatient={handleRegisterPatient}
                  onUpdatePatientStatus={handleUpdatePatientStatus}
                  onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                  onAddDepartment={handleAddDepartment}
                  onToggleDepartmentStatus={handleToggleDepartmentStatus}
                  onAddMedicine={handleAddMedicine}
                  onRestockMedicine={handleRestockMedicine}
                  onUploadLabReport={handleUploadLabReport}
                  onAssignBed={handleAssignBed}
                  onReleaseBed={handleReleaseBed}
                  onGenerateBill={handleGenerateBill}
                  onMarkBillPaid={handleMarkBillPaid}
                  onTriggerEmergency={handleTriggerEmergency}
                  onResolveEmergency={handleResolveEmergency}
                  onSendBroadcast={handleSendBroadcast}
                  onAddStaff={handleAddStaff}
                  onSaveSettings={handleSaveSettings}
                  onAddRunningMedication={handleAddRunningMedication}
                  onScheduleTest={handleScheduleTest}
                  onUploadPatientDocument={handleUploadPatientDocument}
                  isFirebaseConnected={isFirebaseConnected}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all Route: Redirect to dashboard if logged in, else to /login */}
          <Route 
            path="*" 
            element={
              currentUser ? (
                <Navigate to={getDashboardPath(currentUser.role)} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
        </Routes>
      </main>

      {/* Teleconsultation Video Room Modal (Lazy loaded) */}
      {activeTeleconsultation && (
        <Suspense fallback={<LoadingCard className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80" />}>
          <TeleconsultationModal
            appointment={activeTeleconsultation}
            onClose={() => setActiveTeleconsultation(null)}
            onCompleteConsultation={(aptId) => {
              setActiveTeleconsultation(null)
              if (currentRole === 'doctor') {
                setCurrentRole('doctor')
              }
            }}
            isDoctor={currentRole === 'doctor'}
          />
        </Suspense>
      )}

      {/* Digital Prescription Modal (Lazy loaded) */}
      {activePrescription && (
        <Suspense fallback={<LoadingCard className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80" />}>
          <PrescriptionModal
            prescription={activePrescription}
            onClose={() => setActivePrescription(null)}
          />
        </Suspense>
      )}

      {/* Footer ONLY for non-portal pages */}
      {currentUser && !isStandalonePortal && (
        <footer style={{ borderTop: '1px solid var(--border-light)', background: 'var(--surface-card)', padding: '20px 24px', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Virtual Healthcare Consultation Portal • React • Tailwind • Firebase</p>
            <div className="flex items-center space-x-3 text-[11px] text-slate-400">
              <span className="hover:text-slate-300">Firebase Firestore</span>
              <span>•</span>
              <span className="hover:text-slate-300">AI Clinical Triage</span>
              <span>•</span>
              <span className="hover:text-slate-300">React + Tailwind v4</span>
            </div>
          </div>
        </footer>
      )}

    </div>
  )
}
