import { Team } from './types'

export type Actions = 'SET'

export type ActionType = {
  type: 'SET',
  payload: {
    teams: Team[]
  },
}

const setTeams = (teams: Team[]): ActionType => ({
  type: 'SET',
  payload: { teams },
})

export default {
  setTeams,
}
