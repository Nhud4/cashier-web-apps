import DatePicker from '@components/fields/DatePicker'
import Search from '@components/fields/Search'
import Layout from '@components/layout'
import ListOrderTable from '@features/ListOrderTable'
import { useState } from 'react'

export const Orders = () => {
  const [date, setDate] = useState<Date | null>()

  return (
    <Layout
      actionComponent={
        <div className="flex items-center space-x-4">
          <DatePicker
            name="date"
            onChange={(val) => setDate(val ? new Date(val as Date) : null)}
            placeholderText="Tanggal pesanan"
            value={date}
          />
          <Search placeholder="Cari pesanan disini..." />
        </div>
      }
      orderCard={false}
      subTitle="Total Pesanan: 10"
      title="Daftar Pesanan"
    >
      <section className="layout page pageHight">
        <ListOrderTable />
      </section>
    </Layout>
  )
}
