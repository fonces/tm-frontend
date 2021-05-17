import { useState } from 'react'

type LoadingProps = {
  immediate: boolean
}

const useLoading = ({ immediate }: LoadingProps = { immediate: false }) => {
  const [now, setLoading] = useState(immediate)

  const start = () => setLoading(true)
  const end = () => setLoading(false)

  return {
    now,
    start,
    end,
  }
}

export default useLoading
