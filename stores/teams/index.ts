import { useContext } from 'react'
import { createStorageManager } from '@/utils/storage'
import { UserRow } from '@/api/users/GET'
import { Team, TeamById } from './types'
import { initialState, Context } from './context'
import selector from './selector'
import actions from './actions'

const { loadStorage, syncStorage } = createStorageManager('teams', initialState.byId, (teamsById: TeamById) => (
  Object
    .values(teamsById)
    .reduce<{ [key: string ]: Pick<Team, 'dice'> }>((acc, { id, dice }) => ({
      ...acc,
      [id]: { dice },
    }), {})
))

const useTeams = () => {
  const { state, dispatch } = useContext(Context)
  const { teams, ids, byId } = selector(state)

  const setTeams = (response: UserRow[]) => {
    const storageData = loadStorage()
    const teamsById = response.reduce<TeamById>((acc, { teamId, teamName }) => (
      acc[teamId]
        ? acc
        : {
            ...acc,
            [teamId]: {
              id: teamId,
              name: teamName,
              dice: (storageData || {})[teamId]?.dice || 0,
            },
          }
    ), {})
    dispatch(actions.setTeams(teamsById))
  }

  const updateTeam = (team: Team) => {
    dispatch(actions.updateTeam(team.id, team))
    syncStorage({ [team.id]: team })
  }

  return {
    teams,
    ids,
    byId,
    setTeams,
    updateTeam,
  }
}

export default useTeams
export { Provider } from './context'
