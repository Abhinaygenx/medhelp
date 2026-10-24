import React, { useState } from 'react'
import { Bell, Send, Mail, MessageSquare } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
import { Badge } from '../common/Badge'
import toast from 'react-hot-toast'

export default function NotificationsCenter({ notifications = [], onSendBroadcast }) {
  const [showModal, setShowModal] = useState(false)
  const [newMsg, setNewMsg] = useState({ title: '', message: '', targetRole: 'All Users', channel: 'Email & SMS' })

  const handleSendBroadcastSubmit = (e) => {
    e.preventDefault()
    if (!newMsg.title.trim()) return

    const created = {
      id: `b-${Date.now().toString().slice(-3)}`,
      title: newMsg.title,
      message: newMsg.message,
      channel: newMsg.channel,
      targetRole: newMsg.targetRole,
      sentAt: new Date().toLocaleString()
    }

    if (onSendBroadcast) {
      onSendBroadcast(created)
    }
    toast.success(`Broadcast message "${created.title}" dispatched via ${created.channel}!`)
    setShowModal(false)
    setNewMsg({ title: '', message: '', targetRole: 'All Users', channel: 'Email & SMS' })
  }

  return (
    <AdminNeonCard className="p-6 space-y-6" style={{ color: 'var(--text-primary)' }}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Bell className="w-5 h-5 text-[var(--brand-600)]" /> Hospital Broadcast & Notification Center
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Send hospital-wide announcements, SMS alerts, and appointment email reminders.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm text-white hover:opacity-95"
          style={{ background: 'var(--brand-600)' }}
        >
          <Send className="w-4 h-4 text-white" />
          <span>Send Broadcast Message</span>
        </button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
            No broadcast notifications dispatched yet.
          </div>
        ) : (
          notifications.map(b => (
            <div 
              key={b.id} 
              className="p-5 rounded-2xl space-y-2.5 transition-all"
              style={{
                background: 'var(--surface-page)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{b.title}</span>
                <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{b.sentAt}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{b.message}</p>
              <div className="flex items-center space-x-2 text-[10px] pt-1">
                <Badge variant="brand" size="sm">Channel: {b.channel || 'System Notification'}</Badge>
                <Badge variant="default" size="sm">Audience: {b.targetRole || 'All Users'}</Badge>
              </div>
            </div>
          ))
        )}
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
              Send System Broadcast Message
            </h3>
            
            <form onSubmit={handleSendBroadcastSubmit} className="space-y-3">
              <div>
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Announcement Title</label>
                <input
                  type="text"
                  value={newMsg.title}
                  onChange={(e) => setNewMsg({...newMsg, title: e.target.value})}
                  placeholder="e.g. Free Eye Checkup Camp Tomorrow"
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
                <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Message Content</label>
                <textarea
                  value={newMsg.message}
                  onChange={(e) => setNewMsg({...newMsg, message: e.target.value})}
                  className="w-full rounded-xl p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
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
                  <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Channel</label>
                  <select
                    value={newMsg.channel}
                    onChange={(e) => setNewMsg({...newMsg, channel: e.target.value})}
                    className="w-full rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-page)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="Email & Push">Email & Push</option>
                    <option value="SMS Broadcast">SMS Broadcast</option>
                    <option value="In-App Banner">In-App Banner</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1" style={{ color: 'var(--text-secondary)' }}>Target Audience</label>
                  <select
                    value={newMsg.targetRole}
                    onChange={(e) => setNewMsg({...newMsg, targetRole: e.target.value})}
                    className="w-full rounded-xl px-3 py-2"
                    style={{
                      background: 'var(--surface-page)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="All Users">All Users</option>
                    <option value="Patients">Patients Only</option>
                    <option value="Doctors">Doctors Only</option>
                  </select>
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
                  Dispatch Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminNeonCard>
  )
}
