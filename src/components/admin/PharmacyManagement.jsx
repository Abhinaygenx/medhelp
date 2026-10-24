import React, { useState } from 'react'
import { Pill, Search, Plus, AlertTriangle, CheckCircle2 } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
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
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Pill className="w-5 h-5 text-[var(--brand-600)]" /> Pharmacy & Medicine Inventory Control
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Monitor pharmaceutical stock levels, expiry tracking, and restock orders.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm text-white hover:opacity-95"
          style={{ background: 'var(--brand-600)' }}
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add New Medicine</span>
        </button>
      </div>

      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Medicine Name or Category..."
          className="w-full rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
          style={{
            background: 'var(--surface-page)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-primary)'
          }}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--border-light)' }}>
        <table className="w-full text-left text-xs">
          <thead style={{ background: 'var(--surface-page)', color: 'var(--text-muted)' }} className="uppercase font-semibold border-b">
            <tr>
              <th className="py-3.5 px-4">Medicine Name & ID</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Stock Quantity</th>
              <th className="py-3.5 px-4">Expiry Date</th>
              <th className="py-3.5 px-4">Supplier</th>
              <th className="py-3.5 px-4 text-right">Restock Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
            {filtered.map(med => (
              <tr key={med.id} className="hover:bg-[var(--brand-50)] transition-colors">
                <td className="py-4 px-4 font-bold" style={{ color: 'var(--text-primary)' }}>
                  <p>{med.name}</p>
                  <span className="text-[10px] text-[var(--brand-600)] font-mono">{med.id} • ${med.price}</span>
                </td>
                <td className="py-4 px-4 font-semibold" style={{ color: 'var(--text-secondary)' }}>{med.category}</td>
                <td className="py-4 px-4 font-bold">
                  {med.stock < 50 ? (
                    <Badge variant="danger" size="sm">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Low Stock ({med.stock} units)
                    </Badge>
                  ) : (
                    <Badge variant="success" size="sm">
                      {med.stock} units
                    </Badge>
                  )}
                </td>
                <td className="py-4 px-4" style={{ color: 'var(--text-muted)' }}>{med.expiryDate}</td>
                <td className="py-4 px-4" style={{ color: 'var(--text-secondary)' }}>{med.supplier}</td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => handleRestock(med.id)}
                    className="px-3 py-1.5 rounded-xl font-bold border text-xs cursor-pointer transition-all hover:bg-[var(--neutral-100)]"
                    style={{
                      background: 'var(--surface-page)',
                      color: 'var(--brand-600)',
                      borderColor: 'var(--border-light)'
                    }}
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
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="rounded-2xl p-6 max-w-md w-full space-y-4 text-xs shadow-xl"
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border-light)'
            }}
          >
            <h3 
              className="font-extrabold text-base border-b pb-3"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-light)' }}
            >
              Add New Medicine to Inventory
            </h3>
            
            <form onSubmit={handleAddMedicineSubmit} className="space-y-3">
              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Medicine Name & Dosage</label>
                <input
                  type="text"
                  value={newMed.name}
                  onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                  placeholder="e.g. Ciprofloxacin 500mg"
                  className="w-full rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Category</label>
                  <input
                    type="text"
                    value={newMed.category}
                    onChange={(e) => setNewMed({...newMed, category: e.target.value})}
                    className="w-full rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-page)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Price ($)</label>
                  <input
                    type="number"
                    value={newMed.price}
                    onChange={(e) => setNewMed({...newMed, price: e.target.value})}
                    className="w-full rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-page)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Initial Stock</label>
                  <input
                    type="number"
                    value={newMed.stock}
                    onChange={(e) => setNewMed({...newMed, stock: e.target.value})}
                    className="w-full rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-page)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Expiry Date</label>
                  <input
                    type="date"
                    value={newMed.expiryDate}
                    onChange={(e) => setNewMed({...newMed, expiryDate: e.target.value})}
                    className="w-full rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-page)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Supplier Company</label>
                <input
                  type="text"
                  value={newMed.supplier}
                  onChange={(e) => setNewMed({...newMed, supplier: e.target.value})}
                  className="w-full rounded-xl px-3 py-2"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="px-4 py-2 rounded-xl font-bold border cursor-pointer hover:bg-[var(--neutral-100)]"
                  style={{
                    background: 'var(--surface-page)',
                    color: 'var(--text-muted)',
                    borderColor: 'var(--border-light)'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="font-bold px-4 py-2 rounded-xl text-white shadow-sm cursor-pointer hover:opacity-95"
                  style={{ background: 'var(--brand-600)' }}
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
