import Dropdown from '@components/fields/Dropdown'
import Search from '@components/fields/Search'
import Layout from '@components/layout'
import CardMenu from '@features/CardMenu'
import HeaderMenuCategory from '@features/HeaderMenuCategory'
import { useQuerySlice } from '@redux/hooks'
import { clearProduct } from '@redux/slices/products'
import { fetchProductList } from '@redux/slices/products/action'
import { getLocalDay } from '@utils/date'
import type React from 'react'
import { useState } from 'react'

const initialParams = {
  page: 1,
  size: 0,
}

export const Dashboard: React.FC = () => {
  const [params, setParam] = useState<TableParams>(initialParams)
  const [alo, setAlo] = useState('in')

  const aloOps = [
    { label: 'Dine In', value: 'in' },
    { label: 'Take Way', value: 'out' },
    { label: 'Paket', value: 'batch' },
  ]

  const { data, loading } = useQuerySlice<ProductList[], TableParams>({
    clearSlice: clearProduct('list'),
    initial: params,
    key: 'list',
    slice: 'products',
    thunk: fetchProductList(params),
  })

  const onSearch = (search: string) => {
    setParam((prev) => ({ ...prev, search }))
  }

  const selected = aloOps.filter((item) => item.value === alo)

  return (
    <Layout
      headerMenu
      orderCard
      subTitle={getLocalDay()}
      title="SaR-1 Cafe and Resto"
    >
      <section className="page layout">
        <div className="space-y-8">
          <HeaderMenuCategory />

          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Pilih Menu</h1>
            <div className="flex items-center space-x-4">
              <Search onSearch={onSearch} placeholder="Cari menu disini..." />
              <Dropdown
                name="alo"
                onChange={(ops) => setAlo(ops === null ? '' : ops.value)}
                options={aloOps}
                value={selected}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 overflow-y-auto pb-10">
            <CardMenu data={data} loading={loading} />
          </div>
        </div>
      </section>
    </Layout>
  )
}
