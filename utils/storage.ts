
export const createStorageManager = <T, S>(key: string, initialState: T) => {
  const loadStorage = () => {
    const storageData = localStorage.getItem(key)
    const parsed = JSON.parse(storageData!) || initialState
    return Object.assign(initialState, parsed)
  }

  const saveStorage = (state: S) => {
    localStorage.setItem(key, JSON.stringify(state))
  }

  return {
    loadStorage,
    saveStorage,
  }
}
