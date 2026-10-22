import React, { useState } from 'react'
import { CreditCard, Search, Plus, Download, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import InvoiceModal from '../common/InvoiceModal'
import { Badge } from '../common/Badge'
import toast from 'react-hot-toast'

export default function BillingManagement({ bills = [], onGenerateBill, onMarkBillPaid }) {
  const [showModal, setShowModal] = useState(false)
  const [activeInvoice, setActiveInvoice] = useState(null)
  const [newBill, setNewBill] = useState({ patientName: '', service: 'General OPD Consultation', amount: '150.0' })
  const [searchTerm, setSearchTerm] = useState('')

  const handleGenerateBillSubmit = (e) => {
    e.preventDefault()
    if (!newBill.patientName.trim()) return

    const created = {
      id: `inv-${Date.now().toString().slice(-4)}`,
      patientName: newBill.patientName,
      service: newBill.service,
      amount: parseFloat(newBill.amount) || 150.0,
      status: 'Pending',
      date: new Date().toLocaleDateString(),
      insuranceClaimed: false
    }

    if (onGenerateBill) {
      onGenerateBill(created)
    }
    toast.success(`Invoice #${created.id} generated for $${created.amount}!`)
    setShowModal(false)
    setNewBill({ patientName: '', service: 'General OPD Consultation', amount: '150.0' })
  }

  const markPaid = (id) => {
    if (onMarkBillPaid) {
      onMarkBillPaid(id)
    }
    toast.success(`Invoice #${id} marked as PAID!`)
  }

  const filteredBills = bills.filter(b => 
    b.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.service?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <AdminNeonCard className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
          style={{ borderColor: 'var(--border-light)' }}
        >
          <div>
            <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <CreditCard className="w-5 h-5 text-[var(--brand-600)]" /> Billing, Payments & Insurance Claims
            </h2>
            <p className="text-xs text-[var(--text-muted)]">Generate patient invoices, track claim settlements, and export financial PDFs.</p>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
            style={{ background: 'var(--brand-600)', color: '#ffffff', boxShadow: 'var(--shadow-sm)' }}
          >
            <Plus className="w-4 h-4" />
            <span>Generate New Invoice</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]" />
            <input
              type="text"
              placeholder="Search by invoice #, patient, or service..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
              style={{
                background: 'var(--surface-page)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
          <span className="text-xs font-semibold text-[var(--text-muted)]">
            Total Invoices: {filteredBills.length}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--border-light)' }}>
          <table className="w-full text-left text-xs">
            <thead style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }} className="uppercase font-semibold border-b">
              <tr>
                <th className="py-3.5 px-4">Invoice ID & Date</th>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Service Rendered</th>
                <th className="py-3.5 px-4">Amount ($)</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4 text-right">Invoice Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
              {filteredBills.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-[var(--text-muted)]">
                    No matching invoices found.
                  </td>
                </tr>
              ) : (
                filteredBills.map(bill => (
                  <tr key={bill.id} className="hover:bg-[var(--brand-50)] transition-colors">
                    <td className="py-4 px-4 font-bold text-[var(--brand-600)]">
                      <p>#{bill.id}</p>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">{bill.date}</span>
                    </td>
                    <td className="py-4 px-4 font-bold" style={{ color: 'var(--text-primary)' }}>{bill.patientName}</td>
                    <td className="py-4 px-4 text-[var(--text-secondary)]">{bill.service}</td>
                    <td className="py-4 px-4 font-extrabold text-[var(--brand-600)]">${bill.amount}</td>
                    <td className="py-4 px-4">
                      <Badge variant={bill.status === 'Paid' ? 'success' : 'warning'} size="sm">
                        {bill.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      {bill.status === 'Pending' && (
                        <button
                          onClick={() => markPaid(bill.id)}
                          className="px-3 py-1.5 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 font-bold transition-all cursor-pointer"
                        >
                          Mark Paid
                        </button>
                      )}
                      <button
                        onClick={() => setActiveInvoice(bill)}
                        className="px-3 py-1.5 rounded-xl font-bold border inline-flex items-center space-x-1.5 transition-all cursor-pointer"
                        style={{
                          background: 'var(--surface-page)',
                          color: 'var(--brand-700)',
                          borderColor: 'var(--border-light)'
                        }}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View / PDF</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminNeonCard>

      {/* Invoice View / Print PDF Modal */}
      {activeInvoice && (
        <InvoiceModal bill={activeInvoice} onClose={() => setActiveInvoice(null)} />
      )}

      {/* Generate New Bill Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl"
            style={{ background: 'var(--surface-card)', border: '1px solid var(--border-light)' }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
              <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Generate Patient Invoice</h3>
              <button onClick={() => setShowModal(false)} className="text-[var(--text-muted)] hover:opacity-75">✕</button>
            </div>

            <form onSubmit={handleGenerateBillSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={newBill.patientName}
                  onChange={e => setNewBill({ ...newBill, patientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Service Description</label>
                <select
                  value={newBill.service}
                  onChange={e => setNewBill({ ...newBill, service: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="General OPD Consultation">General OPD Consultation ($150)</option>
                  <option value="Cardiology ECG & Review">Cardiology ECG & Review ($280)</option>
                  <option value="Pathology Comprehensive Lab Panel">Pathology Comprehensive Lab Panel ($95)</option>
                  <option value="Radiology Chest X-Ray">Radiology Chest X-Ray ($140)</option>
                  <option value="Emergency Care SLA Triage">Emergency Care SLA Triage ($450)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1" style={{ color: 'var(--text-secondary)' }}>Amount ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newBill.amount}
                  onChange={e => setNewBill({ ...newBill, amount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl font-semibold cursor-pointer"
                  style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold cursor-pointer transition-all"
                  style={{ background: 'var(--brand-600)', color: '#ffffff' }}
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
