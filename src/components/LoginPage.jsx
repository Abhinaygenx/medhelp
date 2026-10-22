import React, { useState, useRef, useEffect } from 'react'
import {
  Eye, EyeOff, Lock, Mail, ShieldCheck, Heart, Stethoscope,
  AlertCircle, ArrowRight, UserCheck, X, Sparkles
} from 'lucide-react'
import { auth, googleProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, doc, setDoc, getDoc, db } from '../firebase'
import toast from 'react-hot-toast'
import { loadData, saveData } from '../services/storageService'
import { CLIENT } from '../config/clientConfig'

/* ── Demo credential map (keyed by a generic demo email, not real addresses) */
const ROLE_MAP = {
  [CLIENT.demoCredentials.admin.email]:   { role: 'ADMIN',   name: CLIENT.demoCredentials.admin.name,   path: '/admin/dashboard',   defaultPassword: CLIENT.demoCredentials.admin.password },
  [CLIENT.demoCredentials.doctor.email]:  { role: 'DOCTOR',  name: CLIENT.demoCredentials.doctor.name,  path: '/doctor/dashboard',  defaultPassword: CLIENT.demoCredentials.doctor.password },
  [CLIENT.demoCredentials.patient.email]: { role: 'PATIENT', name: CLIENT.demoCredentials.patient.name, path: '/patient/dashboard', defaultPassword: CLIENT.demoCredentials.patient.password },
}

const ROLE_META = {
  ADMIN:   { label: 'Admin',   color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', icon: ShieldCheck },
  DOCTOR:  { label: 'Doctor',  color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', icon: Stethoscope },
  PATIENT: { label: 'Patient', color: '#0d9488', bg: '#f0fdfa', border: '#99f6e4', icon: Heart },
}

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading]   = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [emailError, setEmailError]     = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [regName, setRegName]         = useState('')
  const [regEmail, setRegEmail]       = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regBloodGroup, setRegBloodGroup] = useState('O+')
  const [regAllergies, setRegAllergies]   = useState('None')
  const [isRegistering, setIsRegistering] = useState(false)

  const emailRef = useRef(null)
  useEffect(() => { emailRef.current?.focus() }, [])

  /* ── Core login execution ─────────────────────────────────────────────── */
  const executeLogin = async (userEmail, displayNameOverride = null) => {
    const cleanEmail = userEmail.toLowerCase().trim()
    const registeredUsers = loadData('registered_users', {})
    let userProfile = registeredUsers[cleanEmail]

    if (!userProfile && ROLE_MAP[cleanEmail]) {
      userProfile = ROLE_MAP[cleanEmail]
    }

    if (!userProfile) {
      try {
        const userDocRef = doc(db, 'users', cleanEmail.replace(/[^a-zA-Z0-9]/g, '_'))
        const docSnap = await getDoc(userDocRef)
        if (docSnap.exists()) userProfile = docSnap.data()
      } catch (e) {
        console.warn('Firestore user profile fetch fallback:', e)
      }
    }

    if (!userProfile) {
      userProfile = { role: 'PATIENT', name: displayNameOverride || cleanEmail.split('@')[0], path: '/patient/dashboard' }
    }

    const sessionUser = {
      email: cleanEmail,
      name: displayNameOverride || userProfile.name,
      role: userProfile.role,
      path: userProfile.path || '/patient/dashboard',
      loginTimestamp: new Date().toISOString(),
    }

    if (rememberMe) localStorage.setItem('health_portal_user', JSON.stringify(sessionUser))
    else            sessionStorage.setItem('health_portal_user', JSON.stringify(sessionUser))

    const meta = ROLE_META[sessionUser.role] || {}
    toast.success(`Welcome back, ${sessionUser.name}!`, {
      style: { background: '#0f172a', color: '#f8fafc', border: `1px solid ${meta.color || '#2563eb'}` },
    })
    setErrorMessage('')
    if (onLoginSuccess) onLoginSuccess(sessionUser)
  }

  /* ── Email/password validation ────────────────────────────────────────── */
  const validate = () => {
    let ok = true
    if (!email.trim()) { setEmailError('Email address is required.'); ok = false }
    else if (!/\S+@\S+\.\S+/.test(email)) { setEmailError('Please enter a valid email address.'); ok = false }
    else setEmailError('')

    if (!password.trim()) { setPasswordError('Password is required.'); ok = false }
    else if (password.length < 6) { setPasswordError('Password must be at least 6 characters.'); ok = false }
    else setPasswordError('')

    return ok
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    setTimeout(() => { executeLogin(email); setIsLoading(false) }, 400)
  }

  /* ── Google OAuth ─────────────────────────────────────────────────────── */
  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (result.user?.email) await executeLogin(result.user.email, result.user.displayName)
    } catch (error) {
      let msg = 'Google sign-in failed. Please try again.'
      if (error?.code === 'auth/popup-closed-by-user') msg = 'Sign-in cancelled.'
      else if (error?.code === 'auth/popup-blocked') msg = 'Popup blocked. Please allow popups for this site.'
      else if (error?.code === 'auth/network-request-failed') msg = 'Network error. Check your connection.'
      setErrorMessage(msg)
    } finally {
      setIsLoading(false)
    }
  }

  /* ── Quick demo login ─────────────────────────────────────────────────── */
  const handleQuickLogin = (roleEmail, rolePass) => {
    setEmail(roleEmail); setPassword(rolePass)
    setIsLoading(true)
    setTimeout(() => { executeLogin(roleEmail); setIsLoading(false) }, 300)
  }

  /* ── Patient registration ─────────────────────────────────────────────── */
  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      toast.error('Please fill in all required fields.')
      return
    }
    setIsRegistering(true)
    const cleanRegEmail = regEmail.toLowerCase().trim()
    try {
      try { await createUserWithEmailAndPassword(auth, cleanRegEmail, regPassword) } catch {}
      const userProfile = { email: cleanRegEmail, name: regName, role: 'PATIENT', path: '/patient/dashboard', createdAt: new Date().toISOString() }
      try { await setDoc(doc(db, 'users', cleanRegEmail.replace(/[^a-zA-Z0-9]/g, '_')), userProfile) } catch {}
      const existing = loadData('registered_users', {})
      existing[cleanRegEmail] = userProfile
      saveData('registered_users', existing)
      const existingPatients = loadData('hms_patients', [])
      saveData('hms_patients', [{ id: `pat-${Date.now().toString().slice(-4)}`, name: regName, email: cleanRegEmail, bloodGroup: regBloodGroup, allergies: regAllergies, admissionStatus: 'OPD Outpatient', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' }, ...existingPatients])
      toast.success(`Account created! Welcome, ${regName}.`)
      setShowRegisterModal(false)
      executeLogin(cleanRegEmail, regName)
    } catch (err) {
      toast.error(`Registration failed: ${err.message}`)
    } finally {
      setIsRegistering(false)
    }
  }

  /* ── Shared field style ───────────────────────────────────────────────── */
  const fieldStyle = (hasError) => ({
    display: 'block', width: '100%', padding: '11px 14px', fontSize: '0.875rem',
    color: 'var(--text-primary)', background: 'var(--surface-page)',
    border: `1.5px solid ${hasError ? '#ef4444' : 'var(--border-default)'}`,
    borderRadius: 10, outline: 'none', transition: 'border-color 150ms, box-shadow 150ms',
    minHeight: 44, boxSizing: 'border-box',
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-page)', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>

      <div style={{ width: '100%', maxWidth: 980, background: 'var(--surface-card)', borderRadius: 24, border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-2xl)', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', minHeight: 580 }}>

        {/* ── LEFT: Branding Panel ───────────────────────────────────────── */}
        <div style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)', padding: '48px 40px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

          {/* Logo */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stethoscope size={22} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.0625rem', letterSpacing: '-0.01em' }}>{CLIENT.name}</div>
                <div style={{ fontSize: '0.6875rem', opacity: 0.75, fontWeight: 500 }}>{CLIENT.tagline}</div>
              </div>
            </div>

            <h1 style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 14 }}>
              Expert Care,<br />Anywhere<br />Anytime.
            </h1>
            <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.65, maxWidth: 320 }}>
              Connect with verified specialists, book real-time consultations, and manage your entire healthcare journey securely.
            </p>
          </div>

          {/* Feature chips */}
          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: Stethoscope, label: 'Top Doctors', sub: 'Verified specialists' },
              { icon: Sparkles,    label: 'AI Triage',   sub: 'Smart symptom check' },
              { icon: ShieldCheck, label: 'HIPAA Safe',  sub: 'Encrypted & compliant' },
              { icon: Heart,       label: 'Real-Time',   sub: 'Live appointment sync' },
            ].map(f => {
              const Icon = f.icon
              return (
                <div key={f.label} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: '0.8125rem', marginBottom: 3 }}>
                    <Icon size={14} />{f.label}
                  </div>
                  <div style={{ fontSize: '0.6875rem', opacity: 0.75 }}>{f.sub}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── RIGHT: Auth Panel ──────────────────────────────────────────── */}
        <div style={{ padding: '40px 40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>

          {/* Header */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Welcome back</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Sign in to access your healthcare portal.</p>
          </div>

          {/* Global error */}
          {errorMessage && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '12px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, fontSize: '0.8125rem', color: '#dc2626' }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Email */}
            <div>
              <label htmlFor="login-email" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-disabled)', pointerEvents: 'none' }} />
                <input
                  ref={emailRef}
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (emailError) setEmailError('') }}
                  placeholder="you@example.com"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'email-error' : undefined}
                  style={{ ...fieldStyle(!!emailError), paddingLeft: 38 }}
                  onFocus={e => { e.target.style.borderColor = 'var(--brand-500)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)' }}
                  onBlur={e => { e.target.style.borderColor = emailError ? '#ef4444' : 'var(--border-default)'; e.target.style.boxShadow = 'none' }}
                />
              </div>
              {emailError && <p id="email-error" role="alert" style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 4 }}>{emailError}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-disabled)', pointerEvents: 'none' }} />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (passwordError) setPasswordError('') }}
                  placeholder="••••••••"
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? 'password-error' : undefined}
                  style={{ ...fieldStyle(!!passwordError), paddingLeft: 38, paddingRight: 44 }}
                  onFocus={e => { e.target.style.borderColor = 'var(--brand-500)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)' }}
                  onBlur={e => { e.target.style.borderColor = passwordError ? '#ef4444' : 'var(--border-default)'; e.target.style.boxShadow = 'none' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordError && <p id="password-error" role="alert" style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 4 }}>{passwordError}</p>}
            </div>

            {/* Remember + forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 500 }}>
                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--brand-600)' }} />
                Remember me
              </label>
              <button type="button" onClick={() => toast.success('Password reset link sent.', { style: { background: '#0f172a', color: '#f8fafc' } })}
                style={{ background: 'none', border: 'none', color: 'var(--brand-600)', fontWeight: 600, cursor: 'pointer', fontSize: '0.8125rem' }}>
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button type="submit" disabled={isLoading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 24px', borderRadius: 10, background: 'var(--brand-600)', border: 'none', color: '#fff', fontSize: '0.9375rem', fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer', minHeight: 48, opacity: isLoading ? 0.7 : 1, transition: 'all 150ms', boxShadow: '0 4px 14px rgba(37,99,235,0.3)' }}
              onMouseEnter={e => !isLoading && (e.currentTarget.style.background = 'var(--brand-700)')}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--brand-600)'}
            >
              {isLoading ? <><div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Signing in...</>
                : <><span>Sign In</span><ArrowRight size={17} /></>}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
            </div>

            {/* Google */}
            <button type="button" onClick={handleGoogleSignIn} disabled={isLoading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 24px', borderRadius: 10, background: 'var(--surface-card)', border: '1.5px solid var(--border-default)', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', minHeight: 44 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'var(--neutral-50)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.background = 'var(--surface-card)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              Continue with Google
            </button>

            {/* Register link */}
            <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Don't have an account?{' '}
              <button type="button" onClick={() => setShowRegisterModal(true)} style={{ background: 'none', border: 'none', color: 'var(--brand-600)', fontWeight: 700, cursor: 'pointer', fontSize: '0.8125rem' }}>
                Register now
              </button>
            </p>
          </form>

          {/* Demo accounts */}
          <div style={{ background: 'var(--surface-page)', border: '1px solid var(--border-light)', borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <UserCheck size={13} />
              Demo Credentials — Quick Sign-In
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {Object.entries(ROLE_MAP).map(([demoEmail, info]) => {
                const meta = ROLE_META[info.role]
                const Icon = meta?.icon || UserCheck
                return (
                  <button key={demoEmail} type="button" onClick={() => handleQuickLogin(demoEmail, info.defaultPassword)}
                    style={{ padding: '10px 8px', borderRadius: 10, background: meta?.bg || 'var(--surface-card)', border: `1px solid ${meta?.border || 'var(--border-light)'}`, cursor: 'pointer', textAlign: 'center', transition: 'all 150ms', minHeight: 52 }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                    aria-label={`Sign in as demo ${info.role}`}
                  >
                    <Icon size={16} color={meta?.color} style={{ margin: '0 auto 4px' }} />
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: meta?.color, textTransform: 'uppercase' }}>{info.role}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={13} color="var(--brand-600)" />
            HIPAA Compliant · Data Encrypted · Secure Sessions
          </div>
        </div>
      </div>

      {/* ── Registration Modal ─────────────────────────────────────────────── */}
      {showRegisterModal && (
        <div role="dialog" aria-modal="true" aria-labelledby="reg-title"
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 16 }}
          onClick={e => e.target === e.currentTarget && setShowRegisterModal(false)}
        >
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)', borderRadius: 22, boxShadow: 'var(--shadow-2xl)', padding: '32px 32px 28px', maxWidth: 460, width: '100%', maxHeight: '90vh', overflowY: 'auto', animation: 'modal-slide 250ms ease' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <h3 id="reg-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Patient Registration</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Create your account to book consultations.</p>
              </div>
              <button onClick={() => setShowRegisterModal(false)} aria-label="Close registration modal"
                style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--surface-page)', border: '1px solid var(--border-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { id: 'reg-name',  label: 'Full Name *',        type: 'text',  value: regName,     setter: setRegName,     placeholder: 'Sarah Jenkins' },
                { id: 'reg-email', label: 'Email Address *',    type: 'email', value: regEmail,    setter: setRegEmail,    placeholder: 'sarah@example.com' },
                { id: 'reg-pass',  label: 'Password *',         type: 'password', value: regPassword, setter: setRegPassword, placeholder: '••••••••' },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>{f.label}</label>
                  <input id={f.id} type={f.type} value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.placeholder} required
                    style={fieldStyle(false)}
                    onFocus={e => { e.target.style.borderColor = 'var(--brand-500)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)' }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              ))}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label htmlFor="reg-blood" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Blood Group</label>
                  <select id="reg-blood" value={regBloodGroup} onChange={e => setRegBloodGroup(e.target.value)} style={{ ...fieldStyle(false) }}>
                    {['O+','A+','B+','AB+','O-','A-','B-','AB-'].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="reg-allergies" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Known Allergies</label>
                  <input id="reg-allergies" type="text" value={regAllergies} onChange={e => setRegAllergies(e.target.value)} placeholder="None / Penicillin" style={fieldStyle(false)}
                    onFocus={e => { e.target.style.borderColor = 'var(--brand-500)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)' }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, paddingTop: 8, borderTop: '1px solid var(--border-light)', marginTop: 4 }}>
                <button type="button" onClick={() => setShowRegisterModal(false)} style={{ flex: 1, padding: '11px', borderRadius: 10, background: 'var(--surface-page)', border: '1.5px solid var(--border-default)', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', minHeight: 44 }}>
                  Cancel
                </button>
                <button type="submit" disabled={isRegistering} style={{ flex: 2, padding: '11px', borderRadius: 10, background: 'var(--brand-600)', border: 'none', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: isRegistering ? 'not-allowed' : 'pointer', minHeight: 44, opacity: isRegistering ? 0.7 : 1 }}>
                  {isRegistering ? 'Registering…' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes modal-slide { from { opacity: 0; transform: scale(0.95) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
    </div>
  )
}
