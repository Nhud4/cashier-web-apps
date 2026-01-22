type Product = {
  id: string
  code: string
  name: string
  categoryId: string
  description: string
  normalPrice: number
  hpp: number
  discount: number
  discountType: string
  stock: number
  active: boolean
  available: boolean
  img: string
  created_at?: string
  updated_at?: string
}

type ProductList = {
  id: string
  code: string
  name: string
  price: number
  discount: number
  stock: number
  active: boolean
  available: boolean
  img: string
  category: {
    id: string
    name: string
  }
}

type ProductListParams = TableParams & {
  categoryId?: string
  allocation?: string
}
