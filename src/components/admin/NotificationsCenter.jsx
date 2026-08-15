import React, { useState } from 'react'
import { Bell, Send, Mail, MessageSquare, CheckCircle2 } from 'lucide-react'
import AdminNeonCard from '../common/AdminNeonCard'
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
    <AdminNeonCard className="p-6 space-y-6 text-[#F9FAFB]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#374151] pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#F9FAFB] font-['Space_Grotesk'] flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#E5FF00]" /> Hospital Broadcast & Notification Center
          </h2>
          <p className="text-xs text-[#9CA3AF]">Send hospital-wide announcements, SMS alerts, and appointment email reminders.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{ background: '#E5FF00', color: '#0B0F19', boxShadow: '0 0 15px rgba(229, 255, 0, 0.45)' }}
          className="font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
        >
          <Send className="w-4 h-4 text-[#0B0F19]" />
          <span>Send Broadcast Message</span>
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map(b => (
          <div key={b.id} className="p-5 rounded-2xl bg-[#111827] border border-[#374151] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#E5FF00] text-sm">{b.title}</span>
              <span className="text-[10px] text-[#9CA3AF] font-mono">{b.sentAt}</span>
            </div>
            <p className="text-xs text-[#F9FAFB]">{b.message}</p>
            <div className="flex items-center space-x-3 text-[10px] text-[#9CA3AF] pt-1">
              <span>Channel: <strong className="text-[#22C55E]">{b.channel || 'System Notification'}</strong></span>
              <span>•</span>
              <span>Audience: <strong className="text-[#3B82F6]">{b.targetRole || 'All Users'}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1F2937] rounded-3xl border border-[#374151] p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-[#F9FAFB] font-['Space_Grotesk'] border-b border-[#374151] pb-3">
              Send System Broadcast Message
            </h3>
            
            <form onSubmit={handleSendBroadcastSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Announcement Title</label>
                <input
                  type="text"
                  value={newMsg.title}
                  onChange={(e) => setNewMsg({...newMsg, title: e.target.value})}
                  placeholder="e.g. Free Eye Checkup Camp Tomorrow"
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E5FF00]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#9CA3AF] block mb-1">Message Content</label>
                <textarea
                  value={newMsg.message}
                  onChange={(e) => setNewMsg({...newMsg, message: e.target.value})}
                  className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl p-3 text-white h-24 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#9CA3AF] block mb-1">Channel</label>
                  <select
                    value={newMsg.channel}
                    onChange={(e) => setNewMsg({...newMsg, channel: e.target.value})}
                    className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Email & Push">Email & Push</option>
                    <option value="SMS Broadcast">SMS Broadcast</option>
                    <option value="In-App Banner">In-App Banner</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#9CA3AF] block mb-1">Target Audience</label>
                  <select
                    value={newMsg.targetRole}
                    onChange={(e) => setNewMsg({...newMsg, targetRole: e.target.value})}
                    className="w-full bg-[#0B0F19] border border-[#374151] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="All Users">All Users</option>
                    <option value="Patients">Patients Only</option>
                    <option value="Doctors">Doctors Only</option>
                  </select>
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
