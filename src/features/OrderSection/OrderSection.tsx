import { CartContext } from '@contexts/CartContext/context'
import { ModalContext } from '@contexts/ModalContext'
import CheckoutOrder from '@features/CheckoutOrder'
import OrderItems from '@features/OrderItems'
import { formatIDR } from '@utils/index'
import { useContext } from 'react'

import Button from '../../components/elements/Button'
import styles from './styles.module.css'

export const OrderSection = () => {
  const { setModal } = useContext(ModalContext)
  const { products, clearCart } = useContext(CartContext)

  const subtotal = products
    .map((item) => item.subtotal)
    .reduce((a, b) => a + b, 0)
  const discount = products
    .map((item) => item.discount)
    .reduce((a, b) => a + b, 0)
  const textRate = discount > 0 ? discount * 0.1 : subtotal * 0.1

  const summary = [
    { label: 'Subtotal', value: subtotal },
    { label: 'Diskon', value: discount },
    { label: 'Pajak 10%', value: textRate },
  ]
  const bill = subtotal - discount + textRate

  const onSuccess = () => {
    clearCart()
  }

  const handlePayment = () => {
    setModal({
      content: <CheckoutOrder onSuccess={onSuccess} products={products} />,
      open: true,
    })
  }

  return (
    <div className={styles.container}>
      {/* content */}
      <div className="p-8 space-y-4">
        {/* header */}
        <h1 className={styles.title}>Dfatar Pesanan</h1>

        {/* content */}
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-2 border-b border-border pb-4">
            <div className="col-span-3">Menu</div>
            <div className="justify-self-center">Qty</div>
            <div className="justify-self-end">Total</div>
          </div>

          <div className="overflow-y-auto h-[54vh] p-4 -m-4 space-y-4">
            {products.map((item, i) => (
              <OrderItems active data={item} key={i} notes="notes" />
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="p-8 border-t border-border">
        <div className="flex flex-col gap-3 pb-8">
          {summary.map((item, index) => (
            <div className="flex justify-between text-sm" key={index}>
              <p className="text-neutral-5">{item.label}</p>
              <p>{formatIDR(item.value)}</p>
            </div>
          ))}
          <div className="flex justify-between text-sm font-bold text-orange">
            <p>Total Tagihan</p>
            <p>{formatIDR(bill)}</p>
          </div>
        </div>
        <Button className="w-full justify-center" onClick={handlePayment}>
          Pembayaran
        </Button>
      </div>
    </div>
  )
}
