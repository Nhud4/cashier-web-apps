import Button from '@components/elements/Button'
import BaseCard from '@components/modules/BaseCard'
import { customDateFormat } from '@utils/date'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

type Props = {
  data?: TransactionList
  loading?: boolean
}

export const CardOrder: React.FC<Props> = ({ data, loading }) => {
  const navigate = useNavigate()
  if (loading) {
    return (
      <BaseCard className="p-4">
        <div className="flex items-center justify-between pb-4 border-b border-b-border">
          <Skeleton width={100} />
          <Skeleton width={100} />
        </div>

        <div className="my-4 space-y-1">
          <div>
            <Skeleton width={150} />
          </div>
          <div>
            <Skeleton width={50} />
          </div>
          <div>
            <Skeleton width={100} />
          </div>
        </div>

        <Skeleton height={48} />
      </BaseCard>
    )
  }

  return (
    <BaseCard>
      <div className={styles.header}>
        <p>{data?.code}</p>
        <p>{customDateFormat(data?.createdAt, 'HH.mm', 'WIB')}</p>
      </div>

      <table className="m-4">
        <tbody className={styles.data}>
          <tr>
            <th>Tanggal</th>
            <td>{data?.transactionDate}</td>
          </tr>
          <tr>
            <th>Pelanggan</th>
            <td className="capitalize">{data?.customerName}</td>
          </tr>
          <tr>
            <th>No Meja</th>
            <td>{data?.tableNumber}</td>
          </tr>
          <tr>
            <th>Pembayaran</th>
            <td className="capitalize">{data?.paymentStatus}</td>
          </tr>
        </tbody>
      </table>

      <div className="pb-4 px-4">
        <Button
          className="w-full justify-center"
          onClick={() => navigate(`/order/${data?.id}?code=${data?.code}`)}
          variant="outline"
        >
          Detail Pesanan
        </Button>
      </div>
    </BaseCard>
  )
}
