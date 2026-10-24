import React from 'react'
import { Sun, Palette, Sparkles, CheckCircle2 } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import toast from 'react-hot-toast'

export default function ThemeAppearance() {
  const colorSwatches = [
    { name: 'Brand Primary', hex: '#2563eb', desc: 'Main brand actions and focus states' },
    { name: 'Surface Page', hex: 'var(--surface-page)', desc: 'Adaptive page canvas background' },
    { name: 'Surface Card', hex: 'var(--surface-card)', desc: 'Elevated card content container' },
    { name: 'Text Primary', hex: 'var(--text-primary)', desc: 'High-contrast readable headers and body' },
    { name: 'Text Muted', hex: 'var(--text-muted)', desc: 'Subheadings, labels and metadata' },
    { name: 'Border Light', hex: 'var(--border-light)', desc: 'Dividers and component boundaries' }
  ]

  const handleApplyTheme = () => {
    toast.success("MedHelp Design System tokens are active!")
  }

  return (
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Palette className="w-5 h-5 text-[var(--brand-600)]" /> Design System Tokens & Appearance
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Unified design tokens, contrast ratios, and color palette matching the MedHelp design system.
          </p>
        </div>

        <button
          type="button"
          onClick={handleApplyTheme}
          className="font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all text-white shadow-sm hover:opacity-90 cursor-pointer"
          style={{ background: 'var(--brand-600)' }}
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Active Unified Theme</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {colorSwatches.map((swatch, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-2xl flex items-center space-x-3"
            style={{
              background: 'var(--surface-page)',
              border: '1px solid var(--border-light)'
            }}
          >
            <div 
              style={{ backgroundColor: swatch.hex.startsWith('var') ? swatch.hex : swatch.hex, border: '1px solid var(--border-light)' }}
              className="w-12 h-12 rounded-2xl shrink-0 shadow-sm"
            />
            <div>
              <p className="font-bold text-xs" style={{ color: 'var(--text-primary)' }}>{swatch.name}</p>
              <p className="text-[11px] font-mono font-bold" style={{ color: 'var(--brand-600)' }}>{swatch.hex}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{swatch.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div 
        className="p-5 rounded-2xl space-y-3"
        style={{
          background: 'var(--surface-page)',
          border: '1px solid var(--border-light)'
        }}
      >
        <h3 className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>
          Design System CSS Variable Reference
        </h3>
        <pre 
          className="p-4 rounded-xl font-mono text-xs overflow-x-auto"
          style={{
            background: 'var(--surface-card)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-light)'
          }}
        >
{`:root {
  --brand-600: #2563eb;
  --surface-page: #f8fafc; /* dark: #0f172a */
  --surface-card: #ffffff; /* dark: #1e293b */
  --text-primary: #0f172a; /* dark: #f8fafc */
  --text-secondary: #334155; /* dark: #cbd5e1 */
  --text-muted: #64748b; /* dark: #94a3b8 */
  --border-light: #e2e8f0; /* dark: #334155 */
}`}
        </pre>
      </div>

    </AdminNeonCard>
  )
}
