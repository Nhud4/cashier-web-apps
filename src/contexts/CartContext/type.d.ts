type CartProduct = {
  productId: number
  qty: number
  subtotal: number
  notes?: string
  discount: number
  price: number
  name: string
  printTarget: string
}

type CartContextType = {
  products: CartProduct[]
  addProduct: (product: CartProduct) => void
  removeProduct: (productId: number) => void
  clearCart: () => void
  addNotes: (productId: number, notes: string) => void
  plusQty: (productId: number) => void
  minusQty: (productId: number) => void
}
