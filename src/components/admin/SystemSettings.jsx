import React, { useState } from 'react'
import { Settings, Save, Database, Cloud } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
import toast from 'react-hot-toast'

export default function SystemSettings({ systemSettings = {}, onSaveSettings, isFirebaseConnected = true }) {
  const [hospInfo, setHospInfo] = useState({
    name: systemSettings.name || 'Apollo Virtual Healthcare Portal',
    tagline: systemSettings.tagline || 'Enterprise Medical Command Center',
    address: systemSettings.address || '742 Evergreen Terrace, Medical District, NY 10001',
    phone: systemSettings.phone || '+1 (800) 555-APOLLO',
    email: systemSettings.email || 'admin@apollo-hospital.org',
    opdHours: systemSettings.opdHours || '08:00 AM - 08:00 PM (Mon-Sat)',
    backupFrequency: systemSettings.backupFrequency || 'Daily Automatic Cloud Snapshot'
  })

  const [isSaved, setIsSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    if (onSaveSettings) {
      onSaveSettings(hospInfo)
    }
    setIsSaved(true)
    toast.success("System configurations updated successfully!")
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Settings className="w-5 h-5 text-[var(--brand-600)]" /> Hospital Enterprise System Settings
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Configure hospital branding, OPD working hours, SMTP mail, and database backup policies.
          </p>
        </div>

        <Badge variant={isFirebaseConnected ? 'success' : 'warning'} size="sm">
          {isFirebaseConnected ? 'Firestore Cloud Online' : 'Local Storage Mode'}
        </Badge>
      </div>

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Hospital Enterprise Name</label>
            <input
              type="text"
              value={hospInfo.name}
              onChange={(e) => setHospInfo({...hospInfo, name: e.target.value})}
              className="w-full rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
              style={{
                background: 'var(--surface-page)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div>
            <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Official Contact Email</label>
            <input
              type="email"
              value={hospInfo.email}
              onChange={(e) => setHospInfo({...hospInfo, email: e.target.value})}
              className="w-full rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
              style={{
                background: 'var(--surface-page)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div>
            <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Helpline Phone Number</label>
            <input
              type="text"
              value={hospInfo.phone}
              onChange={(e) => setHospInfo({...hospInfo, phone: e.target.value})}
              className="w-full rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
              style={{
                background: 'var(--surface-page)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div>
            <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>OPD Clinic Hours</label>
            <input
              type="text"
              value={hospInfo.opdHours}
              onChange={(e) => setHospInfo({...hospInfo, opdHours: e.target.value})}
              className="w-full rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
              style={{
                background: 'var(--surface-page)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        <div>
          <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Hospital Physical Address</label>
          <input
            type="text"
            value={hospInfo.address}
            onChange={(e) => setHospInfo({...hospInfo, address: e.target.value})}
            className="w-full rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
            style={{
              background: 'var(--surface-page)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        <div 
          className="p-4 rounded-2xl space-y-2"
          style={{
            background: 'var(--surface-page)',
            border: '1px solid var(--border-light)'
          }}
        >
          <h4 className="font-bold" style={{ color: 'var(--text-primary)' }}>Database & Cloud Snapshot Policy</h4>
          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Real-time automatic sync active with Firebase Firestore & Encryption Vault.</p>
          <div className="flex items-center space-x-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <Database className="w-4 h-4" />
            <span>Daily Automated Cloud Backup Active</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="submit"
            className="font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm text-white hover:opacity-95"
            style={{ background: 'var(--brand-600)' }}
          >
            <Save className="w-4 h-4 text-white" />
            <span>Save System Configurations</span>
          </button>

          {isSaved && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">✓ Configurations Updated</span>
          )}
        </div>
      </form>

    </AdminNeonCard>
  )
}
