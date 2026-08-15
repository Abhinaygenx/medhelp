import { useState, useEffect } from 'react'
import { loadData, saveData } from '../services/storageService'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return loadData(key, initialValue)
  })

  useEffect(() => {
    saveData(key, storedValue)
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
