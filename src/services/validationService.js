// Validation Service for Form Inputs and Clinical Data Entry

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export const validatePhone = (phone) => {
  const clean = String(phone).replace(/\D/g, '')
  return clean.length >= 10
}

export const validatePrescriptionForm = ({ patientName, diagnosis, medicines }) => {
  const errors = {}

  if (!patientName || !patientName.trim()) {
    errors.patientName = 'Patient name is required'
  }

  if (!diagnosis || diagnosis.trim().length < 5) {
    errors.diagnosis = 'Diagnosis must be at least 5 characters'
  }

  if (!medicines || medicines.length === 0) {
    errors.medicines = 'At least one medicine is required'
  } else {
    medicines.forEach((med, idx) => {
      if (!med.name || !med.name.trim()) {
        errors[`med_${idx}_name`] = 'Medicine name required'
      }
      if (!med.dosage || !med.dosage.trim()) {
        errors[`med_${idx}_dosage`] = 'Dosage required'
      }
    })
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateDoctorProfile = ({ name, email, phone }) => {
  const errors = {}

  if (!name || !name.trim()) {
    errors.name = 'Doctor name is required'
  }

  if (!email || !validateEmail(email)) {
    errors.email = 'Valid email address is required'
  }

  if (!phone || !validatePhone(phone)) {
    errors.phone = 'Phone number must have at least 10 digits'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateScheduleSlot = ({ timeSlot, day }, existingSlots = []) => {
  if (!timeSlot || !timeSlot.trim()) {
    return { isValid: false, message: 'Time slot is required' }
  }

  if (existingSlots.includes(timeSlot)) {
    return { isValid: false, message: 'Time slot already exists for this day' }
  }

  return { isValid: true }
}
