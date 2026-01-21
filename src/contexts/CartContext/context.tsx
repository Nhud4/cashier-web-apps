import { createContext, type ReactNode, useState } from 'react'

export const CartContext = createContext<CartContextType>({
  addNotes: () => {},
  addProduct: () => {},
  clearCart: () => {},
  minusQty: () => {},
  plusQty: () => {},
  products: [],
  removeProduct: () => {},
})

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])

  const addProduct = (val: CartProduct) => {
    setProducts((prev) => {
      const exist = prev.find((item) => item.productId === val.productId)

      if (exist) {
        return prev.map((item) => {
          if (item.productId === val.productId) {
            const qty = item.qty + 1
            const pricePerUnit = item.subtotal / item.qty
            return {
              ...item,
              notes: val.notes,
              qty,
              subtotal: pricePerUnit * qty,
            }
          }
          return item
        })
      }

      return [
        ...prev,
        {
          discount: val.discount,
          name: val.name,
          notes: val.notes,
          price: val.price,
          productId: val.productId,
          qty: 1,
          subtotal: val.subtotal,
        },
      ]
    })
  }

  const removeProduct = (productId: number) => {
    setProducts((prev) => prev.filter((item) => item.productId !== productId))
  }

  const clearCart = () => {
    setProducts([])
  }

  const addNotes = (productId: number, notes: string) => {
    setProducts((prev) => {
      return prev.map((item) => {
        if (item.productId === productId) {
          return { ...item, notes }
        }
        return item
      })
    })
  }

  const plusQty = (productId: number) => {
    const current = products.filter((item) => item.productId === productId)[0]
    addProduct({ ...current, qty: current.qty + 1 })
  }

  const minusQty = (productId: number) => {
    const current = products.filter((item) => item.productId === productId)[0]
    if (current.qty === 1) {
      removeProduct(productId)
    } else {
      setProducts((prev) => {
        return prev.map((item) => {
          if (item.productId === productId) {
            const qty = item.qty - 1
            const pricePerUnit = item.subtotal / item.qty
            return {
              ...item,
              qty,
              subtotal: pricePerUnit * qty,
            }
          }
          return item
        })
      })
    }
  }

  return (
    <CartContext.Provider
      value={{
        addNotes,
        addProduct,
        clearCart,
        minusQty,
        plusQty,
        products,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
