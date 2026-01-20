import BaseCard from '@components/modules/BaseCard'
import IMAGES from '@configs/images'
import { CartContext } from '@contexts/CartContext/context'
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
  const { addProduct } = useContext(CartContext)

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
          <Skeleton width={150} />
          <Skeleton width={100} />
          <Skeleton width={100} />
        </BaseCard>
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
      </BaseCard>
    </div>
  ))
}
