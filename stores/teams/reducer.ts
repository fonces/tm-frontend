import { ActionType } from './actions'
import { State } from './types'

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        origin: { ...action.payload.byId },
        byId: { ...action.payload.byId },
      }
    case 'UPDATE': {
      const { id, team } = action.payload
      return {
        ...state,
        origin: { ...state.byId },
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            ...team,
          },
        },
      }
    }
    default:
      return state
  }
}

export default reducer
