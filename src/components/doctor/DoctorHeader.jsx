import React from 'react'
import { Bell, Menu, Search, Calendar, ChevronDown, LogOut } from 'lucide-react'

export default function DoctorHeader({ 
  doctorName = 'Dr. Robert Ford', 
  doctorDept = 'Cardiology Department',
  avatarUrl,
  notifications = [], 
  onToggleMobileSidebar,
  onLogout 
}) {
  const [isNotifOpen, setIsNotifOpen] = React.useState(false)
  const [isProfileOpen, setIsProfileOpen] = React.useState(false)

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header className="bg-[#061124]/90 backdrop-blur-xl border-b border-[#162742] sticky top-0 z-30 px-6 py-4 shadow-[0_8px_32px_rgba(2,8,23,0.45)]">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu Button + Title / Date */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2.5 rounded-2xl bg-[#081225] text-[#cbd5e1] hover:bg-[#0b172a] border border-[#E5FF0020]"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5 text-[#E5FF00]" />
          </button>

          <div>
            <h2 className="text-lg font-extrabold text-[#f8fafc] font-['Space_Grotesk'] leading-tight">
              Welcome back, {doctorName}
            </h2>
            <p className="text-xs text-[#94a3b8] flex items-center gap-1.5 mt-0.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#E5FF00]" />
              <span>{currentDateStr}</span>
              <span className="hidden sm:inline text-[#64748b]">• {doctorDept}</span>
            </p>
          </div>
        </div>

        {/* Right Side: Search & Profile Options */}
        <div className="flex items-center space-x-3">
          
          {/* Quick Search */}
          <div className="relative hidden md:block w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search patients, EHR, charts..."
              className="w-full bg-[#081225] border border-[#162742] rounded-2xl pl-10 pr-4 py-2 text-xs text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#E5FF00]"
            />
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2.5 rounded-2xl bg-[#081225] hover:bg-[#0b172a] text-[#cbd5e1] border border-[#162742] relative transition-all"
              aria-label="View doctor notifications"
            >
              <Bell className="w-4.5 h-4.5 text-[#E5FF00]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E5FF00] text-[#020817] font-extrabold text-[9px] flex items-center justify-center border-2 border-[#020817]">
                3
              </span>
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-3xl bg-[#081225] border border-[#162742] shadow-[0_8px_32px_rgba(2,8,23,0.8)] p-4 z-50 divide-y divide-[#162742]">
                <div className="pb-3 font-bold text-xs text-[#f8fafc]">Hospital Emergency Alerts</div>
                <div className="py-3 space-y-2.5 text-xs">
                  <div className="p-3 rounded-2xl bg-[#E5FF00]/15 border border-[#E5FF00]/30 text-[#E5FF00] font-medium">
                    <p className="font-bold">Emergency Consultation Request</p>
                    <p className="text-[11px] text-[#E5FF00]/80 mt-0.5">Patient Eleanor Vance placed in High-Risk ER queue.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#0b172a] border border-[#162742] text-[#cbd5e1]">
                    <p className="font-bold">Lab Report Uploaded</p>
                    <p className="text-[11px] text-[#94a3b8] mt-0.5">CBC & Lipid Panel for John Doe ready.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Doctor Avatar Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2.5 p-1.5 rounded-2xl hover:bg-[#081225] transition-all border border-transparent hover:border-[#E5FF0020]"
            >
              <img
                src={avatarUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"}
                alt={doctorName}
                className="w-10 h-10 rounded-2xl object-cover border border-[#E5FF00]/50 shadow-sm"
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-[#f8fafc] leading-tight">{doctorName}</p>
                <p className="text-[10px] text-[#E5FF00] font-extrabold">Senior MD</p>
              </div>
              <ChevronDown className="w-4 h-4 text-[#94a3b8] hidden sm:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-52 rounded-3xl bg-[#081225] border border-[#162742] shadow-[0_8px_32px_rgba(2,8,23,0.8)] p-2.5 z-50 space-y-1">
                <div className="px-3 py-2.5 border-b border-[#162742]">
                  <p className="text-xs font-bold text-[#f8fafc]">{doctorName}</p>
                  <p className="text-[10px] text-[#94a3b8]">{doctorDept}</p>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-[#ef4444]" />
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
