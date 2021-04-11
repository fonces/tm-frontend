import { TeamById } from './types'

export type Actions = 'SET'

export type ActionType = {
  type: 'SET',
  payload: {
    byId: TeamById
  },
}

const setTeams = (byId: TeamById): ActionType => ({
  type: 'SET',
  payload: { byId },
})

export default {
  setTeams,
}
