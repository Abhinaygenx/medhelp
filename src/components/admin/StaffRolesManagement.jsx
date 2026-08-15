import React, { useState } from 'react'
import { UserCheck, Plus, ShieldCheck, Lock, UserPlus } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
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
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#E5FF00]" /> Hospital Staff & Access Control Matrix
          </h2>
          <p className="text-xs text-[#9CA3AF]">Manage hospital staff credentials, RBAC roles, and system permission bounds.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{ background: '#E5FF00', color: '#0B0F19', boxShadow: '0 0 15px rgba(229, 255, 0, 0.45)' }}
          className="font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
        >
          <UserPlus className="w-4 h-4 text-[#0B0F19]" />
          <span>Add Staff Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staffList.map(st => (
          <div key={st.id} className="p-4 rounded-2xl bg-[#111827] border border-[#374151] flex items-center justify-between">
            <div>
              <p className="font-bold text-[#F9FAFB] text-sm">{st.name}</p>
              <p className="text-xs text-[#E5FF00] font-semibold">{st.role} • {st.dept}</p>
              <p className="text-[10px] text-[#9CA3AF]">{st.email}</p>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30 text-[10px] font-bold">
              {st.access}
            </span>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1F2937] rounded-3xl border border-[#374151] p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-[#F9FAFB] font-['Space_Grotesk'] border-b border-[#374151] pb-3">
              Add Hospital Staff Member
            </h3>
            
            <form onSubmit={handleAddStaffSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Staff Member Name</label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  placeholder="e.g. Nurse Sarah Connor"
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5FF00]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Email Address</label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                  placeholder="e.g. s.connor@apollo.org"
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Assigned RBAC Role</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                >
                  <option value="Nurse">Nurse</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Lab Tech">Lab Tech</option>
                  <option value="Hospital Staff">Hospital Staff</option>
                </select>
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
