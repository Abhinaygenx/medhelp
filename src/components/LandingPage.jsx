import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Activity, Calendar, Users, Shield, Star, Phone,
  ArrowRight, ChevronRight, Heart, Stethoscope, FlaskConical,
  BedDouble, Clock, CheckCircle, Menu, X, Sun, Moon
} from 'lucide-react'
import { CLIENT } from '../config/clientConfig'

export default function LandingPage() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('hms_theme') === 'dark' } catch { return false }
  })
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    const val = next ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', val)
    try { localStorage.setItem('hms_theme', val) } catch {}
  }

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Contact', href: '#contact' },
  ]

  const quickActions = [
    { icon: Calendar, label: 'Book Appointment', color: 'var(--brand-600)', bg: 'var(--brand-50)', action: () => navigate('/login') },
    { icon: Users,    label: 'Find a Doctor',    color: 'var(--teal-600)',  bg: '#f0fdfa',         action: () => navigate('/login') },
    { icon: Activity, label: 'View Reports',     color: '#7c3aed',         bg: '#f5f3ff',         action: () => navigate('/login') },
    { icon: Phone,    label: 'Emergency',        color: '#dc2626',         bg: '#fef2f2',         action: () => window.location.href = `tel:${CLIENT.emergency}` },
  ]

  const services = [
    { icon: Heart,        title: 'Cardiology',       desc: 'Advanced cardiac care with state-of-the-art diagnostics and interventional procedures.' },
    { icon: Activity,     title: 'Neurology',        desc: 'Expert neurological assessment, brain imaging, and specialist treatment plans.' },
    { icon: FlaskConical, title: 'Lab & Pathology',  desc: 'Same-day diagnostics with CBC, lipid panels, thyroid profiles, and more.' },
    { icon: BedDouble,    title: 'Inpatient Care',   desc: 'Fully equipped ICU, general, and specialized wards with round-the-clock nursing.' },
    { icon: Stethoscope,  title: 'General Medicine', desc: 'Comprehensive OPD consultations covering all primary care needs.' },
    { icon: Shield,       title: 'Emergency Care',   desc: '24/7 trauma and emergency response with 5-minute SLA dispatch protocol.' },
  ]

  const doctors = [
    { name: 'Dr. Robert Ford',    spec: 'Cardiology',       exp: '14 yrs', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80' },
    { name: 'Dr. Sarah Connor',   spec: 'Neurology',        exp: '11 yrs', rating: 4.8, avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c2111d4d?w=150&auto=format&fit=crop&q=80' },
    { name: 'Dr. James Wilson',   spec: 'Orthopedics',      exp: '9 yrs',  rating: 4.7, avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80' },
    { name: 'Dr. Gregory House',  spec: 'General Medicine', exp: '20 yrs', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80' },
  ]

  const stats = [
    { value: CLIENT.stats.patients,        label: 'Patients Served' },
    { value: CLIENT.stats.doctors,         label: 'Verified Doctors' },
    { value: CLIENT.stats.departments,     label: 'Departments' },
    { value: CLIENT.stats.successRate,     label: 'Success Rate' },
  ]

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'var(--surface-page)', color: 'var(--text-primary)', minHeight: '100vh' }}>

      {/* ─── NAV ────────────────────────────────────────────────────────────── */}
      <header
        role="banner"
        style={{
          position: 'sticky', top: 0, zIndex: 80,
          background: scrolled ? 'var(--header-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--header-border)' : '1px solid transparent',
          transition: 'all 300ms ease',
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}
        >
          {/* Logo */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }} aria-label={`${CLIENT.name} home`}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Stethoscope size={20} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{CLIENT.name}</span>
          </a>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            {navLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{ padding: '6px 14px', borderRadius: 8, fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 150ms' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--neutral-100)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              >{l.label}</a>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border-light)', background: 'var(--surface-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => navigate('/login')}
              style={{ padding: '9px 20px', borderRadius: 10, background: 'transparent', border: '1.5px solid var(--border-default)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', minHeight: 44 }}
            >Staff Login</button>

            <button
              onClick={() => navigate('/login')}
              style={{ padding: '9px 20px', borderRadius: 10, background: 'var(--brand-600)', border: 'none', fontSize: '0.875rem', fontWeight: 600, color: '#fff', cursor: 'pointer', minHeight: 44, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              Book Appointment <ArrowRight size={15} />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open mobile menu"
              aria-expanded={mobileMenuOpen}
              style={{ display: 'none', width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border-light)', background: 'var(--surface-card)', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{ background: 'var(--surface-card)', borderTop: '1px solid var(--border-light)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMobileMenuOpen(false)} style={{ padding: '12px 16px', borderRadius: 10, fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none' }}>{l.label}</a>
            ))}
            <div style={{ height: 1, background: 'var(--border-light)', margin: '8px 0' }} />
            <button onClick={() => navigate('/login')} style={{ padding: '12px 16px', borderRadius: 10, background: 'var(--brand-600)', border: 'none', color: '#fff', fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center', minHeight: 44 }}>
              Book Appointment
            </button>
          </div>
        )}
      </header>

      {/* ─── HERO ───────────────────────────────────────────────────────────── */}
      <section id="home" aria-labelledby="hero-heading" style={{ padding: '80px 24px 64px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        {/* Eyebrow badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, background: 'var(--brand-50)', border: '1px solid var(--brand-200)', color: 'var(--brand-700)', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 24 }}>
          <CheckCircle size={14} />
          HIPAA Compliant · Trusted by 50,000+ Patients
        </div>

        <h1 id="hero-heading" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)', maxWidth: 700, margin: '0 auto 20px' }}>
          Expert Healthcare,{' '}
          <span style={{ color: 'var(--brand-600)' }}>Anywhere,</span>{' '}
          Anytime
        </h1>

        <p style={{ fontSize: 'clamp(1rem,2vw,1.1875rem)', color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.65 }}>
          Connect with verified specialists, book appointments instantly, and manage your entire healthcare journey from one secure platform.
        </p>

        {/* Primary CTAs */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
          <button
            onClick={() => navigate('/login')}
            style={{ padding: '14px 32px', borderRadius: 12, background: 'var(--brand-600)', border: 'none', color: '#fff', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, minHeight: 52, boxShadow: '0 4px 14px rgba(37,99,235,0.35)', transition: 'all 150ms' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-700)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--brand-600)'; e.currentTarget.style.transform = 'none' }}
          >
            Book an Appointment <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{ padding: '14px 32px', borderRadius: 12, background: 'var(--surface-card)', border: '1.5px solid var(--border-default)', color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', minHeight: 52 }}
          >
            Staff Login
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16, maxWidth: 680, margin: '0 auto 64px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '16px 12px', background: 'var(--surface-card)', border: '1px solid var(--border-light)', borderRadius: 14, boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-600)', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUICK ACCESS STRIP ────────────────────────────────────────────── */}
      <section aria-label="Quick access actions" style={{ background: 'var(--brand-600)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {quickActions.map(a => {
            const Icon = a.icon
            return (
              <button
                key={a.label}
                onClick={a.action}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: '0.9375rem', fontWeight: 600, backdropFilter: 'blur(8px)', transition: 'all 150ms', minHeight: 56 }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
              >
                <Icon size={20} />
                {a.label}
                <ChevronRight size={16} style={{ marginLeft: 'auto', opacity: 0.7 }} />
              </button>
            )
          })}
        </div>
      </section>

      {/* ─── ROLE ENTRY CARDS ───────────────────────────────────────────────── */}
      <section aria-labelledby="role-heading" style={{ padding: '72px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 id="role-heading" style={{ fontSize: 'clamp(1.5rem,3.5vw,2rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Access Your Portal</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Select your role to sign in and access your personalised dashboard.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}>
          {[
            {
              role: 'Patient',
              icon: Heart,
              color: '#0d9488',
              bg: '#f0fdfa',
              border: '#99f6e4',
              desc: 'Book appointments, view prescriptions, check lab results, and manage your health records.',
              features: ['Appointment Booking', 'AI Symptom Checker', 'Digital Prescriptions'],
            },
            {
              role: 'Doctor',
              icon: Stethoscope,
              color: 'var(--brand-600)',
              bg: 'var(--brand-50)',
              border: 'var(--brand-200)',
              desc: 'Manage your patient queue, issue prescriptions, and conduct video consultations.',
              features: ['Patient Queue', 'E-Prescriptions', 'Teleconsultation'],
            },
            {
              role: 'Admin',
              icon: Shield,
              color: '#7c3aed',
              bg: '#f5f3ff',
              border: '#ddd6fe',
              desc: 'Oversee all hospital operations, manage staff, inventory, billing, and analytics.',
              features: ['Hospital Dashboard', 'Staff Management', 'Billing & Reports'],
            },
          ].map(card => {
            const Icon = card.icon
            return (
              <div
                key={card.role}
                style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 16, boxShadow: 'var(--shadow-sm)', transition: 'all 200ms' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 16, background: card.bg, border: `1px solid ${card.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color }}>
                  <Icon size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{card.role} Portal</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {card.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle size={14} color={card.color} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/login')}
                  style={{ marginTop: 'auto', padding: '10px 0', borderRadius: 10, background: card.bg, border: `1.5px solid ${card.border}`, color: card.color, fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 150ms' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Enter as {card.role} <ArrowRight size={14} />
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── SERVICES ──────────────────────────────────────────────────────── */}
      <section id="services" aria-labelledby="services-heading" style={{ padding: '64px 24px', background: 'var(--neutral-50)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 id="services-heading" style={{ fontSize: 'clamp(1.5rem,3.5vw,2rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Clinical Services</h2>
            <p style={{ color: 'var(--text-muted)' }}>Comprehensive care across {CLIENT.stats.departments} specialised departments</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {services.map(s => {
              const Icon = s.icon
              return (
                <div key={s.title} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-xs)', transition: 'box-shadow 200ms' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-xs)'}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <Icon size={22} color="var(--brand-600)" />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── DOCTORS ───────────────────────────────────────────────────────── */}
      <section id="doctors" aria-labelledby="doctors-heading" style={{ padding: '72px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 id="doctors-heading" style={{ fontSize: 'clamp(1.5rem,3.5vw,2rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Our Specialists</h2>
          <p style={{ color: 'var(--text-muted)' }}>Verified, experienced doctors ready for in-person or teleconsultation</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
          {doctors.map(d => (
            <div key={d.name} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)', borderRadius: 16, padding: 24, textAlign: 'center', boxShadow: 'var(--shadow-sm)', transition: 'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'none' }}
            >
              <img src={d.avatar} alt={`${d.name} profile photo`} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--brand-100)', marginBottom: 14 }} loading="lazy" />
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9375rem', marginBottom: 2 }}>{d.name}</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--brand-600)', fontWeight: 600, marginBottom: 8 }}>{d.spec}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  {d.rating}
                </span>
                <span>·</span>
                <span><Clock size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {d.exp}</span>
              </div>
              <button onClick={() => navigate('/login')} style={{ marginTop: 16, width: '100%', padding: '9px 0', borderRadius: 10, background: 'var(--brand-50)', border: '1px solid var(--brand-200)', color: 'var(--brand-700)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', minHeight: 40 }}>
                Book Now
              </button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => navigate('/login')} style={{ padding: '12px 28px', borderRadius: 10, background: 'var(--surface-card)', border: '1.5px solid var(--border-default)', color: 'var(--text-secondary)', fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer' }}>
            View All Doctors <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </button>
        </div>
      </section>

      {/* ─── CONTACT & EMERGENCY ────────────────────────────────────────────── */}
      <section id="contact" aria-labelledby="contact-heading" style={{ padding: '64px 24px', background: 'var(--neutral-50)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {/* Emergency box */}
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 18, padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={18} color="#fff" />
              </div>
              <h3 id="contact-heading" style={{ fontWeight: 700, fontSize: '1rem', color: '#7f1d1d' }}>Emergency Helpline</h3>
            </div>
            <p style={{ fontSize: '1.625rem', fontWeight: 800, color: '#dc2626', letterSpacing: '-0.02em', marginBottom: 6 }}>{CLIENT.emergency}</p>
            <p style={{ fontSize: '0.8125rem', color: '#991b1b' }}>{CLIENT.emergencyHours}</p>
          </div>

          {/* Contact info */}
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)', borderRadius: 18, padding: 28 }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 16 }}>Contact Us</h3>
            {[
              { label: 'Address', value: CLIENT.address },
              { label: 'Phone',   value: CLIENT.phone },
              { label: 'Email',   value: CLIENT.email },
              { label: 'OPD Hours', value: CLIENT.opdHours },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', minWidth: 72, paddingTop: 1 }}>{row.label}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* OPD card */}
          <div style={{ background: 'var(--brand-600)', borderRadius: 18, padding: 28, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Clock size={20} />
              <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>OPD Timings</h3>
            </div>
            <p style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 6 }}>Mon – Sat</p>
            <p style={{ fontSize: '0.9375rem', opacity: 0.9 }}>8:00 AM – 8:00 PM</p>
            <div style={{ marginTop: 20, padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <p style={{ fontSize: '0.8125rem', opacity: 0.9 }}>Emergency services available 24/7 all year round.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer role="contentinfo" style={{ borderTop: '1px solid var(--border-light)', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Stethoscope size={15} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{CLIENT.name}</span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} {CLIENT.name}. {CLIENT.tagline}. HIPAA Compliant.
          </p>
        </div>
      </footer>

      {/* Responsive CSS override (inline for simplicity) */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
