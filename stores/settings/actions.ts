import { Settings } from './types'

export type Actions = 'SET'

export type ActionType = {
  type: 'SET',
  payload: Settings,
} | {
  type: 'UPDATE',
  payload: Partial<Settings>
}

const setSettings = (payload: Settings): ActionType => ({
  type: 'SET',
  payload,
})

const updateSettings = (payload: Partial<Settings>): ActionType => ({
  type: 'UPDATE',
  payload,
})

export default {
  setSettings,
  updateSettings,
}
