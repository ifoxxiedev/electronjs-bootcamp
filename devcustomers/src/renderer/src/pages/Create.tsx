import { useEffect } from 'react'

export default function Create() {
  useEffect(() => {
    ;(async () => {
      const customers = await window.api.getCustomers()
      console.log('Customers', customers)
    })()
  }, [])
  const handleAddCustomer = async () => {
    const r = await window.api.addNewCustomer({
      email: 'example@example.com',
      name: 'John Doe',
      role: 'Customer',
      status: 'Active',
      address: '123 Main St',
      phone: '123-456-7890'
    })

    console.log('R', r)
  }

  return (
    <div>
      <h1>Pae: Create a new Customer</h1>
      <button onClick={handleAddCustomer}>Create</button>
    </div>
  )
}
