import { ToById } from '@/helpers/types'

export type Team = {
  id: string
  name: string
  users: number
  priority: number
  dice: number
}

export type TeamById = ToById<Team>

export type State = {
  origin: TeamById
  byId: TeamById
}
