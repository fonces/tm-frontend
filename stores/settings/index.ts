import { Settings } from '@/stores/settings/types'
import { createStorageManager } from '@/utils/storage'
import { useContext } from 'react'
import { initialState, Context } from './context'
import selector from './selector'
import actions from './actions'

const { loadStorage, saveStorage } = createStorageManager('settings', initialState)

const useSettings = () => {
  const { state, dispatch } = useContext(Context)
  const { priority } = selector(state)

  const loadSettings = () => {
    const settings = loadStorage()
    dispatch(actions.setSettings(settings))
    saveStorage(settings)
  }

  const updateSettings = (settings: Settings) => {
    dispatch(actions.updateSettings(settings))
    saveStorage(Object.assign(state, settings))
  }

  return {
    priority,
    loadSettings,
    updateSettings,
  }
}

export default useSettings
export { Provider } from './context'
