import { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 flex flex-col max-h-screen">
      <h1>TEST lAYOUT</h1>
      <Outlet />
    </div>
  )
}
