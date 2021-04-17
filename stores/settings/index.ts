import { useContext } from 'react'
import actions from './actions'
import { initialState, Context } from './context'
import selector from './selector'
import { Settings } from './types'
import { createStorageManager } from '@/utils/storage'

const { loadStorage, syncStorage } = createStorageManager('settings', initialState)

const useSettings = () => {
  const { state, dispatch } = useContext(Context)
  const { priority } = selector(state)

  const loadSettings = () => {
    const settings = loadStorage()
    dispatch(actions.setSettings(settings))
  }

  const updateSettings = (settings: Settings) => {
    dispatch(actions.updateSettings(settings))
    syncStorage(settings)
  }

  return {
    priority,
    loadSettings,
    updateSettings,
  }
}

export default useSettings
export { Provider } from './context'
