import { 
  Stethoscope, 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  CreditCard,
  Info, 
  User, 
  BrainCircuit, 
  AlertTriangle, 
  Activity, 
  LineChart, 
  HeartPulse, 
  ShieldAlert, 
  Settings, 
  LogOut,
  X
} from 'lucide-react'

export default function PatientSidebar({ 
  activeMenu = 'dashboard', 
  onSelectMenu, 
  onLogout,
  isOpen = false,
  onCloseMobile
}) {

  const coreFeatures = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'medical-records', label: 'Medical Records', icon: FileText },
    { id: 'billing', label: 'Billing & Invoices', icon: CreditCard },
    { id: 'health-information', label: 'Health Information', icon: Info },
    { id: 'profile', label: 'Patient Profile', icon: User }
  ]

  const advancedFeatures = [
    { id: 'ai-symptom-checker', label: 'AI Symptom Checker', icon: BrainCircuit },
    { id: 'emergency-alerts', label: 'Emergency Alerts', icon: AlertTriangle },
    { id: 'health-score', label: 'Health Score', icon: Activity },
    { id: 'health-insights', label: 'Health Insights', icon: LineChart },
    { id: 'health-monitoring', label: 'Health Monitoring', icon: HeartPulse },
    { id: 'risk-indicators', label: 'Risk Indicators', icon: ShieldAlert }
  ]

  const otherFeatures = [
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const renderNavGroup = (title, items) => (
    <div className="space-y-1 py-2">
      <p className="px-4 text-[10px] font-extrabold uppercase tracking-wider text-[#6B7C75] font-['Space_Grotesk']">
        {title}
      </p>
      <div className="space-y-1 mt-1">
        {items.map(item => {
          const Icon = item.icon
          const isActive = activeMenu === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectMenu(item.id)
                if (onCloseMobile) onCloseMobile()
              }}
              style={isActive ? {
                background: '#E5FF00',
                boxShadow: '0 0 20px rgba(229, 255, 0, 0.45)',
                color: '#0B0F19'
              } : {}}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                isActive 
                  ? 'translate-x-1 font-extrabold' 
                  : 'text-[#A7B3AD] hover:text-[#E5FF00] hover:bg-[#E5FF00]/10'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0B0F19]' : 'text-[#6B7C75]'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-[#020B08]/80 backdrop-blur-md lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 z-50 w-[270px] bg-[#04140F] text-[#F8FAFC] flex flex-col justify-between p-5 border-r border-[#E5FF0020] shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Branding Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5FF0020]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E5FF00] flex items-center justify-center shadow-[0_0_20px_rgba(229,255,0,0.45)]">
                <Stethoscope className="w-5 h-5 text-[#0B0F19]" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm text-[#F8FAFC] tracking-tight font-['Space_Grotesk'] leading-tight">
                  Virtual Healthcare
                </h1>
                <span className="text-[10px] text-[#E5FF00] font-extrabold uppercase tracking-wider">MediSphere Cloud</span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg bg-[#071A14] text-[#A7B3AD] hover:text-white border border-[#113328]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menus */}
          <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-190px)] pr-1 custom-scrollbar">
            {renderNavGroup('Core Features', coreFeatures)}
            {renderNavGroup('Advanced Features', advancedFeatures)}
            {renderNavGroup('Others', otherFeatures)}
          </div>
        </div>

        {/* Bottom Logout Action */}
        <div className="pt-3 border-t border-[#113328] space-y-2">
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold text-[#EF4444] hover:bg-[#EF4444]/10 border border-[#EF4444]/20 transition-all"
          >
            <LogOut className="w-4 h-4 text-[#EF4444]" />
            <span>Logout</span>
          </button>
          <div className="text-center text-[10px] text-[#6B7C75] font-medium pt-0.5">
            HIPAA Compliant EMR Portal v2.4
          </div>
        </div>

      </aside>
    </>
  )
}
