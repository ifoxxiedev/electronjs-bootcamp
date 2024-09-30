import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { ArrowLeft, Trash } from 'phosphor-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function Detail() {
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutateAsync: deleteCustomer, isPending } = useMutation({
    async mutationFn(id: string) {
      return window.api.deleteCustomer(id)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['customers']
      })
      navigate('/')
    }
  })

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => window.api.getCustomer(String(id))
  })

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  const customer = data?.data

  return (
    <div className="flex-1 flex-col pb-8 text-white">
      <Link to="/" className="flex flex-row items-center gap-2 mb-2">
        <ArrowLeft className="w-6 h-6 text-white" />
        <span>Voltar</span>
      </Link>

      <h1 className="text-white text-xl lg:text-2xl font-semibold mt-4 mb-4">
        Detalhes do Cliente
      </h1>

      <section className=" py-3 rounded flex flex-col gap-6 w-full">
        {customer && (
          <article className=" w-full relative flex flex-col gap-1">
            <section className="bg-gray-800 px-4 py-3">
              <p className="mb-2 font-semibold text-lg">{customer?.name}</p>
              <p>
                <span className="font-semibold">Email: </span>
                {customer?.email}
              </p>
              {customer?.address && (
                <p>
                  <span className="font-semibold">Address: </span>
                  {customer?.address}
                </p>
              )}
              {customer?.phone && (
                <p>
                  <span className="font-semibold">Phone: </span>
                  {customer?.phone}
                </p>
              )}

              <div className="absolute top-[-10px] right-[-10px]">
                <button
                  onClick={() => deleteCustomer(customer._id)}
                  className={clsx('bg-red-500 hover:bg-red-600 p-2 rounded-full', {
                    'opacity-20': isPending
                  })}
                  disabled={isPending}
                >
                  <Trash className="text-white h-6 w-6" />
                </button>
              </div>
            </section>

            <section className="bg-gray-800 px-4 py-3">
              {customer?.role && (
                <p>
                  <span className="font-semibold">Role: </span>
                  {customer?.role}
                </p>
              )}
              {customer?.status && (
                <p>
                  <span className="font-semibold">Status: </span>
                  {customer?.status}
                </p>
              )}
            </section>
          </article>
        )}
      </section>
    </div>
  )
}
