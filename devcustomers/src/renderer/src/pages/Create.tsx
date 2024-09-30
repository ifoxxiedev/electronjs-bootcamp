import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { FormEvent, useRef } from 'react'
import { NewCustomer } from '~/src/shared/types/ipc'

export default function Create() {
  const queryClient = useQueryClient()

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const addressRef = useRef<HTMLInputElement | null>(null)
  const roleRef = useRef<HTMLInputElement | null>(null)
  const phoneRef = useRef<HTMLInputElement | null>(null)

  const { isPending, mutateAsync: createCustomer } = useMutation({
    mutationFn: async (data: NewCustomer) => {
      await window.api.addNewCustomer(data)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['customers']
      })
    }
  })

  const handleAddCustomer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Here')

    await createCustomer({
      email: String(emailRef.current?.value),
      name: String(nameRef.current?.value),
      role: String(roleRef.current?.value),
      address: String(addressRef.current?.value),
      phone: String(phoneRef.current?.value),
      status: 'ACTIVE'
    }).then(() => {
      nameRef.current!.value = ''
      emailRef.current!.value = ''
      roleRef.current!.value = ''
      addressRef.current!.value = ''
      phoneRef.current!.value = ''
    })
  }

  return (
    <div className="flex flex-1 flex-col text-white">
      <section className="flex flex-col gap-6 w-full  items-center pb-[200px]">
        <h1 className="text-center text-white text-xl lg:text-2xl font-semibold mb-4">
          Novo Cliente
        </h1>

        <form onSubmit={handleAddCustomer} className="w-full max-w-96 mt-4">
          <div className="mb-2">
            <label htmlFor="#" className="text-lg mb-px">
              Name
            </label>
            <input
              ref={nameRef}
              type="text"
              className="w-full h-9 rounded px-2 text-black outline-none"
              placeholder="Digite o nome do cliente..."
            />
          </div>
          <div className="mb-2">
            <label htmlFor="#" className="text-lg mb-px">
              E-mail
            </label>
            <input
              ref={emailRef}
              type="email"
              className="w-full h-9 rounded px-2 text-black outline-none"
              placeholder="Digite o email do cliente..."
            />
          </div>
          <div className="mb-2">
            <label htmlFor="#" className="text-lg mb-px">
              Endereço
            </label>
            <input
              ref={addressRef}
              type="text"
              className="w-full h-9 rounded px-2 text-black outline-none"
              placeholder="Digite o endereõ do cliente..."
            />
          </div>
          <div className="mb-2">
            <label htmlFor="#" className="text-lg mb-px">
              Telefone
            </label>
            <input
              type="text"
              ref={phoneRef}
              className="w-full h-9 rounded px-2 text-black outline-none"
              placeholder="Digite o telefone do cliente..."
            />
          </div>
          <div className="mb-2">
            <label htmlFor="#" className="text-lg mb-px">
              Cargo
            </label>
            <input
              type="text"
              ref={roleRef}
              className="w-full h-9 rounded px-2 text-black outline-none"
              placeholder="Digite o cargo do cliente..."
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className={clsx(
              'bg-blue-500 w-full h-9 rounded mt-6 flex items-center justify-center',
              {
                'opacity-50 cursor-not-allowed': isPending
              }
            )}
          >
            Cadastrar
          </button>
        </form>
      </section>
    </div>
  )
}
