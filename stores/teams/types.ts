export type User = {
  id: number
  name: string
}

export type Team = {
  id: number
  name: string
  dice: number
  users: User[]
}
