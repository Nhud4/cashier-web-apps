import BaseCard from '@components/modules/BaseCard'
import IMAGES from '@configs/images'
import { setBasket } from '@storage/index'
import { formatIDR } from '@utils/index'
import type React from 'react'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import styles from './styles.module.css'

type Props = {
  loading?: boolean
  data?: ProductList[]
}

export const CardMenu: React.FC<Props> = ({ data, loading }) => {
  const [products, setProducts] = useState<OrderProduct[]>([])

  const handleClick = (val: ProductList) => {
    setProducts((prev) => {
      const exist = prev.find((item) => item.productId === Number(val.id))
      if (exist) {
        return prev.map((item) => {
          if (item.productId === Number(val.id)) {
            const qty = item.qty + 1
            return { ...item, qty: qty, subtotal: val.price * qty }
          }
          return item
        })
      }
      return [
        ...prev,
        {
          discount: val.discount,
          productId: Number(val.id),
          qty: 1,
          subtotal: val.price,
        },
      ]
    })
  }

  useEffect(() => {
    setBasket(products)
  }, [products])

  if (loading) {
    return new Array(10).fill('').map((_, index) => (
      <div className={styles.container} key={index}>
        <BaseCard className={styles.card}>
          <Skeleton width={150} />
          <Skeleton width={100} />
          <Skeleton width={100} />
        </BaseCard>

        <div className={styles.images}>
          <img alt="foto" className={styles.photo} src={IMAGES.Food} />
        </div>
      </div>
    ))
  }
  return data?.map((item, index) => (
    <div
      className={styles.container}
      key={index}
      onClick={() => handleClick(item)}
    >
      <BaseCard className={styles.card}>
        <h1>{item.name}</h1>
        <h2>{formatIDR(item.price)}</h2>
        <p>Tersedia {item.stock}</p>
      </BaseCard>

      <div className={styles.images}>
        <img alt="foto" className={styles.photo} src={IMAGES.Food} />
      </div>
    </div>
  ))
}
