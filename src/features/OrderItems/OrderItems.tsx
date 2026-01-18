import Button from '@components/elements/Button'
import TextInput from '@components/fields/TextInput'
import ICONS from '@configs/icons'
import { formatIDR } from '@utils/index'
import React, { useState } from 'react'

type Props = {
  active?: boolean
  notes?: string
}

export const OrderItems: React.FC<Props> = ({ active, notes }) => {
  const [qty, setQty] = useState(1)

  const plusButton = () => {
    setQty((prev) => prev + 1)
  }

  const minusButton = () => {
    setQty((prev) => prev - 1)
  }

  return (
    <div className="space-y-2 border-b border-border pb-2">
      <div className="grid grid-cols-5 gap-2 text-sm">
        <div className="col-span-3">
          <h2>Mie Goreng sambal mangga</h2>
          <p className="text-orange">{formatIDR(12000)}</p>
        </div>
        {active ? (
          <div className="flex items-center space-x-2 justify-self-center h-fit">
            <button onClick={minusButton} type="button">
              <ICONS.MinusCircle />
            </button>
            <div className="w-4 text-center">{qty}</div>
            <button onClick={plusButton} type="button">
              <ICONS.PlusCircle />
            </button>
          </div>
        ) : (
          <p className="justify-self-center">{qty}</p>
        )}
        <div className="justify-self-end font-semibold text-neutral-5">
          {formatIDR(12000)}
        </div>
      </div>

      <div className="flex gap-4 w-full">
        {notes ? (
          <TextInput
            className="text-sm w-full"
            disabled={!active}
            name="notes"
            placeholder="Catatan..."
          />
        ) : null}
        {active ? (
          <Button variant="outline">
            <ICONS.Trash />
          </Button>
        ) : null}
      </div>
    </div>
  )
}
