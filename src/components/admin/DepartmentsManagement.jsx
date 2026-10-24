import React, { useState } from 'react'
import { Building2, Plus, Users, Stethoscope } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
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
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Building2 className="w-5 h-5 text-[var(--brand-600)]" /> Hospital Department Management
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Create medical departments, assign HOD doctors, and track staff allocations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm text-white hover:opacity-95"
          style={{ background: 'var(--brand-600)' }}
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Create Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => (
          <div 
            key={dept.id} 
            className="p-5 rounded-2xl space-y-4 transition-all"
            style={{
              background: 'var(--surface-page)',
              border: '1px solid var(--border-light)'
            }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-light)' }}>
              <h3 className="font-extrabold text-base" style={{ color: 'var(--text-primary)' }}>{dept.name}</h3>
              <Badge variant={dept.status === 'Active' ? 'success' : 'warning'} size="sm">
                {dept.status}
              </Badge>
            </div>

            <div className="space-y-2 text-xs">
              <p className="flex justify-between" style={{ color: 'var(--text-muted)' }}>
                <span>Head of Department:</span> <strong className="text-[var(--brand-600)] font-bold">{dept.headDoctor}</strong>
              </p>
              <p className="flex justify-between" style={{ color: 'var(--text-muted)' }}>
                <span>Assigned Medical Staff:</span> <strong style={{ color: 'var(--text-primary)' }}>{dept.staffCount} Members</strong>
              </p>
              <p className="flex justify-between" style={{ color: 'var(--text-muted)' }}>
                <span>Ward Bed Allocation:</span> <strong style={{ color: 'var(--text-primary)' }}>{dept.bedsCount} Beds</strong>
              </p>
            </div>

            <button
              onClick={() => toggleDeptStatus(dept.id, dept.status, dept.name)}
              className="w-full py-2 rounded-xl font-bold border text-xs cursor-pointer transition-all hover:bg-[var(--neutral-100)]"
              style={{
                background: 'var(--surface-card)',
                color: 'var(--text-secondary)',
                borderColor: 'var(--border-light)'
              }}
            >
              Toggle Status ({dept.status})
            </button>
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
              Create Hospital Medical Department
            </h3>
            
            <form onSubmit={handleCreateDepartment} className="space-y-3">
              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Department Name</label>
                <input
                  type="text"
                  value={newDept.name}
                  onChange={(e) => setNewDept({...newDept, name: e.target.value})}
                  placeholder="e.g. Dermatology & ENT"
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
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Assigned HOD Doctor</label>
                <input
                  type="text"
                  value={newDept.headDoctor}
                  onChange={(e) => setNewDept({...newDept, headDoctor: e.target.value})}
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
                  <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Staff Members</label>
                  <input
                    type="number"
                    value={newDept.staffCount}
                    onChange={(e) => setNewDept({...newDept, staffCount: e.target.value})}
                    className="w-full rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-page)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Beds Allocated</label>
                  <input
                    type="number"
                    value={newDept.bedsCount}
                    onChange={(e) => setNewDept({...newDept, bedsCount: e.target.value})}
                    className="w-full rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-page)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
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
