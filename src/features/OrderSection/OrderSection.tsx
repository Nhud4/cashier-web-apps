import EmptyData from '@components/elements/EmptyData'
import { CartContext } from '@contexts/CartContext/context'
import { ModalContext } from '@contexts/ModalContext'
import CheckoutOrder from '@features/CheckoutOrder'
import OrderItems from '@features/OrderItems'
import PrintDocument from '@features/PrintDocument'
import { useAppDispatch,useAppSelector } from '@redux/hooks'
import { fetchProductList } from '@redux/slices/products/action'
import { formatIDR } from '@utils/index'
import { useContext, useState } from 'react'

import Button from '../../components/elements/Button'
import { PrintStruk } from './action'
import styles from './styles.module.css'

export const OrderSection = () => {
  const { setModal } = useContext(ModalContext)
  const { products, clearCart } = useContext(CartContext)
  const [printData, setPrintData] = useState<ReceiptData>()
  const dispatch = useAppDispatch()

  const { data } = useAppSelector((state) => state.products.list)

  const subtotal = products
    .map((item) => item.subtotal)
    .reduce((a, b) => a + b, 0)
  const textRate = subtotal * 0.1

  const summary = [
    { label: 'Subtotal', value: subtotal },
    { label: 'Pajak 10%', value: textRate },
  ]
  const bill = subtotal + textRate

  const onSuccess = (receipt: ReceiptData) => {
    setPrintData(receipt)
    PrintStruk()
    clearCart()
    dispatch(fetchProductList({ page: 1, size: 0 }))
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
        <div>
          <h1 className={styles.title}>Dfatar Pesanan</h1>
          <p>Menu: {products.length}</p>
        </div>

        {/* content */}
        {products.length === 0 ? (
          <EmptyData desc="Silahkan pilih menu untuk menambahkan pesanan" />
        ) : (
          <div className="space-y-4 pt-8">
            <div className="overflow-y-auto min-h-[20vh] max-h-[54vh] p-4 -m-4 space-y-4">
              {products.map((item, i) => {
                const ordData = data?.filter(
                  (val) => Number(val.id) === item.productId
                )[0]
                const stock = ordData?.stock || 0
                const isAvail = stock > 0 && stock <= item.qty ? false : true
                return (
                  <OrderItems
                    active
                    available={isAvail}
                    data={item}
                    key={i}
                    notes="notes"
                  />
                )
              })}
            </div>
          </div>
        )}
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
        <Button
          className="w-full justify-center"
          disabled={products.length === 0}
          onClick={handlePayment}
        >
          Pembayaran
        </Button>
      </div>

      <PrintDocument receiptData={printData} />
    </div>
  )
}
