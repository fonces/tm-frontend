export type UserRow = {
  teamId: string
  teamName: string
  userId: string
  userName: string
}

type Columns = 'teamId' | 'teamName' | 'userId' | 'userName'

const getUsers = () => fetch(process.env.SS_ENDPOINT!)
  .then(res => res.json())
  .then(res => (res as Record<Columns, string>[]).map(({ teamId, teamName, userId, userName }) => ({
    teamId,
    teamName,
    userId,
    userName,
  })))

export default getUsers
