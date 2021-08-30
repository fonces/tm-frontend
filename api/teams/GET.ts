import { createRequestInit, handleResponse, SSResponse } from '@/utils/request'

type Columns = 'id' | 'name'
export type TeamRow = Record<Columns, string>

const { endpoint, options } = createRequestInit({ sheet: 'teams' })

const getTeams = () => fetch(endpoint, options)
  .then(res => res.json())
  .then(res => res as SSResponse<TeamRow[]>)
  .then(res => handleResponse(res))

export default getTeams
