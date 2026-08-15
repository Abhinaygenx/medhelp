import React, { useState, useCallback } from 'react'
import { 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  BrainCircuit, 
  Clock,
  Siren,
  PhoneCall
} from 'lucide-react'

const AISymptomChecker = React.memo(function AISymptomChecker({ onRecommendBooking }) {
  const [symptomsInput, setSymptomsInput] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const quickTags = [
    "Chest pain & shortness of breath",
    "High fever & severe cough",
    "Migraine headache & dizziness",
    "Mild cold & fatigue"
  ]

  const analyzeSymptoms = useCallback((textToAnalyze) => {
    const query = textToAnalyze.toLowerCase()
    setIsAnalyzing(true)

    setTimeout(() => {
      let urgency = 'LOW'
      let specialist = 'General Medicine'
      let responseSla = '24 Hours'
      let recommendation = 'Low Risk: Mild symptoms detected. Schedule a routine consultation with a General Practitioner.'
      let badgeColor = 'bg-[#00FF66]/10 border-[#00FF66]/30 text-[#00FF66]'
      let icon = ShieldCheck
      let emergencyWarning = null

      // HIGH RISK KEYWORDS: chest pain, shortness of breath, stroke, unconscious, severe bleeding
      if (
        query.includes('chest pain') || 
        query.includes('shortness of breath') || 
        query.includes('stroke') || 
        query.includes('unconscious') || 
        query.includes('severe bleeding') ||
        query.includes('chest') || 
        query.includes('breath') || 
        query.includes('heart') || 
        query.includes('cardiac')
      ) {
        urgency = 'HIGH'
        specialist = 'Cardiology / Emergency'
        responseSla = 'Immediate (5 Minutes SLA)'
        recommendation = 'HIGH RISK DETECTED: Symptoms indicate potential acute cardiovascular or respiratory emergency. Immediate physician escalation required.'
        badgeColor = 'bg-[#EF4444]/15 border-[#EF4444]/40 text-[#EF4444]'
        icon = AlertTriangle
        emergencyWarning = 'EMERGENCY ALERT: If you are experiencing loss of consciousness, severe hemorrhage, or chest oppression, call local emergency (911 / 108) immediately.'
      } 
      // MEDIUM RISK KEYWORDS: fever, cough, headache, stomach pain, dizziness
      else if (
        query.includes('fever') || 
        query.includes('cough') || 
        query.includes('headache') || 
        query.includes('stomach pain') || 
        query.includes('dizziness') ||
        query.includes('migraine') || 
        query.includes('joint')
      ) {
        urgency = 'MEDIUM'
        specialist = query.includes('headache') || query.includes('dizziness') ? 'Neurology' : 'General Medicine'
        responseSla = '1-2 Hours'
        recommendation = 'MEDIUM RISK: Moderate clinical symptoms detected. Doctor consultation recommended within 1 to 2 hours.'
        badgeColor = 'bg-[#F59E0B]/15 border-[#F59E0B]/30 text-[#F59E0B]'
        icon = Activity
      }
      // LOW RISK KEYWORDS: mild cold, allergy, fatigue, body pain
      else {
        urgency = 'LOW'
        specialist = 'General Medicine'
        responseSla = '24 Hours'
        recommendation = 'LOW RISK: Mild or non-critical symptoms. Regular teleconsultation advised within 24 hours.'
        badgeColor = 'bg-[#00FF66]/10 border-[#00FF66]/30 text-[#00FF66]'
        icon = ShieldCheck
      }

      setAnalysisResult({
        urgency,
        specialist,
        responseSla,
        recommendation,
        badgeColor,
        icon,
        emergencyWarning,
        input: textToAnalyze
      })
      setIsAnalyzing(false)
    }, 500)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!symptomsInput.trim()) return
    analyzeSymptoms(symptomsInput)
  }

  return (
    <div className="space-y-6 text-[#F8FAFC]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#113328] pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00FF66] to-[#00CC55] p-0.5 shadow-[0_0_15px_rgba(0,255,102,0.3)]">
            <div className="w-full h-full bg-[#04140F] rounded-2xl flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-[#00FF66] animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-[#F8FAFC] text-base font-['Space_Grotesk'] flex items-center gap-2">
              AI Symptom Checker & Clinical Triage Engine
            </h3>
            <p className="text-xs text-[#A7B3AD]">Automated symptom risk stratification & specialist dispatch</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 text-xs font-extrabold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Clinical AI Active</span>
        </span>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label htmlFor="symptomsInput" className="text-[#F8FAFC] font-bold block mb-1.5">
            Describe your current symptoms or health concerns
          </label>
          <textarea
            id="symptomsInput"
            value={symptomsInput}
            onChange={(e) => setSymptomsInput(e.target.value)}
            placeholder="e.g., I am experiencing chest pain, shortness of breath, or fever and dizziness..."
            aria-label="Describe your current symptoms"
            className="w-full bg-[#020B08] border border-[#113328] focus:border-[#00FF66] rounded-2xl p-4 text-xs text-[#F8FAFC] placeholder-[#6B7C75] focus:outline-none transition-all resize-none h-24"
          />
        </div>

        {/* Quick Tag Pills */}
        <div className="space-y-1.5">
          <span className="text-[11px] text-[#A7B3AD] font-semibold">Quick Test Symptoms:</span>
          <div className="flex flex-wrap gap-2">
            {quickTags.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Test prompt: ${tag}`}
                onClick={() => {
                  setSymptomsInput(tag)
                  analyzeSymptoms(tag)
                }}
                className="px-3 py-1.5 rounded-xl bg-[#04140F] hover:bg-[#071A14] border border-[#113328] hover:border-[#00FF66]/40 text-[11px] text-[#A7B3AD] hover:text-[#00FF66] transition-all"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isAnalyzing || !symptomsInput.trim()}
          aria-label="Analyze symptoms with AI"
          style={{
            background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
            boxShadow: '0 0 20px rgba(0, 255, 102, 0.35)',
            color: '#04140F'
          }}
          className="w-full font-extrabold px-4 py-3 rounded-2xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-xs flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Activity className="w-4 h-4 animate-spin text-[#04140F]" />
              <span>Analyzing Symptoms via Clinical AI...</span>
            </>
          ) : (
            <>
              <BrainCircuit className="w-4 h-4 text-[#04140F]" />
              <span>Run AI Triage & Specialist Match</span>
            </>
          )}
        </button>
      </form>

      {/* Analysis Result Card */}
      {analysisResult && (
        <div className={`p-5 rounded-2xl bg-[#04140F] border border-[#113328] space-y-4 animate-in fade-in zoom-in-95 duration-200`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-[#020B08] border border-[#113328]">
                <analysisResult.icon className="w-6 h-6 text-[#00FF66]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#F8FAFC] text-sm">Risk Assessment:</span>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-extrabold tracking-wider uppercase border ${analysisResult.badgeColor}`}>
                    {analysisResult.urgency} RISK
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#A7B3AD] mt-1">
                  Recommended Specialist: <span className="text-[#00FF66] font-bold">{analysisResult.specialist}</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#6B7C75] block uppercase font-bold">Estimated SLA</span>
              <span className="text-xs font-bold text-[#F8FAFC] flex items-center gap-1 justify-end">
                <Clock className="w-3.5 h-3.5 text-[#00FF66]" />
                {analysisResult.responseSla}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#F8FAFC] leading-relaxed bg-[#020B08] p-3.5 rounded-xl border border-[#113328]">
            {analysisResult.recommendation}
          </p>

          {/* Emergency Warning Banner for High Risk */}
          {analysisResult.urgency === 'HIGH' && (
            <div className="p-3.5 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center space-x-3 text-[#EF4444] text-xs animate-pulse">
              <Siren className="w-5 h-5 shrink-0" />
              <p className="flex-1 font-semibold">{analysisResult.emergencyWarning}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-[#A7B3AD]">Specialist Queue Ready</span>
            <button
              type="button"
              aria-label={`Book ${analysisResult.specialist} consultation`}
              onClick={() => onRecommendBooking(analysisResult.specialist, analysisResult.input, analysisResult.urgency)}
              style={{
                background: 'linear-gradient(135deg, #00FF66 0%, #00CC55 100%)',
                color: '#04140F'
              }}
              className="font-extrabold px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-xs flex items-center space-x-2 shadow-md"
            >
              <span>Book {analysisResult.specialist}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#04140F]" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

export default AISymptomChecker
