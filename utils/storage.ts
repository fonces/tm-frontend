export const createStorageManager = <S extends object, T extends object>(
  key: string,
  initialState: S,
  filterData: (s: S) => T = s => (s as any as T),
) => {
  const state = Object.assign({}, filterData(initialState))

  const loadStorage = () => {
    const storageData = localStorage.getItem(key)
    return Object.assign(state, JSON.parse(storageData!))
  }

  const syncStorage = (updateState: S) => {
    Object.assign(state, filterData(updateState))
    localStorage.setItem(key, JSON.stringify(state))
  }

  return {
    loadStorage,
    syncStorage,
  }
}
