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
    <div className="space-y-6 animate-in fade-in duration-200 text-[#F8FAFC]">

      {/* 1. HERO BANNER */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #04140F 0%, #071A14 50%, #0A211A 100%)',
          border: '1px solid #113328',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}
        className="p-6 sm:p-8 relative overflow-hidden text-[#F8FAFC]"
      >
        {/* Soft Radial Green Glow behind graphic */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-72 h-72 bg-[#00FF66]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/20 text-xs font-bold text-[#00FF66]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Medical Control Center</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F8FAFC] font-['Space_Grotesk'] leading-tight">
              Your Health, Our Priority
            </h1>
            
            <p className="text-xs sm:text-sm text-[#A7B3AD] leading-relaxed">
              Consult with certified medical specialists online anytime. Access real-time AI clinical triage, digital prescription vault, and emergency escalation care.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="button"
                onClick={onBookAppointmentClick}
                style={{
                  background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
                  boxShadow: '0 0 20px rgba(0, 255, 102, 0.35)',
                  color: '#04140F'
                }}
                className="font-extrabold px-5 py-2.5 rounded-2xl transition-all duration-200 hover:scale-[1.02] text-xs flex items-center space-x-1.5"
              >
                <Calendar className="w-4 h-4 text-[#04140F]" />
                <span>Book Appointment</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectMenu('ai-symptom-checker')}
                className="bg-[#071A14] hover:bg-[#0A211A] text-[#00FF66] font-bold px-4 py-2.5 rounded-2xl border border-[#00FF66]/40 transition-all text-xs flex items-center space-x-1.5"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>AI Triage</span>
              </button>
            </div>
          </div>

          {/* Right Vector Graphic Card */}
          <div className="shrink-0 hidden md:block">
            <div className="w-36 h-36 rounded-3xl bg-[#04140F]/80 backdrop-blur-md border border-[#00FF66]/30 p-4 flex flex-col items-center justify-center text-center space-y-2 shadow-[0_0_20px_rgba(0,255,102,0.15)]">
              <div className="w-14 h-14 rounded-2xl bg-[#00FF66]/15 flex items-center justify-center border border-[#00FF66]/30">
                <Stethoscope className="w-8 h-8 text-[#00FF66] animate-pulse" />
              </div>
              <p className="text-xs font-extrabold text-white">24/7 Virtual OPD</p>
              <span className="text-[10px] text-[#00FF66] font-bold">Ready for Consult</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUMMARY CARDS (4 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Upcoming Appointment (Blue Accent) */}
        <PatientNeonCard 
          onClick={() => onSelectMenu('appointments')}
          className="p-5 cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center border border-[#3B82F6]/25 group-hover:bg-[#3B82F6] group-hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-[#3B82F6] bg-[#3B82F6]/15 border border-[#3B82F6]/25 px-2 py-0.5 rounded-full">
              {nextAppointment ? 'Upcoming' : 'None'}
            </span>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#A7B3AD]">Upcoming Appointment</h3>
            <p className="text-sm font-extrabold text-[#F8FAFC] truncate mt-0.5">
              {nextAppointment ? nextAppointment.doctorName : 'No Active Slots'}
            </p>
            <p className="text-[11px] text-[#6B7C75] mt-1">
              {nextAppointment ? `${nextAppointment.appointmentDate} • ${nextAppointment.timeSlot}` : 'Book a consultation today'}
            </p>
          </div>
        </PatientNeonCard>

        {/* Card 2: Medical Records (Green Accent) */}
        <PatientNeonCard 
          onClick={() => onSelectMenu('medical-records')}
          className="p-5 cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center border border-[#22C55E]/25 group-hover:bg-[#22C55E] group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/25 px-2 py-0.5 rounded-full">
              Updated
            </span>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#A7B3AD]">Medical Records</h3>
            <p className="text-lg font-extrabold text-[#F8FAFC] mt-0.5">
              {prescriptionsCount} Digital Prescriptions
            </p>
            <p className="text-[11px] text-[#6B7C75] mt-1">
              Verified EHR Vault Archive
            </p>
          </div>
        </PatientNeonCard>

        {/* Card 3: Health Score (Neon Green Accent) */}
        <PatientNeonCard 
          onClick={() => onSelectMenu('health-score')}
          className="p-5 cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#00FF66]/15 text-[#00FF66] flex items-center justify-center border border-[#00FF66]/25 group-hover:bg-[#00FF66] group-hover:text-[#04140F] transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-[#00FF66] bg-[#00FF66]/15 border border-[#00FF66]/25 px-2 py-0.5 rounded-full">
              Optimal
            </span>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#A7B3AD]">Health Score</h3>
            <p className="text-lg font-extrabold text-[#F8FAFC] mt-0.5">
              88 <span className="text-xs font-semibold text-[#6B7C75]">/ 100</span>
            </p>
            <p className="text-[11px] text-[#6B7C75] mt-1">
              Heart, Sleep & Vital Telemetry
            </p>
          </div>
        </PatientNeonCard>

        {/* Card 4: Emergency Alerts (Red Accent) */}
        <PatientNeonCard 
          onClick={() => onSelectMenu('emergency-alerts')}
          className="p-5 cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#EF4444]/15 text-[#EF4444] flex items-center justify-center border border-[#EF4444]/25 group-hover:bg-[#EF4444] group-hover:text-white transition-colors">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/25 px-2 py-0.5 rounded-full">
              Normal
            </span>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#A7B3AD]">Emergency Alerts</h3>
            <p className="text-lg font-extrabold text-[#F8FAFC] mt-0.5">
              0 Active Alerts
            </p>
            <p className="text-[11px] text-[#6B7C75] mt-1">
              5-min ER Escalation SLA Ready
            </p>
          </div>
        </PatientNeonCard>

      </div>

      {/* 3. FEATURE GRID (6 CARDS WITH NEW BUTTON STYLE) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-[#F8FAFC] font-['Space_Grotesk']">
            Health Portal Services & AI Tools
          </h3>
          <span className="text-xs text-[#6B7C75] font-medium">Select a feature to launch</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Feature 1: AI Symptom Checker */}
          <PatientNeonCard 
            onClick={() => onSelectMenu('ai-symptom-checker')}
            className="p-6 cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#00FF66]/15 text-[#00FF66] flex items-center justify-center border border-[#00FF66]/25 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#F8FAFC] group-hover:text-[#00FF66] transition-colors">
                  AI Symptom Checker
                </h4>
                <p className="text-xs text-[#A7B3AD] mt-1 leading-relaxed">
                  Analyze medical symptoms with clinical risk assessment (HIGH/MEDIUM/LOW) and specialist matching.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-xl text-xs font-bold transition-all border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/10 hover:shadow-[0_0_16px_rgba(0,255,102,0.2)] flex items-center justify-center space-x-1"
            >
              <span>Launch Triage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </PatientNeonCard>

          {/* Feature 2: Emergency Alerts */}
          <PatientNeonCard 
            onClick={() => onSelectMenu('emergency-alerts')}
            className="p-6 cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EF4444]/15 text-[#EF4444] flex items-center justify-center border border-[#EF4444]/25 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#F8FAFC] group-hover:text-[#EF4444] transition-colors">
                  Emergency Alerts
                </h4>
                <p className="text-xs text-[#A7B3AD] mt-1 leading-relaxed">
                  Critical ER escalation banner with 5-minute SLAs, immediate triage routing, and dispatch support.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-xl text-xs font-bold transition-all border border-[#EF4444]/40 text-[#EF4444] hover:bg-[#EF4444]/10 hover:shadow-[0_0_16px_rgba(239,68,68,0.2)] flex items-center justify-center space-x-1"
            >
              <span>Emergency Monitor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </PatientNeonCard>

          {/* Feature 3: Health Score */}
          <PatientNeonCard 
            onClick={() => onSelectMenu('health-score')}
            className="p-6 cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#00FF66]/15 text-[#00FF66] flex items-center justify-center border border-[#00FF66]/25 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#F8FAFC] group-hover:text-[#00FF66] transition-colors">
                  Health Score
                </h4>
                <p className="text-xs text-[#A7B3AD] mt-1 leading-relaxed">
                  Interactive score telemetry tracking heart health, sleep quality, and daily physical activity metrics.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-xl text-xs font-bold transition-all border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/10 hover:shadow-[0_0_16px_rgba(0,255,102,0.2)] flex items-center justify-center space-x-1"
            >
              <span>Check Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </PatientNeonCard>

          {/* Feature 4: Health Insights */}
          <PatientNeonCard 
            onClick={() => onSelectMenu('health-insights')}
            className="p-6 cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center border border-[#3B82F6]/25 group-hover:scale-110 transition-transform">
                <LineChart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                  Health Insights
                </h4>
                <p className="text-xs text-[#A7B3AD] mt-1 leading-relaxed">
                  Predictive health trends based on historic vitals, prescription routines, and consultation logs.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-xl text-xs font-bold transition-all border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/10 hover:shadow-[0_0_16px_rgba(0,255,102,0.2)] flex items-center justify-center space-x-1"
            >
              <span>Explore Insights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </PatientNeonCard>

          {/* Feature 5: Health Monitoring */}
          <PatientNeonCard 
            onClick={() => onSelectMenu('health-monitoring')}
            className="p-6 cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center border border-[#22C55E]/25 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#F8FAFC] group-hover:text-[#22C55E] transition-colors">
                  Health Monitoring
                </h4>
                <p className="text-xs text-[#A7B3AD] mt-1 leading-relaxed">
                  Continuous IoT vital telemetry sync for blood pressure, pulse rate, oxygen saturation, and body temperature.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-xl text-xs font-bold transition-all border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/10 hover:shadow-[0_0_16px_rgba(0,255,102,0.2)] flex items-center justify-center space-x-1"
            >
              <span>View Vital Monitors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </PatientNeonCard>

          {/* Feature 6: Risk Indicators */}
          <PatientNeonCard 
            onClick={() => onSelectMenu('risk-indicators')}
            className="p-6 cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center border border-[#F59E0B]/25 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#F8FAFC] group-hover:text-[#F59E0B] transition-colors">
                  Risk Indicators
                </h4>
                <p className="text-xs text-[#A7B3AD] mt-1 leading-relaxed">
                  Early warning signs and clinical risk factor evaluation for cardiovascular and metabolic conditions.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 rounded-xl text-xs font-bold transition-all border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/10 hover:shadow-[0_0_16px_rgba(0,255,102,0.2)] flex items-center justify-center space-x-1"
            >
              <span>Review Risk Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </PatientNeonCard>

        </div>
      </div>

      {/* 4. BOTTOM CTA BANNER */}
      <PatientNeonCard className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#00FF66]/15 text-[#00FF66] flex items-center justify-center shrink-0 border border-[#00FF66]/25">
            <Heart className="w-6 h-6 fill-[#00FF66]" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-[#F8FAFC] font-['Space_Grotesk']">
              Stay Safe, Stay Healthy!
            </h4>
            <p className="text-xs text-[#A7B3AD]">
              Regular consultations and AI vitals checks help prevent severe health complications.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBookAppointmentClick}
          style={{
            background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
            boxShadow: '0 0 20px rgba(0, 255, 102, 0.35)',
            color: '#04140F'
          }}
          className="font-extrabold px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] text-xs shrink-0 flex items-center space-x-2"
        >
          <Calendar className="w-4 h-4 text-[#04140F]" />
          <span>Book Appointment</span>
        </button>
      </PatientNeonCard>

    </div>
  )
}
