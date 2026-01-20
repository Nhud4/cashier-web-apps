import Search from '@components/fields/Search'
import Layout from '@components/layout'
import CardMenu from '@features/CardMenu'
import { useQuerySlice } from '@redux/hooks'
import { clearProduct } from '@redux/slices/products'
import { fetchProductList } from '@redux/slices/products/action'
import { getLocalDay } from '@utils/date'
import type React from 'react'

const initialParams = {
  page: 1,
  size: 0,
}

export const Dashboard: React.FC = () => {
  const { data, loading } = useQuerySlice<ProductList[], TableParams>({
    clearSlice: clearProduct('list'),
    initial: initialParams,
    key: 'list',
    slice: 'products',
    thunk: fetchProductList(initialParams),
  })

  return (
    <Layout
      actionComponent={<Search placeholder="Cari menu disini..." />}
      headerMenu
      orderCard
      subTitle={getLocalDay()}
      title="SaR-1 Cafe and Resto"
    >
      <section className="page layout">
        <div className="flex flex-wrap gap-[35px] overflow-y-auto pb-10">
          <CardMenu data={data} loading={loading} />
        </div>
      </section>
    </Layout>
  )
}
