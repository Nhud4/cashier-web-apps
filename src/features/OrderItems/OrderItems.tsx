import Button from '@components/elements/Button'
import TextInput from '@components/fields/TextInput'
import ICONS from '@configs/icons'
import { CartContext } from '@contexts/CartContext/context'
import { useDebounce } from '@utils/hooks'
import { formatIDR } from '@utils/index'
import React, { useContext, useEffect, useState } from 'react'

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
    <div className="space-y-2 border-b border-border pb-2">
      <div className="grid grid-cols-5 gap-2 text-sm">
        <div className="col-span-3">
          <h2 className="capitalize">{data.name}</h2>
          <p className="text-orange">{formatIDR(data.price)}</p>
        </div>
        {active ? (
          <div className="flex items-center space-x-2 justify-self-center h-fit">
            <button onClick={() => minusQty(data.productId)} type="button">
              <ICONS.MinusCircle />
            </button>
            <div className="w-4 text-center">{data.qty}</div>
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

      <div className="flex gap-4 w-full">
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
