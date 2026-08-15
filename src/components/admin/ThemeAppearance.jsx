import React from 'react'
import { Sun, Palette, Sparkles, CheckCircle2 } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import toast from 'react-hot-toast'

export default function ThemeAppearance() {
  const colorSwatches = [
    { name: 'Primary Background', hex: '#0B0F19', desc: 'Main viewport container' },
    { name: 'Sidebar Background', hex: '#111827', desc: 'Left navigation panel' },
    { name: 'Neon Yellow Accent', hex: '#E5FF00', desc: 'Active items & glowing borders' },
    { name: 'Card Background', hex: '#1F2937', desc: 'Glassmorphism dark card' },
    { name: 'Text Primary', hex: '#F9FAFB', desc: 'High contrast text' },
    { name: 'Text Secondary', hex: '#9CA3AF', desc: 'Subheadings & metadata' }
  ]

  const handleApplyTheme = () => {
    toast.success("Neon Yellow High-Contrast Enterprise Theme Applied!")
  }

  return (
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <Sun className="w-5 h-5 text-[#E5FF00]" /> Neon Yellow UI/UX Theme & Appearance Customizer
          </h2>
          <p className="text-xs text-[#9CA3AF]">Manage portal styling, neon yellow glow effects, high contrast levels, and typography tokens.</p>
        </div>

        <button
          type="button"
          onClick={handleApplyTheme}
          style={{ background: '#E5FF00', color: '#0B0F19', boxShadow: '0 0 15px rgba(229, 255, 0, 0.45)' }}
          className="font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#0B0F19]" />
          <span>Active Neon Yellow Theme</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {colorSwatches.map((swatch, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-[#111827] border border-[#374151] flex items-center space-x-3">
            <div 
              style={{ backgroundColor: swatch.hex }}
              className="w-12 h-12 rounded-2xl border border-[#374151] shrink-0 shadow-md"
            />
            <div>
              <p className="font-bold text-[#F9FAFB] text-xs">{swatch.name}</p>
              <p className="text-[11px] font-mono text-[#E5FF00] font-bold">{swatch.hex}</p>
              <p className="text-[10px] text-[#9CA3AF]">{swatch.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-[#111827] border border-[#374151] space-y-3">
        <h3 className="font-extrabold text-[#F9FAFB] text-sm font-['Space_Grotesk']">
          Neon Yellow Glowing Hover CSS Specification
        </h3>
        <pre className="p-4 rounded-xl bg-[#0B0F19] text-[#E5FF00] font-mono text-xs overflow-x-auto border border-[#374151]">
{`.sidebar-item:hover {
  background: rgba(229, 255, 0, 0.12);
  border-left: 4px solid #E5FF00;
  box-shadow: 0 0 12px rgba(229, 255, 0, 0.45);
}`}
        </pre>
      </div>

    </AdminNeonCard>
  )
}
