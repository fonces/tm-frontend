import { useReducer, createContext, ReactNode, Dispatch } from 'react'
import { State } from './types'
import reducer from './reducer'
import { ActionType } from './actions'

export const initialState: State = {
  origin: {},
  byId: {},
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
