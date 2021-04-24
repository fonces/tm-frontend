import { ToById } from '@/helpers/types'

export type Team = {
  id: string
  name: string
  dice: number
  users: number
  priority: number
}

export type TeamById = ToById<Team>

export type State = {
  origin: TeamById
  byId: TeamById
}
