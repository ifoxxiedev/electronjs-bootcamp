import React from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ArrowBendDoubleUpLeft } from 'phosphor-react'
import clsx from 'clsx'
import NavLink from './NavLink'

export default function Sidebar() {
  const isMacOs = process.platform === 'darwin'

  return (
    <Collapsible.Content
      className={clsx(
        'bg-gray-950',
        'flex-shrink-0',
        'border-r',
        'border-slate-600',
        'h-screen',
        'relative',
        'group',
        'overflow-hidden',
        'data-[state=open]:animate-slideIn',
        'data-[state=closed]:animate-slideOut'
      )}
    >
      <Collapsible.Trigger
        className={clsx(
          'absolute',
          'h-7',
          'w-7',
          'right-4',
          'z-[99]',
          'text-slate-200',
          'inline-flex',
          'items-center',
          'justify-center',
          {
            'top-[1.25rem]': isMacOs,
            'top-6': !isMacOs
          }
        )}
      >
        <ArrowBendDoubleUpLeft className="h-7 w-7" />
      </Collapsible.Trigger>

      <div
        className={clsx('region-drag h-14 z-0 mt-10', {
          block: isMacOs,
          hidden: !isMacOs
        })}
      ></div>

      <div
        className={clsx(
          'flex-1 flex flex-col h-full gap-8 w-[220px] transition-opacity group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0 duration-200',
          {
            'pt-6': !isMacOs
          }
        )}
      >
        <nav className="flex flex-col mx-2 gap-8 text-slate-200">
          <div className="flex flex-col gap-2">
            <div className="text-white font-semibold uppercase mb-2 ml-2">Menu</div>
          </div>
          <section className="flex flex-col gap-px">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/create">Cadastrar</NavLink>
            <NavLink to="/about">Sobre</NavLink>
          </section>
        </nav>
      </div>
    </Collapsible.Content>
  )
}
