import { DetailedHTMLProps, LinkHTMLAttributes } from 'react'
import path from 'path'

const BASE_PATH = process.env.basePath || ''

type EnhanceLinkProps = Omit<
  DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>,
  'href'
> & {
  href: string
}

const Link = ({ href, ...rest }: EnhanceLinkProps) => {
  const pathPrefix = href.startsWith('http') || href.startsWith('//') ? '' : BASE_PATH
  return <link {...rest} href={path.join(pathPrefix, href)} />
}

export default Link
