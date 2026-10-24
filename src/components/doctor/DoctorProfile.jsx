import React, { useState } from 'react'
import { User, ShieldCheck, Mail, Phone, Save, CheckCircle2, AlertCircle } from 'lucide-react'
import { loadData, saveData } from '../../services/storageService'
import { validateDoctorProfile } from '../../services/validationService'
import { simulateApiCall } from '../../services/mockApi'
import LoadingSpinner from '../common/LoadingSpinner'
import toast from 'react-hot-toast'

export default function DoctorProfile({ doctorProfile = {} }) {
  const DEFAULT_PROFILE = {
    name: doctorProfile.name || 'Dr. Robert Ford',
    specialization: doctorProfile.specialization || 'Cardiology Specialist',
    department: 'Cardiovascular Surgery & Clinical Cardiology',
    experience: '16 Years',
    qualification: 'MD, FACC, MBBS (Harvard Medical School)',
    licenseNumber: 'MD-USA-99882104',
    email: 'kaminasrikar@gmail.com',
    phone: '5550192834',
    isAvailable: true,
    emailNotifs: true,
    smsNotifs: false
  }

  const [profile, setProfile] = useState(() => loadData('doctor_profile_data', DEFAULT_PROFILE))
  const [formErrors, setFormErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    const { isValid, errors } = validateDoctorProfile({ 
      name: profile.name, 
      email: profile.email, 
      phone: profile.phone 
    })

    if (!isValid) {
      setFormErrors(errors)
      toast.error('Please fix profile validation errors.')
      return
    }

    setFormErrors({})
    setIsLoading(true)

    try {
      await simulateApiCall(profile)
      saveData('doctor_profile_data', profile)
      setIsSaved(true)
      toast.success('Physician profile settings saved successfully!')
      setTimeout(() => setIsSaved(false), 4000)
    } catch (err) {
      toast.error('Failed to save profile settings.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--border-light)] shadow-sm p-5 sm:p-8 space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200 text-[var(--text-primary)]">
      
      {/* Profile Header Banner */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 border-b border-[var(--border-light)] pb-6">
        <img
          src={doctorProfile.avatar || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"}
          alt={profile.name}
          className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-500/40 shadow-md"
        />

        <div className="text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <h1 className="text-2xl font-extrabold text-[var(--text-primary)] font-['Space_Grotesk']">{profile.name}</h1>
            <ShieldCheck className="w-5 h-5 text-blue-500" title="Verified MD License" />
          </div>
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400">{profile.specialization}</p>
          <p className="text-xs text-[var(--text-muted)]">{profile.department} • {profile.experience} Experience</p>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20">
            License ID: {profile.licenseNumber}
          </span>
        </div>
      </div>

      {/* Form Details */}
      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* Section 1: Credentials */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-[var(--text-primary)] border-b border-[var(--border-light)] pb-2">
            Professional Credentials & Qualifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[var(--text-primary)] block mb-1">Full Name & Title *</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className={`w-full bg-[var(--surface-page)] border rounded-xl px-3.5 py-2.5 text-[var(--text-primary)] font-medium focus:outline-none ${
                  formErrors.name ? 'border-red-500 bg-red-500/10' : 'border-[var(--border-light)] focus:border-blue-500'
                }`}
              />
              {formErrors.name && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.name}</p>}
            </div>

            <div>
              <label className="font-bold text-[var(--text-primary)] block mb-1">Medical Specialization</label>
              <input
                type="text"
                value={profile.specialization}
                onChange={(e) => setProfile({...profile, specialization: e.target.value})}
                className="w-full bg-[var(--surface-page)] border border-[var(--border-light)] rounded-xl px-3.5 py-2.5 text-[var(--text-primary)] font-medium focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-primary)] block mb-1">Academic Qualifications</label>
              <input
                type="text"
                value={profile.qualification}
                onChange={(e) => setProfile({...profile, qualification: e.target.value})}
                className="w-full bg-[var(--surface-page)] border border-[var(--border-light)] rounded-xl px-3.5 py-2.5 text-[var(--text-primary)] font-medium focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-primary)] block mb-1">Medical License Number</label>
              <input
                type="text"
                value={profile.licenseNumber}
                onChange={(e) => setProfile({...profile, licenseNumber: e.target.value})}
                className="w-full bg-[var(--surface-page)] border border-[var(--border-light)] rounded-xl px-3.5 py-2.5 text-[var(--text-primary)] font-medium focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-primary)] block mb-1">Official Email *</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className={`w-full bg-[var(--surface-page)] border rounded-xl px-3.5 py-2.5 text-[var(--text-primary)] font-medium focus:outline-none ${
                  formErrors.email ? 'border-red-500 bg-red-500/10' : 'border-[var(--border-light)] focus:border-blue-500'
                }`}
              />
              {formErrors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.email}</p>}
            </div>

            <div>
              <label className="font-bold text-[var(--text-primary)] block mb-1">Contact Telephone (10 Digits) *</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className={`w-full bg-[var(--surface-page)] border rounded-xl px-3.5 py-2.5 text-[var(--text-primary)] font-medium focus:outline-none ${
                  formErrors.phone ? 'border-red-500 bg-red-500/10' : 'border-[var(--border-light)] focus:border-blue-500'
                }`}
              />
              {formErrors.phone && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Clinical Settings & Toggles */}
        <div className="space-y-4 pt-2">
          <h3 className="font-bold text-sm text-[var(--text-primary)] border-b border-[var(--border-light)] pb-2">
            Consultation & Notification Settings
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[var(--surface-page)] border border-[var(--border-light)] flex items-center justify-between">
              <div>
                <p className="font-bold text-[var(--text-primary)]">Available for OPD Consultations</p>
                <p className="text-[var(--text-muted)] text-[11px]">Allow patients to book teleconsultation slots</p>
              </div>
              <input
                type="checkbox"
                checked={profile.isAvailable}
                onChange={(e) => setProfile({...profile, isAvailable: e.target.checked})}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </div>

            <div className="p-4 rounded-xl bg-[var(--surface-page)] border border-[var(--border-light)] flex items-center justify-between">
              <div>
                <p className="font-bold text-[var(--text-primary)]">Email Consultation Alerts</p>
                <p className="text-[var(--text-muted)] text-[11px]">Receive immediate notifications for new patient bookings</p>
              </div>
              <input
                type="checkbox"
                checked={profile.emailNotifs}
                onChange={(e) => setProfile({...profile, emailNotifs: e.target.checked})}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </div>

            <div className="p-4 rounded-xl bg-[var(--surface-page)] border border-[var(--border-light)] flex items-center justify-between">
              <div>
                <p className="font-bold text-[var(--text-primary)]">SMS Emergency Alerts</p>
                <p className="text-[var(--text-muted)] text-[11px]">Receive SMS dispatch alerts for ER high-priority triage</p>
              </div>
              <input
                type="checkbox"
                checked={profile.smsNotifs}
                onChange={(e) => setProfile({...profile, smsNotifs: e.target.checked})}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md disabled:opacity-50"
          >
            {isLoading ? (
              <LoadingSpinner text="Saving Profile..." />
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>

          {isSaved && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Profile Changes Saved & Persisted!</span>
            </span>
          )}
        </div>

      </form>

    </div>
  )
}
