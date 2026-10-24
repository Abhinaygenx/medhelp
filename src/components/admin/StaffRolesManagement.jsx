import React, { useState } from 'react'
import { UserCheck, Plus, ShieldCheck, UserPlus } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
import toast from 'react-hot-toast'

export default function StaffRolesManagement({ staffList = [], onAddStaff }) {
  const [showModal, setShowModal] = useState(false)
  const [newStaff, setNewStaff] = useState({ name: '', role: 'Nurse', dept: 'General Ward', email: '' })

  const handleAddStaffSubmit = (e) => {
    e.preventDefault()
    if (!newStaff.name.trim()) return

    const created = {
      id: `st-${Date.now().toString().slice(-3)}`,
      name: newStaff.name,
      role: newStaff.role,
      dept: newNewDept(newStaff.role),
      email: newStaff.email || `${newStaff.name.toLowerCase().replace(/\s+/g, '.')}@apollo.org`,
      access: 'Role Scoped'
    }

    if (onAddStaff) {
      onAddStaff(created)
    }
    toast.success(`Staff member ${created.name} added as ${created.role}!`)
    setShowModal(false)
    setNewStaff({ name: '', role: 'Nurse', dept: 'General Ward', email: '' })
  }

  const newNewDept = (role) => {
    if (role === 'Nurse') return 'General Ward'
    if (role === 'Pharmacist') return 'Pharmacy'
    if (role === 'Lab Tech') return 'Diagnostic Lab'
    return 'Administration'
  }

  return (
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <UserCheck className="w-5 h-5 text-[var(--brand-600)]" /> Hospital Staff & Access Control Matrix
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Manage hospital staff credentials, RBAC roles, and system permission bounds.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm text-white hover:opacity-95"
          style={{ background: 'var(--brand-600)' }}
        >
          <UserPlus className="w-4 h-4 text-white" />
          <span>Add Staff Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staffList.map(st => (
          <div 
            key={st.id} 
            className="p-4 rounded-2xl flex items-center justify-between transition-all"
            style={{
              background: 'var(--surface-page)',
              border: '1px solid var(--border-light)'
            }}
          >
            <div>
              <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{st.name}</p>
              <p className="text-xs font-semibold text-[var(--brand-600)]">{st.role} • {st.dept}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{st.email}</p>
            </div>

            <Badge variant="brand" size="sm">
              {st.access}
            </Badge>
          </div>
        ))}
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
              Add Hospital Staff Member
            </h3>
            
            <form onSubmit={handleAddStaffSubmit} className="space-y-3">
              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Staff Member Name</label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  placeholder="e.g. Nurse Sarah Connor"
                  className="w-full rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  required
                />
              </div>

              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                  placeholder="e.g. s.connor@apollo.org"
                  className="w-full rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                  required
                />
              </div>

              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Assigned RBAC Role</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                  className="w-full rounded-xl px-3 py-2"
                  style={{
                    background: 'var(--surface-page)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="Nurse">Nurse</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Lab Tech">Lab Tech</option>
                  <option value="Hospital Staff">Hospital Staff</option>
                </select>
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
                  Save Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminNeonCard>
  )
}
