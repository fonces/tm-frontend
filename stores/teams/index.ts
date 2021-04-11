
import { useContext } from 'react'
import { UserRow } from '@/api/users/GET'
import { TeamById } from './types'
import { Context } from './context'
import selector from './selector'
import actions from './actions'

const useTeams = () => {
  const { state, dispatch } = useContext(Context)

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

  return {
    ...selector(state),
    setTeams,
  }
}

export default useTeams
export { Provider } from './context'
