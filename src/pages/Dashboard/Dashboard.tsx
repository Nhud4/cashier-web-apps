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

import styles from './styles.module.css'

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
    if (search !== null) {
      setParam((prev) => ({ ...prev, search }))
    }
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
        <div className="space-y-4">
          <HeaderMenuCategory />

          <div className={styles.header}>
            <h1>Pilih Menu</h1>
            <div className={styles.action}>
              <Search onSearch={onSearch} placeholder="Cari menu disini..." />
              <Dropdown
                name="alo"
                onChange={(ops) => setAlo(ops === null ? '' : ops.value)}
                options={aloOps}
                value={selected}
              />
            </div>
          </div>
          <div className={styles.menu}>
            <CardMenu data={data} loading={loading} />
          </div>
        </div>
      </section>
    </Layout>
  )
}
