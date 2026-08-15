import { useState } from 'react'
import { 
  X, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  FileText, 
  ShieldCheck,
  Send,
  Sparkles,
  Users,
  Maximize2
} from 'lucide-react'

export default function TeleconsultationModal({ appointment, onClose, onCompleteConsultation, isDoctor }) {
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [activeTab, setActiveTab] = useState('chat') // 'chat' | 'notes'
  
  const [chatMessages, setChatMessages] = useState([
    { sender: 'System', text: 'Encrypted Telehealth Session Initialized via WebRTC.', time: '10:30 AM' },
    { sender: appointment.doctorName, text: 'Hello! I have reviewed your symptom notes. How are you feeling today?', time: '10:31 AM' }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [clinicalNotes, setClinicalNotes] = useState('Patient reports mild symptoms over 3 days. Vital signs normal.')

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return
    const sender = isDoctor ? appointment.doctorName : appointment.patientName
    setChatMessages(prev => [...prev, {
      sender,
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    setInputMessage('')
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-6xl h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h3 className="font-bold text-slate-100 text-sm sm:text-base flex items-center gap-2 font-['Space_Grotesk']">
                Virtual Consultation Room #{appointment.id}
              </h3>
              <p className="text-xs text-slate-400">
                Patient: <span className="text-slate-200 font-medium">{appointment.patientName}</span> • Doctor: <span className="text-teal-400 font-medium">{appointment.doctorName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HIPAA Compliant Stream</span>
            </span>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Grid: Video Screen + Right Panel */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-hidden">
          
          {/* Video Screen Area */}
          <div className="lg:col-span-2 bg-slate-950 p-4 flex flex-col justify-between relative overflow-hidden group">
            
            {/* Embedded Jitsi Video Call Frame / Simulation */}
            <div className="w-full h-full rounded-2xl bg-slate-900 border border-slate-800/80 overflow-hidden relative flex items-center justify-center">
              
              {/* Doctor Remote Stream Simulation */}
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80" 
                alt="Doctor Video" 
                className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoOn ? 'opacity-90' : 'opacity-10'}`}
              />

              {!isVideoOn && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-400">
                  <VideoOff className="w-16 h-16 mb-2 text-slate-600" />
                  <p className="text-sm">Camera Muted</p>
                </div>
              )}

              {/* Patient Self PiP Thumbnail */}
              <div className="absolute bottom-4 right-4 w-36 sm:w-48 h-24 sm:h-32 rounded-xl bg-slate-900 border-2 border-teal-500/50 shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80" 
                  alt="Patient Video" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1.5 left-2 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded text-slate-200">You (Patient)</span>
              </div>

              {/* Consultation Info Overlay Header */}
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Consultation • 12:45 min</span>
              </div>
            </div>

            {/* Bottom Call Controls */}
            <div className="py-3 flex items-center justify-center space-x-4 bg-slate-950/90 rounded-2xl mt-3 border border-slate-800">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                aria-label={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
                className={`p-3 rounded-full transition-all ${
                  isMicOn ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
                title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                aria-label={isVideoOn ? "Turn off Video" : "Turn on Video"}
                className={`p-3 rounded-full transition-all ${
                  isVideoOn ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
                title={isVideoOn ? "Turn off Video" : "Turn on Video"}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => {
                  if (isDoctor && onCompleteConsultation) {
                    onCompleteConsultation(appointment.id)
                  } else {
                    onClose()
                  }
                }}
                aria-label={isDoctor ? "End consultation and issue prescription" : "Leave video consultation session"}
                className="px-5 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-red-600/30 transition-all"
              >
                <PhoneOff className="w-4 h-4" />
                <span>{isDoctor ? "End & Issue Rx" : "Leave Session"}</span>
              </button>
            </div>
          </div>

          {/* Right Panel: Chat & Clinical Notes */}
          <div className="bg-slate-900 border-l border-slate-800 flex flex-col h-full">
            
            {/* Tabs Header */}
            <div className="flex border-b border-slate-800 bg-slate-900/60">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition-all ${
                  activeTab === 'chat' ? 'border-teal-400 text-teal-400 bg-teal-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Session Chat</span>
              </button>
              {isDoctor && (
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition-all ${
                    activeTab === 'notes' ? 'border-teal-400 text-teal-400 bg-teal-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Clinical Notes</span>
                </button>
              )}
            </div>

            {/* Chat Body */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col p-4 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.sender === 'System' ? 'items-center my-2' : msg.sender === (isDoctor ? appointment.doctorName : appointment.patientName) ? 'items-end' : 'items-start'}`}>
                      {msg.sender === 'System' ? (
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-3 py-1 rounded-full border border-slate-700">{msg.text}</span>
                      ) : (
                        <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs ${
                          msg.sender === (isDoctor ? appointment.doctorName : appointment.patientName)
                            ? 'bg-teal-600 text-white rounded-br-none'
                            : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                        }`}>
                          <p className="text-[10px] text-slate-300 font-semibold mb-0.5">{msg.sender}</p>
                          <p>{msg.text}</p>
                          <span className="text-[9px] opacity-70 mt-1 block text-right">{msg.time}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Send Input */}
                <form onSubmit={handleSendMessage} className="mt-3 flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type message..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                  <button type="submit" className="p-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Doctor Clinical Notes */}
            {activeTab === 'notes' && isDoctor && (
              <div className="flex-1 p-4 flex flex-col space-y-3">
                <label className="text-xs font-semibold text-slate-300">Live Consultation Observations & Diagnosis Draft</label>
                <textarea
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-teal-500 resize-none font-mono"
                  placeholder="Record symptoms, diagnosis ideas..."
                />
                <button
                  onClick={() => {
                    if (onCompleteConsultation) onCompleteConsultation(appointment.id)
                  }}
                  className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Proceed to Digital Prescription</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}
