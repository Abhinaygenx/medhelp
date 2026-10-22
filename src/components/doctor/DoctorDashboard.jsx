import React from 'react'
import { 
  Users, 
  CalendarDays, 
  FileCheck, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Smile, 
  ArrowUpRight, 
  Video, 
  PlusCircle, 
  Activity,
  TrendingUp,
  Sparkles
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import StatCard from './StatCard'
import GlassCard from '../common/GlassCard'
import { Badge } from '../common/Badge'

export default function DoctorDashboard({ 
  doctorProfile = {}, 
  appointments = [], 
  onSelectTab, 
  onOpenTeleconsultation 
}) {
  const urgentAppointments = appointments.filter(a => a.status === 'approved' || a.status === 'pending' || a.status === 'in-progress')

  const chartData = [
    { time: '08:00 AM', patients: 3, consultations: 2 },
    { time: '10:00 AM', patients: 8, consultations: 6 },
    { time: '12:00 PM', patients: 12, consultations: 10 },
    { time: '02:00 PM', patients: 15, consultations: 14 },
    { time: '04:00 PM', patients: 20, consultations: 18 },
    { time: '06:00 PM', patients: 24, consultations: 22 }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. DASHBOARD HEADER BANNER */}
      <GlassCard className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="brand" size="sm">
              <Sparkles size={12} />
              <span>Live Clinical OPD Telemetry</span>
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Doctor Dashboard Overview
          </h1>
          <p className="text-xs mt-1 font-medium max-w-xl" style={{ color: 'var(--text-muted)' }}>
            Real-time consultation metrics, OPD patient queue priority, and clinical workload analytics for {doctorProfile.name || 'Doctor'}.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => onSelectTab('clinical-hub')}
            className="font-bold px-4 py-2.5 rounded-xl text-xs hover:opacity-90 transition-all flex items-center space-x-2 cursor-pointer"
            style={{ background: 'var(--brand-600)', color: '#ffffff', boxShadow: 'var(--shadow-sm)' }}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Clinical Orders & Uploads</span>
          </button>
          
          <button
            type="button"
            onClick={() => onSelectTab('appointments')}
            className="font-bold px-5 py-2.5 rounded-xl text-xs border transition-all flex items-center space-x-2 cursor-pointer"
            style={{
              background: 'var(--surface-page)',
              color: 'var(--text-secondary)',
              borderColor: 'var(--border-light)'
            }}
          >
            <CalendarDays className="w-4 h-4 text-[var(--brand-600)]" />
            <span>View Queue ({appointments.length})</span>
          </button>
        </div>
      </GlassCard>

      {/* 2. STAT CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Today Patients"
          value="24"
          color="amber"
          icon={Users}
          trend="+12% vs yesterday"
          subtitle="Registered OPD Queue"
        />

        <StatCard 
          title="Appointments"
          value={appointments.length || "18"}
          color="emerald"
          icon={CalendarDays}
          trend="8 Confirmed"
          subtitle="Scheduled slots today"
        />

        <StatCard 
          title="Reports Pending"
          value="7"
          color="amber"
          icon={FileCheck}
          trend="Requires review"
          subtitle="Pathology & Radiology"
        />

        <StatCard 
          title="Emergency Alerts"
          value="2"
          color="red"
          icon={AlertTriangle}
          trend="High Priority"
          subtitle="5-min ER SLA active"
        />
      </div>

      {/* 3. RECHARTS CONSULTATION ANALYTICS CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Analytics Chart Container (2 Cols) */}
        <GlassCard className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-light)' }}>
            <div>
              <h3 className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <TrendingUp className="w-5 h-5 text-[var(--brand-600)]" /> Consultation Volume & OPD Flow
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Hourly chart tracking patient intake vs completed video sessions.
              </p>
            </div>
            <Badge variant="brand" size="sm">Live Chart Sync</Badge>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConsults" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
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
                <Area type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPatients)" />
                <Area type="monotone" dataKey="consultations" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorConsults)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* 3 Quick Overview Panels (1 Col) */}
        <div className="space-y-4">
          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Avg Consult SLA</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              14.5 <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>mins / patient</span>
            </p>
            <div className="w-full rounded-full h-2 overflow-hidden border" style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}>
              <div className="bg-[var(--brand-600)] h-full w-[72%]" />
            </div>
            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Target threshold: 15 mins</p>
          </GlassCard>

          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Completed Sessions</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              12 <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>/ 18 completed</span>
            </p>
            <div className="w-full rounded-full h-2 overflow-hidden border" style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}>
              <div className="bg-emerald-500 h-full w-[66%]" />
            </div>
            <p className="text-[11px] text-emerald-600 font-bold">6 remaining today</p>
          </GlassCard>

          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Patient Satisfaction</span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Smile className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              98.4% <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>rating</span>
            </p>
            <div className="w-full rounded-full h-2 overflow-hidden border" style={{ background: 'var(--surface-page)', borderColor: 'var(--border-light)' }}>
              <div className="bg-purple-500 h-full w-[98%]" />
            </div>
            <p className="text-[11px] text-purple-600 font-bold">Based on 142 reviews</p>
          </GlassCard>
        </div>

      </div>

      {/* 4. LIVE PATIENT QUEUE SNAPSHOT */}
      <GlassCard className="overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-light)' }}>
          <div className="flex items-center space-x-2.5">
            <Activity className="w-5 h-5 text-[var(--brand-600)]" />
            <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
              Live Priority Patient Queue
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('appointments')}
            className="text-xs text-[var(--brand-600)] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Queue</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y text-xs" style={{ borderColor: 'var(--border-light)' }}>
          {urgentAppointments.slice(0, 3).map(apt => (
            <div key={apt.id} className="p-5 flex items-center justify-between hover:bg-[var(--brand-50)] transition-colors">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-50)] text-[var(--brand-600)] font-bold flex items-center justify-center border border-[var(--brand-200)]">
                  {apt.patientName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{apt.patientName}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{apt.symptoms || 'General Consultation'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-semibold text-xs" style={{ color: 'var(--text-secondary)' }}>{apt.timeSlot}</span>
                
                {apt.status === 'in-progress' ? (
                  <Badge variant="brand" size="sm">In Progress</Badge>
                ) : (
                  <Badge variant="success" size="sm">Ready</Badge>
                )}

                <button
                  type="button"
                  onClick={() => onOpenTeleconsultation(apt)}
                  className="text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm cursor-pointer hover:opacity-90 transition-all"
                  style={{ background: 'var(--brand-600)' }}
                >
                  <Video className="w-4 h-4" />
                  <span>Start Call</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

    </div>
  )
}
