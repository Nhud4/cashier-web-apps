import DatePicker from '@components/fields/DatePicker'
import Dropdown from '@components/fields/Dropdown'
import Search from '@components/fields/Search'
import Layout from '@components/layout'
import CardOrder from '@features/CardOrder'
import { useQuerySlice } from '@redux/hooks'
import { clearTransaction } from '@redux/slices/transaction'
import { fetchTransactionList } from '@redux/slices/transaction/action'
import { customDateFormat } from '@utils/date'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'

const initialParams = {
  date: format(new Date(), 'yyyy-MM-dd'),
  page: 1,
  paymentStatus: '',
  search: '',
  size: 100,
}

export const Orders = () => {
  const [params, setParams] = useState(initialParams)

  const { data } = useQuerySlice<TransactionList[], TransactionListParams>({
    clearSlice: clearTransaction('list'),
    initial: params,
    key: 'list',
    slice: 'transaction',
    thunk: fetchTransactionList(params),
  })

  const statusOps = [
    { label: 'Success', value: 'success' },
    { label: 'Pending', value: 'pending' },
  ]
  const selectedStatus = useMemo(() => {
    return statusOps.filter((item) => item.value === params.paymentStatus)
  }, [params.paymentStatus, statusOps])

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
                onChange={(val) => {
                  setParams((prev) => ({
                    ...prev,
                    date: val
                      ? customDateFormat(val as unknown as string, 'yyyy-MM-dd')
                      : '',
                  }))
                }}
                placeholderText="Tanggal transaksi"
                value={params.date ? new Date(params.date) : null}
              />
              <Dropdown
                isClearable
                name="status"
                onChange={(ops) =>
                  setParams((prev) => ({
                    ...prev,
                    paymentStatus: ops === null ? '' : ops.value,
                  }))
                }
                options={statusOps}
                placeholder="Pembayaran..."
                value={selectedStatus}
              />
              <Search
                onSearch={(val) =>
                  setParams((prev) => ({ ...prev, search: val || '' }))
                }
                placeholder="Cari transaksi disini..."
                searchValue={params.search}
              />
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
