
import { useContext } from 'react'
import { UserRow } from '@/api/users/GET'
import { Team, TeamById } from './types'
import { Context } from './context'
import selector from './selector'
import actions from './actions'

const useTeams = () => {
  const { state, dispatch } = useContext(Context)
  const { teams, ids, byId } = selector(state)

  const setTeams = (response: UserRow[]) => {
    dispatch(actions.setTeams(
      response.reduce<TeamById>((acc, { teamId, teamName }) => (
        acc[teamId]
          ? acc
          : {
              ...acc,
              [teamId]: {
                id: teamId,
                name: teamName,
                dice: 0,
              },
            }
      ), {}),
    ))
  }

  const updateTeam = (team: Team) => dispatch(actions.updateTeam(team.id, team))

  const isAllSettedDice = teams.every(({ dice }) => !!dice)

  return {
    teams,
    ids,
    byId,
    isAllSettedDice,
    setTeams,
    updateTeam,
  }
}

export default useTeams
export { Provider } from './context'
