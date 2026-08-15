# Edge Case Testing Report - Hospital Management System

## Edge Case Test Log

### 1. Authentication Edge Cases

| Test Case | Condition / Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| **EC-AUTH-01** | Empty Email / Password submit | Validation error banner displayed | "Please enter both email and password" toast shown | PASS |
| **EC-AUTH-02** | Invalid Email Format (`user@invalid`) | HTML5 & JS form validation block | Browser validation halts form submission | PASS |
| **EC-AUTH-03** | Incorrect Password for registered account | Authentication error caught | "Invalid credentials. Please check..." error toast | PASS |
| **EC-AUTH-04** | Non-existent user email | Auth lookup failure caught | Account creation prompt modal triggered | PASS |
| **EC-AUTH-05** | Unauthorized URL jump (`/admin/dashboard` as Patient) | `ProtectedRoute` role check fails | Redirected back to `/patient/dashboard` | PASS |
| **EC-AUTH-06** | Browser refresh while authenticated | Session restored from storage | User session restored without re-login | PASS |
| **EC-AUTH-07** | Browser back button after Logout | Cached page request rejected | `ProtectedRoute` redirects back to `/login` | PASS |

### 2. Appointment Booking Edge Cases

| Test Case | Condition / Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| **EC-APPT-01** | Submitting booking with missing doctor | Form validation blocks submit | "Please select a doctor" alert displayed | PASS |
| **EC-APPT-02** | Booking appointment in past date | Date selector restricts past dates | Min date attribute prevents past selection | PASS |
| **EC-APPT-03** | Cloud Firestore network disconnect | Fallback to `localStorage` | Appointment saved to local storage fallback | PASS |
| **EC-APPT-04** | Rapid double click on Book button | Debounce or single submit processing | Single appointment record created | PASS |

### 3. Prescription & Form Edge Cases

| Test Case | Condition / Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| **EC-FORM-01** | Empty medication dosage input | `validationService` flags error | "Dosage is required" validation message | PASS |
| **EC-FORM-02** | Exceedingly long text input (500+ chars) | Layout wraps text gracefully | Card container wraps text without overflow | PASS |
| **EC-FORM-03** | Modal close via ESC key or overlay click | Modal state set to closed (`isOpen: false`) | Modal closes cleanly without state loss | PASS |

### 4. Responsive & Layout Edge Cases

| Test Case | Condition / Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| **EC-RESP-01** | Viewport width 375px (iPhone SE) | No horizontal page overflow | Content fits inside 375px with mobile drawer | PASS |
| **EC-RESP-02** | Multi-column table on mobile screen | Table container scrolls horizontally | `<div className="overflow-x-auto">` scrolls | PASS |
| **EC-RESP-03** | Rapid drawer toggle click | Drawer animation completes smoothly | Drawer toggles state without double-rendering | PASS |
