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
      <AdminNeonCard className="p-8 space-y-6 text-center text-[#F9FAFB]">
        <div className="w-16 h-16 rounded-3xl bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(239,68,68,0.3)]">
          <LogOut className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk']">
            Sign Out of Super Admin Session?
          </h2>
          <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto">
            Confirming sign out will safely terminate your administrative session and return to the secure login prompt.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B0F19] border border-[#374151] text-xs text-[#9CA3AF] space-y-1 text-left">
          <div className="flex items-center space-x-2 text-[#E5FF00] font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>Security Reminder</span>
          </div>
          <p>Always log out when leaving your workstation to maintain HIPAA & EMR regulatory compliance.</p>
        </div>

        <div className="pt-2 flex items-center justify-center space-x-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-2xl bg-[#111827] hover:bg-[#374151] text-[#9CA3AF] hover:text-white font-bold text-xs border border-[#374151] transition-all flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Cancel & Stay Logged In</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-3 rounded-2xl bg-[#EF4444] hover:bg-red-600 text-white font-extrabold text-xs shadow-lg shadow-red-500/30 transition-all hover:scale-105"
          >
            Confirm Sign Out
          </button>
        </div>
      </AdminNeonCard>
    </div>
  )
}
