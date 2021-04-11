import { UserById } from './types'

export type Actions = 'SET'

export type ActionType = {
  type: 'SET',
  payload: {
    byId: UserById
  },
}

const setUsers = (byId: UserById): ActionType => ({
  type: 'SET',
  payload: { byId },
})

export default {
  setUsers,
}
