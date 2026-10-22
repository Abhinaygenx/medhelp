# 🏥 MediCare Pro — Enterprise Hospital Management System

> **Client Pitch Edition** — A modern, accessible, multi-portal healthcare management web application designed for hospitals, clinics, and health networks. Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Google Firebase**.

---

## 🌟 Demo Credentials (1-Click Login Available)

On the login page, you can click any of the **Quick Demo Login** cards to test each role instantly:

| Portal Role | Demo Email | Password | Access Scope |
|---|---|---|---|
| **Admin** | `admin@demo.medicarepro.health` | `admin123` | Executive Dashboard, Bed/Ward Management, Billing, Staff Roles, Emergency SLAs |
| **Doctor** | `doctor@demo.medicarepro.health` | `doctor123` | OPD Clinical Queue, Video Consultations, E-Prescriptions, Lab Reports |
| **Patient** | `patient@demo.medicarepro.health` | `patient123` | Doctor Search, Slot Booking, Medical Timeline, Digital Invoices, AI Triage |

*(Also supports any custom credentials or existing demo accounts with offline localStorage fallback.)*

---

## 🎨 Rebranding in Minutes (`clientConfig.js`)

All client branding, hospital name, contact numbers, hours, departments, and feature flags live in a single centralized config file:

📁 **`src/config/clientConfig.js`**

```javascript
export const CLIENT = {
  name: 'Your Hospital Name',
  tagline: 'Advanced Healthcare Management System',
  address: '123 Medical Center Way, Suite 400',
  phone: '+1 (800) 555-CARE',
  emergency: '+1 (800) 911-HELP',
  email: 'contact@yourhospital.com',
  features: {
    teleconsultation: true,
    aiSymptomChecker: true,
    billingPdfExport: true,
    patientTimeline: true,
    smsReminders: true,
    darkModeToggle: true,
  }
}
```

Change this file, and the entire app (landing page, headers, sidebar, invoices, and modals) immediately updates!

---

## 🚀 Key Client Capabilities & Added Features

### 1. 🌐 Public Hero & Marketing Landing Page (`LandingPage.jsx`)
- Clean medical headline and value proposition.
- 1-click primary action (*"Book Appointment"*) and staff entry (*"Portal Login"*).
- Role-based cards for Patient, Doctor, and Admin.
- Quick-access services strip, hospital key metrics, departments, and 24/7 emergency contact bar.

### 2. 📅 Interactive Appointment Booking with Time Slots (`AppointmentBooking.jsx`)
- Searchable doctor directory with specialty filters and verified ratings.
- Real date picker with fast validation.
- Interactive time slot selector (Morning, Afternoon, Evening grids).
- Symptoms & chief complaints intake with consultation fee breakdown.

### 3. 📜 Patient Medical History Timeline (`MedicalTimeline.jsx`)
- Chronological timeline tracking doctor consultations, laboratory test results, and e-prescriptions.
- Filter by category (Consultations, Prescriptions, Lab Reports).
- HIPAA-compliant clinical record audit markers.

### 4. 🧾 Branded Invoices & PDF Print Export (`InvoiceModal.jsx`)
- Available in both Admin and Patient portals.
- Clean printable tax receipt format with hospital branding, patient EMR ID, itemized services, and status badges.
- Built-in `window.print()` support to save as PDF or print directly.

### 5. 🔔 Multi-Channel Notification & Reminder Service (`notificationService.js`)
- Automated appointment reminder dispatchers (SMS + Email stubs).
- Emergency ER alert broadcasting with real-time feedback.
- Prescription readiness notifications.

### 6. 🎨 Unified Design System & Accessibility
- Cohesive, calm medical blue & teal palette (`#2563eb`, `#0d9488`).
- Eliminated all clashing neon yellows and dark-green palettes across the three portals.
- Full Light and Dark mode toggle with persistent preference memory.
- Standardized components: `Badge`, `Card`, `Skeleton`, `EmptyState`, `InvoiceModal`.

---

## 🛠️ Tech Stack

- **Frontend Core:** React 19, JavaScript (ES6+), HTML5, CSS3
- **Build Tool & Bundler:** Vite 8
- **Styling:** Tailwind CSS v4 + Unified CSS Variables Design System
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Teleconsultation Video:** Jitsi Meet API (`meet.jit.si`)
- **Backend / Authentication:** Firebase Auth + Firestore (with automatic LocalStorage offline sync)
- **Toast Notifications:** React Hot Toast

---

## 💻 Quick Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/srikarkamina/hospital-management-system.git
   cd hospital-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   Copy `.env.example` to `.env.local` if using live Firebase:
   ```bash
   cp .env.example .env.local
   ```
   *Note: Without Firebase credentials, the system automatically runs in full offline demo mode using synchronized localStorage.*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Production Build:**
   ```bash
   npm run build
   ```
   The optimized production bundle is compiled to `dist/`.

---

## 📄 License

MIT License — Customized for client demonstration and enterprise evaluation.
