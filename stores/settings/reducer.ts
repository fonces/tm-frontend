import { ActionType } from './actions'
import { State } from './types'

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        ...action.payload,
      }
    case 'UPDATE':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default reducer
