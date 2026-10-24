export const INITIAL_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Robert Ford',
    specialization: 'Cardiology',
    qualification: 'MBBS, MD (Cardiology), FACC',
    experienceYears: 14,
    consultationFee: 75,
    rating: 4.9,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'],
    hospital: 'St. Jude Heart Institute'
  },
  {
    id: 'doc-2',
    name: 'Dr. Sarah Connor',
    specialization: 'Neurology',
    qualification: 'MBBS, DM (Neurology), PhD',
    experienceYears: 11,
    consultationFee: 85,
    rating: 4.8,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c2111d4d?w=150&auto=format&fit=crop&q=80',
    availableSlots: ['09:30 AM', '11:00 AM', '03:00 PM'],
    hospital: 'Apex Neuro Hospital'
  },
  {
    id: 'doc-3',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    qualification: 'MBBS, MS (Orthopedics)',
    experienceYears: 9,
    consultationFee: 60,
    rating: 4.7,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    availableSlots: ['10:00 AM', '01:30 PM', '05:00 PM'],
    hospital: 'Metro Bone & Joint Clinic'
  },
  {
    id: 'doc-4',
    name: 'Dr. Gregory House',
    specialization: 'General Medicine',
    qualification: 'MD (Internal Medicine), Diagnostic Lead',
    experienceYears: 20,
    consultationFee: 120,
    rating: 4.9,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    availableSlots: ['11:00 AM', '02:30 PM'],
    hospital: 'Princeton General Hospital'
  },
  {
    id: 'doc-5',
    name: 'Dr. John Watson',
    specialization: 'Pediatrics',
    qualification: 'MBBS, DCH (Pediatrics)',
    experienceYears: 8,
    consultationFee: 50,
    rating: 4.6,
    isVerified: false, // Pending Admin Verification Demo
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80',
    availableSlots: ['09:00 AM', '12:00 PM', '04:00 PM'],
    hospital: 'Sunshine Childrens Care'
  }
]

export const INITIAL_PATIENTS = [
  {
    id: 'pat-1',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    dob: '1992-05-14',
    gender: 'Female',
    bloodGroup: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    emergencyContact: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'pat-2',
    name: 'Marcus Wright',
    email: 'marcus.wright@example.com',
    dob: '1988-11-20',
    gender: 'Male',
    bloodGroup: 'A+',
    allergies: ['Sulfa drugs'],
    emergencyContact: '+1 (555) 876-5432',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
]

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-101',
    patientId: 'pat-1',
    patientName: 'Eleanor Vance',
    doctorId: 'doc-1',
    doctorName: 'Dr. Robert Ford',
    doctorSpecialization: 'Cardiology',
    appointmentDate: '2026-08-14',
    timeSlot: '10:30 AM',
    status: 'approved', // pending | approved | completed | cancelled
    symptoms: 'Mild chest tightness, occasional palpitations during exercise for the last 3 days.',
    meetingLink: 'https://meet.jit.si/mediconnect-consult-apt-101',
    createdAt: new Date('2026-08-12T10:00:00Z').toISOString()
  },
  {
    id: 'apt-102',
    patientId: 'pat-2',
    patientName: 'Marcus Wright',
    doctorId: 'doc-2',
    doctorName: 'Dr. Sarah Connor',
    doctorSpecialization: 'Neurology',
    appointmentDate: '2026-08-15',
    timeSlot: '03:00 PM',
    status: 'pending',
    symptoms: 'Recurring migraine headaches on left side, light sensitivity in afternoon.',
    meetingLink: 'https://meet.jit.si/mediconnect-consult-apt-102',
    createdAt: new Date('2026-08-13T07:30:00Z').toISOString()
  },
  {
    id: 'apt-103',
    patientId: 'pat-1',
    patientName: 'Eleanor Vance',
    doctorId: 'doc-4',
    doctorName: 'Dr. Gregory House',
    doctorSpecialization: 'General Medicine',
    appointmentDate: '2026-08-10',
    timeSlot: '11:00 AM',
    status: 'completed',
    symptoms: 'Seasonal flu, sore throat, and body ache.',
    meetingLink: 'https://meet.jit.si/mediconnect-consult-apt-103',
    createdAt: new Date('2026-08-09T14:20:00Z').toISOString()
  }
]

export const INITIAL_PRESCRIPTIONS = [
  {
    id: 'rx-201',
    appointmentId: 'apt-103',
    patientId: 'pat-1',
    patientName: 'Eleanor Vance',
    doctorId: 'doc-4',
    doctorName: 'Dr. Gregory House',
    doctorSpecialization: 'General Medicine',
    diagnosis: 'Acute Viral Upper Respiratory Infection (Seasonal Flu)',
    issuedAt: '2026-08-10T11:45:00Z',
    medicines: [
      { name: 'Paracetamol', dosage: '650 mg', frequency: '1-0-1 (After Meals)', durationDays: 5 },
      { name: 'Cetirizine', dosage: '10 mg', frequency: '0-0-1 (Night)', durationDays: 3 },
      { name: 'Vitamin C Supplement', dosage: '500 mg', frequency: '1-0-0 (Morning)', durationDays: 10 }
    ],
    instructions: 'Maintain warm hydration. Avoid cold foods. Rest for at least 3 days.'
  }
]

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'pat-1',
    title: 'Appointment Approved',
    message: 'Your appointment with Dr. Robert Ford for Aug 14 at 10:30 AM has been confirmed.',
    type: 'appointment_status',
    isRead: false,
    createdAt: '2026-08-12T10:15:00Z'
  },
  {
    id: 'notif-2',
    userId: 'doc-1',
    title: 'New Appointment Booking',
    message: 'Eleanor Vance requested a consultation for Cardiology.',
    type: 'appointment_request',
    isRead: true,
    createdAt: '2026-08-12T10:00:00Z'
  }
]

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-1',
    actorId: 'doc-4',
    actorName: 'Dr. Gregory House',
    actorRole: 'Doctor',
    action: 'CREATE_PRESCRIPTION',
    target: 'Prescription #rx-201 for Eleanor Vance',
    timestamp: '2026-08-10T11:45:00Z'
  },
  {
    id: 'log-2',
    actorId: 'pat-1',
    actorName: 'Eleanor Vance',
    actorRole: 'Patient',
    action: 'BOOK_APPOINTMENT',
    target: 'Appointment #apt-101 with Dr. Robert Ford',
    timestamp: '2026-08-12T10:00:00Z'
  },
  {
    id: 'log-3',
    actorId: 'admin-1',
    actorName: 'System Admin',
    actorRole: 'Admin',
    action: 'VERIFY_DOCTOR',
    target: 'Verified Dr. Sarah Connor credentials',
    timestamp: '2026-08-01T09:00:00Z'
  }
]

export const INITIAL_DEPARTMENTS = [
  { id: 'dept-1', name: 'Cardiology', headDoctor: 'Dr. Robert Ford', staffCount: 24, bedsCount: 30, status: 'Active' },
  { id: 'dept-2', name: 'Neurology', headDoctor: 'Dr. Sarah Connor', staffCount: 18, bedsCount: 20, status: 'Active' },
  { id: 'dept-3', name: 'Orthopedics', headDoctor: 'Dr. James Wilson', staffCount: 15, bedsCount: 25, status: 'Active' },
  { id: 'dept-4', name: 'General Medicine', headDoctor: 'Dr. Gregory House', staffCount: 32, bedsCount: 45, status: 'Active' },
  { id: 'dept-5', name: 'Pediatrics', headDoctor: 'Dr. John Watson', staffCount: 14, bedsCount: 15, status: 'Active' }
]

export const INITIAL_MEDICINES = [
  { id: 'med-101', name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 350, expiryDate: '2027-11-30', supplier: 'Pfizer Pharma', price: 12.5 },
  { id: 'med-102', name: 'Paracetamol 650mg', category: 'Analgesic', stock: 45, expiryDate: '2026-09-15', supplier: 'Novartis Healthcare', price: 5.0 },
  { id: 'med-103', name: 'Atorvastatin 10mg', category: 'Cardiovascular', stock: 120, expiryDate: '2028-01-20', supplier: 'Sanofi Corp', price: 24.0 },
  { id: 'med-104', name: 'Metformin 850mg', category: 'Antidiabetic', stock: 28, expiryDate: '2026-10-10', supplier: 'Merck Global', price: 18.0 },
  { id: 'med-105', name: 'Azithromycin 250mg', category: 'Antibiotic', stock: 210, expiryDate: '2027-05-18', supplier: 'GlaxoSmithKline', price: 15.0 }
]

export const INITIAL_LAB_REPORTS = [
  { id: 'lab-901', patientName: 'Eleanor Vance', testType: 'Complete Blood Count (CBC) & Lipid Panel', date: '2026-08-12', status: 'Completed', technician: 'Dr. Sarah Connor' },
  { id: 'lab-902', patientName: 'Marcus Wright', testType: 'MRI Cardiac Angiogram', date: '2026-08-13', status: 'In Progress', technician: 'Tech Mark R.' },
  { id: 'lab-903', patientName: 'Eleanor Vance', testType: 'Thyroid Profile (T3, T4, TSH)', date: '2026-08-13', status: 'Completed', technician: 'Dr. John Watson' }
]

export const INITIAL_BEDS = [
  { id: 'bed-101', ward: 'ICU Ward', roomNo: 'ICU-1', status: 'Occupied', patientName: 'Eleanor Vance', assignedDate: '2026-08-10' },
  { id: 'bed-102', ward: 'ICU Ward', roomNo: 'ICU-2', status: 'Available', patientName: null, assignedDate: null },
  { id: 'bed-103', ward: 'General Ward', roomNo: 'GW-12', status: 'Occupied', patientName: 'Marcus Wright', assignedDate: '2026-08-11' },
  { id: 'bed-104', ward: 'General Ward', roomNo: 'GW-14', status: 'Available', patientName: null, assignedDate: null },
  { id: 'bed-105', ward: 'Cardiac ICU', roomNo: 'CICU-4', status: 'Available', patientName: null, assignedDate: null },
  { id: 'bed-106', ward: 'Cardiac ICU', roomNo: 'CICU-5', status: 'Available', patientName: null, assignedDate: null }
]

export const INITIAL_BILLS = [
  { id: 'inv-8801', patientName: 'Eleanor Vance', service: 'ICU Stay & Cardiology Consultation', amount: 1450.0, status: 'Paid', date: '2026-08-10', insuranceClaimed: true },
  { id: 'inv-8802', patientName: 'Marcus Wright', service: 'OPD Consultation & Pathology Lab', amount: 280.0, status: 'Pending', date: '2026-08-11', insuranceClaimed: false },
  { id: 'inv-8803', patientName: 'Eleanor Vance', service: 'MRI Diagnostic & Pharmacy Prescriptions', amount: 820.0, status: 'Paid', date: '2026-08-12', insuranceClaimed: true }
]

export const INITIAL_EMERGENCY_ALERTS = [
  { id: 'er-1', patientName: 'Eleanor Vance', condition: 'Acute Chest Oppression & High Pulse (140 BPM)', location: 'East Wing ICU Room 204', sla: '5 Mins', status: 'Active Dispatch' },
  { id: 'er-2', patientName: 'Marcus Wright', condition: 'Severe Trauma & Head Injury', location: 'Emergency Bay 2', sla: '5 Mins', status: 'Active Dispatch' }
]

export const INITIAL_STAFF = [
  { id: 'st-1', name: 'Super Admin', role: 'Super Admin', dept: 'Hospital Executive', email: 'admin@apollo.org', access: 'Full Control' },
  { id: 'st-2', name: 'Dr. Robert Ford', role: 'Chief Physician', dept: 'Cardiology', email: 'r.ford@apollo.org', access: 'Clinical & EMR' },
  { id: 'st-3', name: 'Nurse Sarah Connor', role: 'Head Nurse', dept: 'ICU Ward', email: 's.connor@apollo.org', access: 'Patient Vitals & Beds' },
  { id: 'st-4', name: 'Mark R. Pharmacist', role: 'Chief Pharmacist', dept: 'Pharmacy', email: 'm.pharm@apollo.org', access: 'Inventory & Rx' }
]

export const INITIAL_SYSTEM_SETTINGS = {
  name: 'MedHelp',
  tagline: 'Advanced Healthcare Management System',
  address: '742 Healthcare Avenue, Medical District, New York, NY 10001',
  phone: '+1 (800) 633-4227',
  email: 'support@medhelp.health',
  opdHours: '08:00 AM – 08:00 PM (Mon–Sat)',
  backupFrequency: 'Daily Automatic Cloud Snapshot'
}

export const INITIAL_RUNNING_MEDICATIONS = [
  {
    id: 'med-reg-1',
    patientName: 'Eleanor Vance',
    medicineName: 'Atorvastatin 20mg',
    dosage: '1 tablet',
    frequency: '0-0-1 (Night, After Food)',
    prescribedBy: 'Dr. Robert Ford',
    startDate: '2026-08-01',
    duration: '30 Days',
    status: 'Active',
    instructions: 'Cholesterol control. Take regularly with a glass of water.'
  },
  {
    id: 'med-reg-2',
    patientName: 'Eleanor Vance',
    medicineName: 'Metoprolol Tartrate 50mg',
    dosage: '1 tablet',
    frequency: '1-0-1 (Morning & Night)',
    prescribedBy: 'Dr. Robert Ford',
    startDate: '2026-08-05',
    duration: '60 Days',
    status: 'Active',
    instructions: 'Blood pressure & pulse rate regulation. Take with food.'
  },
  {
    id: 'med-reg-3',
    patientName: 'Eleanor Vance',
    medicineName: 'Vitamin D3 60,000 IU',
    dosage: '1 capsule',
    frequency: 'Once weekly (Sunday Morning)',
    prescribedBy: 'Dr. Gregory House',
    startDate: '2026-08-10',
    duration: '8 Weeks',
    status: 'Active',
    instructions: 'Bone health & calcium absorption. Take with milk or meal.'
  },
  {
    id: 'med-reg-4',
    patientName: 'Marcus Wright',
    medicineName: 'Amoxicillin 500mg',
    dosage: '1 capsule',
    frequency: '1-1-1 (Every 8 hours)',
    prescribedBy: 'Dr. Sarah Connor',
    startDate: '2026-08-12',
    duration: '7 Days',
    status: 'Active',
    instructions: 'Complete the entire antibiotic course.'
  }
]

export const INITIAL_SCHEDULED_TESTS = [
  {
    id: 'tst-501',
    patientName: 'Eleanor Vance',
    testName: 'Fasting Blood Sugar & HbA1c',
    department: 'Pathology Laboratory',
    scheduledDate: '2026-08-16',
    timeSlot: '08:30 AM',
    status: 'Scheduled',
    preparation: 'Strict 10-hour overnight fasting required. Water is permitted.',
    orderedBy: 'Dr. Robert Ford',
    priority: 'Routine'
  },
  {
    id: 'tst-502',
    patientName: 'Eleanor Vance',
    testName: 'Echocardiogram (2D Echo with Doppler)',
    department: 'Cardiology Diagnostics',
    scheduledDate: '2026-08-18',
    timeSlot: '11:00 AM',
    status: 'Scheduled',
    preparation: 'Wear comfortable two-piece clothing. No heavy meals 2 hours prior.',
    orderedBy: 'Dr. Robert Ford',
    priority: 'Urgent'
  },
  {
    id: 'tst-503',
    patientName: 'Eleanor Vance',
    testName: 'Complete Blood Count (CBC) & Lipid Panel',
    department: 'Pathology Laboratory',
    scheduledDate: '2026-08-12',
    timeSlot: '09:00 AM',
    status: 'Completed',
    preparation: 'Fasting sample collected.',
    orderedBy: 'Dr. Robert Ford',
    priority: 'Routine',
    findings: 'All lipid parameters within optimal threshold. LDL: 85 mg/dL.'
  },
  {
    id: 'tst-504',
    patientName: 'Marcus Wright',
    testName: 'Brain MRI with Contrast',
    department: 'Radiology & Imaging',
    scheduledDate: '2026-08-17',
    timeSlot: '02:30 PM',
    status: 'Scheduled',
    preparation: 'Remove all metal jewelry. 4 hours fasting before scan.',
    orderedBy: 'Dr. Sarah Connor',
    priority: 'Urgent'
  }
]

export const INITIAL_PATIENT_DOCUMENTS = [
  {
    id: 'doc-701',
    patientName: 'Eleanor Vance',
    title: 'Cardiology Clinical Consultation Note & Resting ECG',
    category: 'Clinical Note',
    doctorName: 'Dr. Robert Ford',
    date: '2026-08-14',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    summary: 'Sinus rhythm evaluation with resting 12-lead ECG strip and therapeutic lifestyle recommendations.'
  },
  {
    id: 'doc-702',
    patientName: 'Eleanor Vance',
    title: 'Official Electronic Prescription #rx-201',
    category: 'Prescription',
    doctorName: 'Dr. Gregory House',
    date: '2026-08-10',
    fileType: 'PDF',
    fileSize: '420 KB',
    summary: 'Seasonal upper respiratory treatment course and anti-allergy medication schedule.'
  },
  {
    id: 'doc-703',
    patientName: 'Eleanor Vance',
    title: 'Comprehensive Lipid Panel & Biochemistry Report',
    category: 'Lab Report',
    doctorName: 'Dr. Sarah Connor',
    date: '2026-08-12',
    fileType: 'PDF',
    fileSize: '950 KB',
    summary: 'Certified clinical biochemistry profile and serum electrolyte test values.'
  },
  {
    id: 'doc-704',
    patientName: 'Eleanor Vance',
    title: 'Inpatient Observation & Discharge Summary',
    category: 'Discharge Summary',
    doctorName: 'Dr. Robert Ford',
    date: '2026-08-08',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    summary: 'Clinical discharge protocol, post-observation vitals, and scheduled follow-up timeline.'
  }
]

