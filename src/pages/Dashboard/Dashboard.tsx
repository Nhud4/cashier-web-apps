import Layout from '@components/layout'
import CardMenu from '@features/CardMenu'
import type React from 'react'

export const Dashboard: React.FC = () => {
  return (
    <Layout title="SaR-1 Cafe and Resto">
      <section className="page layout">
        <div className="flex flex-wrap justify-between overflow-y-auto pb-10">
          <CardMenu />
          <CardMenu />
          <CardMenu />
          <CardMenu />
          <CardMenu />
          <CardMenu />
          <CardMenu />
          <CardMenu />
          <CardMenu />
          <CardMenu />
          <CardMenu />
          <CardMenu />
        </div>
      </section>
    </Layout>
  )
}
