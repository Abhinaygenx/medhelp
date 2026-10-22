import React from 'react'
import { Printer, Download, X, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { CLIENT } from '../../config/clientConfig'

export default function InvoiceModal({ bill, onClose }) {
  if (!bill) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
      >
        {/* Modal Toolbar (hidden when printing) */}
        <div 
          className="px-6 py-4 flex items-center justify-between border-b print:hidden"
          style={{ borderColor: 'var(--border-light)', background: 'var(--surface-page)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-600)]">
              Tax Invoice & Receipt
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)]">#{bill.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              style={{ background: 'var(--brand-600)', color: '#ffffff' }}
            >
              <Printer size={14} />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl transition-colors cursor-pointer"
              style={{ color: 'var(--text-muted)', background: 'var(--surface-card)' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document Body */}
        <div className="p-8 space-y-6 text-[var(--text-primary)] printable-area" id="invoice-doc">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b pb-6"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--brand-600)', color: '#ffffff' }}
                >
                  <ShieldCheck size={18} />
                </div>
                <h2 className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  {CLIENT.name}
                </h2>
              </div>
              <p className="text-xs mt-1 text-[var(--text-muted)] max-w-xs">
                {CLIENT.address}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Tel: {CLIENT.phone} • {CLIENT.email}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-2xl font-black text-[var(--brand-600)]">INVOICE</span>
              <p className="text-xs font-mono font-bold mt-1">Invoice ID: #{bill.id}</p>
              <p className="text-xs text-[var(--text-muted)]">Date: {bill.date || new Date().toLocaleDateString()}</p>
              <div className="mt-2 inline-block">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                  bill.status === 'Paid' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {bill.status === 'Paid' ? 'PAID IN FULL' : 'PAYMENT PENDING'}
                </span>
              </div>
            </div>
          </div>

          {/* Billed To */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase text-[var(--text-muted)]">Billed To (Patient):</span>
              <p className="font-bold text-sm text-[var(--text-primary)] mt-0.5">{bill.patientName || 'Eleanor Vance'}</p>
              <p className="text-[var(--text-muted)]">Medical Record ID: PAT-{bill.id?.slice(-4) || '1042'}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-[var(--text-muted)]">Department / Facility:</span>
              <p className="font-semibold text-xs text-[var(--text-primary)] mt-0.5">Outpatient Department (OPD)</p>
              <p className="text-[var(--text-muted)]">Attending Physician on file</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border-light)' }}>
            <table className="w-full text-left text-xs">
              <thead style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }}>
                <tr>
                  <th className="py-3 px-4 font-semibold uppercase text-[10px]">Description</th>
                  <th className="py-3 px-4 font-semibold uppercase text-[10px] text-center">Qty</th>
                  <th className="py-3 px-4 font-semibold uppercase text-[10px] text-right">Unit Price</th>
                  <th className="py-3 px-4 font-semibold uppercase text-[10px] text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
                <tr>
                  <td className="py-3.5 px-4 font-medium">
                    {bill.service || 'Specialist Consultation & Digital Prescription'}
                  </td>
                  <td className="py-3.5 px-4 text-center">1</td>
                  <td className="py-3.5 px-4 text-right">${bill.amount}</td>
                  <td className="py-3.5 px-4 text-right font-bold">${bill.amount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals Calculation */}
          <div className="flex justify-end pt-2 text-xs">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Subtotal:</span>
                <span>${bill.amount}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Tax / Facility Surcharge (0%):</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between pt-2 border-t font-black text-sm text-[var(--text-primary)]"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <span>Total Amount Due:</span>
                <span className="text-[var(--brand-600)]">${bill.amount}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="pt-4 border-t text-[11px] text-[var(--text-muted)] space-y-1"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <p className="font-semibold text-[var(--text-secondary)]">Payment Terms & Instructions:</p>
            <p>Direct electronic billing. For insurance claim submissions, this serves as an official clinical charge voucher under HIPAA guidelines.</p>
            <p>© {new Date().getFullYear()} {CLIENT.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
