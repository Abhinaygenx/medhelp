import React from 'react'
import { Stethoscope, X, LogOut } from 'lucide-react'
import { CLIENT } from '../../config/clientConfig'
import {
  LayoutDashboard, Calendar, FileText, CreditCard,
  Info, User, BrainCircuit, AlertTriangle, Activity,
  LineChart, HeartPulse, ShieldAlert, Settings
} from 'lucide-react'

const coreFeatures = [
  { id: 'dashboard',        label: 'Dashboard',        icon: LayoutDashboard },
  { id: 'appointments',     label: 'Appointments',     icon: Calendar },
  { id: 'timeline',         label: 'Medical Timeline', icon: Activity },
  { id: 'medical-records',  label: 'Medical Records',  icon: FileText },
  { id: 'billing',          label: 'Billing & Invoices', icon: CreditCard },
  { id: 'health-information', label: 'Health Info',    icon: Info },
  { id: 'profile',          label: 'My Profile',       icon: User },
]

const advancedFeatures = [
  { id: 'ai-symptom-checker', label: 'AI Symptom Checker', icon: BrainCircuit },
  { id: 'emergency-alerts',   label: 'Emergency Alerts',   icon: AlertTriangle },
  { id: 'health-score',       label: 'Health Score',       icon: Activity },
  { id: 'health-insights',    label: 'Health Insights',    icon: LineChart },
  { id: 'health-monitoring',  label: 'Health Monitoring',  icon: HeartPulse },
  { id: 'risk-indicators',    label: 'Risk Indicators',    icon: ShieldAlert },
]

const otherFeatures = [
  { id: 'settings', label: 'Settings', icon: Settings },
]

function NavGroup({ title, items, activeMenu, onSelectMenu, onCloseMobile }) {
  return (
    <div style={{ paddingTop: 8 }}>
      <p style={{ padding: '0 12px 4px', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--sidebar-text-muted)' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(item => {
          const Icon = item.icon
          const isActive = activeMenu === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => { onSelectMenu(item.id); if (onCloseMobile) onCloseMobile() }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                borderRadius: 10, fontSize: '0.8125rem', fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
                boxShadow: isActive ? '0 4px 12px rgba(37,99,235,0.25)' : 'none',
                transition: 'all 150ms',
                minHeight: 44,
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
      </div>
    </div>
  )
}

export default function PatientSidebar({ activeMenu = 'dashboard', onSelectMenu, onLogout, isOpen = false, onCloseMobile }) {
  return (
    <>
      {/* Mobile backdrop */}
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
        aria-label="Patient portal navigation"
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
          width: 260, background: 'var(--sidebar-bg)',
          borderRight: '1px solid var(--sidebar-border)',
          display: 'flex', flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          transform: isOpen ? 'translateX(0)' : undefined,
          transition: 'transform 300ms ease',
        }}
        className={isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
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
                <div style={{ fontSize: '0.6875rem', color: 'var(--brand-600)', fontWeight: 600 }}>Patient Portal</div>
              </div>
            </div>
            <button
              onClick={onCloseMobile}
              className="lg:hidden"
              aria-label="Close navigation"
              style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border-light)', background: 'var(--surface-page)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
            ><X size={16} /></button>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <NavGroup title="Core" items={coreFeatures} activeMenu={activeMenu} onSelectMenu={onSelectMenu} onCloseMobile={onCloseMobile} />
          <NavGroup title="Advanced" items={advancedFeatures} activeMenu={activeMenu} onSelectMenu={onSelectMenu} onCloseMobile={onCloseMobile} />
          <NavGroup title="Other" items={otherFeatures} activeMenu={activeMenu} onSelectMenu={onSelectMenu} onCloseMobile={onCloseMobile} />
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--sidebar-border)' }}>
          <button
            type="button"
            onClick={onLogout}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', width: '100%', minHeight: 44, transition: 'all 150ms' }}
            onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
            onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
          >
            <LogOut size={16} />
            Sign Out
          </button>
          <p style={{ textAlign: 'center', fontSize: '0.6875rem', color: 'var(--text-disabled)', marginTop: 10 }}>HIPAA Compliant EMR v{CLIENT.version}</p>
        </div>
      </aside>
    </>
  )
}
