import Button from '@components/elements/Button'
import TextInput from '@components/fields/TextInput'
import { CartContext } from '@contexts/CartContext/context'
import React, { useContext, useState } from 'react'

type Props = {
  productId: number
  onSubmit: (productId: number, note: string) => void
}

export const OrderNotes: React.FC<Props> = ({ productId, onSubmit }) => {
  const { products } = useContext(CartContext)
  const notesOrder = products.filter((item) => item.productId === productId)[0]

  const [notes, setNotes] = useState(notesOrder?.notes || '')

  return (
    <div className="space-y-4">
      <TextInput
        isArea
        name="notes"
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Catatan..."
        value={notes}
      />
      <Button
        className="w-full justify-center"
        onClick={() => onSubmit(productId, notes)}
      >
        Tambah Catatan
      </Button>
    </div>
  )
}
