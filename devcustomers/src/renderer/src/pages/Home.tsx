import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Customer } from '~/src/shared/types/ipc'

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: window.api.getCustomers
  })
  if (isLoading) {
    return <div>loading...</div>
  }
  return (
    <div className="flex-1 flex-col text-white">
      <div>
        <h1 className="text-white text-xl lg:text-2xl font-semibold mb-4">Meus Clientes</h1>
      </div>
      <section className="flex flex-col gap-6 w-full h-screen">
        {data?.data?.map((customer: Customer) => (
          <Link
            to={`detail/${customer._id}`}
            key={customer._id}
            className="bg-gray-800 px-4 py-3 rounded"
          >
            <p className="mb-2 font-semibold text-lg">{customer.name}</p>
            <p>
              <span className="font-semibold">Email: {customer.email}</span>
            </p>
            {customer.phone && (
              <p>
                <span className="font-semibold">Phone: {customer.phone}</span>
              </p>
            )}
          </Link>
        ))}
      </section>
    </div>
  )
}
