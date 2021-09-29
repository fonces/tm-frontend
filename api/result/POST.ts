import { createDCRequestInit } from '@/utils/request'

const { endpoint, options } = createDCRequestInit()

const postResult = (content: string) => fetch(endpoint, {
  ...options,
  body: JSON.stringify({
    username: 'ぽんせ',
    avatar_url: 'http://kaomojich.com/wp-content/uploads/yaruo/yaruo_01.gif',
    content,
  }),
})

export default postResult
