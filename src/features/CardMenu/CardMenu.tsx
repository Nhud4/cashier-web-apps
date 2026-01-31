import OrderNotes from '@components/forms/OrderNotes'
import BaseCard from '@components/modules/BaseCard'
import ICONS from '@configs/icons'
import IMAGES from '@configs/images'
import { CartContext } from '@contexts/CartContext/context'
import { ModalContext } from '@contexts/ModalContext'
import { useWindowWidth } from '@utils/hooks'
import { clsx, formatIDR } from '@utils/index'
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
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth <= 640

  const availData = data?.filter((item) => item.stock > 0) || []
  const inactiveData = data?.filter((item) => item.stock === 0) || []
  const newData = [...availData, ...inactiveData]

  const handleClick = (val: ProductList) => {
    const subtotal = val.discountPrice
      ? val.price - val.discountPrice
      : val.price
    addProduct({
      discount: val.discount,
      name: val.name,
      price: val.price,
      printTarget: val.category.printTarget,
      productId: Number(val.id),
      qty: 1,
      subtotal,
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
  return newData?.map((item, index) => {
    const ordData = products.filter(
      (val) => val.productId === Number(item.id)
    )[0]
    const itemQty = ordData?.qty || 0
    let isAvail = true
    if (item.stock === 0) isAvail = false
    if (itemQty > 0 && itemQty >= item.stock) isAvail = false
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
                <h2>{formatIDR(item.price - item.discountPrice)}</h2>
                <p className="text-neutral-3 line-through text-sm">
                  {formatIDR(item.price)}
                </p>
              </div>
            ) : (
              <h2>{formatIDR(item.price)}</h2>
            )}
            <p>Tersedia {item.stock - itemQty}</p>
          </div>

          <div className="flex items-end h-full w-full !pt-0">
            {isMobile && ordData ? (
              <div className="flex items-center justify-between w-full">
                <button
                  className="flex items-center space-x-2 rounded-full h-fit text-neutral-3"
                  onClick={() => handleNotes(Number(item.id))}
                >
                  <ICONS.Note height={24} width={24} />
                </button>

                <div
                  className={clsx([
                    'flex items-center justify-between h-12 min-w-20',
                    !isMobile ? 'w-full' : '',
                  ])}
                >
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
                className="flex items-center justify-center text-sm bg-neutral-1 rounded-full w-full h-10"
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
