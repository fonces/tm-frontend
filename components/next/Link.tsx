import { DetailedHTMLProps, LinkHTMLAttributes } from 'react'
import path from 'path'

const basePath = process.env.basePath || ''

type EnhanceLinkProps = Omit<
  DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>,
  'href'
> & {
  href: string
}

const Link = ({ href, ...rest }: EnhanceLinkProps) => (
  <link {...rest} href={path.join(href.startsWith('http') ? '' : basePath, href)} />
)

export default Link
