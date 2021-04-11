import { ToById } from '@/helpers/types'

export type User = {
  id: string
  teamId: string
  name: string
  entry: boolean
}

export type UserById = ToById<User>

export type State = {
  origin: UserById
  byId: UserById
}
