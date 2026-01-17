import Layout from '@components/layout'

export const Orders = () => {
  return (
    <Layout
      orderCard={false}
      subTitle="Total Pesanan: 10"
      title="Daftar Pesanan"
    >
      <section className="layout page">
        <div>Orders</div>
      </section>
    </Layout>
  )
}
