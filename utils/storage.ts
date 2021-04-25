/**
 * localStorageにObjectを保存する
 * @param key ストレージキー
 * @param initialState 初期ステート
 * @param filterData 登録するデータのフィルタリング関数
 * @returns 読み込みと同期を行う関数を返却
 */
export const createStorageManager = <S extends object, T extends object>(
  key: string,
  initialState: S,
  filterData: (s: S) => T = s => (s as any as T),
) => {
  const state = Object.assign({}, filterData(initialState))

  const loadStorage = () => (
    Object.assign(
      state,
      JSON.parse(localStorage.getItem(key)!),
    )
  )

  const syncStorage = (updateState: S) => {
    Object.assign(state, filterData(updateState))
    localStorage.setItem(key, JSON.stringify(state))
  }

  return {
    loadStorage,
    syncStorage,
  }
}
