import EmptyData from '@components/elements/EmptyData'
import CardOrder from '@features/CardOrder'
import type React from 'react'

import styles from './styles.module.css'

type Props = {
  data: TransactionList[]
  loading: boolean
}

export const OrderList: React.FC<Props> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className={styles.list}>
        {new Array(12).fill('').map((_, index) => (
          <CardOrder key={index} loading />
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return <EmptyData />
  }

  return (
    <div className={styles.list}>
      {data.map((item, index) => (
        <CardOrder data={item} key={index} />
      ))}
    </div>
  )
}
