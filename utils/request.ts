export type SSResponse<T> = {
  status: 0
  data: null
} | {
  status: 1
  data: T
}

type RequestInitConfig = {
  sheet: string
}

/**
 * FetchAPIで使用する引数の作成を行う
 * @param param0 { sheet : 取得するシート名 }
 * @returns initパラメータ
 */
export const createRequestInit = ({ sheet }: RequestInitConfig) => {
  const url = new URL(process.env.NEXT_PUBLIC_SS_ENDPOINT!)
  url
    .searchParams
    .append('s', sheet)
  const endpoint = url.toString()
  const options = { mode: 'cors' } as const
  return {
    endpoint,
    options,
  }
}

/**
 * 200系レスポンスからデータを抜き出す
 * @param res レスポンス
 * @returns データ
 */
export const handleResponse = <T>(res: SSResponse<T>) => {
  if (res.status === 0) {
    throw new Error()
  }
  return res.data
}
