import { useContext } from 'react'
import { createStorageManager } from '@/utils/storage'
import { TeamRow } from '@/api/teams/GET'
import { Team, TeamById } from './types'
import { initialState, Context } from './context'
import selector from './selector'
import actions from './actions'

const { loadStorage, syncStorage } = createStorageManager('teams', initialState.byId, (teamsById: TeamById) => (
  Object
    .values(teamsById)
    .reduce<{ [key: string ]: Pick<Team, 'dice'> }>((acc, { id, dice, users }) => ({
      ...acc,
      [id]: { dice, users },
    }), {})
))

const useTeams = () => {
  const { state, dispatch } = useContext(Context)
  const { teams, entryTeams, diceSorted, isAllSettedDice, ids, byId } = selector(state)

  const setTeams = (response: TeamRow[]) => {
    const storageData = loadStorage()
    const teamsById = response.reduce<TeamById>((acc, { id, name }) => (
      acc[id]
        ? acc
        : {
            ...acc,
            [id]: {
              id,
              name,
              users: (storageData || {})[id]?.users || 0,
              dice: (storageData || {})[id]?.dice || 0,
            },
          }
    ), {})
    dispatch(actions.setTeams(teamsById))
  }

  const updateTeam = (team: Team) => {
    dispatch(actions.updateTeam(team.id, team))
    syncStorage({ [team.id]: team })
  }

  const updateTeams = (teams: Team[]) => {
    const teamsById = teams.reduce<TeamById>((acc, team) => ({ ...acc, [team.id]: team }), {})
    dispatch(actions.setTeams(teamsById))
    syncStorage({ ...teamsById })
  }

  return {
    teams,
    entryTeams,
    diceSorted,
    isAllSettedDice,
    ids,
    byId,
    setTeams,
    updateTeam,
    updateTeams,
  }
}

export default useTeams
export { Provider } from './context'
