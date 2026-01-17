import { formatIDR } from '@utils/index'

import Button from '../Button'
import styles from './styles.module.css'

export const OrderSection = () => {
  const summary = [
    { label: 'Subtotal', value: 12000 },
    { label: 'Diskon', value: 0 },
    { label: 'Pajak', value: 1200 },
  ]
  const bill = summary.map((val) => val.value).reduce((a, b) => a + b, 0)

  return (
    <div className={styles.container}>
      {/* content */}
      <div className="p-8">
        {/* header */}
        <div>
          <h1 className={styles.title}>Dfatar Pesanan</h1>
          <div className="flex gap-4">
            <Button>Dine In</Button>
            <Button variant="outline">Take Way</Button>
          </div>
        </div>

        {/* content */}
        <div></div>
      </div>

      {/* footer */}
      <div className="p-8 border border-t-neutral-2">
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
        <Button className="w-full justify-center">Pembayaran</Button>
      </div>
    </div>
  )
}
