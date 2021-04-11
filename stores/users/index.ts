import { useContext } from 'react'
import { UserRow } from '@/api/users/GET'
import { User, UserById } from './types'
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

  const updateUser = (user: User) => dispatch(actions.updateUser(user.id, user))

  return {
    ...selector(state),
    setUsers,
    updateUser,
  }
}

export default setUsers
export { Provider } from './context'
