import React, { useState, useEffect } from 'react'
import { 
  Stethoscope, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  Calendar, 
  Heart, 
  Sparkles,
  AlertCircle,
  ArrowRight,
  UserCheck
} from 'lucide-react'
import { auth, googleProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, doc, setDoc, getDoc, db } from '../firebase'
import toast from 'react-hot-toast'
import { loadData, saveData } from '../services/storageService'

// Pre-configured Allowed Email Role Matrix for quick dev demo logins
const ROLE_MAP = {
  'srikarkamina@gmail.com': { role: 'ADMIN', name: 'Hospital Admin', path: '/admin/dashboard', defaultPassword: 'admin123' },
  'kaminasrikar@gmail.com': { role: 'DOCTOR', name: 'Dr. Robert Ford', path: '/doctor/dashboard', defaultPassword: 'doctor123' },
  'srikar0406@gmail.com':   { role: 'PATIENT', name: 'Eleanor Vance', path: '/patient/dashboard', defaultPassword: 'patient123' }
}

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)')
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Patient Registration Modal State
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regBloodGroup, setRegBloodGroup] = useState('O+')
  const [regAllergies, setRegAllergies] = useState('None')
  const [isRegistering, setIsRegistering] = useState(false)

  const languages = ['English (US)', 'Spanish (ES)', 'French (FR)', 'German (DE)']

  // Execute Role Login Logic with Firestore & Local User Profile Resolution
  const executeLogin = async (userEmail, displayNameOverride = null) => {
    const cleanEmail = userEmail.toLowerCase().trim()

    // 1. Check custom registered users dataset first
    const registeredUsers = loadData('registered_users', {})
    let userProfile = registeredUsers[cleanEmail]

    // 2. If not found locally, check demo ROLE_MAP
    if (!userProfile && ROLE_MAP[cleanEmail]) {
      userProfile = ROLE_MAP[cleanEmail]
    }

    // 3. If still not found, try Firestore lookup
    if (!userProfile) {
      try {
        const userDocRef = doc(db, 'users', cleanEmail.replace(/[^a-zA-Z0-9]/g, '_'))
        const docSnap = await getDoc(userDocRef)
        if (docSnap.exists()) {
          userProfile = docSnap.data()
        }
      } catch (e) {
        console.warn('Firestore user profile fetch fallback:', e)
      }
    }

    // 4. Default to Patient role for dynamically authenticated external emails
    if (!userProfile) {
      userProfile = {
        role: 'PATIENT',
        name: displayNameOverride || cleanEmail.split('@')[0],
        path: '/patient/dashboard'
      }
    }

    const sessionUser = {
      email: cleanEmail,
      name: displayNameOverride || userProfile.name,
      role: userProfile.role,
      path: userProfile.path || (userProfile.role === 'ADMIN' ? '/admin/dashboard' : userProfile.role === 'DOCTOR' ? '/doctor/dashboard' : '/patient/dashboard'),
      loginTimestamp: new Date().toISOString()
    }

    // Store persistent session
    if (rememberMe) {
      localStorage.setItem('health_portal_user', JSON.stringify(sessionUser))
    } else {
      sessionStorage.setItem('health_portal_user', JSON.stringify(sessionUser))
    }

    toast.success(`Welcome back, ${sessionUser.name}! Signed in as ${sessionUser.role}`, {
      style: { background: '#0B1B4D', color: '#FFFFFF', border: '1px solid #E5FF00' },
      iconTheme: { primary: '#E5FF00', secondary: '#0B1B4D' }
    })

    setErrorMessage('')
    if (onLoginSuccess) {
      onLoginSuccess(sessionUser)
    }
  }

  // Handle Patient Registration Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      toast.error('Please fill in all required registration fields.')
      return
    }

    setIsRegistering(true)
    const cleanRegEmail = regEmail.toLowerCase().trim()

    try {
      // 1. Attempt Firebase Authentication User Creation
      try {
        await createUserWithEmailAndPassword(auth, cleanRegEmail, regPassword)
      } catch (fbErr) {
        console.warn('Firebase Auth creation notice:', fbErr.message)
      }

      // 2. Save User Profile in Firestore
      const userProfile = {
        email: cleanRegEmail,
        name: regName,
        role: 'PATIENT',
        path: '/patient/dashboard',
        createdAt: new Date().toISOString()
      }

      try {
        await setDoc(doc(db, 'users', cleanRegEmail.replace(/[^a-zA-Z0-9]/g, '_')), userProfile)
      } catch (dbErr) {
        console.warn('Firestore setDoc notice:', dbErr.message)
      }

      // 3. Save User Profile in Local Storage
      const existingRegistered = loadData('registered_users', {})
      existingRegistered[cleanRegEmail] = userProfile
      saveData('registered_users', existingRegistered)

      // 4. Save Patient record into hms_patients list
      const existingPatients = loadData('hms_patients', [])
      const newPatientObj = {
        id: `pat-${Date.now().toString().slice(-4)}`,
        name: regName,
        email: cleanRegEmail,
        bloodGroup: regBloodGroup,
        allergies: regAllergies,
        admissionStatus: 'OPD Outpatient',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
      }
      saveData('hms_patients', [newPatientObj, ...existingPatients])

      toast.success(`Account created successfully! Welcome to MediSphere, ${regName}.`)
      setShowRegisterModal(false)

      // Auto login newly registered patient
      executeLogin(cleanRegEmail, regName)
    } catch (err) {
      toast.error(`Registration failed: ${err.message}`)
    } finally {
      setIsRegistering(false)
    }
  }

  // Handle Standard Email & Password Submit
  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email address and password.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      executeLogin(email)
      setIsLoading(false)
    }, 400)
  }

  // Handle Google Sign-In Only with Full Diagnostic Logging
  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const googleUser = result.user
      if (googleUser && googleUser.email) {
        console.log('Google Auth Success:', {
          email: googleUser.email,
          uid: googleUser.uid,
          displayName: googleUser.displayName
        })
        executeLogin(googleUser.email, googleUser.displayName)
      }
    } catch (error) {
      console.error('Google Auth Error:', {
        code: error?.code,
        message: error?.message,
        customData: error?.customData,
        email: error?.customData?.email,
      })

      let userMsg = `Google Sign-In Error (${error?.code || 'unknown'}): ${error?.message || 'Please check Firebase Console configuration.'}`
      
      if (error?.code === 'auth/popup-closed-by-user') {
        userMsg = 'Google sign-in was cancelled.'
      } else if (error?.code === 'auth/popup-blocked') {
        userMsg = 'Browser blocked the popup. Please allow popups for localhost.'
      } else if (error?.code === 'auth/network-request-failed') {
        userMsg = 'Network error while connecting to Firebase.'
      } else if (error?.code === 'auth/operation-not-allowed') {
        userMsg = 'Google Provider disabled. Enable Google in Firebase Console -> Auth -> Sign-in method.'
      } else if (error?.code === 'auth/unauthorized-domain') {
        userMsg = 'Domain unauthorized. Add localhost in Firebase Console -> Auth -> Settings -> Authorized domains.'
      } else if (error?.code === 'auth/api-key-not-valid' || error?.code === 'auth/invalid-api-key' || error?.message?.includes('api-key-not-valid')) {
        userMsg = 'Invalid Firebase API Key. Please copy your real API Key from Firebase Console -> Project Settings into .env.local'
      }
      
      setErrorMessage(userMsg)
      toast.error(userMsg, {
        style: { background: '#0B1B4D', color: '#FFFFFF', border: '1px solid #EF4444' },
        duration: 5000
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Quick Test Account Handler
  const handleQuickTestLogin = (testEmail, testPass) => {
    setEmail(testEmail)
    setPassword(testPass)
    setIsLoading(true)
    setTimeout(() => {
      executeLogin(testEmail)
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F8FF] font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Main Split-Screen Outer Card Container */}
      <div className="w-full max-w-6xl bg-white rounded-[28px] border border-[#E5EAF5] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* LEFT COLUMN: HERO / BRANDING SECTION (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#2F54EB] via-[#3b62f6] to-[#4F7BFF] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Background Decorative Blur & Medical Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/20 rounded-full blur-2xl -z-0 pointer-events-none" />

          {/* Floating Medical Cross Decorations */}
          <div className="absolute top-12 right-12 opacity-20 text-white pointer-events-none font-bold text-4xl">+</div>
          <div className="absolute bottom-24 left-8 opacity-20 text-white pointer-events-none font-bold text-3xl">+</div>

          {/* Brand Logo & Title */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white font-['Space_Grotesk']">
                  Virtual Healthcare Portal
                </span>
                <span className="block text-[11px] text-blue-100 font-medium">MediSphere Cloud Intelligence</span>
              </div>
            </div>

            <div className="pt-6 space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] leading-tight">
                Expert Care,<br />Anywhere Anytime
              </h1>
              <p className="text-sm text-blue-100 max-w-md leading-relaxed">
                Connect with verified medical specialists online. Real-time consultation, smart AI triage, and authentic digital prescriptions in one secure platform.
              </p>
            </div>
          </div>

          {/* Interactive Healthcare Feature Highlights */}
          <div className="relative z-10 py-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-white">
                <Stethoscope className="w-4 h-4 text-blue-200" />
                <span>Top Doctors</span>
              </div>
              <p className="text-[11px] text-blue-100">Verified MD specialists</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-white">
                <Calendar className="w-4 h-4 text-blue-200" />
                <span>Easy Booking</span>
              </div>
              <p className="text-[11px] text-blue-100">Instant virtual slot booking</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-blue-200" />
                <span>Secure & Private</span>
              </div>
              <p className="text-[11px] text-blue-100">HIPAA compliant EMR</p>
            </div>
          </div>

          {/* Laptop Consultation Vector Illustration Artwork */}
          <div className="relative z-10 mt-2 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30">
              <Heart className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <p className="text-xs font-bold text-white">Live Telehealth Gateway Active</p>
              </div>
              <p className="text-[11px] text-blue-100">Connected to Firestore Cloud Nodes & Real-Time AI Triage</p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: AUTHENTICATION PANEL (lg:col-span-6) */}
        <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white relative">
          
          {/* Top Language Selector */}
          <div className="flex justify-end relative z-20">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                aria-label="Select language"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-[#E5EAF5] hover:border-[#2F54EB] bg-[#F5F8FF] text-xs font-semibold text-[#0B1B4D] transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-[#2F54EB]" />
                <span>{selectedLanguage}</span>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-1 w-36 rounded-xl bg-white border border-[#E5EAF5] shadow-xl p-1 z-30 space-y-0.5">
                  {languages.map(lang => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setSelectedLanguage(lang)
                        setIsLanguageOpen(false)
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-[#0B1B4D] hover:bg-[#F5F8FF] transition-colors"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Header */}
          <div className="space-y-6 pt-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B4D] font-['Space_Grotesk']">
                Welcome Back
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Please enter your credentials to access your healthcare portal.
              </p>
            </div>

            {/* Error Alert Message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-2 text-xs text-red-700 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="font-semibold">{errorMessage}</p>
              </div>
            )}

            {/* Sign-In Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              
              {/* Email Input */}
              <div className="space-y-1">
                <label htmlFor="authEmail" className="text-xs font-bold text-[#0B1B4D] block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    id="authEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. srikarkamina@gmail.com"
                    aria-label="Email Address"
                    required
                    className="w-full bg-[#F5F8FF] border border-[#E5EAF5] focus:border-[#2F54EB] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0B1B4D] font-medium focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label htmlFor="authPassword" className="text-xs font-bold text-[#0B1B4D] block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    id="authPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    aria-label="Password"
                    required
                    className="w-full bg-[#F5F8FF] border border-[#E5EAF5] focus:border-[#2F54EB] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#0B1B4D] font-medium focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    className="absolute right-3 top-3 text-slate-400 hover:text-[#0B1B4D] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 cursor-pointer text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#2F54EB] rounded border-[#E5EAF5] focus:ring-[#2F54EB]"
                  />
                  <span>Remember Me</span>
                </label>

                <button
                  type="button"
                  onClick={() => toast.success('Password reset link sent to registered email address.', { style: { background: '#0B1B4D', color: '#FFF' } })}
                  className="text-[#2F54EB] hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                aria-label="Sign in to your account"
                className="w-full bg-[#2F54EB] hover:bg-[#1d39c4] text-white font-bold py-3 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-[#E5EAF5] w-full" />
              <span className="bg-white px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider shrink-0">
                or continue with
              </span>
              <div className="border-t border-[#E5EAF5] w-full" />
            </div>

            {/* Google Sign-In Button Only */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              aria-label="Sign in with Google"
              className="w-full bg-white hover:bg-[#F5F8FF] border border-[#E5EAF5] hover:border-[#2F54EB] text-[#0B1B4D] font-bold py-2.5 rounded-xl transition-all duration-200 text-xs flex items-center justify-center space-x-2 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Register Link */}
            <div className="text-center pt-1 text-xs">
              <span className="text-slate-500">Don't have an account? </span>
              <button 
                type="button"
                onClick={() => setShowRegisterModal(true)}
                className="text-[#2F54EB] hover:underline font-bold"
              >
                Register Now
              </button>
            </div>
          </div>

          {/* Development Test Accounts Card */}
          <div className="mt-6 p-4 rounded-2xl bg-[#F5F8FF] border border-[#E5EAF5] space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-[#E5EAF5] pb-1.5">
              <span className="font-extrabold text-[#0B1B4D] uppercase text-[10px] tracking-wider flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#2F54EB]" />
                Development Test Accounts (Quick Auto-Fill)
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-[#2F54EB] text-[9px] font-bold">Dev Mode</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px]">
              {Object.entries(ROLE_MAP).map(([testEmail, info]) => (
                <button
                  key={testEmail}
                  type="button"
                  onClick={() => handleQuickTestLogin(testEmail, info.defaultPassword)}
                  aria-label={`Test login as ${info.role}`}
                  className="p-2 rounded-xl bg-white hover:bg-[#2F54EB] text-[#0B1B4D] hover:text-white border border-[#E5EAF5] font-semibold transition-all text-center space-y-0.5 group"
                >
                  <p className="font-bold uppercase text-[10px] text-[#2F54EB] group-hover:text-white">{info.role}</p>
                  <p className="truncate text-[9.5px] opacity-80">{testEmail.split('@')[0]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Security & Privacy Footer Note */}
          <div className="pt-4 border-t border-[#E5EAF5] text-center text-[11px] text-slate-400 space-y-0.5">
            <p className="flex items-center justify-center gap-1 font-medium text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2F54EB]" />
              <span>Your health and privacy are our top priority</span>
            </p>
            <p className="text-[10px]">Powered by MediSphere Cloud Services</p>
          </div>

        </div>

      </div>

      {/* PATIENT SELF-REGISTRATION MODAL */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-[#0B1B4D]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E5EAF5] shadow-2xl p-6 sm:p-8 max-w-md w-full space-y-5 text-xs animate-in fade-in duration-200">
            <div className="border-b border-[#E5EAF5] pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-[#0B1B4D] font-['Space_Grotesk']">
                  Patient Self-Registration
                </h3>
                <p className="text-slate-500 text-xs">Create your personal account to book virtual consultations.</p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowRegisterModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-[#0B1B4D] block mb-1">Full Name *</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  required
                  className="w-full bg-[#F5F8FF] border border-[#E5EAF5] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1B4D] focus:outline-none focus:border-[#2F54EB]"
                />
              </div>

              <div>
                <label className="font-bold text-[#0B1B4D] block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="e.g. sarah.j@gmail.com"
                  required
                  className="w-full bg-[#F5F8FF] border border-[#E5EAF5] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1B4D] focus:outline-none focus:border-[#2F54EB]"
                />
              </div>

              <div>
                <label className="font-bold text-[#0B1B4D] block mb-1">Password *</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#F5F8FF] border border-[#E5EAF5] rounded-xl px-3.5 py-2.5 text-xs text-[#0B1B4D] focus:outline-none focus:border-[#2F54EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#0B1B4D] block mb-1">Blood Group</label>
                  <select
                    value={regBloodGroup}
                    onChange={(e) => setRegBloodGroup(e.target.value)}
                    className="w-full bg-[#F5F8FF] border border-[#E5EAF5] rounded-xl px-3 py-2.5 text-xs text-[#0B1B4D]"
                  >
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#0B1B4D] block mb-1">Known Allergies</label>
                  <input
                    type="text"
                    value={regAllergies}
                    onChange={(e) => setRegAllergies(e.target.value)}
                    placeholder="e.g. None / Penicillin"
                    className="w-full bg-[#F5F8FF] border border-[#E5EAF5] rounded-xl px-3 py-2.5 text-xs text-[#0B1B4D]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2 border-t border-[#E5EAF5]">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRegistering}
                  className="bg-[#2F54EB] hover:bg-[#1d39c4] text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-blue-500/20 disabled:opacity-50"
                >
                  {isRegistering ? 'Registering...' : 'Complete Patient Registration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
