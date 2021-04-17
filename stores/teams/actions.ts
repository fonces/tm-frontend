import { TeamById } from './types'

export type Actions = 'SET'

export type ActionType = {
  type: 'SET',
  payload: {
    byId: TeamById
  },
} | {
  type: 'UPDATE',
  payload: {
    byId: TeamById
  }
}

const setTeams = (byId: TeamById): ActionType => ({
  type: 'SET',
  payload: { byId },
})

const updateTeams = (byId: TeamById): ActionType => ({
  type: 'UPDATE',
  payload: { byId },
})

export default {
  setTeams,
  updateTeams,
}
