import React from 'react'
import { 
  Users, 
  Stethoscope, 
  CalendarDays, 
  CreditCard, 
  Bed, 
  AlertTriangle, 
  DollarSign, 
  Activity, 
  TrendingUp,
  PlusCircle,
  FileText,
  UserPlus,
  ShieldCheck
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import AdminNeonCard from '../common/AdminNeonCard'

export default function AdminDashboard({ 
  doctors = [], 
  patients = [], 
  appointments = [], 
  prescriptions = [], 
  beds = [],
  bills = [],
  emergencyAlerts = [],
  auditLogs = [],
  onSelectTab 
}) {
  const pendingDoctors = doctors.filter(d => !d.isVerified)
  const confirmedAppointments = appointments.filter(a => a.status === 'approved' || a.status === 'completed')

  // Real calculation for pending bills
  const pendingBillsList = bills.filter(b => b.status === 'Pending')
  const pendingBillsTotal = pendingBillsList.reduce((sum, b) => sum + (Number(b.amount) || 0), 0)

  // Real calculation for bed availability
  const totalBedsCount = beds.length || 10
  const availableBedsCount = beds.filter(b => b.status === 'Available').length
  const freeBedPercentage = totalBedsCount > 0 ? Math.round((availableBedsCount / totalBedsCount) * 100) : 0

  const revenueData = [
    { month: 'Jan', revenue: 42000, OPD: 24000 },
    { month: 'Feb', revenue: 58000, OPD: 31000 },
    { month: 'Mar', revenue: 65000, OPD: 38000 },
    { month: 'Apr', revenue: 78000, OPD: 42000 },
    { month: 'May', revenue: 92000, OPD: 51000 },
    { month: 'Jun', revenue: 110000, OPD: 64000 }
  ]

  return (
    <div className="space-y-6 text-[#F9FAFB] animate-in fade-in duration-300">
      
      {/* 1. DASHBOARD HEADER BANNER */}
      <AdminNeonCard className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-[#E5FF00]/15 text-[#E5FF00] text-[11px] font-extrabold border border-[#E5FF00]/30 uppercase tracking-wider">
              Live HMS Hospital Telemetry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] mt-2">
            Hospital System Overview
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1 font-medium max-w-xl">
            Real-time multi-department telemetry, patient intake tracking, pharmacy inventory alerts, and financial metrics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => onSelectTab('doctors')}
            style={{
              background: '#E5FF00',
              boxShadow: '0 0 20px rgba(229, 255, 0, 0.45)',
              color: '#0B0F19'
            }}
            className="font-extrabold px-4 py-2.5 rounded-2xl text-xs flex items-center space-x-2 transition-all hover:scale-105"
          >
            <UserPlus className="w-4 h-4 text-[#0B0F19]" />
            <span>Verify Doctor ({pendingDoctors.length})</span>
          </button>
          
          <button
            type="button"
            onClick={() => onSelectTab('billing')}
            className="bg-[#111827] hover:bg-[#374151] text-[#F9FAFB] font-bold px-4 py-2.5 rounded-2xl text-xs border border-[#374151] transition-all flex items-center space-x-2"
          >
            <CreditCard className="w-4 h-4 text-[#E5FF00]" />
            <span>Billing Console</span>
          </button>
        </div>
      </AdminNeonCard>

      {/* 2. STAT CARDS ROW (6 METRIC CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Total Patients */}
        <AdminNeonCard className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[#9CA3AF]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Patients</span>
            <Users className="w-4 h-4 text-[#22C55E]" />
          </div>
          <p className="text-2xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk']">{patients.length}</p>
          <span className="text-[10px] text-[#22C55E] font-bold">Active EMR Patients</span>
        </AdminNeonCard>

        {/* Total Doctors */}
        <AdminNeonCard className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[#9CA3AF]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Doctors</span>
            <Stethoscope className="w-4 h-4 text-[#E5FF00]" />
          </div>
          <p className="text-2xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk']">{doctors.length}</p>
          <span className="text-[10px] text-[#E5FF00] font-bold">{pendingDoctors.length} Pending Approval</span>
        </AdminNeonCard>

        {/* Today's Appointments */}
        <AdminNeonCard className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[#9CA3AF]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Appointments</span>
            <CalendarDays className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <p className="text-2xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk']">{appointments.length}</p>
          <span className="text-[10px] text-[#3B82F6] font-bold">{confirmedAppointments.length} Confirmed Active</span>
        </AdminNeonCard>

        {/* Pending Bills */}
        <AdminNeonCard className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[#9CA3AF]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Bills</span>
            <CreditCard className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <p className="text-2xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk']">${pendingBillsTotal.toLocaleString()}</p>
          <span className="text-[10px] text-[#F59E0B] font-bold">{pendingBillsList.length} Unpaid Invoices</span>
        </AdminNeonCard>

        {/* Available Beds */}
        <AdminNeonCard className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[#9CA3AF]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Available Beds</span>
            <Bed className="w-4 h-4 text-[#22C55E]" />
          </div>
          <p className="text-2xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk']">{availableBedsCount} <span className="text-xs font-normal text-[#9CA3AF]">/ {totalBedsCount}</span></p>
          <span className="text-[10px] text-[#22C55E] font-bold">{freeBedPercentage}% Capacity Free</span>
        </AdminNeonCard>

        {/* Emergency Cases */}
        <AdminNeonCard className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[#9CA3AF]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Emergency</span>
            <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
          </div>
          <p className="text-2xl font-extrabold text-[#EF4444] font-['Space_Grotesk']">{emergencyAlerts.length}</p>
          <span className="text-[10px] text-[#EF4444] font-bold animate-pulse">Critical SLA Active</span>
        </AdminNeonCard>

      </div>

      {/* 3. RECHARTS FINANCIAL OVERVIEW & QUICK ACTIVITIES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Analytics Chart */}
        <AdminNeonCard className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#374151] pb-4">
            <div>
              <h3 className="font-extrabold text-[#F9FAFB] text-base font-['Space_Grotesk'] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#E5FF00]" /> Hospital Revenue & OPD Financial Trend
              </h3>
              <p className="text-xs text-[#9CA3AF]">Monthly billing collection vs OPD consultation revenue.</p>
            </div>
            <span className="text-[11px] font-mono text-[#E5FF00] bg-[#E5FF00]/15 px-3 py-1 rounded-full border border-[#E5FF00]/30">
              $110k Jun Peak
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E5FF00" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#E5FF00" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOPD" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '16px', color: '#F9FAFB', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#E5FF00" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="OPD" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorOPD)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AdminNeonCard>

        {/* Recent Hospital Activities Feed */}
        <AdminNeonCard className="p-6 space-y-4">
          <div className="border-b border-[#374151] pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-[#F9FAFB] text-base font-['Space_Grotesk']">
                Recent System Activities
              </h3>
              <p className="text-xs text-[#9CA3AF]">Live audit log stream across departments.</p>
            </div>
            <button 
              onClick={() => onSelectTab('logs')}
              className="text-[11px] text-[#E5FF00] font-bold hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {auditLogs.slice(0, 4).map((log, idx) => (
              <div key={log.id || idx} className="p-3 rounded-2xl bg-[#111827] border border-[#374151]">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[#E5FF00]">{log.action}</p>
                  <span className="text-[10px] text-[#9CA3AF] font-mono">{log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}</span>
                </div>
                <p className="text-[#9CA3AF] text-[11px] mt-0.5">{log.actorName} ({log.actorRole}) → {log.target}</p>
              </div>
            ))}
          </div>
        </AdminNeonCard>

      </div>

    </div>
  )
}
