import { useContext } from 'react'
import { createStorageManager } from '@/utils/storage'
import { UserRow } from '@/api/users/GET'
import { User, UserById } from './types'
import { initialState, Context } from './context'
import selector from './selector'
import actions from './actions'

const { loadStorage, saveStorage } = createStorageManager('users', initialState)
const filterData = (usersById: UserById) => (
  Object
    .values(usersById)
    .reduce<{ [key: string ]: Pick<User, 'entry'> }>((acc, { id, entry }) => ({
      ...acc,
      [id]: { entry },
    }), {})
)

const useUsers = () => {
  const { state, dispatch } = useContext(Context)
  const { users, ids, byId } = selector(state)

  const setUsers = (response: UserRow[]) => {
    const storageData = loadStorage()
    const usersById = response.reduce<UserById>((acc, { teamId, userId, userName }) => ({
      ...acc,
      [userId]: {
        id: userId,
        teamId: teamId,
        name: userName,
        entry: (storageData || {})[userId]?.entry || false,
      },
    }), {})
    dispatch(actions.setUsers(usersById))
    saveStorage(filterData(usersById))
  }

  const updateUser = (user: User) => {
    dispatch(actions.updateUser(user.id, user))
    saveStorage(filterData({ ...byId, [user.id]: user }))
  }

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

export default useUsers
export { Provider } from './context'
