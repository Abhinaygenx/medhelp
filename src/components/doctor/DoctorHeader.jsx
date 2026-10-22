import React, { useState } from 'react'
import { Bell, Menu, LogOut, ChevronDown, Search, Sun, Moon, Calendar } from 'lucide-react'

export default function DoctorHeader({ doctorName = 'Dr. Robert Ford', doctorDept = 'Cardiology Department', avatarUrl, notifications = [], onToggleMobileSidebar, onLogout }) {
  const [isNotifOpen, setIsNotifOpen]     = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => { try { return localStorage.getItem('hms_theme') === 'dark' } catch { return false } })

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    const val = next ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', val)
    try { localStorage.setItem('hms_theme', val) } catch {}
  }

  const initials = doctorName.replace('Dr. ', '').split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <header style={{ background: 'var(--header-bg)', borderBottom: '1px solid var(--header-border)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 30, padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onToggleMobileSidebar} aria-label="Toggle navigation" className="lg:hidden"
          style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border-light)', background: 'var(--surface-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <Menu size={18} />
        </button>
        <div>
          <h1 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Welcome back, {doctorName}</h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={11} /> {dateStr} · {doctorDept}
          </p>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Search — desktop */}
        <div style={{ position: 'relative', display: 'none' }} className="md:block">
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-disabled)' }} />
          <input type="search" placeholder="Search patients…"
            style={{ padding: '8px 14px 8px 34px', borderRadius: 10, border: '1.5px solid var(--border-default)', background: 'var(--surface-page)', color: 'var(--text-primary)', fontSize: '0.8125rem', outline: 'none', width: 220 }}
            onFocus={e => { e.target.style.borderColor = 'var(--brand-500)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.12)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none' }}
          />
        </div>

        {/* Theme */}
        <button onClick={toggleTheme} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ width: 36, height: 36, borderRadius: 9, border: '1px solid var(--border-light)', background: 'var(--surface-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false) }} aria-label="Notifications"
            style={{ width: 36, height: 36, borderRadius: 9, border: '1px solid var(--border-light)', background: 'var(--surface-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', position: 'relative' }}>
            <Bell size={16} />
            <span style={{ position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: '50%', background: 'var(--brand-600)', color: '#fff', fontSize: '0.625rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--surface-card)' }}>3</span>
          </button>
          {isNotifOpen && (
            <div className="dropdown" style={{ width: 300 }}>
              <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid var(--border-light)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Alerts</div>
              <div style={{ padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ padding: '10px 12px', borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--brand-700)', marginBottom: 2 }}>Emergency Consultation Request</div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--brand-600)' }}>Patient Eleanor Vance placed in High-Risk ER queue.</p>
                </div>
                <div style={{ padding: '10px 12px', borderRadius: 10, background: 'var(--surface-page)', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: 2 }}>Lab Report Ready</div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CBC & Lipid Panel for Marcus Wright is ready.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false) }} aria-label="Profile menu"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 10, border: '1px solid transparent', background: 'transparent', cursor: 'pointer', transition: 'all 150ms' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-page)'; e.currentTarget.style.borderColor = 'var(--border-light)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt={doctorName} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-light)' }} />
            ) : (
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.8125rem' }}>{initials}</div>
            )}
            <div className="hidden sm:block">
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>{doctorName.split(' ').slice(0, 2).join(' ')}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Physician</div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>
          {isProfileOpen && (
            <div className="dropdown" style={{ minWidth: 200 }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{doctorName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doctorDept}</div>
              </div>
              <div style={{ padding: 6 }}>
                <button type="button" onClick={onLogout}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, background: 'none', border: 'none', color: '#dc2626', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', width: '100%' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
