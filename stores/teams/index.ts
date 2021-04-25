import { useContext } from 'react'

import { TeamRow } from '@/api/teams/GET'
import { ToById } from '@/helpers/types'
import { Team, TeamById } from './types'
import actions from './actions'
import { initialState, Context } from './context'
import selector from './selector'
import { toById } from '@/utils/array'
import { createStorageManager } from '@/utils/storage'

const { loadStorage, syncStorage } = createStorageManager(
  'teams',
  initialState.byId,
  (teamsById: TeamById) => (
    Object
      .values(teamsById)
      .reduce<ToById<Pick<Team, 'dice' | 'users'>>>((acc, { id, dice, users, priority }) => ({
        ...acc,
        [id]: { dice, users, priority },
      }), {})
  ),
)

const useTeams = () => {
  const { state, dispatch } = useContext(Context)
  const teamsSelector = selector(state)

  const setTeams = (response: TeamRow[]) => {
    const storageData = loadStorage()
    const teamsById = response.reduce<TeamById>((acc, { id, name }) => ({
      ...acc,
      [id]: {
        id,
        name,
        users: (storageData || {})[id]?.users || 0,
        priority: (storageData || {})[id]?.priority || 1,
        dice: (storageData || {})[id]?.dice || 0,
      },
    }), {})
    dispatch(actions.setTeams(teamsById))
  }

  const updateTeams = (team: Team | Team[]) => {
    const teams = Array.isArray(team) ? team : [team]
    const teamsById = toById(teams, 'id')
    dispatch(actions.updateTeams(teamsById))
    syncStorage({ ...teamsById })
  }

  return {
    ...teamsSelector,
    setTeams,
    updateTeams,
  }
}

export default useTeams
export { Provider } from './context'
