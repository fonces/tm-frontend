import { User, UserById } from './types'

export type Actions = 'SET'

export type ActionType = {
  type: 'SET',
  payload: {
    byId: UserById
  },
} | {
  type: 'UPDATE',
  payload: {
    id: string
    user: Partial<User>
  }
}

const setUsers = (byId: UserById): ActionType => ({
  type: 'SET',
  payload: { byId },
})

const updateUser = (id: string, user: Partial<User>): ActionType => ({
  type: 'UPDATE',
  payload: {
    id,
    user,
  },
})

export default {
  setUsers,
  updateUser,
}
