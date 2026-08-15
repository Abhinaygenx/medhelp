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
    <div className="bg-[#0D1B2A]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-lg overflow-hidden h-[620px] flex flex-col md:flex-row animate-in fade-in duration-200 text-slate-100">
      
      {/* Left Conversations Sidebar */}
      <div className="w-full md:w-80 border-r border-slate-800/80 bg-slate-900/60 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <h2 className="font-extrabold text-white text-sm font-['Space_Grotesk'] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" /> Patient Conversations
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold text-[10px]">
            {conversations.filter(c => c.unread > 0).length} Unread
          </span>
        </div>

        <div className="divide-y divide-slate-800/80 overflow-y-auto flex-1 custom-scrollbar">
          {conversations.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveConvId(c.id)}
              className={`w-full text-left p-3.5 flex items-start space-x-3 transition-colors ${
                activeConvId === c.id ? 'bg-slate-900 border-l-4 border-blue-500 shadow-sm' : 'hover:bg-slate-900/40'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                {c.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xs text-white truncate">{c.patientName}</p>
                  <span className="text-[10px] text-slate-500 shrink-0">{c.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{c.lastMessage}</p>
              </div>

              {c.unread > 0 && (
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Chat Viewport */}
      <div className="flex-1 flex flex-col bg-slate-950/40">
        
        {/* Active Chat Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-500/20">
              {activeConv.avatar}
            </div>
            <div>
              <h3 className="font-bold text-xs text-white">{activeConv.patientName}</h3>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
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
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20' 
                    : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm'
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies Bar */}
        <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto text-[11px]">
          <span className="font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" /> Quick Replies:
          </span>
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(reply)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 font-semibold whitespace-nowrap transition-colors shrink-0"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Text Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 border-t border-slate-800/80 bg-slate-900/90 flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Reply to ${activeConv.patientName}...`}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-medium"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center space-x-1"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>

      </div>

    </div>
  )
}
