import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, User, Circle, Zap } from 'lucide-react'
import { loadData, saveData } from '../../services/storageService'
import { INITIAL_DOCTOR_MESSAGES } from '../../data/messages'
import toast from 'react-hot-toast'

export default function MessagesPanel() {
  const [conversations, setConversations] = useState(() => loadData('doctor_messages', INITIAL_DOCTOR_MESSAGES))
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || 'conv-1')
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef(null)

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0]

  // Auto-scroll chat to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConv.messages])

  // 1. Action: Send Message
  const handleSendMessage = (textToSend = inputText) => {
    const text = textToSend.trim()
    if (!text) return

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'doctor',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const updatedConversations = conversations.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          lastMessage: text,
          timestamp: 'Just now',
          unread: 0,
          messages: [...c.messages, newMsg]
        }
      }
      return c
    })

    setConversations(updatedConversations)
    saveData('doctor_messages', updatedConversations)
    setInputText('')
    toast.success('Message sent to patient!')
  }

  const quickReplies = [
    'Please upload your latest reports.',
    'Your appointment has been confirmed.',
    'Please continue the prescribed medication.',
    'Schedule a follow-up after 7 days.'
  ]

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl border border-[var(--border-light)] shadow-sm overflow-hidden h-[620px] flex flex-col md:flex-row animate-in fade-in duration-200 text-[var(--text-primary)]">
      
      {/* Left Conversations Sidebar */}
      <div className="w-full md:w-80 border-r border-[var(--border-light)] bg-[var(--surface-page)] flex flex-col shrink-0">
        <div className="p-4 border-b border-[var(--border-light)] flex items-center justify-between">
          <h2 className="font-extrabold text-[var(--text-primary)] text-sm font-['Space_Grotesk'] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-500" /> Patient Conversations
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold text-[10px]">
            {conversations.filter(c => c.unread > 0).length} Unread
          </span>
        </div>

        <div className="divide-y divide-[var(--border-light)] overflow-y-auto flex-1 custom-scrollbar">
          {conversations.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveConvId(c.id)}
              className={`w-full text-left p-3.5 flex items-start space-x-3 transition-colors ${
                activeConvId === c.id ? 'bg-[var(--surface-card)] border-l-4 border-blue-600 shadow-sm' : 'hover:bg-[var(--surface-card)]/50'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                {c.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xs text-[var(--text-primary)] truncate">{c.patientName}</p>
                  <span className="text-[10px] text-[var(--text-muted)] shrink-0">{c.timestamp}</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">{c.lastMessage}</p>
              </div>

              {c.unread > 0 && (
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Chat Viewport */}
      <div className="flex-1 flex flex-col bg-[var(--surface-page)]/40">
        
        {/* Active Chat Header */}
        <div className="p-4 border-b border-[var(--border-light)] flex items-center justify-between bg-[var(--surface-card)]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-500/20">
              {activeConv.avatar}
            </div>
            <div>
              <h3 className="font-bold text-xs text-[var(--text-primary)]">{activeConv.patientName}</h3>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" /> Patient Active Online
              </span>
            </div>
          </div>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar text-xs">
          {activeConv.messages.map((m) => (
            <div
              key={m.id || Math.random()}
              className={`flex flex-col ${m.sender === 'doctor' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-md p-3 rounded-2xl ${
                  m.sender === 'doctor' 
                    ? 'bg-blue-600 text-white rounded-br-none shadow-sm' 
                    : 'bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-light)] rounded-bl-none shadow-sm'
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] mt-1 px-1">{m.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies Bar */}
        <div className="px-4 py-2 bg-[var(--surface-card)] border-t border-[var(--border-light)] flex items-center space-x-2 overflow-x-auto text-[11px]">
          <span className="font-bold text-[var(--text-muted)] shrink-0 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" /> Quick Replies:
          </span>
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(reply)}
              className="px-2.5 py-1 rounded-lg bg-[var(--surface-page)] border border-[var(--border-light)] hover:border-blue-500 text-[var(--text-primary)] font-semibold whitespace-nowrap transition-colors shrink-0"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Text Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 border-t border-[var(--border-light)] bg-[var(--surface-card)] flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Reply to ${activeConv.patientName}...`}
            className="flex-1 bg-[var(--surface-page)] border border-[var(--border-light)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 font-medium"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center space-x-1"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>

      </div>

    </div>
  )
}
