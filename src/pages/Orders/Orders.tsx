import DatePicker from '@components/fields/DatePicker'
import Search from '@components/fields/Search'
import Layout from '@components/layout'
import CardOrder from '@features/CardOrder'
import { useQuerySlice } from '@redux/hooks'
import { clearTransaction } from '@redux/slices/transaction'
import { fetchTransactionList } from '@redux/slices/transaction/action'
import { useState } from 'react'

const initialParams = {
  page: 1,
  size: 100,
}

export const Orders = () => {
  const [date, setDate] = useState<Date | null>()

  const { data } = useQuerySlice<TransactionList[], TableParams>({
    clearSlice: clearTransaction('list'),
    initial: initialParams,
    key: 'list',
    slice: 'transaction',
    thunk: fetchTransactionList(initialParams),
  })

  return (
    <Layout
      orderCard={false}
      subTitle="Daftar transaksi perhari"
      title="Transaksi"
    >
      <section className="layout page">
        <div>
          <div className="flex items-center justify-between pb-8">
            <div>
              <h1 className="font-semibold text-lg">Daftar Transaksi</h1>
              <p className="text-sm">Total transaksi: 10</p>
            </div>
            <div className="flex items-center space-x-4">
              <DatePicker
                name="date"
                onChange={(val) => setDate(val ? new Date(val as Date) : null)}
                placeholderText="Tanggal pesanan"
                value={date}
              />
              <Search placeholder="Cari pesanan disini..." />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {data.map((item, index) => (
              <CardOrder data={item} key={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
