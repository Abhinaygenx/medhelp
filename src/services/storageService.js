// Local Storage Service Helper for persistence across all Doctor Portal modules

export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving data to key "${key}":`, error)
  }
}

export const loadData = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
  } catch (error) {
    console.error(`Error loading data from key "${key}":`, error)
    return defaultValue
  }
}

export const updateItem = (key, id, updates) => {
  const items = loadData(key)
  const updated = items.map((item) =>
    item.id === id ? { ...item, ...updates } : item
  )
  saveData(key, updated)
  return updated
}

export const deleteItem = (key, id) => {
  const items = loadData(key)
  const filtered = items.filter((item) => item.id !== id)
  saveData(key, filtered)
  return filtered
}
