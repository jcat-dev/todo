const setItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}
 
const getItem = <T>(key: string) => {
  const item = localStorage.getItem(key)

  if (item) {
    return JSON.parse(item) as T
  }

  return null
}

export default {
  setItem,
  getItem
}