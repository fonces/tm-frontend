import { useReducer, createContext, ReactNode, Dispatch } from 'react'
import { Team } from './types'
import reducer from './reducer'
import { ActionType } from './actions'

export type State = {
  teams: Team[]
}

export const initialState: State = {
  teams: [],
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
