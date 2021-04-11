import { Team, TeamById } from './types'

export type Actions = 'SET'

export type ActionType = {
  type: 'SET',
  payload: {
    byId: TeamById
  },
} | {
  type: 'UPDATE',
  payload: {
    id: string
    team: Partial<Team>
  }
}

const setTeams = (byId: TeamById): ActionType => ({
  type: 'SET',
  payload: { byId },
})

const updateTeam = (id: string, team: Partial<Team>): ActionType => ({
  type: 'UPDATE',
  payload: {
    id,
    team,
  },
})

export default {
  setTeams,
  updateTeam,
}
