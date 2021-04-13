import { useReducer, createContext, ReactNode, Dispatch } from 'react'

import { ActionType } from './actions'
import reducer from './reducer'
import { State } from './types'

export const initialState: State = {
  priority: 4,
}

export const Context = createContext({} as {
  state: State
  dispatch: Dispatch<ActionType>
})

export const Provider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  )
}
