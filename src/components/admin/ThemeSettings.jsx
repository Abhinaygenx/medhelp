import React, { useState } from 'react'
import { Palette, Sparkles, CheckCircle2, Sliders, Moon, Zap } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
import toast from 'react-hot-toast'

export default function ThemeSettings() {
  const [selectedAccent, setSelectedAccent] = useState('MedHelp Blue')
  const [density, setDensity] = useState('Comfortable')
  const [animations, setAnimations] = useState(true)

  const accentOptions = [
    { name: 'MedHelp Blue', hex: '#2563eb', glow: 'rgba(37, 99, 235, 0.45)', isDefault: true },
    { name: 'Clinical Emerald', hex: '#10b981', glow: 'rgba(16, 185, 129, 0.45)', isDefault: false },
    { name: 'Modern Teal', hex: '#0d9488', glow: 'rgba(13, 148, 136, 0.45)', isDefault: false }
  ]

  const handleSaveTheme = () => {
    toast.success(`Theme preferences saved! Active: ${selectedAccent} (${density} density)`)
  }

  return (
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Palette className="w-5 h-5 text-[var(--brand-600)]" /> Portal UI Theme & Visual Customizer
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Customize accent colors, layout density, and animation intensity aligned with hospital standards.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveTheme}
          className="font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm text-white hover:opacity-95"
          style={{ background: 'var(--brand-600)' }}
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Save Theme Preferences</span>
        </button>
      </div>

      {/* Accent Color Selection Cards */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
          Select Primary Accent Color
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {accentOptions.map(option => {
            const isSelected = selectedAccent === option.name
            return (
              <div
                key={option.name}
                onClick={() => setSelectedAccent(option.name)}
                className="p-5 rounded-2xl cursor-pointer transition-all space-y-3"
                style={{
                  background: 'var(--surface-page)',
                  border: isSelected ? '2px solid var(--brand-600)' : '1px solid var(--border-light)',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'none'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      style={{ backgroundColor: option.hex }}
                      className="w-8 h-8 rounded-xl border border-white/20 shadow-sm"
                    />
                    <div>
                      <p className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>{option.name}</p>
                      <p className="text-[10px] font-mono text-[var(--brand-600)]">{option.hex}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-[var(--brand-600)]" />
                  )}
                </div>

                {option.isDefault && (
                  <Badge variant="brand" size="sm">
                    Default Medical Theme
                  </Badge>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* UI Density Options */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
          Layout UI Density
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {['Compact', 'Comfortable', 'Spacious'].map(d => {
            const isSelected = density === d
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDensity(d)}
                className="p-3.5 rounded-2xl font-bold transition-all border cursor-pointer"
                style={{
                  background: isSelected ? 'var(--brand-600)' : 'var(--surface-page)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  borderColor: isSelected ? 'var(--brand-600)' : 'var(--border-light)',
                  boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {d} Density
              </button>
            )
          })}
        </div>
      </div>

      {/* Animation Toggle */}
      <div 
        className="p-4 rounded-2xl flex items-center justify-between text-xs"
        style={{
          background: 'var(--surface-page)',
          border: '1px solid var(--border-light)'
        }}
      >
        <div className="space-y-0.5">
          <p className="font-bold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
            <Zap className="w-4 h-4 text-[var(--brand-600)]" /> UI Micro-Animations & Smooth Transitions
          </p>
          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Enable hardware-accelerated transitions and subtle card hover elevations</p>
        </div>
        <input 
          type="checkbox" 
          checked={animations} 
          onChange={(e) => setAnimations(e.target.checked)}
          className="w-5 h-5 rounded cursor-pointer accent-[var(--brand-600)]" 
        />
      </div>

    </AdminNeonCard>
  )
}
