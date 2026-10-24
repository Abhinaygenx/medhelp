/**
 * CLIENT CONFIGURATION — Edit this file to rebrand for any client.
 * All hospital name, color, contact, and feature flags live here.
 */
export const CLIENT = {
  // ── Branding ──────────────────────────────────────────────────────────────
  name: 'MedHelp',
  tagline: 'Advanced Healthcare Management System',
  shortName: 'MedHelp',
  logoText: 'MedHelp',
  version: '2.0',

  // ── Contact & Location ────────────────────────────────────────────────────
  address: '742 Healthcare Avenue, Medical District, New York, NY 10001',
  phone: '+1 (800) 633-4227',
  emergency: '+1 (800) 911-HELP',
  email: 'support@medhelp.health',
  website: 'https://medhelp.health',

  // ── Operating Hours ───────────────────────────────────────────────────────
  opdHours: '08:00 AM – 08:00 PM (Mon–Sat)',
  emergencyHours: '24/7 Emergency Care Available',

  // ── Landing Page Stats (update with real numbers) ──────────────────────────
  stats: {
    patients: '50,000+',
    doctors: '200+',
    departments: '25+',
    successRate: '98.7%',
    yearsExperience: '15+',
    bedCapacity: '500+',
  },

  // ── Departments ───────────────────────────────────────────────────────────
  departments: [
    'Cardiology', 'Neurology', 'Orthopedics',
    'General Medicine', 'Pediatrics', 'Oncology',
    'Radiology', 'Emergency Care',
  ],

  // ── Demo Credentials (shown on login page) ────────────────────────────────
  demoCredentials: {
    admin:   { email: 'admin@demo.medhelp.health',   password: 'admin123',   name: 'Hospital Admin' },
    doctor:  { email: 'doctor@demo.medhelp.health',  password: 'doctor123',  name: 'Dr. Robert Ford' },
    patient: { email: 'patient@demo.medhelp.health', password: 'patient123', name: 'Eleanor Vance' },
  },

  // ── Feature Flags ─────────────────────────────────────────────────────────
  features: {
    teleconsultation: true,
    aiSymptomChecker: false,
    clinicalHub: true,
    patientMedications: true,
    scheduledTests: true,
    documentVault: true,
    billingPdfExport: true,
    patientTimeline: true,
    smsReminders: false,      // set true when backend is wired
    emailReminders: false,    // set true when backend is wired
    darkModeToggle: true,
  },
}

export default CLIENT
