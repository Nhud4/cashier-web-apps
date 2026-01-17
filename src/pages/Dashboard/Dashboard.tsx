import Layout from '@components/layout'
import CardMenu from '@features/CardMenu'
import { getLocalDay } from '@utils/date'
import type React from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Dashboard: React.FC = () => {
  const [_, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams({ cat: 'makanan' })
  }, [])

  return (
    <Layout
      headerMenu
      orderCard
      subTitle={getLocalDay()}
      title="SaR-1 Cafe and Resto"
    >
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
