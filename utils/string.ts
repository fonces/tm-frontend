import path from 'path'

export const toPublicPath = (...paths: string[]) => (
  path.join(process.env.basePath || '', ...paths)
)
