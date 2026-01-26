import OrderNotes from '@components/forms/OrderNotes'
import BaseCard from '@components/modules/BaseCard'
import ICONS from '@configs/icons'
import IMAGES from '@configs/images'
import { CartContext } from '@contexts/CartContext/context'
import { ModalContext } from '@contexts/ModalContext'
import { formatIDR } from '@utils/index'
import type React from 'react'
import { useContext } from 'react'
import Skeleton from 'react-loading-skeleton'

import styles from './styles.module.css'

type Props = {
  loading?: boolean
  data?: ProductList[]
}

export const CardMenu: React.FC<Props> = ({ data, loading }) => {
  const { addProduct, products, minusQty, plusQty, addNotes } =
    useContext(CartContext)
  const { setModal, onClose } = useContext(ModalContext)

  const handleClick = (val: ProductList) => {
    addProduct({
      discount: val.discount,
      name: val.name,
      price: val.discountPrice ? val.discountPrice : val.price,
      productId: Number(val.id),
      qty: 1,
      subtotal: val.price,
    })
  }

  const handleAddNotes = (productId: number, notes: string) => {
    addNotes(productId, notes)
    onClose()
  }

  const handleNotes = (productId: number) => {
    setModal({
      content: <OrderNotes onSubmit={handleAddNotes} productId={productId} />,
      open: true,
      title: 'Catatan Pesanan',
    })
  }

  if (loading) {
    return new Array(10).fill('').map((_, index) => (
      <div className={styles.container} key={index}>
        <BaseCard className={styles.card}>
          <img
            alt="menu"
            className="object-cover h-40 rounded-t-2xl border-b border-b-border"
            src={IMAGES.Food}
          />
          <div>
            <Skeleton width={150} />
            <Skeleton width={100} />
            <Skeleton width={100} />
          </div>
        </BaseCard>
      </div>
    ))
  }
  return data?.map((item, index) => {
    const ordData = products.filter(
      (val) => val.productId === Number(item.id)
    )[0]
    const isAvail = item?.stock !== 0 ? ordData?.qty !== item.stock : false
    return (
      <div className={styles.container} key={index}>
        <BaseCard className={styles.card}>
          <img
            alt="menu"
            className="object-cover h-40 rounded-t-2xl border-b border-b-border"
            src={item.img || IMAGES.Food}
          />

          <div>
            <h1>{item.name}</h1>
            {item.discountPrice > 0 ? (
              <div className="flex items-center space-x-1">
                <p className="text-neutral-3 line-through">
                  {formatIDR(item.price)}
                </p>
                <h2>{formatIDR(item.discountPrice)}</h2>
              </div>
            ) : (
              <h2>{formatIDR(item.price)}</h2>
            )}
            <p>Tersedia {item.stock}</p>
          </div>

          <div className="flex items-end h-full w-full !pt-0">
            {ordData ? (
              <div className="flex items-center justify-between w-full">
                <button
                  className="flex items-center space-x-2 rounded-full h-fit text-neutral-3"
                  onClick={() => handleNotes(Number(item.id))}
                >
                  <ICONS.Note height={24} width={24} />
                </button>

                <div className="flex items-center justify-between h-12 min-w-20">
                  <button
                    className="h-full"
                    onClick={() => minusQty(Number(item.id))}
                  >
                    <ICONS.MinusCircle height={24} width={24} />
                  </button>

                  <p className="font-semibold">{ordData?.qty || 0}</p>
                  <button
                    className="h-full"
                    onClick={() => plusQty(Number(item.id))}
                  >
                    <ICONS.PlusCircle height={24} width={24} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="flex items-center justify-center text-sm border border-orange rounded-full w-full h-10"
                disabled={!isAvail}
                onClick={() => handleClick(item)}
              >
                Tambah
              </button>
            )}
          </div>
        </BaseCard>

        {!isAvail ? (
          <div className="absolute flex items-center justify-center top-0 left-0 bg-primary w-full h-full bg-opacity-25 rounded-2xl">
            <div className="bg-primary bg-opacity-50 text-white text-center rounded-full px-4 py-6 text-sm">
              Habis
            </div>
          </div>
        ) : null}
      </div>
    )
  })
}
