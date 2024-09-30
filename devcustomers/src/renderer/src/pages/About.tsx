import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export default function About() {
  const { data, isFetching } = useQuery({
    queryKey: ['app-details'],
    queryFn: () => {
      return window.api.getAppDetails()
    }
  })

  if (isFetching) {
    return <div>Carregando...</div>
  }

  return (
    <div className="flex-1 flex-col pb-8 text-white">
      <h1 className="text-white text-xl lg:text-2xl font-semibold mt-4 mb-4">Sobre</h1>

      <p>Projeto criado para registrar clientes</p>
      <p>Versão atual do projeto: {data?.version}</p>
    </div>
  )
}
