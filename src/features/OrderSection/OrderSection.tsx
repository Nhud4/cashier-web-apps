import { ModalContext } from '@contexts/ModalContext'
import CheckoutOrder from '@features/CheckoutOrder'
import OrderItems from '@features/OrderItems'
import { formatIDR } from '@utils/index'
import { useContext, useState } from 'react'

import Button from '../../components/elements/Button'
import styles from './styles.module.css'

export const OrderSection = () => {
  const { setModal } = useContext(ModalContext)
  const [orderType, setOrderType] = useState('in')

  const summary = [
    { label: 'Subtotal', value: 12000 },
    { label: 'Diskon', value: 0 },
    { label: 'Pajak', value: 1200 },
  ]
  const bill = summary.map((val) => val.value).reduce((a, b) => a + b, 0)

  const handleOrderType = (val: string) => {
    setOrderType(val)
  }

  const handlePayment = () => {
    setModal({
      content: <CheckoutOrder />,
      open: true,
    })
  }

  return (
    <div className={styles.container}>
      {/* content */}
      <div className="p-8 space-y-4">
        {/* header */}
        <div className="space-y-4">
          <h1 className={styles.title}>Dfatar Pesanan</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => handleOrderType('in')}
              variant={orderType === 'in' ? 'fill' : 'outline'}
            >
              Dine In
            </Button>
            <Button
              onClick={() => handleOrderType('out')}
              variant={orderType === 'out' ? 'fill' : 'outline'}
            >
              Take Way
            </Button>
          </div>
        </div>

        {/* content */}
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-2 border-b border-border pb-4">
            <div className="col-span-3">Menu</div>
            <div className="justify-self-center">Qty</div>
            <div className="justify-self-end">Total</div>
          </div>

          <div className="overflow-y-auto h-[45vh] p-4 -m-4 space-y-4">
            {new Array(10).fill('').map((_, i) => (
              <OrderItems active key={i} notes="notes" />
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
          <div className="flex justify-between text-base font-bold text-orange">
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
