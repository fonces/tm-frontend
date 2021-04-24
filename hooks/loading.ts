import { useState } from 'react'

const useLoading = ({
  immediate,
}: {
  immediate: boolean
} = {
  immediate: false,
}) => {
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
