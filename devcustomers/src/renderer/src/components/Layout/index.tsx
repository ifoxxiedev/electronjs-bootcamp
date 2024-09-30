import * as Collapsible from '@radix-ui/react-collapsible'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { useState } from 'react'

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOPen] = useState(true)

  return (
    <Collapsible.Root
      defaultOpen
      className="h-screen w-screen bg-gray-950 text-slate-100 flex"
      onOpenChange={(e) => {
        setIsSidebarOPen(e)
      }}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />
        <div className="px-6 pt-8">
          <Outlet />
        </div>
      </div>
    </Collapsible.Root>
  )
}
