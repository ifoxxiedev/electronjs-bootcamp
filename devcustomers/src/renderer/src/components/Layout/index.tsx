import * as Collapsible from '@radix-ui/react-collapsible'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { useEffect, useState } from 'react'

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOPen] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const onSub = window.api.onNewCustomer(() => {
      navigate('/create')
    })

    return () => {
      onSub()
    }
  }, [])

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
        <div className="px-6 pt-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </Collapsible.Root>
  )
}
