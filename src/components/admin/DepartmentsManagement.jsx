import React, { useState } from 'react'
import { Building2, Plus, Users, Stethoscope, CheckCircle2, AlertCircle } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import toast from 'react-hot-toast'

export default function DepartmentsManagement({ departments = [], doctors = [], onAddDepartment, onToggleDepartmentStatus }) {
  const [showModal, setShowModal] = useState(false)
  const [newDept, setNewDept] = useState({ name: '', headDoctor: 'Dr. Robert Ford', staffCount: '15', bedsCount: '20' })

  const handleCreateDepartment = (e) => {
    e.preventDefault()
    if (!newDept.name.trim()) return

    const created = {
      id: `dept-${Date.now()}`,
      name: newDept.name,
      headDoctor: newDept.headDoctor,
      staffCount: parseInt(newDept.staffCount, 10),
      bedsCount: parseInt(newDept.bedsCount, 10),
      status: 'Active'
    }

    if (onAddDepartment) {
      onAddDepartment(created)
    }
    toast.success(`Department ${created.name} initialized!`)
    setShowModal(false)
    setNewDept({ name: '', headDoctor: 'Dr. Robert Ford', staffCount: '15', bedsCount: '20' })
  }

  const toggleDeptStatus = (id, currentStatus, deptName) => {
    if (onToggleDepartmentStatus) {
      onToggleDepartmentStatus(id)
    }
    const nextStatus = currentStatus === 'Active' ? 'Maintenance' : 'Active'
    toast.success(`Department ${deptName} set to ${nextStatus}`)
  }

  return (
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#E5FF00]" /> Hospital Department Management
          </h2>
          <p className="text-xs text-[#9CA3AF]">Create medical departments, assign HOD doctors, and track staff allocations.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{ background: '#E5FF00', color: '#0B0F19', boxShadow: '0 0 15px rgba(229, 255, 0, 0.45)' }}
          className="font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4 text-[#0B0F19]" />
          <span>Create Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => (
          <div key={dept.id} className="p-5 rounded-2xl bg-[#111827] border border-[#374151] space-y-4 hover:border-[#E5FF00]/40 transition-all">
            <div className="flex items-center justify-between border-b border-[#374151] pb-3">
              <h3 className="font-extrabold text-base text-[#F9FAFB] font-['Space_Grotesk']">{dept.name}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                dept.status === 'Active' ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30' : 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
              }`}>
                {dept.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-[#9CA3AF]">
              <p className="flex justify-between"><span>Head of Department:</span> <strong className="text-[#E5FF00]">{dept.headDoctor}</strong></p>
              <p className="flex justify-between"><span>Assigned Medical Staff:</span> <strong className="text-[#F9FAFB]">{dept.staffCount} Members</strong></p>
              <p className="flex justify-between"><span>Ward Bed Allocation:</span> <strong className="text-[#F9FAFB]">{dept.bedsCount} Beds</strong></p>
            </div>

            <button
              onClick={() => toggleDeptStatus(dept.id, dept.status, dept.name)}
              className="w-full py-2 rounded-xl bg-[#0B0F19] hover:bg-[#111827] text-[#9CA3AF] hover:text-[#E5FF00] font-bold border border-[#374151] text-xs transition-colors"
            >
              Toggle Status ({dept.status})
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1F2937] rounded-3xl border border-[#374151] p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-[#F9FAFB] font-['Space_Grotesk'] border-b border-[#374151] pb-3">
              Create Hospital Medical Department
            </h3>
            
            <form onSubmit={handleCreateDepartment} className="space-y-3">
              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Department Name</label>
                <input
                  type="text"
                  value={newDept.name}
                  onChange={(e) => setNewDept({...newDept, name: e.target.value})}
                  placeholder="e.g. Dermatology & ENT"
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5FF00]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Assigned HOD Doctor</label>
                <input
                  type="text"
                  value={newDept.headDoctor}
                  onChange={(e) => setNewDept({...newDept, headDoctor: e.target.value})}
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#9CA3AF] block mb-1">Staff Members</label>
                  <input
                    type="number"
                    value={newDept.staffCount}
                    onChange={(e) => setNewDept({...newDept, staffCount: e.target.value})}
                    className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#9CA3AF] block mb-1">Beds Allocated</label>
                  <input
                    type="number"
                    value={newDept.bedsCount}
                    onChange={(e) => setNewDept({...newDept, bedsCount: e.target.value})}
                    className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  />
                </div>
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
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminNeonCard>
  )
}
