import Layout from '@components/layout'
import { useParams } from 'react-router-dom'

export const DetailOrder = () => {
  const { id = '' } = useParams()

  return (
    <Layout orderCard={false} subTitle={id} title="Detail Transaksi">
      <section className="layout page">
        <div>Detail Order</div>
      </section>
    </Layout>
  )
}
