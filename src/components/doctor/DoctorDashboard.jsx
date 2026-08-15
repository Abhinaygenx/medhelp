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
  TrendingUp
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import StatCard from './StatCard'
import GlassCard from '../common/GlassCard'
import TestingChecklist from '../dev/TestingChecklist'

export default function DoctorDashboard({ 
  doctorProfile = {}, 
  appointments = [], 
  onSelectTab, 
  onOpenTeleconsultation 
}) {
  const urgentAppointments = appointments.filter(a => a.status === 'approved' || a.status === 'pending' || a.status === 'in-progress')

  // Sample Recharts Analytics Data
  const chartData = [
    { time: '08:00 AM', patients: 3, consultations: 2 },
    { time: '10:00 AM', patients: 8, consultations: 6 },
    { time: '12:00 PM', patients: 12, consultations: 10 },
    { time: '02:00 PM', patients: 15, consultations: 14 },
    { time: '04:00 PM', patients: 20, consultations: 18 },
    { time: '06:00 PM', patients: 24, consultations: 22 }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-[#f8fafc]">
      
      {/* 1. DASHBOARD HEADER BANNER */}
      <GlassCard className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-[#E5FF00]/15 text-[#E5FF00] text-[11px] font-extrabold border border-[#E5FF00]/30">
              Live Clinical Telemetry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] font-['Space_Grotesk'] mt-2">
            Doctor Dashboard Overview
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1 font-medium max-w-xl">
            Real-time consultation metrics, OPD patient queue priority, and clinical workload analytics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => onSelectTab('prescriptions')}
            style={{ background: '#E5FF00', color: '#0B0F19', boxShadow: '0 0 20px rgba(229, 255, 0, 0.45)' }}
            className="font-extrabold px-5 py-3 rounded-2xl text-xs hover:scale-105 transition-all flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4 text-[#0B0F19]" />
            <span>Issue Prescription</span>
          </button>
          
          <button
            type="button"
            onClick={() => onSelectTab('appointments')}
            className="bg-[#0b172a] hover:bg-[#0d1b33] text-[#cbd5e1] font-bold px-5 py-3 rounded-2xl text-xs border border-[#E5FF0030] transition-all flex items-center space-x-2"
          >
            <CalendarDays className="w-4 h-4 text-[#E5FF00]" />
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
          value="18"
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

      {/* 3. RECHARTS CONSULTATION ANALYTICS CHART + QUICK OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Analytics Chart Container (2 Cols) */}
        <GlassCard className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#162742] pb-4">
            <div>
              <h3 className="font-extrabold text-white text-base font-['Space_Grotesk'] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#E5FF00]" /> Consultation Volume & OPD Flow
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">Hourly chart tracking patient intake vs completed video sessions.</p>
            </div>
            <span className="text-[11px] font-mono text-[#E5FF00] bg-[#E5FF00]/15 px-3 py-1 rounded-full border border-[#E5FF00]/30">
              Live Chart Sync
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563ff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConsults" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#081225', borderColor: '#162742', borderRadius: '16px', color: '#f8fafc', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="patients" stroke="#2563ff" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
                <Area type="monotone" dataKey="consultations" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorConsults)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* 3 Quick Overview Panels (1 Col) */}
        <div className="space-y-4">
          
          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Avg Consult SLA</span>
              <div className="p-2.5 rounded-2xl bg-[#2563ff]/15 text-[#3b82f6] border border-[#2563ff]/25">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
              14.5 <span className="text-xs font-normal text-[#94a3b8]">mins / patient</span>
            </p>
            <div className="w-full bg-[#0b172a] rounded-full h-2 overflow-hidden border border-[#162742]">
              <div className="bg-[#2563ff] h-full w-[72%]" />
            </div>
            <p className="text-[11px] text-[#94a3b8]">Target threshold: 15 mins</p>
          </GlassCard>

          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Completed Sessions</span>
              <div className="p-2.5 rounded-2xl bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
              12 <span className="text-xs font-normal text-[#94a3b8]">/ 18 completed</span>
            </p>
            <div className="w-full bg-[#0b172a] rounded-full h-2 overflow-hidden border border-[#162742]">
              <div className="bg-[#10b981] h-full w-[66%]" />
            </div>
            <p className="text-[11px] text-[#10b981] font-bold">6 remaining today</p>
          </GlassCard>

          <GlassCard className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Patient Satisfaction</span>
              <div className="p-2.5 rounded-2xl bg-[#7c3aed]/15 text-[#7c3aed] border border-[#7c3aed]/25">
                <Smile className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
              98.4% <span className="text-xs font-normal text-[#94a3b8]">rating</span>
            </p>
            <div className="w-full bg-[#0b172a] rounded-full h-2 overflow-hidden border border-[#162742]">
              <div className="bg-[#7c3aed] h-full w-[98%]" />
            </div>
            <p className="text-[11px] text-[#7c3aed] font-bold">Based on 142 reviews</p>
          </GlassCard>

        </div>

      </div>

      {/* 4. LIVE PATIENT QUEUE SNAPSHOT */}
      <GlassCard className="overflow-hidden">
        <div className="p-6 border-b border-[#162742] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Activity className="w-5 h-5 text-[#3b82f6]" />
            <h3 className="font-extrabold text-white text-base font-['Space_Grotesk']">
              Live Priority Patient Queue
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('appointments')}
            className="text-xs text-[#3b82f6] font-bold hover:underline flex items-center gap-1"
          >
            <span>View Full Queue</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-[#162742] text-xs">
          {urgentAppointments.slice(0, 3).map(apt => (
            <div key={apt.id} className="p-5 flex items-center justify-between hover:bg-[#0b172a]/60 transition-colors">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#2563ff]/15 text-[#3b82f6] font-extrabold flex items-center justify-center border border-[#2563ff]/25">
                  {apt.patientName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{apt.patientName}</p>
                  <p className="text-[11px] text-[#94a3b8] mt-0.5">{apt.symptoms || 'General Consultation'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-[#cbd5e1] font-semibold">{apt.timeSlot}</span>
                
                {apt.status === 'in-progress' ? (
                  <span className="px-3 py-1 rounded-full bg-[#2563ff]/15 text-[#3b82f6] border border-[#2563ff]/25 font-bold text-[10px] uppercase animate-pulse">
                    In Progress
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25 font-bold text-[10px] uppercase">
                    Ready
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onOpenTeleconsultation(apt)}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-md"
                >
                  <Video className="w-4 h-4" />
                  <span>Start Call</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 5. SYSTEM RELIABILITY QA CHECKLIST */}
      <TestingChecklist />

    </div>
  )
}
