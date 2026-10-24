import React, { useState } from 'react'
import { Bell, Menu, LogOut, ChevronDown, Search, Cloud, CloudOff, AlertTriangle, Sun, Moon, ShieldCheck } from 'lucide-react'

export default function Topbar({ adminName = 'Super Admin', isFirebaseConnected = true, emergencyCount = 0, notifications = [], onToggleMobileSidebar, onLogout }) {
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

  const unread = notifications.filter(n => !n.isRead).length
  const initials = adminName.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()

  return (
    <header 
      style={{ background: 'var(--header-bg)', borderBottom: '1px solid var(--header-border)', backdropFilter: 'blur(12px)' }}
      className="px-3 sm:px-6 h-16 sticky top-0 z-30 flex items-center justify-between gap-2 sm:gap-4"
    >
      {/* Left */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation"
          className="lg:hidden flex items-center justify-center shrink-0 cursor-pointer"
          style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid var(--border-light)', background: 'var(--surface-page)', color: 'var(--text-muted)' }}
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)', margin: 0 }}>
            <span className="truncate max-w-[140px] sm:max-w-none">Hospital Command Center</span>
            <span className="hidden sm:inline-block shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold border" style={{ background: 'var(--brand-50)', color: 'var(--brand-700)', borderColor: 'var(--brand-200)' }}>Admin</span>
          </h1>
          <p className="text-xs hidden xs:flex items-center gap-1.5" style={{ color: 'var(--text-muted)', margin: 0 }}>
            {isFirebaseConnected
              ? <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}><Cloud size={11} /> Firestore Live</span>
              : <span style={{ color: '#d97706', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}><CloudOff size={11} /> Offline Mode</span>
            }
          </p>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Search */}
        <div style={{ position: 'relative' }} className="hidden md:block">
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-disabled)' }} />
          <input type="search" placeholder="Search patients, doctors…"
            style={{ padding: '8px 14px 8px 34px', borderRadius: 10, border: '1.5px solid var(--border-default)', background: 'var(--surface-page)', color: 'var(--text-primary)', fontSize: '0.8125rem', outline: 'none', width: 240 }}
            onFocus={e => { e.target.style.borderColor = 'var(--brand-500)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.12)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none' }}
          />
        </div>

        {/* Emergency pill */}
        {emergencyCount > 0 && (
          <div style={{ display: 'none', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 999, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.75rem', fontWeight: 700 }} className="sm:flex">
            <AlertTriangle size={13} />
            {emergencyCount} ER Alert{emergencyCount > 1 ? 's' : ''}
          </div>
        )}

        {/* Theme */}
        <button onClick={toggleTheme} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ width: 36, height: 36, borderRadius: 9, border: '1px solid var(--border-light)', background: 'var(--surface-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false) }} aria-label={`${unread} notifications`}
            style={{ width: 36, height: 36, borderRadius: 9, border: '1px solid var(--border-light)', background: 'var(--surface-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', position: 'relative' }}>
            <Bell size={16} />
            {unread > 0 && (
              <span style={{ position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: '50%', background: 'var(--brand-600)', color: '#fff', fontSize: '0.625rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--surface-card)' }}>
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </button>
          {isNotifOpen && (
            <div className="dropdown" style={{ width: 320 }}>
              <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Notifications</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{notifications.length} total</span>
              </div>
              <div style={{ padding: '8px 6px', maxHeight: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {notifications.length === 0 ? (
                  <p style={{ padding: '20px 8px', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>No notifications</p>
                ) : notifications.slice(0, 10).map(n => (
                  <div key={n.id} style={{ padding: '10px 12px', borderRadius: 10, background: n.isRead ? 'transparent' : 'var(--brand-50)', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: 2 }}>{n.title}</div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.message}</p>
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
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.8125rem' }}>
              {initials}
            </div>
            <div className="hidden sm:block">
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>{adminName}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>System Administrator</div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>
          {isProfileOpen && (
            <div className="dropdown" style={{ minWidth: 210 }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{adminName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>admin@medhelp.health</div>
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
