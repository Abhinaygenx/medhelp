import React, { useState } from 'react'
import { 
  Search, 
  Bell, 
  Menu, 
  ShieldCheck, 
  LogOut, 
  ChevronDown, 
  Cloud, 
  CloudOff,
  AlertTriangle
} from 'lucide-react'

export default function Topbar({ 
  adminName = 'Super Admin', 
  isFirebaseConnected = true,
  emergencyCount = 2,
  notifications = [],
  onToggleMobileSidebar,
  onLogout 
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="bg-[#111827]/90 backdrop-blur-md border-b border-[#374151] sticky top-0 z-30 px-6 py-4 shadow-lg shadow-[#0B0F19]/50 text-[#F9FAFB]">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu Button + Title / Subtitle */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2.5 rounded-2xl bg-[#1F2937] text-[#9CA3AF] hover:text-white border border-[#374151]"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5 text-[#E5FF00]" />
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] leading-tight">
                Hospital Command Center
              </h2>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#E5FF00]/15 text-[#E5FF00] border border-[#E5FF00]/30 text-[10px] font-extrabold uppercase">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] mt-0.5 font-medium flex items-center gap-2">
              <span>Apollo Hospital Enterprise Console</span>
              <span>•</span>
              {isFirebaseConnected ? (
                <span className="text-[#22C55E] flex items-center gap-1 font-bold">
                  <Cloud className="w-3.5 h-3.5" /> Firestore Active
                </span>
              ) : (
                <span className="text-[#F59E0B] flex items-center gap-1 font-bold">
                  <CloudOff className="w-3.5 h-3.5" /> Local Storage Active
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Side: Global Search, Emergency Pill, Notifications & Avatar */}
        <div className="flex items-center space-x-3">
          
          {/* Quick Search Input */}
          <div className="relative hidden md:block w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search patients, doctors, beds..."
              className="w-full bg-[#0B0F19] border border-[#374151] rounded-2xl pl-10 pr-4 py-2 text-xs text-[#F9FAFB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E5FF00]"
            />
          </div>

          {/* Emergency Alert Indicator */}
          {emergencyCount > 0 && (
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-xs font-bold animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              <span>{emergencyCount} ER Alerts</span>
            </div>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2.5 rounded-2xl bg-[#1F2937] hover:bg-[#374151] text-[#F9FAFB] border border-[#374151] relative transition-all"
              aria-label="View admin notifications"
            >
              <Bell className="w-4.5 h-4.5 text-[#E5FF00]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E5FF00] text-[#0B0F19] font-extrabold text-[9px] flex items-center justify-center border-2 border-[#0B0F19] shadow-[0_0_8px_rgba(229,255,0,0.6)]">
                3
              </span>
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-3xl bg-[#1F2937] border border-[#374151] shadow-2xl p-4 z-50 divide-y divide-[#374151]">
                <div className="pb-2.5 flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#F9FAFB]">System Notifications</h4>
                  <span className="text-[10px] text-[#9CA3AF]">3 Active</span>
                </div>
                <div className="py-2.5 space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-[#0B0F19] border border-[#374151]">
                    <p className="font-bold text-[#E5FF00]">New Doctor Registration</p>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">Dr. Sarah Jenkins submitted credentials for Cardiology verification.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#0B0F19] border border-[#374151]">
                    <p className="font-bold text-[#EF4444]">ICU Bed Low Capacity</p>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">Only 2 ICU beds remaining in East Wing Ward.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Super Admin Profile Avatar */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2.5 p-1.5 rounded-2xl hover:bg-[#1F2937] transition-all border border-transparent hover:border-[#374151]"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E5FF00] to-[#b3cc00] flex items-center justify-center text-[#0B0F19] font-extrabold text-sm shadow-[0_0_12px_rgba(229,255,0,0.3)]">
                SA
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-extrabold text-[#F9FAFB] leading-tight">{adminName}</p>
                <p className="text-[10px] text-[#E5FF00] font-extrabold">System Director</p>
              </div>
              <ChevronDown className="w-4 h-4 text-[#9CA3AF] hidden sm:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-52 rounded-3xl bg-[#1F2937] border border-[#374151] shadow-2xl p-2.5 z-50 space-y-1">
                <div className="px-3 py-2.5 border-b border-[#374151]">
                  <p className="text-xs font-bold text-[#F9FAFB]">{adminName}</p>
                  <p className="text-[10px] text-[#9CA3AF]">admin@apollo-hospital.org</p>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-[#EF4444]" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  )
}
