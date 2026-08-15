import React from 'react'
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  FileText, 
  Pill, 
  TestTube, 
  Clock, 
  MessageSquare, 
  User, 
  Stethoscope,
  LogOut,
  X
} from 'lucide-react'

export default function DoctorSidebar({ 
  activeTab = 'dashboard', 
  onSelectTab, 
  onLogout,
  isOpen = false,
  onCloseMobile 
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'records', label: 'Medical Records', icon: FileText },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'labreports', label: 'Lab Reports', icon: TestTube },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-[#020817]/80 backdrop-blur-md lg:hidden"
        />
      )}

      {/* Fixed Vertical Sidebar */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-[#020b1f] text-slate-100 flex flex-col justify-between p-6 border-r border-[#112240] shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          
          {/* Header Brand */}
          <div className="flex items-center justify-between pb-5 border-b border-[#E5FF0020]">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-[#E5FF00] flex items-center justify-center shadow-[0_0_20px_rgba(229,255,0,0.45)]">
                <Stethoscope className="w-6 h-6 text-[#0B0F19]" />
              </div>
              <div>
                <h1 className="font-extrabold text-base text-white font-['Space_Grotesk'] tracking-tight">
                  MediCare ERP
                </h1>
                <span className="text-[10px] text-[#E5FF00] font-extrabold uppercase tracking-wider">Enterprise Portal</span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              type="button" 
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-xl bg-[#061124] text-[#94a3b8] hover:text-white border border-[#E5FF0020]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2 overflow-y-auto max-h-[calc(100vh-210px)] custom-scrollbar pr-1">
            {menuItems.map(item => {
              const Icon = item.icon
              const isActive = activeTab === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectTab(item.id)
                    if (onCloseMobile) onCloseMobile()
                  }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#E5FF00] text-[#0B0F19] shadow-[0_0_20px_rgba(229,255,0,0.45)] translate-x-1 font-extrabold' 
                      : 'text-[#94a3b8] hover:bg-[#E5FF0015] hover:text-[#E5FF00]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0B0F19]' : 'text-[#94a3b8]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </nav>

        </div>

        {/* Footer Logout Action */}
        <div className="pt-4 border-t border-[#112240] space-y-2">
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold text-[#ef4444] hover:bg-[#ef4444]/10 border border-[#ef4444]/20 transition-all"
          >
            <LogOut className="w-4 h-4 text-[#ef4444]" />
            <span>Sign Out</span>
          </button>
          <p className="text-[10px] text-center text-[#64748b] font-medium">Apollo Hospital ERP v4.5</p>
        </div>

      </aside>
    </>
  )
}
