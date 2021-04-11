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
    default:
      return state
  }
}

export default reducer
