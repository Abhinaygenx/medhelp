import React from 'react'
import { TrendingUp, Download, Users, Stethoscope, Activity, FileSpreadsheet } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import AdminNeonCard from '../common/AdminNeonCard'
import toast from 'react-hot-toast'

export default function AnalyticsReports() {
  const patientData = [
    { month: 'Jan', newPatients: 45, OPD: 120 },
    { month: 'Feb', newPatients: 62, OPD: 155 },
    { month: 'Mar', newPatients: 78, OPD: 189 },
    { month: 'Apr', newPatients: 95, OPD: 210 },
    { month: 'May', newPatients: 110, OPD: 260 },
    { month: 'Jun', newPatients: 142, OPD: 310 }
  ]

  const handleExportCSV = () => {
    toast.success("Exported Analytics Report dataset (CSV format)!")
  }

  return (
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#E5FF00]" /> Hospital System Analytics & Performance Reports
          </h2>
          <p className="text-xs text-[#9CA3AF]">Comprehensive metrics for patient growth trends, doctor performance, and OPD analytics.</p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          style={{ background: '#E5FF00', color: '#0B0F19', boxShadow: '0 0 15px rgba(229, 255, 0, 0.45)' }}
          className="font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#0B0F19]" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Patient Growth Trend */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-[#374151] space-y-3">
          <h3 className="font-extrabold text-[#F9FAFB] text-sm font-['Space_Grotesk']">
            Patient Growth & OPD Consultation Intake
          </h3>
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patientData}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E5FF00" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#E5FF00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '16px', color: '#F9FAFB', fontSize: '12px' }} />
                <Area type="monotone" dataKey="OPD" stroke="#E5FF00" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Doctor Performance Ranking */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-[#374151] space-y-3">
          <h3 className="font-extrabold text-[#F9FAFB] text-sm font-['Space_Grotesk']">
            Top Performing Doctors & Consultation SLA
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#374151] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#F9FAFB]">Dr. Robert Ford (Cardiology)</p>
                <p className="text-[11px] text-[#9CA3AF]">142 consultations completed • 98.4% rating</p>
              </div>
              <span className="font-extrabold text-[#E5FF00]">Rank #1</span>
            </div>

            <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#374151] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#F9FAFB]">Dr. Sarah Jenkins (Neurology)</p>
                <p className="text-[11px] text-[#9CA3AF]">98 consultations completed • 97.8% rating</p>
              </div>
              <span className="font-extrabold text-[#E5FF00]">Rank #2</span>
            </div>
          </div>
        </div>

      </div>

    </AdminNeonCard>
  )
}
