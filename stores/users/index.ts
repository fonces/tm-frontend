
import { useContext } from 'react'
import { UserRow } from '@/api/users/GET'
import { UserById } from './types'
import { Context } from './context'
import selector from './selector'
import actions from './actions'

const setUsers = () => {
  const { state, dispatch } = useContext(Context)

  const setUsers = (response: UserRow[]) => {
    dispatch(actions.setUsers(
      response.reduce<UserById>((acc, { teamId, userId, userName }) => (
        acc[userId]
          ? acc
          : {
              ...acc,
              [userId]: {
                id: userId,
                teamId: teamId,
                name: userName,
                entry: false,
              },
            }
      ), {}),
    ))
  }

  return {
    ...selector(state),
    setUsers,
  }
}

export default setUsers
export { Provider } from './context'
