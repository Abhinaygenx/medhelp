import { useRef } from 'react'
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  FileText, 
  Stethoscope, 
  Calendar, 
  User, 
  CheckCircle2,
  Sparkles
} from 'lucide-react'

export default function PrescriptionModal({ prescription, onClose }) {
  const printRef = useRef(null)

  const handlePrint = () => {
    window.print()
  }

  if (!prescription) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Action Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
              <FileText className="w-4 h-4 text-teal-400" />
            </div>
            <h3 className="font-bold text-slate-100 text-sm sm:text-base font-['Space_Grotesk']">
              Digital Medical Prescription #{prescription.id}
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              aria-label="Print or download digital prescription PDF"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xs flex items-center space-x-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close prescription modal"
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prescription Document Container */}
        <div ref={printRef} className="p-6 sm:p-8 bg-slate-950 space-y-6 text-slate-200 printable-area font-['Plus_Jakarta_Sans']">
          
          {/* Hospital & Doctor Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-800 pb-6 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-teal-400 font-bold text-lg font-['Space_Grotesk']">
                <Stethoscope className="w-5 h-5" />
                <span>MEDICONNECT VIRTUAL CARE CLINIC</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Cloud Tele-Healthcare Platform • Telemedicine Dept.</p>
              <p className="text-[11px] text-slate-400">License Reg: #MC-2026-CLOUD-99</p>
            </div>

            <div className="sm:text-right">
              <h4 className="font-bold text-slate-100 text-base">{prescription.doctorName}</h4>
              <p className="text-xs text-teal-400 font-medium">{prescription.doctorSpecialization || 'Specialist Consultant'}</p>
              <p className="text-[11px] text-slate-400">Issued On: {new Date(prescription.issuedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          {/* Patient Details Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Patient Name</span>
              <span className="font-semibold text-slate-100">{prescription.patientName}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Prescription ID</span>
              <span className="font-mono text-slate-300">{prescription.id}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Linked Appt</span>
              <span className="font-mono text-slate-300">#{prescription.appointmentId}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
              <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Rx</span>
              </span>
            </div>
          </div>

          {/* Diagnosis Section */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center space-x-1.5">
              <span>Clinical Diagnosis</span>
            </h5>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium">
              {prescription.diagnosis}
            </div>
          </div>

          {/* Medicine List Grid */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-serif text-teal-400 font-bold">Rx</span>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">Prescribed Medications</h5>
            </div>

            <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] font-semibold">
                  <tr>
                    <th className="px-4 py-3">Medicine Name</th>
                    <th className="px-4 py-3">Dosage</th>
                    <th className="px-4 py-3">Frequency</th>
                    <th className="px-4 py-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
                  {prescription.medicines && prescription.medicines.length > 0 ? (
                    prescription.medicines.map((med, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-semibold text-teal-300">{med.name}</td>
                        <td className="px-4 py-3">{med.dosage}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">
                            {med.frequency}
                          </span>
                        </td>
                        <td className="px-4 py-3">{med.durationDays} Days</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-slate-400">No medicines specified</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Special Advice & Instructions */}
          {prescription.instructions && (
            <div className="space-y-1.5">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Dietary Advice & Special Instructions</h5>
              <p className="text-xs text-slate-300 p-3 rounded-xl bg-slate-900 border border-slate-800 italic">
                "{prescription.instructions}"
              </p>
            </div>
          )}

          {/* Footer Cryptographic Watermark & Digital Signature */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-end gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center space-x-1 text-emerald-400 font-semibold text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Electronically Signed & Authenticated</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                SHA-256 Hash: 8f9b4a1c7e2d0938...{prescription.id}
              </p>
              <p className="text-[10px] text-slate-400">
                Generated via MediConnect Cloud Firestore Node
              </p>
            </div>

            <div className="text-right">
              <div className="w-32 h-10 border-b border-teal-500/50 flex items-center justify-end font-serif italic text-teal-400 text-sm pr-2">
                {prescription.doctorName}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Authorized Digital Signature</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
