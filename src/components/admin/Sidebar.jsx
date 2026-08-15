import React from 'react'
import { ShieldCheck, X } from 'lucide-react'
import adminMenu from '../../data/adminMenu'

export default function Sidebar({ 
  activeTab = 'dashboard', 
  onSelectTab, 
  onLogout,
  isOpen = false,
  onCloseMobile 
}) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-[#0B0F19]/80 backdrop-blur-md lg:hidden"
        />
      )}

      {/* Fixed Sidebar */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 z-50 w-[280px] md:w-[240px] lg:w-[280px] bg-[#111827] border-r border-[#E5FF0030] text-[#F9FAFB] flex flex-col justify-between p-5 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-4">
          
          {/* Header Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5FF0020]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E5FF00] flex items-center justify-center shadow-[0_0_20px_rgba(229,255,0,0.45)]">
                <ShieldCheck className="w-6 h-6 text-[#0B0F19]" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm text-[#F9FAFB] tracking-tight font-['Space_Grotesk'] leading-tight">
                  Apollo HMS Admin
                </h1>
                <span className="text-[10px] text-[#E5FF00] font-extrabold uppercase tracking-wider">Enterprise Control</span>
              </div>
            </div>

            <button 
              type="button" 
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-xl bg-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] border border-[#E5FF0020]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar pr-1">
            {adminMenu.map(item => {
              const Icon = item.icon
              const isActive = activeTab === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.id === 'logout') {
                      if (onLogout) onLogout()
                    } else {
                      onSelectTab(item.id)
                    }
                    if (onCloseMobile) onCloseMobile()
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#E5FF00] text-black shadow-[0_0_20px_rgba(229,255,0,0.45)]' 
                      : 'text-[#9CA3AF] hover:bg-[#E5FF0015] hover:text-white hover:border-[#E5FF00] hover:shadow-[0_0_20px_rgba(229,255,0,0.25)]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-[#9CA3AF]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </div>

        </div>
      </aside>
    </>
  )
}
