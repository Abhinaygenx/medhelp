import React, { useState } from 'react'
import { Settings, Save, Database, Cloud, Mail, Clock, Building2 } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
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
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#E5FF00]" /> Hospital Enterprise System Settings
          </h2>
          <p className="text-xs text-[#9CA3AF]">Configure hospital branding, OPD working hours, SMTP mail, and database backup policies.</p>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
          isFirebaseConnected 
            ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30' 
            : 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
        }`}>
          {isFirebaseConnected ? 'Firestore Cloud Online' : 'Local Storage Mode'}
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-[#9CA3AF] block mb-1">Hospital Enterprise Name</label>
            <input
              type="text"
              value={hospInfo.name}
              onChange={(e) => setHospInfo({...hospInfo, name: e.target.value})}
              className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3.5 py-2.5 text-[#F9FAFB] focus:outline-none focus:border-[#E5FF00]"
            />
          </div>

          <div>
            <label className="font-bold text-[#9CA3AF] block mb-1">Official Contact Email</label>
            <input
              type="email"
              value={hospInfo.email}
              onChange={(e) => setHospInfo({...hospInfo, email: e.target.value})}
              className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3.5 py-2.5 text-[#F9FAFB] focus:outline-none focus:border-[#E5FF00]"
            />
          </div>

          <div>
            <label className="font-bold text-[#9CA3AF] block mb-1">Helpline Phone Number</label>
            <input
              type="text"
              value={hospInfo.phone}
              onChange={(e) => setHospInfo({...hospInfo, phone: e.target.value})}
              className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3.5 py-2.5 text-[#F9FAFB] focus:outline-none focus:border-[#E5FF00]"
            />
          </div>

          <div>
            <label className="font-bold text-[#9CA3AF] block mb-1">OPD Clinic Hours</label>
            <input
              type="text"
              value={hospInfo.opdHours}
              onChange={(e) => setHospInfo({...hospInfo, opdHours: e.target.value})}
              className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3.5 py-2.5 text-[#F9FAFB] focus:outline-none focus:border-[#E5FF00]"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-[#9CA3AF] block mb-1">Hospital Physical Address</label>
          <input
            type="text"
            value={hospInfo.address}
            onChange={(e) => setHospInfo({...hospInfo, address: e.target.value})}
            className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3.5 py-2.5 text-[#F9FAFB] focus:outline-none focus:border-[#E5FF00]"
          />
        </div>

        <div className="p-4 rounded-2xl bg-[#111827] border border-[#374151] space-y-2">
          <h4 className="font-bold text-[#E5FF00]">Database & Cloud Snapshot Policy</h4>
          <p className="text-[#9CA3AF] text-[11px]">Real-time automatic sync active with Firebase Firestore & Encryption Vault.</p>
          <div className="flex items-center space-x-2 text-[11px] text-[#22C55E]">
            <Database className="w-4 h-4" />
            <span>Daily Automated Cloud Backup Active</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="submit"
            style={{ background: '#E5FF00', color: '#0B0F19', boxShadow: '0 0 15px rgba(229, 255, 0, 0.45)' }}
            className="font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
          >
            <Save className="w-4 h-4 text-[#0B0F19]" />
            <span>Save System Configurations</span>
          </button>

          {isSaved && (
            <span className="text-xs text-[#22C55E] font-bold">✓ Configurations Updated</span>
          )}
        </div>
      </form>

    </AdminNeonCard>
  )
}
