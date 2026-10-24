import React from 'react'
import { TrendingUp, FileSpreadsheet } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
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
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <TrendingUp className="w-5 h-5 text-[var(--brand-600)]" /> Hospital System Analytics & Performance Reports
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Comprehensive metrics for patient growth trends, doctor performance, and OPD analytics.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm text-white hover:opacity-95"
          style={{ background: 'var(--brand-600)' }}
        >
          <FileSpreadsheet className="w-4 h-4 text-white" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Patient Growth Trend */}
        <div 
          className="p-5 rounded-2xl space-y-3"
          style={{
            background: 'var(--surface-page)',
            border: '1px solid var(--border-light)'
          }}
        >
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
            <h3 className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>
              Patient Growth & OPD Consultation Intake
            </h3>
            <Badge variant="brand" size="sm">Monthly Trend</Badge>
          </div>
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patientData}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
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
                <Area type="monotone" dataKey="OPD" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPatients)" name="OPD Visits" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Doctor Performance Ranking */}
        <div 
          className="p-5 rounded-2xl space-y-3"
          style={{
            background: 'var(--surface-page)',
            border: '1px solid var(--border-light)'
          }}
        >
          <div className="border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
            <h3 className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>
              Top Performing Doctors & Consultation SLA
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Highest patient satisfaction and response velocity.</p>
          </div>

          <div className="space-y-3 text-xs">
            <div 
              className="p-3.5 rounded-xl flex justify-between items-center transition-all"
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Dr. Robert Ford (Cardiology)</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>142 consultations completed • 98.4% rating</p>
              </div>
              <Badge variant="brand" size="sm">Rank #1</Badge>
            </div>

            <div 
              className="p-3.5 rounded-xl flex justify-between items-center transition-all"
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Dr. Sarah Jenkins (Neurology)</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>98 consultations completed • 97.8% rating</p>
              </div>
              <Badge variant="brand" size="sm">Rank #2</Badge>
            </div>
          </div>
        </div>

      </div>

    </AdminNeonCard>
  )
}
