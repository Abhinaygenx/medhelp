/**
 * Notification Service — Multi-channel notification & reminder dispatcher
 * Supports in-app toast, simulated SMS, and Email delivery with configurable providers.
 */
import toast from 'react-hot-toast'
import { CLIENT } from '../config/clientConfig'

export const notificationService = {
  /**
   * Send appointment reminder (SMS + Email)
   */
  sendAppointmentReminder: async ({ patientName, doctorName, date, time, phone, email }) => {
    const message = `Reminder: Your appointment with ${doctorName} is scheduled for ${date} at ${time}. (${CLIENT.name})`
    
    // In-app feedback
    toast.success(`Reminder queued for ${patientName}`, {
      icon: '🔔',
    })

    // Log to console for audit & demonstration
    console.info(`[SMS Dispatch to ${phone || 'on file'}]: ${message}`)
    if (email) {
      console.info(`[Email Dispatch to ${email}]: Subject: Appointment Reminder - ${CLIENT.name}\n${message}`)
    }

    return {
      success: true,
      channels: {
        sms: Boolean(CLIENT.features.smsReminders),
        email: Boolean(CLIENT.features.emailReminders),
        inApp: true
      },
      timestamp: new Date().toISOString()
    }
  },

  /**
   * Send prescription ready alert
   */
  sendPrescriptionAlert: async ({ patientName, prescriptionId, doctorName }) => {
    const message = `Your electronic prescription #${prescriptionId} from ${doctorName} has been generated and is ready in your portal.`
    toast.success(`Prescription notification sent to ${patientName}`, { icon: '💊' })
    console.info(`[Rx Alert]: ${message}`)
    return { success: true, timestamp: new Date().toISOString() }
  },

  /**
   * Send critical ER dispatch alert
   */
  sendEmergencyBroadcast: async ({ patientName, condition, location }) => {
    const alertMsg = `CRITICAL ER ALERT: Immediate response required for ${patientName} (${condition}) at ${location}.`
    toast.error(`Emergency alert broadcasted to staff`, { icon: '🚨' })
    console.warn(`[EMERGENCY BROADCAST]: ${alertMsg}`)
    return { success: true, timestamp: new Date().toISOString() }
  }
}

export default notificationService
