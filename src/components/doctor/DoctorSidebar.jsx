import React from 'react'
import { Stethoscope, X, LogOut } from 'lucide-react'
import { CLIENT } from '../../config/clientConfig'
import {
  LayoutDashboard, CalendarDays, Users, FileText,
  Pill, TestTube, Clock, MessageSquare, User,
} from 'lucide-react'

const menuItems = [
  { id: 'dashboard',    label: 'Dashboard',       icon: LayoutDashboard },
  { id: 'clinical-hub', label: 'Clinical Hub & Uploads', icon: FileText },
  { id: 'appointments', label: 'Appointments',    icon: CalendarDays },
  { id: 'patients',     label: 'Patients',        icon: Users },
  { id: 'records',      label: 'Medical Records', icon: FileText },
  { id: 'prescriptions', label: 'Prescriptions',  icon: Pill },
  { id: 'labreports',   label: 'Lab Reports',     icon: TestTube },
  { id: 'schedule',     label: 'Schedule',        icon: Clock },
  { id: 'messages',     label: 'Messages',        icon: MessageSquare },
  { id: 'profile',      label: 'Profile',         icon: User },
]

export default function DoctorSidebar({ activeTab = 'dashboard', onSelectTab, onLogout, isOpen = false, onCloseMobile }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onCloseMobile}
          style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }}
          className="lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        role="navigation"
        aria-label="Doctor portal navigation"
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
          width: 260, background: 'var(--sidebar-bg)',
          borderRight: '1px solid var(--sidebar-border)',
          display: 'flex', flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
        }}
        className={`transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Brand */}
        <div style={{ padding: '20px 16px 14px', borderBottom: '1px solid var(--sidebar-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stethoscope size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>{CLIENT.shortName}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--brand-600)', fontWeight: 600 }}>Doctor Portal</div>
              </div>
            </div>
            <button
              onClick={onCloseMobile}
              className="lg:hidden flex items-center justify-center cursor-pointer"
              aria-label="Close navigation"
              style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border-light)', background: 'var(--surface-page)', color: 'var(--text-muted)' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {menuItems.map(item => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => { onSelectTab(item.id); if (onCloseMobile) onCloseMobile() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                  borderRadius: 10, fontSize: '0.8125rem', fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                  background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                  border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
                  boxShadow: isActive ? '0 4px 12px rgba(37,99,235,0.25)' : 'none',
                  transition: 'all 150ms', minHeight: 44,
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--sidebar-hover-bg)'; e.currentTarget.style.color = 'var(--sidebar-hover-text)' }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--sidebar-text)' }}}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--sidebar-border)' }}>
          <button type="button" onClick={onLogout}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', width: '100%', minHeight: 44, transition: 'all 150ms' }}
            onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
            onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
          >
            <LogOut size={16} />
            Sign Out
          </button>
          <p style={{ textAlign: 'center', fontSize: '0.6875rem', color: 'var(--text-disabled)', marginTop: 10 }}>Clinical Portal v{CLIENT.version}</p>
        </div>
      </aside>
    </>
  )
}
