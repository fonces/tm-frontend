/**
 * msミリ秒処理を待つ
 * @param ms 処理を止めたいミリ秒
 * @returns Promise
 */
export const wait = (ms: number) => (
  new Promise(resolve => setTimeout(resolve, ms))
)
