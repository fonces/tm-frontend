import { useContext } from 'react'
import { UserRow } from '@/api/users/GET'
import { User, UserById } from './types'
import { Context } from './context'
import selector from './selector'
import actions from './actions'

const setUsers = () => {
  const { state, dispatch } = useContext(Context)
  const { users, ids, byId } = selector(state)

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

  const isSelectedUsers = users.some(({ entry }) => entry)

  return {
    users,
    ids,
    byId,
    isSelectedUsers,
    setUsers,
    updateUser,
  }
}

export default setUsers
export { Provider } from './context'
