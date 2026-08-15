export const INITIAL_DOCTOR_MESSAGES = [
  {
    id: 'conv-1',
    patientName: 'Eleanor Vance',
    avatar: 'EV',
    lastMessage: 'Doctor, should I take the Amlodipine before or after breakfast?',
    timestamp: '10:42 AM',
    unread: 1,
    messages: [
      { id: 'm1', sender: 'patient', text: 'Good morning Dr. Ford! Quick question regarding my prescription.', time: '10:30 AM' },
      { id: 'm2', sender: 'patient', text: 'Doctor, should I take the Amlodipine before or after breakfast?', time: '10:42 AM' }
    ]
  },
  {
    id: 'conv-2',
    patientName: 'Marcus Aurelius',
    avatar: 'MA',
    lastMessage: 'Thank you Doctor, my BP is 120/80 today.',
    timestamp: 'Yesterday',
    unread: 0,
    messages: [
      { id: 'm3', sender: 'doctor', text: 'Marcus, please monitor your blood pressure twice daily.', time: 'Yesterday 04:00 PM' },
      { id: 'm4', sender: 'patient', text: 'Thank you Doctor, my BP is 120/80 today.', time: 'Yesterday 05:15 PM' }
    ]
  },
  {
    id: 'conv-3',
    patientName: 'Sophia Loren',
    avatar: 'SL',
    lastMessage: 'Sent lab report PDF attachment.',
    timestamp: 'Aug 10',
    unread: 0,
    messages: [
      { id: 'm5', sender: 'patient', text: 'Sent lab report PDF attachment.', time: 'Aug 10 11:00 AM' }
    ]
  }
]
