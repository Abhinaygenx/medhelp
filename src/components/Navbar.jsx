import { useState } from 'react'
import { 
  Stethoscope, 
  User, 
  ShieldCheck, 
  Bell, 
  Cloud, 
  CloudOff, 
  CheckCircle2, 
  ChevronDown,
  Sparkles,
  LogOut,
  SlidersHorizontal,
  Calendar,
  Activity
} from 'lucide-react'

export default function Navbar({ 
  currentRole, 
  onRoleChange, 
  currentUser, 
  onLogout,
  notifications, 
  isFirebaseConnected, 
  activeTab, 
  setActiveTab 
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.isRead).length

  const roles = [
    { id: 'patient', label: 'Patient Portal', icon: User, badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { id: 'doctor', label: 'Doctor Portal', icon: Stethoscope, badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { id: 'admin', label: 'Hospital Admin', icon: ShieldCheck, badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20' }
  ]

  const activeRoleObj = roles.find(r => r.id === currentRole) || roles[0]

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk']">
              Virtual Healthcare Consultation Portal
            </h1>
            <p className="text-xs text-cyan-400">
              Powered by MediSphere Cloud Intelligence
            </p>
          </div>
        </div>

        {/* Center - Realtime Cloud Connection Status Indicator */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs">
          {isFirebaseConnected ? (
            <>
              <Cloud className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">Firestore Live Sync</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </>
          ) : (
            <>
              <CloudOff className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300 font-medium">Offline Seed Mode</span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </>
          )}
        </div>

        {/* Right Section: Notifications & Role Switcher */}
        <div className="flex items-center space-x-3">
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              aria-label="View notifications"
              className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all border border-slate-700/60"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-teal-500 text-slate-950 font-bold text-[10px] flex items-center justify-center border-2 border-slate-900">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 p-4 divide-y divide-slate-800/80 animate-in fade-in zoom-in-95 duration-150">
                <div className="pb-3 flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-teal-400" /> Notifications
                  </h4>
                  <span className="text-xs text-slate-400">{notifications.length} total</span>
                </div>
                <div className="py-2 max-h-72 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">No new notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 transition-all border border-slate-800">
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-semibold text-teal-300">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Role Switcher Bar */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              aria-label="Select portal role persona"
              className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 transition-all group"
            >
              <div className={`p-1.5 rounded-lg border ${activeRoleObj.badgeColor}`}>
                <activeRoleObj.icon className="w-4 h-4" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Role Persona</p>
                <p className="text-xs font-bold text-slate-100">{activeRoleObj.label}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-transform" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 p-2 space-y-1">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Switch View Role</p>
                </div>
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onRoleChange(r.id)
                      setIsRoleDropdownOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      currentRole === r.id 
                        ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30' 
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <r.icon className="w-4 h-4" />
                    <span>{r.label}</span>
                    {currentRole === r.id && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 ml-auto" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sign Out Action Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              aria-label="Sign out of your account"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700/60 hover:border-red-500/40 transition-all flex items-center space-x-1.5 text-xs font-semibold"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          )}

        </div>

      </div>
    </header>
  )
}
