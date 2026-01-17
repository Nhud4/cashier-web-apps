import TextInput from '@components/fields/TextInput'
import ICONS from '@configs/icons'
import { formatIDR } from '@utils/index'
import { useState } from 'react'

import Button from '../Button'
import styles from './styles.module.css'

export const OrderSection = () => {
  const [qty, setQty] = useState(1)
  const [orderType, setOrderType] = useState('in')

  const summary = [
    { label: 'Subtotal', value: 12000 },
    { label: 'Diskon', value: 0 },
    { label: 'Pajak', value: 1200 },
  ]
  const bill = summary.map((val) => val.value).reduce((a, b) => a + b, 0)

  const plusButton = () => {
    setQty((prev) => prev + 1)
  }

  const minusButton = () => {
    setQty((prev) => prev - 1)
  }

  const handleOrderType = (val: string) => {
    setOrderType(val)
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
          <div className="grid grid-cols-5 gap-2 border-b pb-4">
            <div className="col-span-3">Menu</div>
            <div>Qty</div>
            <div>Total</div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2 text-sm">
              <div className="col-span-3">Mie Goreng sambal mangga</div>
              <div className="flex items-center space-x-2">
                <button onClick={minusButton} type="button">
                  <ICONS.MinusCircle />
                </button>
                <div className="w-4 text-center">{qty}</div>
                <button onClick={plusButton} type="button">
                  <ICONS.PlusCircle />
                </button>
              </div>
              <div>{formatIDR(12000)}</div>
            </div>

            <div className="flex gap-4 w-full">
              <TextInput
                className="text-sm w-full"
                name="notes"
                placeholder="Catatan..."
              />
              <Button variant="outline">
                <ICONS.Trash />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2 text-sm">
              <div className="col-span-3 capitalize">
                Mie Goreng sambal mangga
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={minusButton} type="button">
                  <ICONS.MinusCircle />
                </button>
                <div className="w-4 text-center">{qty}</div>
                <button onClick={plusButton} type="button">
                  <ICONS.PlusCircle />
                </button>
              </div>
              <div>{formatIDR(12000)}</div>
            </div>

            <div className="flex gap-4 w-full">
              <TextInput
                className="text-sm w-full"
                name="notes"
                placeholder="Catatan..."
              />
              <Button variant="outline">
                <ICONS.Trash />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="p-8 border-t">
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
