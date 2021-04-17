import { ToById } from '@/helpers/types'

/**
 * startからendまでの数値の配列を作成数r
 * @param start 開始
 * @param end 終了
 * @returns 数値の配列
 */
export const range = (start: number, end: number) => (
  Array.from({ length: (end - start) + 1 }, (_, i) => start + i)
)

/**
 * Objectの配列からKeyValueのObjectを作成する
 * @param list Objectの配列
 * @param key キー
 * @returns KeyValueのObject
 */
export const toById = <T, K extends keyof T>(list: T[], key: K) => (
  list.reduce<ToById<T>>((acc, item) => ({ ...acc, [item[key] as never]: item }), {})
)
