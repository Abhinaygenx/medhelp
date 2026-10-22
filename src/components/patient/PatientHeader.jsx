import React, { useState } from 'react'
import { Bell, Menu, User, LogOut, ChevronDown, Sun, Moon } from 'lucide-react'

export default function PatientHeader({ patientName = 'Eleanor Vance', patientRole = 'Patient', avatarUrl, notifications = [], onToggleMobileSidebar, onLogout }) {
  const [isNotifOpen, setIsNotifOpen]     = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => { try { return localStorage.getItem('hms_theme') === 'dark' } catch { return false } })

  const unreadCount = notifications.filter(n => !n.isRead).length

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    const val = next ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', val)
    try { localStorage.setItem('hms_theme', val) } catch {}
  }

  const initials = patientName.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()

  const greet = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <header style={{ background: 'var(--header-bg)', borderBottom: '1px solid var(--header-border)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 30, padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onToggleMobileSidebar} aria-label="Toggle navigation" className="lg:hidden"
          style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border-light)', background: 'var(--surface-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <Menu size={18} />
        </button>
        <div>
          <h1 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {greet()}, {patientName.split(' ')[0]}
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Here's your health summary for today</p>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Theme toggle */}
        <button onClick={toggleTheme} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ width: 36, height: 36, borderRadius: 9, border: '1px solid var(--border-light)', background: 'var(--surface-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false) }} aria-label={`${unreadCount} notifications`}
            style={{ width: 36, height: 36, borderRadius: 9, border: '1px solid var(--border-light)', background: 'var(--surface-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', position: 'relative' }}>
            <Bell size={16} />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: '50%', background: 'var(--brand-600)', color: '#fff', fontSize: '0.625rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--surface-card)' }}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          {isNotifOpen && (
            <div className="dropdown" style={{ width: 320 }}>
              <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Notifications</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{notifications.length} total</span>
              </div>
              <div style={{ padding: '8px 6px', maxHeight: 240, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {notifications.length === 0 ? (
                  <p style={{ padding: '20px 8px', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>No notifications</p>
                ) : notifications.slice(0, 8).map(n => (
                  <div key={n.id} style={{ padding: '10px 12px', borderRadius: 10, background: n.isRead ? 'transparent' : 'var(--brand-50)', border: '1px solid var(--border-light)', cursor: 'default' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: 2 }}>{n.title}</div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{n.message}</p>
                  </div>
                ))}
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
              <img src={avatarUrl} alt={patientName} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-light)' }} />
            ) : (
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.8125rem' }}>{initials}</div>
            )}
            <div style={{ display: 'none' }} className="sm:block">
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>{patientName.split(' ')[0]}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{patientRole}</div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>
          {isProfileOpen && (
            <div className="dropdown" style={{ minWidth: 200 }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{patientName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{patientRole}</div>
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
