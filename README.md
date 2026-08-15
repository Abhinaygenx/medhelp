# Hospital Management System

A modern, responsive, multi-portal web application for clinical workflow management, patient self-service care, and hospital operations administration built with **React 19**, **Vite**, **Tailwind CSS**, and **Google Firebase**.

---

## 📋 Overview

The **Hospital Management System (HMS)** is an integrated healthcare platform designed to streamline communication and clinical operations across three primary hospital stakeholders: **Patients**, **Doctors**, and **Hospital Administrators**.

Rather than operating as a simple administrative CRUD tool, the platform connects patient self-triage, OPD appointment scheduling, WebRTC video teleconsultation, digital e-prescription drafting, pharmacy inventory tracking, and administrative analytics into a single, real-time synchronized system.

---

## 🌟 Key Features

### 👤 Patient Portal
- **Interactive Patient Dashboard:** Health Score gauge card (88/100), vital telemetry monitoring (Heart Rate, Blood Pressure, SpO2, Temperature), and quick action shortcuts.
- **AI-Driven Symptom Triage:** Diagnostic triage engine analyzing chief complaints, symptom severity, and duration to recommend specialist consultations and auto-book appointments.
- **Doctor Discovery & Appointment Booking:** Search doctors by specialty, view availability slots, and book real-time consultations.
- **Embedded WebRTC Teleconsultation:** Virtual video consultation powered by the Jitsi Meet API with audio, video, and screen share controls.
- **Digital E-Prescription Viewer:** Download digital prescriptions as formatted `.txt` files or print physical copies.
- **Medical Records & Billing:** View diagnostic lab reports, clinical visit history, and itemized billing invoices.

### 🩺 Doctor Portal
- **OPD Clinical Dashboard:** Daily consultation metrics, patient queue status, and activity analytics.
- **Triage Priority OPD Queue:** Automated appointment sorting ordering high-priority and urgent cases to the top of the doctor's roster.
- **Integrated Teleconsultation Room:** Direct launching of WebRTC video visits inside the portal with live patient EHR inspection.
- **Digital E-Prescription Generator:** Clinical prescription drafting with dosage validation (`validationService.js`), medicine list management, print utility, and instant file export.
- **Lab Reports & Patient Records:** Access diagnostic reports, patient medical history, and clinical notes.
- **Schedule Management:** Configure working hours, appointment slots, and leave schedules.

### 🛡️ Admin Portal
- **Executive Operations Dashboard:** Real-time hospital metrics, bed occupancy rates, revenue statistics, and departmental KPIs.
- **Patient & Doctor Management:** Verify medical licenses, manage active user accounts, and assign staff roles.
- **Emergency ER Dispatch System:** Critical ER alert banner featuring a red pulsing 5-minute SLA countdown timer and dispatch workflow.
- **Pharmacy & Laboratory Operations:** Track medicine inventories, manage stock levels, and review diagnostic lab requests.
- **Bed & Ward Management:** Allocation tracking across General, ICU, Pediatrics, and Emergency wards.
- **Analytics & Operational Reporting:** Interactive visual charts powered by **Recharts** for revenue and patient intake analysis.
- **Regulatory Audit Logs:** Security audit logging recording system actions, payment events, and user status changes with exact timestamps.

---

## 🏗️ System Architecture

```text
                    USERS
                      │
          ┌───────────┼───────────┐
          ↓           ↓           ↓
       Patient      Doctor      Admin
   (Self-Service)  (Clinical)  (Operations)
          │           │           │
          └───────────┼───────────┘
                      ↓
           React 19 / Vite SPA
                      │
          ┌───────────┴───────────┐
          ↓                       ↓
 Firebase Authentication     Cloud Firestore
   (Google OAuth & Email)   (Real-Time Push Sync)
          │                       │
          ↓                       ↓
     Firebase UID            Application Data
          │                       │
          └───────────┬───────────┘
                      ↓
              Firestore Rules
                      ↓
             LocalStorage Fallback
           (Offline Continuity)
                      │
                      ↓
            Jitsi Meet Video API
           (Telehealth Video Call)
```

---

## 🛠️ Technology Stack

- **Frontend Core:** React 19, JavaScript (ES6+), HTML5, CSS3
- **Build Tool & Dev Server:** Vite 8
- **Styling & Design System:** Tailwind CSS v4, Lucide React Icons
- **Cloud Backend (BaaS):** Firebase Web v9+ (Firebase Authentication & Cloud Firestore)
- **Data Visualization:** Recharts
- **Telehealth Video API:** Jitsi Meet API (`meet.jit.si`)
- **State Management & Routing:** React 19 Context API, React Router v7 (`react-router-dom`)
- **Offline Persistence:** Web LocalStorage API via `storageService.js`
- **Code Quality & Linting:** Oxlint (`.oxlintrc.json`)

---

## 📁 Project Structure

```text
hospital-management-system/
├── dist/                      # Compiled production build output
├── docs/                      # Formal QA and testing documentation
│   └── testing/
│       ├── test-results.md         # 24 formal system test cases log
│       ├── edge-case-testing.md    # 14 edge case scenarios log
│       ├── performance-testing.md # Build performance & bundle metrics
│       └── testing-checklist.md   # Master Section 9 QA checklist
├── public/                    # Static assets
├── src/
│   ├── components/            # React UI components
│   │   ├── admin/             # 20 Admin Portal modules
│   │   ├── doctor/            # 12 Doctor Portal modules
│   │   ├── patient/           # 12 Patient Portal modules
│   │   ├── common/            # Shared cards, badges, spinners, dialogs
│   │   ├── AISymptomChecker.jsx
│   │   ├── HealthScoreCard.jsx
│   │   ├── TeleconsultationModal.jsx
│   │   └── LoginPage.jsx
│   ├── data/                  # Initial seed dataset & medical records
│   ├── pages/                 # Top-level portal layout containers
│   ├── services/              # LocalStorage fallback & validation logic
│   ├── App.jsx                # Main controller, router guards, & Firestore listener
│   ├── firebase.js            # Firebase SDK initialization & exports
│   ├── index.css              # Design system tokens & Tailwind CSS imports
│   └── main.jsx               # React DOM entry point
├── .env.example               # Environment variables template
├── .firebaserc                # Firebase CLI project alias
├── firebase.json              # Firebase Hosting SPA configuration
├── firestore.rules            # Firestore server-side security rules
├── package.json               # NPM dependencies and scripts
└── vite.config.js             # Vite build configuration
```

---

## 🧪 Testing & Quality Assurance

The application underwent rigorous functional, security, responsive, build, and edge-case testing. Full evidence documents are available in the repository:

- 📑 **[Formal Test Results (24 Test Cases)](docs/testing/test-results.md)** — Functional test logs covering authentication, role redirection, booking, real-time Firestore sync, and teleconsultation.
- 🧪 **[Edge Case Testing Log](docs/testing/edge-case-testing.md)** — Input validation bounds, invalid credentials, offline disconnections, and responsive viewport limits.
- ⚡ **[Performance & Build Metrics](docs/testing/performance-testing.md)** — Production bundle sizes, Vite build times (672 ms), and lazy-loaded code-splitting breakdown.
- ✅ **[Master Testing Checklist](docs/testing/testing-checklist.md)** — Section 9 QA checklist verification.

---

## 🚀 Installation & Quick Start

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/srikarkamina/hospital-management-system.git
   cd hospital-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local` and add your Firebase project keys:
   ```bash
   cp .env.example .env.local
   ```
   *Note: If `.env.local` is omitted, the application uses default development credentials with local storage fallback.*

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 📦 Production Build

To compile the production-ready client bundle:

```bash
npm run build
```

The optimized output will be generated in the `dist/` directory:
- `dist/index.html` — SPA Entry Point
- `dist/assets/index-*.css` — Compiled Stylesheet (~13.6 kB gzipped)
- `dist/assets/index-*.js` — Core JavaScript Bundle (~406 kB gzipped)

To preview the production build locally:
```bash
npm run preview
```

---

## 🔒 Security Audit & Environment Protection

- **Environment Protection:** `.env.local` and `.env.*` files are safely excluded via `.gitignore`.
- **Firebase Configuration:** Firebase keys used on the client-side are public identifier tokens restricted by HTTP domain restrictions in the Firebase Console.
- **Database Security:** Server-side access control is enforced via [firestore.rules](file:///d:/vibe%20coding/starter/firestore.rules).
- **Authentication Guards:** Client-side navigation is protected by `ProtectedRoute` components in [App.jsx](file:///d:/vibe%20coding/starter/src/App.jsx).

---

## 📄 License & Author

Developed by **Srikar Kamina** for the Final University Project Evaluation.

- **Repository:** [https://github.com/srikarkamina/hospital-management-system](https://github.com/srikarkamina/hospital-management-system)
