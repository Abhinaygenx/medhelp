import React from 'react'
import { 
  Calendar, 
  FileText, 
  Activity, 
  AlertTriangle, 
  BrainCircuit, 
  LineChart, 
  HeartPulse, 
  ShieldAlert, 
  Video, 
  Clock, 
  ArrowRight, 
  Stethoscope, 
  CheckCircle2, 
  Heart,
  Sparkles
} from 'lucide-react'
import PatientNeonCard from '../common/PatientNeonCard'
import { Badge } from '../common/Badge'

export default function PatientDashboard({ 
  patientProfile = {}, 
  nextAppointment, 
  appointmentsCount = 0, 
  prescriptionsCount = 0, 
  onSelectMenu, 
  onOpenTeleconsultation,
  onBookAppointmentClick
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">

      {/* 1. HERO BANNER */}
      <div 
        style={{
          background: 'linear-gradient(135deg, var(--brand-700) 0%, var(--brand-900) 100%)',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-lg)'
        }}
        className="p-6 sm:p-8 relative overflow-hidden text-white"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Medical Care Portal</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
              Your Health, Our Priority
            </h1>
            
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Consult with certified medical specialists online anytime. Access real-time clinical triage, digital prescription vault, and emergency escalation care.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="button"
                onClick={onBookAppointmentClick}
                className="font-bold px-5 py-2.5 rounded-2xl transition-all duration-200 hover:scale-[1.02] text-xs flex items-center space-x-1.5 cursor-pointer bg-white text-[var(--brand-900)] shadow-md"
              >
                <Calendar className="w-4 h-4 text-[var(--brand-700)]" />
                <span>Book Appointment</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectMenu('ai-symptom-checker')}
                className="font-bold px-4 py-2.5 rounded-2xl border border-white/30 hover:bg-white/10 transition-all text-xs flex items-center space-x-1.5 cursor-pointer text-white"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>AI Clinical Triage</span>
              </button>
            </div>
          </div>

          {/* Right Hero Badge */}
          <div className="shrink-0 hidden md:block">
            <div className="w-36 h-36 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-4 flex flex-col items-center justify-center text-center space-y-2 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <p className="text-xs font-extrabold text-white">24/7 Virtual Care</p>
              <span className="text-[10px] text-teal-300 font-bold">Specialists On Duty</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUMMARY STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Next Appointment */}
        <PatientNeonCard 
          onClick={() => onSelectMenu('appointments')}
          className="p-5 cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[var(--brand-50)] text-[var(--brand-600)] flex items-center justify-center border border-[var(--brand-200)] group-hover:bg-[var(--brand-600)] group-hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <Badge variant={nextAppointment ? 'brand' : 'default'} size="sm">
              {nextAppointment ? 'Upcoming' : 'None'}
            </Badge>
          </div>
          <div>
            <h3 className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Upcoming Appointment</h3>
            <p className="text-sm font-bold truncate mt-0.5" style={{ color: 'var(--text-primary)' }}>
              {nextAppointment ? nextAppointment.doctorName : 'No Active Bookings'}
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
              {nextAppointment ? `${nextAppointment.appointmentDate} • ${nextAppointment.timeSlot}` : 'Schedule a consultation'}
            </p>
          </div>
        </PatientNeonCard>

        {/* Card 2: Medical Records */}
        <PatientNeonCard 
          onClick={() => onSelectMenu('medical-records')}
          className="p-5 cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <Badge variant="success" size="sm">EHR Active</Badge>
          </div>
          <div>
            <h3 className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Medical Records</h3>
            <p className="text-lg font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
              {prescriptionsCount} Prescriptions
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
              Verified Digital Vault
            </p>
          </div>
        </PatientNeonCard>

        {/* Card 3: Health Score */}
        <PatientNeonCard 
          onClick={() => onSelectMenu('health-score')}
          className="p-5 cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <Badge variant="success" size="sm">Optimal</Badge>
          </div>
          <div>
            <h3 className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Health Score</h3>
            <p className="text-lg font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
              88 <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>/ 100</span>
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
              Vitals & telemetry stable
            </p>
          </div>
        </PatientNeonCard>

        {/* Card 4: Emergency Alert SLA */}
        <PatientNeonCard 
          onClick={() => onSelectMenu('emergency-alerts')}
          className="p-5 cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <Badge variant="danger" size="sm">SLA Ready</Badge>
          </div>
          <div>
            <h3 className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Emergency ER SLA</h3>
            <p className="text-lg font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
              5-min Response
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
              Hospital ER Hotline Active
            </p>
          </div>
        </PatientNeonCard>

      </div>

      {/* 3. FEATURE GRID */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            Patient Portal Services & Diagnostic Tools
          </h3>
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Quick access menu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Feature 1: AI Symptom Checker */}
          <PatientNeonCard 
            onClick={() => onSelectMenu('ai-symptom-checker')}
            className="p-6 cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--brand-50)] text-[var(--brand-600)] flex items-center justify-center border border-[var(--brand-200)] group-hover:scale-105 transition-transform">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold group-hover:text-[var(--brand-600)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                  AI Symptom Checker
                </h4>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Analyze medical symptoms with clinical triage logic and instant specialist matching recommendations.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-xl text-xs font-bold transition-all border border-[var(--brand-200)] text-[var(--brand-700)] bg-[var(--brand-50)] hover:bg-[var(--brand-100)] flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Launch Triage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </PatientNeonCard>

          {/* Feature 2: Medical Timeline */}
          <PatientNeonCard 
            onClick={() => onSelectMenu('timeline')}
            className="p-6 cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200 group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold group-hover:text-teal-600 transition-colors" style={{ color: 'var(--text-primary)' }}>
                  Medical History Timeline
                </h4>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Chronological journey of consultations, diagnostic lab results, and therapeutic e-prescriptions.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-xl text-xs font-bold transition-all border border-teal-200 text-teal-700 bg-teal-50 hover:bg-teal-100 flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>View Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </PatientNeonCard>

          {/* Feature 3: Health Score */}
          <PatientNeonCard 
            onClick={() => onSelectMenu('health-score')}
            className="p-6 cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold group-hover:text-emerald-600 transition-colors" style={{ color: 'var(--text-primary)' }}>
                  Health Score & Metrics
                </h4>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Interactive health telemetry tracking cardiovascular vitals, sleep cycles, and preventive wellness indices.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-xl text-xs font-bold transition-all border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Check Score</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </PatientNeonCard>

          {/* Feature 4: Health Insights */}
          <PatientNeonCard 
            onClick={() => onSelectMenu('health-insights')}
            className="p-6 cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--brand-50)] text-[var(--brand-600)] flex items-center justify-center border border-[var(--brand-200)] group-hover:scale-105 transition-transform">
                <LineChart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold group-hover:text-[var(--brand-600)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                  Clinical Trend Insights
                </h4>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Predictive trends and actionable clinical insights derived from your longitudinal medical records.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-xl text-xs font-bold transition-all border border-[var(--brand-200)] text-[var(--brand-700)] bg-[var(--brand-50)] hover:bg-[var(--brand-100)] flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Explore Trends</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </PatientNeonCard>

          {/* Feature 5: Telemetry Monitoring */}
          <PatientNeonCard 
            onClick={() => onSelectMenu('health-monitoring')}
            className="p-6 cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold group-hover:text-teal-600 transition-colors" style={{ color: 'var(--text-primary)' }}>
                  Vitals Telemetry
                </h4>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Blood pressure, heart rate, blood oxygen (SpO2), and temperature continuous logs.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-xl text-xs font-bold transition-all border border-teal-200 text-teal-700 bg-teal-50 hover:bg-teal-100 flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>View Vitals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </PatientNeonCard>

          {/* Feature 6: Risk Matrix */}
          <PatientNeonCard 
            onClick={() => onSelectMenu('risk-indicators')}
            className="p-6 cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold group-hover:text-amber-600 transition-colors" style={{ color: 'var(--text-primary)' }}>
                  Risk Indicators
                </h4>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Early warning indicators for cardiovascular, metabolic, and respiratory health risk factors.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-xl text-xs font-bold transition-all border border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Check Risk Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </PatientNeonCard>

        </div>
      </div>

      {/* 4. BOTTOM ACTION STRIP */}
      <PatientNeonCard className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--brand-50)] text-[var(--brand-600)] flex items-center justify-center shrink-0 border border-[var(--brand-200)]">
            <Heart className="w-6 h-6 fill-[var(--brand-600)]" />
          </div>
          <div>
            <h4 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
              Dedicated Healthcare At Your Fingertips
            </h4>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Regular consultations and preventive screenings ensure lasting peace of mind.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBookAppointmentClick}
          className="font-bold px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] text-xs shrink-0 flex items-center space-x-2 cursor-pointer"
          style={{ background: 'var(--brand-600)', color: '#ffffff', boxShadow: 'var(--shadow-md)' }}
        >
          <Calendar className="w-4 h-4" />
          <span>Book Consultation</span>
        </button>
      </PatientNeonCard>

    </div>
  )
}
