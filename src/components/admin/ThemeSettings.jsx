import React, { useState } from 'react'
import { Palette, Sparkles, CheckCircle2, Sliders, Moon, Zap } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import toast from 'react-hot-toast'

export default function ThemeSettings() {
  const [selectedAccent, setSelectedAccent] = useState('Neon Yellow')
  const [density, setDensity] = useState('Comfortable')
  const [animations, setAnimations] = useState(true)

  const accentOptions = [
    { name: 'Neon Yellow', hex: '#E5FF00', glow: 'rgba(229, 255, 0, 0.45)', isDefault: true },
    { name: 'Electric Cyan', hex: '#00F0FF', glow: 'rgba(0, 240, 255, 0.45)', isDefault: false },
    { name: 'Emerald Green', hex: '#00FF66', glow: 'rgba(0, 255, 102, 0.45)', isDefault: false }
  ]

  const handleSaveTheme = () => {
    toast.success(`Theme preferences saved! Active: ${selectedAccent} (${density} density)`)
  }

  return (
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB] animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#E5FF00]" /> Portal UI Theme & Visual Customizer
          </h2>
          <p className="text-xs text-[#9CA3AF]">Customize accent colors, layout density, and animation intensity. Neon Yellow selected by default.</p>
        </div>

        <button
          type="button"
          onClick={handleSaveTheme}
          style={{ background: '#E5FF00', color: '#0B0F19', boxShadow: '0 0 15px rgba(229, 255, 0, 0.45)' }}
          className="font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#0B0F19]" />
          <span>Save Theme Preferences</span>
        </button>
      </div>

      {/* Accent Color Selection Cards */}
      <div className="space-y-3">
        <label className="text-xs font-extrabold uppercase text-[#9CA3AF] tracking-wider block font-['Space_Grotesk']">
          Select Primary Accent Color
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {accentOptions.map(option => (
            <div
              key={option.name}
              onClick={() => setSelectedAccent(option.name)}
              className={`p-5 rounded-2xl bg-[#111827] border cursor-pointer transition-all space-y-3 ${
                selectedAccent === option.name 
                  ? 'border-[#E5FF00] shadow-[0_0_20px_rgba(229,255,0,0.25)]' 
                  : 'border-[#374151] hover:border-[#E5FF00]/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    style={{ backgroundColor: option.hex, boxShadow: `0 0 12px ${option.glow}` }}
                    className="w-8 h-8 rounded-xl border border-white/20"
                  />
                  <div>
                    <p className="font-bold text-xs text-[#F9FAFB]">{option.name}</p>
                    <p className="text-[10px] font-mono text-[#E5FF00]">{option.hex}</p>
                  </div>
                </div>

                {selectedAccent === option.name && (
                  <CheckCircle2 className="w-5 h-5 text-[#E5FF00]" />
                )}
              </div>

              {option.isDefault && (
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E5FF00]/15 text-[#E5FF00] border border-[#E5FF00]/30 text-[9px] font-extrabold uppercase">
                  Default HMS Theme
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* UI Density Options */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-extrabold uppercase text-[#9CA3AF] tracking-wider block font-['Space_Grotesk']">
          Layout UI Density
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {['Compact', 'Comfortable', 'Spacious'].map(d => (
            <button
              key={d}
              type="button"
              onClick={() => setDensity(d)}
              className={`p-3.5 rounded-2xl font-bold transition-all border ${
                density === d 
                  ? 'bg-[#E5FF00] text-[#0B0F19] border-[#E5FF00] shadow-[0_0_15px_rgba(229,255,0,0.35)]' 
                  : 'bg-[#111827] text-[#9CA3AF] border-[#374151] hover:text-white'
              }`}
            >
              {d} Density
            </button>
          ))}
        </div>
      </div>

      {/* Animation Toggle */}
      <div className="p-4 rounded-2xl bg-[#111827] border border-[#374151] flex items-center justify-between text-xs">
        <div className="space-y-0.5">
          <p className="font-bold text-[#F9FAFB] flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#E5FF00]" /> UI Micro-Animations & Glow FX
          </p>
          <p className="text-[11px] text-[#9CA3AF]">Enable neon yellow hover glow shadows and backdrop blur filters</p>
        </div>
        <input 
          type="checkbox" 
          checked={animations} 
          onChange={(e) => setAnimations(e.target.checked)}
          className="w-5 h-5 rounded text-[#E5FF00] focus:ring-[#E5FF00] border-[#374151] bg-[#0B0F19]" 
        />
      </div>

    </AdminNeonCard>
  )
}
