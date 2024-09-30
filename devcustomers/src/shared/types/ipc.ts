export interface Customer {
  _id: string
  _rev?: string

  name: string
  email: string
  role: string
  status: string
  address?: string
  phone?: string
}

export interface NewCustomer {
  name: string
  address?: string
  role: string
  phone?: string
  email: string
  status: string
}
