import { createRequest, handleResponse, SSResponse } from '@/helpers/request'

type Columns = 'id' | 'name'
export type TeamRow = Record<Columns, string>

const { url, options } = createRequest()
url
  .searchParams
  .append('s', 'teamlist')

const getTeams = () => fetch(url.toString(), options)
  .then(res => res.json())
  .then(res => res as SSResponse<TeamRow[]>)
  .then(res => handleResponse(res))

export default getTeams
