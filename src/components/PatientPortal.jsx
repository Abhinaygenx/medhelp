import React, { useState, useMemo, useCallback } from 'react'
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Stethoscope, 
  Video, 
  FileText, 
  User, 
  CheckCircle2, 
  XCircle, 
  Star, 
  ShieldCheck, 
  Pill, 
  BrainCircuit,
  Activity,
  Heart,
  ArrowRight
} from 'lucide-react'

import HealthScoreCard from './HealthScoreCard'
import AISymptomChecker from './AISymptomChecker'
import PatientNeonCard from './common/PatientNeonCard'
import { EmptyState } from './LoadingState'

const PatientPortal = React.memo(function PatientPortal({ 
  doctors = [], 
  appointments = [], 
  prescriptions = [], 
  patients = [],
  onBookAppointment, 
  onOpenTeleconsultation, 
  onViewPrescription 
}) {
  const [activeTab, setActiveTab] = useState('doctors') // 'doctors' | 'appointments' | 'prescriptions' | 'profile'
  
  // Doctor Search & Filter State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpec, setSelectedSpec] = useState('All')

  // Booking Modal State
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [bookingDate, setBookingDate] = useState('2026-08-15')
  const [bookingTime, setBookingTime] = useState('')
  const [symptoms, setSymptoms] = useState('')

  // Patient Profile State
  const [patientProfile, setPatientProfile] = useState(patients[0] || {
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    dob: '1992-05-14',
    gender: 'Female',
    bloodGroup: 'O+',
    allergies: 'Penicillin, Peanuts',
    emergencyContact: '+1 (555) 234-5678'
  })
  const [isProfileSaved, setIsProfileSaved] = useState(false)

  const specializations = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'General Medicine', 'Pediatrics']

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSpec = selectedSpec === 'All' || doc.specialization === selectedSpec
      return matchesSearch && matchesSpec
    })
  }, [doctors, searchQuery, selectedSpec])

  // Next Upcoming Approved or Pending Appointment
  const nextAppointment = useMemo(() => {
    return appointments.find(a => a.status === 'approved' || a.status === 'pending') || null
  }, [appointments])

  const handleBookingSubmit = useCallback((e) => {
    e.preventDefault()
    if (!selectedDoctor || !bookingDate || !bookingTime || !symptoms) return

    onBookAppointment({
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialization: selectedDoctor.specialization,
      appointmentDate: bookingDate,
      timeSlot: bookingTime,
      symptoms
    })

    setSelectedDoctor(null)
    setBookingTime('')
    setSymptoms('')
    setActiveTab('appointments')
  }, [selectedDoctor, bookingDate, bookingTime, symptoms, onBookAppointment])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approved & Ready</span>
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Doctor Review</span>
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 text-xs font-semibold">
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancelled</span>
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 text-[#F8FAFC]">
      
      {/* Patient Header Banner */}
      <PatientNeonCard className="p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF66]/5 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img 
              src={patientProfile.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"}
              alt={patientProfile.name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#00FF66]/50 shadow-[0_0_15px_rgba(0,255,102,0.3)]"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold text-[#F8FAFC] font-['Space_Grotesk']">
                  Welcome back, {patientProfile.name}!
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 text-xs font-bold">
                  Patient
                </span>
              </div>
              <p className="text-xs text-[#A7B3AD] mt-1">
                Medical ID: <span className="text-[#F8FAFC] font-mono">PAT-99824</span> • Blood Group: <span className="text-[#00FF66] font-bold">{patientProfile.bloodGroup || 'O+'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-4 py-3 rounded-2xl bg-[#04140F] border border-[#113328] text-center">
              <p className="text-xs text-[#A7B3AD]">Total Bookings</p>
              <p className="text-xl font-bold text-[#F8FAFC] font-['Space_Grotesk']">{appointments.length}</p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-[#04140F] border border-[#113328] text-center">
              <p className="text-xs text-[#A7B3AD]">Prescriptions</p>
              <p className="text-xl font-bold text-[#00FF66] font-['Space_Grotesk']">{prescriptions.length}</p>
            </div>
          </div>
        </div>
      </PatientNeonCard>

      {/* Health Summary & Next Appointment Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Next Appointment Card */}
        <PatientNeonCard className="lg:col-span-1 p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[#113328] pb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#00FF66]" />
              <h3 className="font-bold text-[#F8FAFC] text-sm font-['Space_Grotesk']">Next Appointment</h3>
            </div>
            <span className="text-[10px] uppercase font-bold text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded-full border border-[#00FF66]/20">Upcoming</span>
          </div>

          {nextAppointment ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#F8FAFC] text-sm">{nextAppointment.doctorName}</h4>
                  <p className="text-xs text-[#00FF66] font-semibold">{nextAppointment.doctorSpecialization}</p>
                </div>
                {getStatusBadge(nextAppointment.status)}
              </div>

              <div className="p-3 rounded-xl bg-[#04140F] border border-[#113328] space-y-1 text-xs text-[#A7B3AD]">
                <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#6B7C75]" /> Date: <strong className="text-[#F8FAFC]">{nextAppointment.appointmentDate}</strong></p>
                <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#6B7C75]" /> Time: <strong className="text-[#F8FAFC]">{nextAppointment.timeSlot}</strong></p>
              </div>

              {nextAppointment.status === 'approved' && (
                <button
                  onClick={() => onOpenTeleconsultation(nextAppointment)}
                  aria-label="Join Teleconsultation Room"
                  style={{
                    background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
                    color: '#04140F'
                  }}
                  className="w-full font-extrabold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xs flex items-center justify-center space-x-2 shadow-md"
                >
                  <Video className="w-4 h-4 text-[#04140F]" />
                  <span>Join Video Consult</span>
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-2 text-[#A7B3AD]">
              <Clock className="w-8 h-8 text-[#6B7C75] mx-auto" />
              <p className="text-xs">No upcoming appointments scheduled.</p>
              <button
                onClick={() => setActiveTab('doctors')}
                aria-label="Book a doctor consultation"
                style={{
                  background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
                  color: '#04140F'
                }}
                className="font-extrabold px-3 py-1.5 rounded-xl text-xs transition-all mt-2"
              >
                Book Consultation
              </button>
            </div>
          )}
        </PatientNeonCard>

        {/* Health Summary Section */}
        <PatientNeonCard className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#113328] pb-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-[#00FF66]" />
              <h3 className="font-bold text-[#F8FAFC] text-sm font-['Space_Grotesk']">Patient Health Summary</h3>
            </div>
            <span className="text-[10px] text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full border border-[#22C55E]/20 font-semibold">Active Profile Sync</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#04140F] border border-[#113328] space-y-1">
              <span className="text-[10px] text-[#6B7C75] uppercase font-bold">Primary Care Doctor</span>
              <p className="font-bold text-[#F8FAFC]">{doctors[0]?.name || 'Dr. Robert Ford'}</p>
              <p className="text-[10px] text-[#00FF66]">Cardiology Specialist</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#04140F] border border-[#113328] space-y-1">
              <span className="text-[10px] text-[#6B7C75] uppercase font-bold">Known Allergies</span>
              <p className="font-bold text-[#F8FAFC]">{patientProfile.allergies || 'Penicillin'}</p>
              <p className="text-[10px] text-[#F59E0B]">Alert Tagged in EMR</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#04140F] border border-[#113328] space-y-1">
              <span className="text-[10px] text-[#6B7C75] uppercase font-bold">Emergency Contact</span>
              <p className="font-bold text-[#F8FAFC]">{patientProfile.emergencyContact}</p>
              <p className="text-[10px] text-[#22C55E]">Verified Helpline</p>
            </div>
          </div>
        </PatientNeonCard>

      </div>

      {/* Smart Health Telemetry Widget */}
      <HealthScoreCard />

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#113328] space-x-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('doctors')}
          aria-label="View AI Triage and Doctor Search tab"
          className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'doctors' 
              ? 'bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30' 
              : 'text-[#A7B3AD] hover:text-[#00FF66] hover:bg-[#071A14]'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-[#00FF66]" />
          <span>AI Triage & Doctor Search</span>
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          aria-label="View My Appointments tab"
          className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'appointments' 
              ? 'bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30' 
              : 'text-[#A7B3AD] hover:text-[#00FF66] hover:bg-[#071A14]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Appointments ({appointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          aria-label="View Digital Prescription Vault tab"
          className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'prescriptions' 
              ? 'bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30' 
              : 'text-[#A7B3AD] hover:text-[#00FF66] hover:bg-[#071A14]'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>Digital Prescription Vault ({prescriptions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          aria-label="View Medical Profile tab"
          className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'profile' 
              ? 'bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30' 
              : 'text-[#A7B3AD] hover:text-[#00FF66] hover:bg-[#071A14]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Medical Profile</span>
        </button>
      </div>

      {/* TAB 1: DOCTOR DIRECTORY & AI TRIAGE */}
      {activeTab === 'doctors' && (
        <div className="space-y-6">
          <AISymptomChecker 
            onRecommendBooking={(specialist, textSymptoms, urgency) => {
              setSelectedSpec(specialist.includes('Cardiology') ? 'Cardiology' : 'General Medicine')
              const matchedDoc = doctors.find(d => d.specialization.includes(specialist)) || doctors[0]
              setSelectedDoctor(matchedDoc)
              setSymptoms(textSymptoms)
            }}
          />
          
          {/* Search & Filter Bar */}
          <PatientNeonCard className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#6B7C75]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors by name or medical specialty..."
                aria-label="Search doctors"
                className="w-full bg-[#020B08] border border-[#113328] rounded-xl pl-10 pr-4 py-2 text-xs text-[#F8FAFC] placeholder-[#6B7C75] focus:outline-none focus:border-[#00FF66]"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
              <Filter className="w-4 h-4 text-[#6B7C75] hidden sm:block" />
              {specializations.map(spec => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpec(spec)}
                  aria-label={`Filter by ${spec}`}
                  style={selectedSpec === spec ? {
                    background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
                    color: '#04140F'
                  } : {}}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    selectedSpec === spec 
                      ? 'shadow-md'
                      : 'bg-[#020B08] text-[#A7B3AD] border border-[#113328] hover:border-[#00FF66]/40'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </PatientNeonCard>

          {/* Doctor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doc => (
              <PatientNeonCard 
                key={doc.id}
                className="p-5 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={doc.avatar || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"}
                        alt={doc.name} 
                        className="w-14 h-14 rounded-2xl object-cover border border-[#113328]"
                      />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h3 className="font-bold text-[#F8FAFC] text-sm group-hover:text-[#00FF66] transition-colors">
                            {doc.name}
                          </h3>
                          {doc.isVerified && (
                            <ShieldCheck className="w-4 h-4 text-[#00FF66]" title="Verified Medical Practitioner" />
                          )}
                        </div>
                        <p className="text-xs font-semibold text-[#00FF66]">{doc.specialization}</p>
                        <p className="text-[11px] text-[#A7B3AD]">{doc.hospital}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/25 text-[#F59E0B] text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#04140F] border border-[#113328] text-xs space-y-1.5">
                    <div className="flex justify-between text-[#A7B3AD]">
                      <span>Qualifications:</span>
                      <span className="font-semibold text-[#F8FAFC]">{doc.qualification}</span>
                    </div>
                    <div className="flex justify-between text-[#A7B3AD]">
                      <span>Experience:</span>
                      <span className="font-semibold text-[#F8FAFC]">{doc.experienceYears} Years</span>
                    </div>
                    <div className="flex justify-between text-[#A7B3AD]">
                      <span>Consultation Fee:</span>
                      <span className="font-bold text-[#00FF66]">${doc.consultationFee}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#113328] flex items-center justify-between">
                  <span className="text-[11px] text-[#6B7C75]">
                    {doc.availableSlots ? `${doc.availableSlots.length} Slots Available` : 'Slots Open'}
                  </span>
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    aria-label={`Book consultation with ${doc.name}`}
                    style={{
                      background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
                      color: '#04140F'
                    }}
                    className="font-extrabold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xs flex items-center space-x-1.5 shadow-md"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#04140F]" />
                    <span>Book Consultation</span>
                  </button>
                </div>
              </PatientNeonCard>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: MY APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <PatientNeonCard className="overflow-hidden">
            <div className="p-5 border-b border-[#113328] flex items-center justify-between">
              <h3 className="font-bold text-[#F8FAFC] text-sm sm:text-base flex items-center gap-2 font-['Space_Grotesk']">
                <Calendar className="w-4 h-4 text-[#00FF66]" /> Appointment History & Live Rooms
              </h3>
              <span className="text-xs text-[#A7B3AD]">{appointments.length} Total Bookings</span>
            </div>

            <div className="divide-y divide-[#113328]">
              {appointments.length === 0 ? (
                <EmptyState 
                  title="No appointments found"
                  description="You have not booked any virtual consultations yet."
                  actionText="Book Consultation Now"
                  onAction={() => setActiveTab('doctors')}
                />
              ) : (
                appointments.map(apt => (
                  <div key={apt.id} className="p-5 hover:bg-[#071A14] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-[#F8FAFC] text-sm">#{apt.id}</span>
                        {getStatusBadge(apt.status)}
                      </div>
                      <p className="text-xs text-[#A7B3AD]">
                        Doctor: <span className="text-[#00FF66] font-semibold">{apt.doctorName}</span> ({apt.doctorSpecialization})
                      </p>
                      <p className="text-xs text-[#6B7C75]">
                        Date: <span className="text-[#F8FAFC] font-medium">{apt.appointmentDate}</span> at <span className="text-[#F8FAFC] font-medium">{apt.timeSlot}</span>
                      </p>
                      <p className="text-xs text-[#A7B3AD] italic bg-[#04140F] p-2.5 rounded-xl border border-[#113328] mt-2">
                        Symptoms: "{apt.symptoms}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 self-end md:self-center">
                      {apt.status === 'approved' && (
                        <button
                          onClick={() => onOpenTeleconsultation(apt)}
                          aria-label={`Join virtual room for appointment ${apt.id}`}
                          style={{
                            background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
                            color: '#04140F'
                          }}
                          className="font-extrabold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xs flex items-center space-x-2 animate-pulse shadow-md"
                        >
                          <Video className="w-4 h-4 text-[#04140F]" />
                          <span>Join Virtual Room</span>
                        </button>
                      )}

                      {apt.status === 'completed' && (
                        <button
                          onClick={() => {
                            const rx = prescriptions.find(p => p.appointmentId === apt.id)
                            if (rx) onViewPrescription(rx)
                          }}
                          aria-label={`View prescription for appointment ${apt.id}`}
                          className="px-4 py-2 rounded-xl bg-[#04140F] hover:bg-[#071A14] text-[#00FF66] font-bold text-xs flex items-center space-x-1.5 border border-[#113328] transition-all"
                        >
                          <FileText className="w-4 h-4" />
                          <span>View Prescription</span>
                        </button>
                      )}
                    </div>

                  </div>
                ))
              )}
            </div>
          </PatientNeonCard>
        </div>
      )}

      {/* TAB 3: PRESCRIPTION VAULT */}
      {activeTab === 'prescriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prescriptions.length === 0 ? (
            <div className="col-span-2">
              <EmptyState 
                title="No prescriptions found"
                description="Your digital prescription vault is currently empty."
              />
            </div>
          ) : (
            prescriptions.map(rx => (
              <PatientNeonCard key={rx.id} className="p-6 space-y-4">
                <div className="flex items-start justify-between border-b border-[#113328] pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#6B7C75]">Prescription #{rx.id}</span>
                    <h4 className="font-bold text-[#F8FAFC] text-sm mt-0.5">{rx.doctorName}</h4>
                    <p className="text-xs text-[#00FF66] font-medium">{rx.doctorSpecialization}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 text-[10px] font-bold">
                    Verified Digital Rx
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <p className="text-[#6B7C75]">Diagnosis:</p>
                  <p className="text-[#A7B3AD] font-medium p-2.5 rounded-xl bg-[#04140F] border border-[#113328]">
                    {rx.diagnosis}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-[#6B7C75]">Medicines Prescribed: <strong className="text-[#F8FAFC]">{rx.medicines ? rx.medicines.length : 0}</strong></span>
                  <button
                    onClick={() => onViewPrescription(rx)}
                    aria-label={`View prescription ${rx.id}`}
                    style={{
                      background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
                      color: '#04140F'
                    }}
                    className="font-extrabold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xs flex items-center space-x-1 shadow-md"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#04140F]" />
                    <span>View PDF</span>
                  </button>
                </div>
              </PatientNeonCard>
            ))
          )}
        </div>
      )}

      {/* TAB 4: PATIENT PROFILE */}
      {activeTab === 'profile' && (
        <PatientNeonCard className="p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center space-x-3 border-b border-[#113328] pb-4">
            <User className="w-5 h-5 text-[#00FF66]" />
            <h3 className="font-bold text-[#F8FAFC] text-base font-['Space_Grotesk']">
              Personal & Medical Profile Settings
            </h3>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsProfileSaved(true); setTimeout(() => setIsProfileSaved(false), 3000); }} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="patientName" className="text-[#A7B3AD] font-semibold block mb-1">Full Name</label>
                <input
                  id="patientName"
                  type="text"
                  value={patientProfile.name}
                  onChange={(e) => setPatientProfile({...patientProfile, name: e.target.value})}
                  aria-label="Full Name"
                  className="w-full bg-[#020B08] border border-[#113328] rounded-xl px-3.5 py-2.5 text-[#F8FAFC] focus:outline-none focus:border-[#00FF66]"
                />
              </div>

              <div>
                <label htmlFor="patientEmail" className="text-[#A7B3AD] font-semibold block mb-1">Email Address</label>
                <input
                  id="patientEmail"
                  type="email"
                  value={patientProfile.email}
                  onChange={(e) => setPatientProfile({...patientProfile, email: e.target.value})}
                  aria-label="Email Address"
                  className="w-full bg-[#020B08] border border-[#113328] rounded-xl px-3.5 py-2.5 text-[#F8FAFC] focus:outline-none focus:border-[#00FF66]"
                />
              </div>

              <div>
                <label htmlFor="bloodGroup" className="text-[#A7B3AD] font-semibold block mb-1">Blood Group</label>
                <select
                  id="bloodGroup"
                  value={patientProfile.bloodGroup}
                  onChange={(e) => setPatientProfile({...patientProfile, bloodGroup: e.target.value})}
                  aria-label="Blood Group"
                  className="w-full bg-[#020B08] border border-[#113328] rounded-xl px-3.5 py-2.5 text-[#F8FAFC] focus:outline-none focus:border-[#00FF66]"
                >
                  <option value="O+">O Rh Positive (O+)</option>
                  <option value="A+">A Rh Positive (A+)</option>
                  <option value="B+">B Rh Positive (B+)</option>
                  <option value="AB+">AB Rh Positive (AB+)</option>
                  <option value="O-">O Rh Negative (O-)</option>
                </select>
              </div>

              <div>
                <label htmlFor="emergencyContact" className="text-[#A7B3AD] font-semibold block mb-1">Emergency Contact</label>
                <input
                  id="emergencyContact"
                  type="text"
                  value={patientProfile.emergencyContact}
                  onChange={(e) => setPatientProfile({...patientProfile, emergencyContact: e.target.value})}
                  aria-label="Emergency Contact"
                  className="w-full bg-[#020B08] border border-[#113328] rounded-xl px-3.5 py-2.5 text-[#F8FAFC] focus:outline-none focus:border-[#00FF66]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="drugAllergies" className="text-[#A7B3AD] font-semibold block mb-1">Known Drug Allergies</label>
              <input
                id="drugAllergies"
                type="text"
                value={patientProfile.allergies}
                onChange={(e) => setPatientProfile({...patientProfile, allergies: e.target.value})}
                placeholder="e.g. Penicillin, Sulfa"
                aria-label="Known Drug Allergies"
                className="w-full bg-[#020B08] border border-[#113328] rounded-xl px-3.5 py-2.5 text-[#F8FAFC] focus:outline-none focus:border-[#00FF66]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                aria-label="Save Profile Changes"
                style={{
                  background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
                  color: '#04140F'
                }}
                className="font-extrabold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xs shadow-md"
              >
                Save Profile Changes
              </button>

              {isProfileSaved && (
                <span className="text-xs text-[#22C55E] font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile updated successfully!</span>
                </span>
              )}
            </div>
          </form>
        </PatientNeonCard>
      )}

      {/* BOOK APPOINTMENT MODAL WIZARD */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-[#020B08]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#071A14] border border-[#113328] rounded-3xl p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150 text-[#F8FAFC]">
            <div className="flex items-center justify-between border-b border-[#113328] pb-3">
              <div>
                <h3 className="font-bold text-[#F8FAFC] text-base font-['Space_Grotesk']">
                  Book Virtual Consultation
                </h3>
                <p className="text-xs text-[#00FF66] font-medium">With {selectedDoctor.name} ({selectedDoctor.specialization})</p>
              </div>
              <button onClick={() => setSelectedDoctor(null)} aria-label="Close booking modal" className="p-1.5 rounded-xl bg-[#04140F] text-[#A7B3AD] hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="bookingDate" className="text-[#A7B3AD] font-semibold block mb-1">Select Date</label>
                  <input
                    id="bookingDate"
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    aria-label="Select appointment date"
                    className="w-full bg-[#020B08] border border-[#113328] rounded-xl px-3 py-2 text-[#F8FAFC] focus:outline-none focus:border-[#00FF66]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="bookingTime" className="text-[#A7B3AD] font-semibold block mb-1">Select Time Slot</label>
                  <select
                    id="bookingTime"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    aria-label="Select appointment time slot"
                    className="w-full bg-[#020B08] border border-[#113328] rounded-xl px-3 py-2 text-[#F8FAFC] focus:outline-none focus:border-[#00FF66]"
                    required
                  >
                    <option value="">Choose slot...</option>
                    {(selectedDoctor.availableSlots || ['09:00 AM', '10:30 AM', '02:00 PM']).map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="bookingSymptoms" className="text-[#A7B3AD] font-semibold block mb-1">Chief Symptoms & Medical Complaints</label>
                <textarea
                  id="bookingSymptoms"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe your medical symptoms, duration, and any current medications..."
                  aria-label="Chief symptoms and medical complaints"
                  className="w-full bg-[#020B08] border border-[#113328] rounded-xl p-3 text-[#F8FAFC] focus:outline-none focus:border-[#00FF66] resize-none h-24"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-[#04140F] border border-[#113328] flex justify-between items-center text-xs">
                <span className="text-[#A7B3AD]">Consultation Fee:</span>
                <span className="font-bold text-[#00FF66] text-sm">${selectedDoctor.consultationFee}</span>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
                  aria-label="Cancel booking"
                  className="px-4 py-2 rounded-xl bg-[#04140F] hover:bg-[#071A14] text-[#A7B3AD] font-bold border border-[#113328]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  aria-label="Confirm booking request"
                  style={{
                    background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
                    color: '#04140F'
                  }}
                  className="font-extrabold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xs shadow-md"
                >
                  Confirm Booking Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
})

export default PatientPortal
