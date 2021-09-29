import { createSSRequestInit, handleSSResponse, SSResponse } from '@/utils/request'

type Columns = 'id' | 'name'
export type TeamRow = Record<Columns, string>

const { endpoint, options } = createSSRequestInit({ sheet: 'teams' })

const getTeams = () => fetch(endpoint, options)
  .then(res => res.json())
  .then(res => res as SSResponse<TeamRow[]>)
  .then(res => handleSSResponse(res))

export default getTeams
