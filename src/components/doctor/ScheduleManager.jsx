import React, { useState } from 'react'
import { Clock, Plus, CheckCircle2, XCircle, AlertCircle, Edit2 } from 'lucide-react'
import { loadData, saveData } from '../../services/storageService'
import { validateScheduleSlot } from '../../services/validationService'
import toast from 'react-hot-toast'

export default function ScheduleManager() {
  const INITIAL_SCHEDULE = [
    { day: 'Monday', slots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'], booked: 3 },
    { day: 'Tuesday', slots: ['09:00 AM', '11:00 AM', '03:00 PM'], booked: 2 },
    { day: 'Wednesday', slots: ['09:30 AM', '10:30 AM', '01:30 PM', '04:30 PM'], booked: 4 },
    { day: 'Thursday', slots: ['09:00 AM', '11:30 AM', '02:30 PM'], booked: 1 },
    { day: 'Friday', slots: ['09:00 AM', '10:00 AM', '03:00 PM', '05:00 PM'], booked: 3 },
    { day: 'Saturday', slots: ['10:00 AM', '11:30 AM'], booked: 2 },
    { day: 'Sunday', slots: [], booked: 0 }
  ]

  const [schedule, setSchedule] = useState(() => loadData('doctor_weekly_schedule', INITIAL_SCHEDULE))
  const [isAvailable, setIsAvailable] = useState(() => loadData('doctor_availability', true))

  // Add Slot Modal State
  const [addModalDay, setAddModalDay] = useState(null)
  const [newSlotTime, setNewSlotTime] = useState('09:00 AM')
  const [modalError, setModalError] = useState('')

  // 1. Action: Toggle Availability
  const handleToggleAvailability = () => {
    const updated = !isAvailable
    setIsAvailable(updated)
    saveData('doctor_availability', updated)
    toast.success(`Physician availability set to: ${updated ? 'ONLINE' : 'UNAVAILABLE'}`)
  }

  // 2. Action: Add Slot Submit with Validation & Duplicate Check
  const handleAddSlotSubmit = (e) => {
    e.preventDefault()
    const targetDayObj = schedule.find(d => d.day === addModalDay)
    const existingSlots = targetDayObj ? targetDayObj.slots : []

    const { isValid, message } = validateScheduleSlot({ timeSlot: newSlotTime, day: addModalDay }, existingSlots)

    if (!isValid) {
      setModalError(message)
      return
    }

    const updatedSchedule = schedule.map(d => {
      if (d.day === addModalDay) {
        return {
          ...d,
          slots: [...d.slots, newSlotTime]
        }
      }
      return d
    })

    setSchedule(updatedSchedule)
    saveData('doctor_weekly_schedule', updatedSchedule)
    toast.success(`Added slot ${newSlotTime} to ${addModalDay}!`)
    setAddModalDay(null)
    setNewSlotTime('09:00 AM')
    setModalError('')
  }

  // 3. Action: Remove Slot
  const handleRemoveSlot = (dayName, slotTime) => {
    const updatedSchedule = schedule.map(d => {
      if (d.day === dayName) {
        return {
          ...d,
          slots: d.slots.filter(s => s !== slotTime)
        }
      }
      return d
    })
    setSchedule(updatedSchedule)
    saveData('doctor_weekly_schedule', updatedSchedule)
    toast.success(`Removed slot ${slotTime} from ${dayName}.`)
  }

  return (
    <div className="bg-[#0D1B2A]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-lg p-6 space-y-6 animate-in fade-in duration-200 text-slate-100">
      
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" /> Weekly Consultation Schedule Manager
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Configure your OPD consultation slots, manage weekly hours, or toggle online availability.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          {/* Availability Toggle */}
          <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <span className="font-bold text-slate-300">Status:</span>
            <button
              type="button"
              onClick={handleToggleAvailability}
              className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all shadow-sm ${
                isAvailable ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
              }`}
            >
              {isAvailable ? 'AVAILABLE ONLINE' : 'UNAVAILABLE'}
            </button>
          </div>
        </div>
      </div>

      {/* Monday-Sunday Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-xs">
        {schedule.map(d => (
          <div key={d.day} className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 transition-all space-y-3 flex flex-col justify-between shadow-md">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="font-extrabold text-white text-sm">{d.day}</h3>
                <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                  {d.slots.length} Active Slots
                </span>
              </div>

              {d.slots.length === 0 ? (
                <p className="text-slate-500 italic text-[11px] py-4 text-center">No slots scheduled (Off Day)</p>
              ) : (
                <div className="space-y-1.5">
                  {d.slots.map(s => (
                    <div key={s} className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-semibold text-slate-200">
                      <span>{s}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(d.day, s)}
                        className="text-slate-500 hover:text-red-400 p-0.5"
                        title="Remove slot"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">Booked: <strong className="text-white">{d.booked}</strong></span>
              <button 
                type="button" 
                onClick={() => {
                  setAddModalDay(d.day)
                  setModalError('')
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-2.5 py-1 rounded-lg text-[10px] flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3 h-3" />
                <span>Add Slot</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD SLOT MODAL */}
      {addModalDay && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl max-w-sm w-full p-6 space-y-4 text-xs text-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-sm font-['Space_Grotesk']">
                Add Slot to {addModalDay}
              </h3>
              <button type="button" onClick={() => setAddModalDay(null)} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleAddSlotSubmit} className="space-y-4">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Select Time Slot</label>
                <select
                  value={newSlotTime}
                  onChange={(e) => setNewSlotTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-blue-500"
                >
                  <option value="08:30 AM">08:30 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddModalDay(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md"
                >
                  Save Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
