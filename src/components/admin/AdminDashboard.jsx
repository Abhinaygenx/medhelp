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
  ShieldCheck,
  Sparkles
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'

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
    <div className="space-y-6 animate-in fade-in duration-300" style={{ color: 'var(--text-primary)' }}>
      
      {/* 1. DASHBOARD HEADER BANNER */}
      <AdminNeonCard className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="brand" size="sm">
              <Sparkles size={12} />
              <span>Live HMS Hospital Telemetry</span>
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2.5 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Hospital System Overview
          </h1>
          <p className="text-xs sm:text-sm mt-1.5 font-medium max-w-xl" style={{ color: 'var(--text-muted)' }}>
            Real-time multi-department telemetry, patient intake tracking, pharmacy inventory alerts, and financial metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onSelectTab('doctors')}
            className="font-bold px-4 py-2.5 rounded-xl text-xs hover:opacity-95 transition-all flex items-center space-x-2 cursor-pointer shadow-sm text-white flex-1 sm:flex-initial justify-center"
            style={{ background: 'var(--brand-600)' }}
          >
            <UserPlus className="w-4 h-4 text-white shrink-0" />
            <span className="whitespace-nowrap">Verify Doctor ({pendingDoctors.length})</span>
          </button>
          
          <button
            type="button"
            onClick={() => onSelectTab('billing')}
            className="font-bold px-4 py-2.5 rounded-xl text-xs border transition-all flex items-center space-x-2 cursor-pointer hover:bg-[var(--neutral-100)] flex-1 sm:flex-initial justify-center"
            style={{
              background: 'var(--surface-page)',
              color: 'var(--text-secondary)',
              borderColor: 'var(--border-light)'
            }}
          >
            <CreditCard className="w-4 h-4 text-[var(--brand-600)] shrink-0" />
            <span className="whitespace-nowrap">Billing Console</span>
          </button>
        </div>
      </AdminNeonCard>

      {/* 2. STAT CARDS ROW (6 METRIC CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Total Patients */}
        <AdminNeonCard className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Total Patients</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800/40">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>{patients.length}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Active EMR Patients</span>
          </div>
        </AdminNeonCard>

        {/* Total Doctors */}
        <AdminNeonCard className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Total Doctors</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[var(--brand-600)] dark:bg-blue-950/40 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800/40">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>{doctors.length}</p>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${pendingDoctors.length > 0 ? 'bg-amber-500' : 'bg-blue-500'}`}></span>
            <span className={`text-[10px] font-bold ${pendingDoctors.length > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}`}>
              {pendingDoctors.length > 0 ? `${pendingDoctors.length} Pending Approval` : 'All Verified'}
            </span>
          </div>
        </AdminNeonCard>

        {/* Appointments */}
        <AdminNeonCard className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Appointments</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-800/40">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>{appointments.length}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">{confirmedAppointments.length} Confirmed Active</span>
          </div>
        </AdminNeonCard>

        {/* Pending Bills */}
        <AdminNeonCard className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Pending Bills</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-800/40">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>${pendingBillsTotal.toLocaleString()}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">{pendingBillsList.length} Unpaid Invoices</span>
          </div>
        </AdminNeonCard>

        {/* Available Beds */}
        <AdminNeonCard className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Available Beds</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400 flex items-center justify-center border border-teal-200 dark:border-teal-800/40">
              <Bed className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {availableBedsCount} <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>/ {totalBedsCount}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold">{freeBedPercentage}% Capacity Free</span>
          </div>
        </AdminNeonCard>

        {/* Emergency Cases */}
        <AdminNeonCard className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Emergency</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 flex items-center justify-center border border-red-200 dark:border-red-800/40">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-red-600 dark:text-red-400 tracking-tight">{emergencyAlerts.length}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-[10px] text-red-600 dark:text-red-400 font-bold">Critical SLA Active</span>
          </div>
        </AdminNeonCard>

      </div>

      {/* 3. RECHARTS FINANCIAL OVERVIEW & QUICK ACTIVITIES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Analytics Chart */}
        <AdminNeonCard className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-light)' }}>
            <div>
              <h3 className="font-extrabold text-base flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <TrendingUp className="w-5 h-5 text-[var(--brand-600)]" /> Hospital Revenue & OPD Financial Trend
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Monthly billing collection vs OPD consultation revenue.</p>
            </div>
            <Badge variant="brand" size="sm">
              $110k Jun Peak
            </Badge>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOPD" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--surface-card)', 
                    borderColor: 'var(--border-light)', 
                    borderRadius: '12px', 
                    color: 'var(--text-primary)', 
                    fontSize: '12px',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" name="Total Revenue" />
                <Area type="monotone" dataKey="OPD" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorOPD)" name="OPD Consultations" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AdminNeonCard>

        {/* Recent Hospital Activities Feed */}
        <AdminNeonCard className="p-6 space-y-4">
          <div className="border-b pb-3 flex items-center justify-between" style={{ borderColor: 'var(--border-light)' }}>
            <div>
              <h3 className="font-extrabold text-base" style={{ color: 'var(--text-primary)' }}>
                Recent System Activities
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Live audit log stream across departments.</p>
            </div>
            <button 
              onClick={() => onSelectTab('logs')}
              className="text-xs font-bold text-[var(--brand-600)] hover:text-[var(--brand-700)] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {auditLogs.slice(0, 4).map((log, idx) => (
              <div 
                key={log.id || idx} 
                className="p-3.5 rounded-xl transition-all"
                style={{
                  background: 'var(--surface-page)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>{log.action}</p>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                    {log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                  </span>
                </div>
                <p className="text-[11px] mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>
                  <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>{log.actorName}</span> ({log.actorRole}) → {log.target}
                </p>
              </div>
            ))}
          </div>
        </AdminNeonCard>

      </div>

    </div>
  )
}
