import clsx from 'clsx'
import { NavLink as RNavLink, LinkProps, NavLinkRenderProps } from 'react-router-dom'

export default function NavLink({ children, to }: LinkProps) {
  const activeLinkHandler = ({ isActive }: NavLinkRenderProps) =>
    clsx('flex items-center text-sm gap-2 py-2 px-3 rounded group', {
      'bg-gray-50': isActive,
      'hover:bg-gray-100': isActive,
      'text-black': isActive,
      'text-gray-300': !isActive
    })

  return (
    <RNavLink to={to} className={activeLinkHandler}>
      <span className="truncate flex-1">{children}</span>
    </RNavLink>
  )
}
