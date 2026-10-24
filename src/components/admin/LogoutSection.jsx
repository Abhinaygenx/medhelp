import React from 'react'
import { LogOut, ShieldAlert, ArrowLeft } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import toast from 'react-hot-toast'

export default function LogoutSection({ onLogout, onCancel }) {
  const handleConfirm = () => {
    toast.success("Signing out from Super Admin session...")
    if (onLogout) onLogout()
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-300">
      <AdminNeonCard className="p-8 space-y-6 text-center" style={{ color: 'var(--text-primary)' }}>
        <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400 flex items-center justify-center mx-auto shadow-sm">
          <LogOut className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            Sign Out of Super Admin Session?
          </h2>
          <p className="text-xs max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
            Confirming sign out will safely terminate your administrative session and return to the secure login prompt.
          </p>
        </div>

        <div 
          className="p-4 rounded-2xl text-xs space-y-1 text-left"
          style={{
            background: 'var(--surface-page)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-secondary)'
          }}
        >
          <div className="flex items-center space-x-2 font-bold" style={{ color: 'var(--brand-600)' }}>
            <ShieldAlert className="w-4 h-4" />
            <span>Security Reminder</span>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Always log out when leaving your workstation to maintain HIPAA & EMR regulatory compliance.</p>
        </div>

        <div className="pt-2 flex items-center justify-center space-x-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-2xl font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer hover:opacity-90"
              style={{
                background: 'var(--surface-page)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-light)'
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Cancel & Stay Logged In</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-lg shadow-rose-500/25 transition-all hover:scale-105 cursor-pointer"
          >
            Confirm Sign Out
          </button>
        </div>
      </AdminNeonCard>
    </div>
  )
}
