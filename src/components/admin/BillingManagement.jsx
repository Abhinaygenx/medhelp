import React, { useState } from 'react'
import { CreditCard, Search, Plus, Download, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import toast from 'react-hot-toast'

export default function BillingManagement({ bills = [], onGenerateBill, onMarkBillPaid }) {
  const [showModal, setShowModal] = useState(false)
  const [newBill, setNewBill] = useState({ patientName: '', service: 'General OPD Consultation', amount: '150.0' })

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

  const downloadInvoice = (id) => {
    toast.success(`Downloading PDF Invoice #${id}...`)
  }

  return (
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#E5FF00]" /> Billing, Payments & Insurance Claims
          </h2>
          <p className="text-xs text-[#9CA3AF]">Generate patient invoices, track claim settlements, and export financial PDFs.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{ background: '#E5FF00', color: '#0B0F19', boxShadow: '0 0 15px rgba(229, 255, 0, 0.45)' }}
          className="font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4 text-[#0B0F19]" />
          <span>Generate New Invoice</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#111827] text-[#9CA3AF] uppercase font-semibold border-y border-[#374151]">
            <tr>
              <th className="py-3.5 px-4">Invoice ID & Date</th>
              <th className="py-3.5 px-4">Patient Name</th>
              <th className="py-3.5 px-4">Service Rendered</th>
              <th className="py-3.5 px-4">Amount ($)</th>
              <th className="py-3.5 px-4">Payment Status</th>
              <th className="py-3.5 px-4 text-right">Invoice Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#374151] text-[#9CA3AF]">
            {bills.map(bill => (
              <tr key={bill.id} className="hover:bg-[#111827]/60 transition-colors">
                <td className="py-4 px-4 font-bold text-[#E5FF00]">
                  <p>#{bill.id}</p>
                  <span className="text-[10px] text-[#9CA3AF] font-mono">{bill.date}</span>
                </td>
                <td className="py-4 px-4 font-bold text-[#F9FAFB]">{bill.patientName}</td>
                <td className="py-4 px-4 text-[#9CA3AF]">{bill.service}</td>
                <td className="py-4 px-4 font-extrabold text-[#E5FF00]">${bill.amount}</td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    bill.status === 'Paid' ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30' : 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
                  }`}>
                    {bill.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right space-x-2">
                  {bill.status === 'Pending' && (
                    <button
                      onClick={() => markPaid(bill.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#22C55E] text-[#0B0F19] font-bold"
                    >
                      Mark Paid
                    </button>
                  )}
                  <button
                    onClick={() => downloadInvoice(bill.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#0B0F19] hover:bg-[#111827] text-[#E5FF00] font-bold border border-[#374151] inline-flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1F2937] rounded-3xl border border-[#374151] p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-[#F9FAFB] font-['Space_Grotesk'] border-b border-[#374151] pb-3">
              Generate Patient Medical Invoice
            </h3>
            
            <form onSubmit={handleGenerateBillSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Patient Name</label>
                <input
                  type="text"
                  value={newBill.patientName}
                  onChange={(e) => setNewBill({...newBill, patientName: e.target.value})}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5FF00]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Service Rendered</label>
                <input
                  type="text"
                  value={newBill.service}
                  onChange={(e) => setNewBill({...newBill, service: e.target.value})}
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Total Bill Amount ($)</label>
                <input
                  type="number"
                  value={newBill.amount}
                  onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl bg-[#111827] text-[#9CA3AF] font-bold">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ background: '#E5FF00', color: '#0B0F19' }}
                  className="font-extrabold px-4 py-2 rounded-xl"
                >
                  Generate & Send Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminNeonCard>
  )
}
