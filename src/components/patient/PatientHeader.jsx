import React, { useState } from 'react'
import { Bell, ChevronDown, Menu, User, ShieldCheck, LogOut } from 'lucide-react'

export default function PatientHeader({ 
  patientName = 'Eleanor Vance', 
  patientRole = 'Patient',
  avatarUrl,
  notifications = [], 
  onToggleMobileSidebar,
  onLogout 
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <header className="bg-[#04140F]/80 backdrop-blur-md border-b border-[#113328] sticky top-0 z-30 px-4 sm:px-6 py-3.5 shadow-lg shadow-[#020B08]/40">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu Button + Dynamic Greeting */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl bg-[#071A14] text-[#A7B3AD] hover:bg-[#0A211A] border border-[#113328]"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5 text-[#00FF66]" />
          </button>

          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#F8FAFC] font-['Space_Grotesk'] leading-tight flex items-center gap-1.5">
              <span>Good Morning, {patientName.split(' ')[0]}</span>
              <span className="inline-block animate-bounce">👋</span>
            </h2>
            <p className="text-xs text-[#A7B3AD] hidden sm:block font-medium">
              Here’s your health summary for today
            </p>
          </div>
        </div>

        {/* Right Side: Notifications & User Avatar Dropdown */}
        <div className="flex items-center space-x-3">
          
          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              aria-label="View patient notifications"
              className="relative p-2.5 rounded-2xl bg-[#071A14] hover:bg-[#0A211A] border border-[#113328] text-[#F8FAFC] transition-all"
            >
              <Bell className="w-4.5 h-4.5 text-[#00FF66]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00FF66] text-[#04140F] font-extrabold text-[9px] flex items-center justify-center border-2 border-[#04140F] shadow-[0_0_8px_rgba(0,255,102,0.6)]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-3xl bg-[#071A14] border border-[#113328] shadow-2xl p-4 z-50 divide-y divide-[#113328]">
                <div className="pb-2.5 flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#F8FAFC]">Notifications</h4>
                  <span className="text-[10px] text-[#6B7C75]">{notifications.length} total</span>
                </div>
                <div className="py-2 max-h-60 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-[#6B7C75] text-center py-3">No new notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="p-3 rounded-2xl bg-[#0A211A] border border-[#113328] text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-[#00FF66]">
                          <span>{n.title}</span>
                          <span className="text-[9px] text-[#6B7C75]">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-[11px] text-[#A7B3AD]">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar Card */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-label="User Profile Dropdown"
              className="flex items-center space-x-2.5 p-1.5 rounded-2xl hover:bg-[#071A14] border border-transparent hover:border-[#113328] transition-all"
            >
              <img
                src={avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"}
                alt={patientName}
                className="w-9 h-9 rounded-xl object-cover border border-[#00FF66]/50 shadow-[0_0_10px_rgba(0,255,102,0.3)]"
              />
              <div className="text-left hidden md:block">
                <p className="text-xs font-extrabold text-[#F8FAFC] leading-tight">{patientName}</p>
                <p className="text-[10px] font-bold text-[#00FF66]">{patientRole} • PAT-99824</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B7C75] hidden md:block" />
            </button>

            {/* User Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-52 rounded-3xl bg-[#071A14] border border-[#113328] shadow-2xl p-2.5 z-50 space-y-1">
                <div className="px-3 py-2.5 border-b border-[#113328]">
                  <p className="text-xs font-bold text-[#F8FAFC]">{patientName}</p>
                  <p className="text-[10px] text-[#A7B3AD]">PAT-99824 • O+ Positive</p>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
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
