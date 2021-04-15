export type SSResponse<T> = {
  status: 0
  data: null
} | {
  status: 1
  data: T
}

export const createRequest = () => {
  const url = new URL(process.env.NEXT_PUBLIC_SS_ENDPOINT!)
  const options = { mode: 'cors' } as const
  return {
    url,
    options,
  }
}

export const handleResponse = <T>(res: SSResponse<T>) => {
  if (res.status === 0) {
    throw new Error()
  }
  return res.data
}
