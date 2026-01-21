import Button from '@components/elements/Button'
import TextInput from '@components/fields/TextInput'
import ICONS from '@configs/icons'
import { CartContext } from '@contexts/CartContext/context'
import { useDebounce } from '@utils/hooks'
import { formatIDR } from '@utils/index'
import React, { useContext, useEffect, useState } from 'react'

import styles from './styles.module.css'

type Props = {
  data: CartProduct
  active?: boolean
  notes?: string
}

export const OrderItems: React.FC<Props> = ({ active, notes, data }) => {
  const [productNotes, setProductNotes] = useState(data.notes)
  const { plusQty, minusQty, removeProduct, addNotes } = useContext(CartContext)

  const debounceSearch = useDebounce(productNotes, 500)

  useEffect(() => {
    addNotes(data.productId, debounceSearch as string)
  }, [debounceSearch])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>{data.name}</h2>
          <p>{formatIDR(data.price)}</p>
        </div>
        {active ? (
          <div className={styles.qty}>
            <button onClick={() => minusQty(data.productId)} type="button">
              <ICONS.MinusCircle />
            </button>
            <div>{data.qty}</div>
            <button onClick={() => plusQty(data.productId)} type="button">
              <ICONS.PlusCircle />
            </button>
          </div>
        ) : (
          <p className="justify-self-center">{data.qty}</p>
        )}
        <div className="justify-self-end font-semibold text-neutral-5">
          {formatIDR(data.subtotal)}
        </div>
      </div>

      <div className={styles.footer}>
        {notes ? (
          <TextInput
            className="text-sm w-full"
            disabled={!active}
            name="notes"
            onChange={(e) => setProductNotes(e.target.value)}
            placeholder="Catatan..."
            value={productNotes}
          />
        ) : null}
        {active ? (
          <Button
            onClick={() => removeProduct(data.productId)}
            variant="outline"
          >
            <ICONS.Trash />
          </Button>
        ) : null}
      </div>
    </div>
  )
}
