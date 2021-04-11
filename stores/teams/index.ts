
import { useContext } from 'react'
import { Team } from './types'
import { Context } from './context'
import selector from './selector'
import actions from './actions'

const useTeams = () => {
  const { state, dispatch } = useContext(Context)
  const setTeams = (teams: Team[]) => dispatch(actions.setTeams(teams))

  return {
    ...selector(state),
    setTeams,
  }
}

export default useTeams
export { Provider } from './context'
