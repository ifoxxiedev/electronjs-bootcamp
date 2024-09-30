import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import { CaretRight } from 'phosphor-react'

export default function Header({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <div
      id="header"
      className={clsx(
        'flex items-center gap-4 lead-tight relative border-b border-slate-600 py-[1.25rem] px-6',
        {
          'pl-24': !isSidebarOpen && process.platform === 'darwin',
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-220px)]': isSidebarOpen
        }
      )}
    >
      <Collapsible.Trigger
        className={clsx(
          'h-7',
          'w-7',
          'text-gray-900',
          'bg-gray-100',
          'rounded-full',
          'p-1',
          'relative',
          'z-[99]',
          'flex',
          'items-center',
          'justify-center',
          'top-0',
          'left-0',
          {
            hidden: isSidebarOpen,
            block: !isSidebarOpen
          }
        )}
      >
        <CaretRight />
      </Collapsible.Trigger>
      <>
        <h1 className="text-white font-bold text-3xl">Dev Customers</h1>
      </>
    </div>
  )
}
