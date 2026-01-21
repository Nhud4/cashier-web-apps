import Button from '@components/elements/Button'
import BaseCard from '@components/modules/BaseCard'
import { customDateFormat } from '@utils/date'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

type Props = {
  data: TransactionList
}

export const CardOrder: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate()

  return (
    <BaseCard>
      <div className={styles.header}>
        <p>{data.code}</p>
        <p>{customDateFormat(data.createdAt, 'HH.mm', 'WIB')}</p>
      </div>

      <table className={styles.data}>
        <tr>
          <th>Pelanggan</th>
          <td className="capitalize">{data.customerName}</td>
        </tr>
        <tr>
          <th>No Meja</th>
          <td>{data.tableNumber}</td>
        </tr>
        <tr>
          <th>Jenis Transaksi</th>
          <td>Dine In</td>
        </tr>
        <tr>
          <th>Pembayaran</th>
          <td>Nanti</td>
        </tr>
      </table>

      <div className="pb-4 px-4">
        <Button
          className="w-full justify-center"
          onClick={() => navigate('/order/TRX-2601010001')}
          variant="outline"
        >
          Detail Pesanan
        </Button>
      </div>
    </BaseCard>
  )
}
