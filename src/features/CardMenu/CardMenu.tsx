import BaseCard from '@components/modules/BaseCard'
import ICONS from '@configs/icons'
import IMAGES from '@configs/images'
import { CartContext } from '@contexts/CartContext/context'
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
  const { addProduct, products, minusQty, plusQty } = useContext(CartContext)

  const handleClick = (val: ProductList) => {
    addProduct({
      discount: val.discount,
      name: val.name,
      price: val.price,
      productId: Number(val.id),
      qty: 1,
      subtotal: val.price,
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
      <div
        className={clsx([
          styles.container,
          isAvail ? 'cursor-pointer' : 'cursor-not-allowed',
        ])}
        key={index}
      >
        <BaseCard className={styles.card}>
          <img
            alt="menu"
            className="object-cover h-40 rounded-t-2xl border-b border-b-border"
            src={item.img || IMAGES.Food}
          />

          <div>
            <h1>{item.name}</h1>
            <h2>{formatIDR(item.price)}</h2>
            <p>Tersedia {item.stock}</p>
          </div>

          <div className="w-full">
            {ordData ? (
              <div className="flex items-center justify-between h-12">
                <button onClick={() => minusQty(Number(item.id))}>
                  <ICONS.MinusCircle height={30} width={30} />
                </button>
                <p className="font-semibold">{ordData?.qty || 0}</p>
                <ICONS.PlusCircle
                  height={30}
                  onClick={() => plusQty(Number(item.id))}
                  width={30}
                />
              </div>
            ) : (
              <button
                className="text-sm p-3 border border-orange rounded-full w-full h-12"
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
