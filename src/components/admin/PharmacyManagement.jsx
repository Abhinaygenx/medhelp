import React, { useState } from 'react'
import { Pill, Search, Plus, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import toast from 'react-hot-toast'

export default function PharmacyManagement({ medicines = [], onAddMedicine, onRestockMedicine }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [newMed, setNewMed] = useState({ name: '', category: 'Antibiotic', stock: '100', expiryDate: '2027-12-31', supplier: 'Global Pharma', price: '10.0' })

  const filtered = medicines.filter(m => 
    (m.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (m.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddMedicineSubmit = (e) => {
    e.preventDefault()
    if (!newMed.name.trim()) return

    const created = {
      id: `med-${Date.now().toString().slice(-4)}`,
      name: newMed.name,
      category: newMed.category,
      stock: parseInt(newMed.stock, 10) || 100,
      expiryDate: newMed.expiryDate,
      supplier: newMed.supplier,
      price: parseFloat(newMed.price) || 10.0
    }

    if (onAddMedicine) {
      onAddMedicine(created)
    }
    toast.success(`Medicine ${created.name} added to pharmacy vault!`)
    setShowModal(false)
    setNewMed({ name: '', category: 'Antibiotic', stock: '100', expiryDate: '2027-12-31', supplier: 'Global Pharma', price: '10.0' })
  }

  const handleRestock = (id) => {
    if (onRestockMedicine) {
      onRestockMedicine(id, 200)
    }
    toast.success(`Restocked +200 units of medicine`)
  }

  return (
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <Pill className="w-5 h-5 text-[#E5FF00]" /> Pharmacy & Medicine Inventory Control
          </h2>
          <p className="text-xs text-[#9CA3AF]">Monitor pharmaceutical stock levels, expiry tracking, and restock orders.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{ background: '#E5FF00', color: '#0B0F19', boxShadow: '0 0 15px rgba(229, 255, 0, 0.45)' }}
          className="font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4 text-[#0B0F19]" />
          <span>Add New Medicine</span>
        </button>
      </div>

      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Medicine Name or Category..."
          className="w-full bg-[#0B0F19] border border-[#374151] rounded-2xl pl-10 pr-4 py-2 text-xs text-[#F9FAFB] focus:outline-none focus:border-[#E5FF00]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#111827] text-[#9CA3AF] uppercase font-semibold border-y border-[#374151]">
            <tr>
              <th className="py-3.5 px-4">Medicine Name & ID</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Stock Quantity</th>
              <th className="py-3.5 px-4">Expiry Date</th>
              <th className="py-3.5 px-4">Supplier</th>
              <th className="py-3.5 px-4 text-right">Restock Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#374151] text-[#9CA3AF]">
            {filtered.map(med => (
              <tr key={med.id} className="hover:bg-[#111827]/60 transition-colors">
                <td className="py-4 px-4 font-bold text-[#F9FAFB]">
                  <p>{med.name}</p>
                  <span className="text-[10px] text-[#E5FF00] font-mono">{med.id} • ${med.price}</span>
                </td>
                <td className="py-4 px-4 font-semibold text-[#F9FAFB]">{med.category}</td>
                <td className="py-4 px-4 font-bold">
                  {med.stock < 50 ? (
                    <span className="text-[#EF4444] bg-[#EF4444]/15 px-2.5 py-1 rounded-full border border-[#EF4444]/30 flex items-center gap-1 w-fit animate-pulse">
                      <AlertTriangle className="w-3 h-3 text-[#EF4444]" />
                      Low Stock ({med.stock} units)
                    </span>
                  ) : (
                    <span className="text-[#22C55E]">{med.stock} units</span>
                  )}
                </td>
                <td className="py-4 px-4 text-[#9CA3AF]">{med.expiryDate}</td>
                <td className="py-4 px-4 text-[#9CA3AF]">{med.supplier}</td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => handleRestock(med.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#0B0F19] hover:bg-[#111827] text-[#E5FF00] font-bold border border-[#374151]"
                  >
                    + Restock 200 Units
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
              Add New Medicine to Inventory
            </h3>
            
            <form onSubmit={handleAddMedicineSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Medicine Name & Dosage</label>
                <input
                  type="text"
                  value={newMed.name}
                  onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                  placeholder="e.g. Ciprofloxacin 500mg"
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5FF00]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#9CA3AF] block mb-1">Category</label>
                  <input
                    type="text"
                    value={newMed.category}
                    onChange={(e) => setNewMed({...newMed, category: e.target.value})}
                    className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#9CA3AF] block mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={newMed.price}
                    onChange={(e) => setNewMed({...newMed, price: e.target.value})}
                    className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#9CA3AF] block mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={newMed.stock}
                    onChange={(e) => setNewMed({...newMed, stock: e.target.value})}
                    className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#9CA3AF] block mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={newMed.expiryDate}
                    onChange={(e) => setNewMed({...newMed, expiryDate: e.target.value})}
                    className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Supplier Company</label>
                <input
                  type="text"
                  value={newMed.supplier}
                  onChange={(e) => setNewMed({...newMed, supplier: e.target.value})}
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
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
                  Save Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminNeonCard>
  )
}
