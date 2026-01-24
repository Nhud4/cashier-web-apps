import Header from '@components/elements/Header'
import Notify from '@components/elements/Notify'
import { NotifyContext } from '@contexts/NotifyContext'
import FloatingMenu from '@features/FloatingMenu'
import OrderSection from '@features/OrderSection'
import { useWindowWidth } from '@utils/hooks'
import { useContext, useEffect } from 'react'

import styles from './styles.module.css'

type Props = {
  children: React.ReactNode
  title?: string
  orderCard?: boolean
  subTitle?: string
  headerMenu?: boolean
}

const Layout: React.FC<Props> = ({
  children,
  title = 'Dashboard',
  orderCard = true,
  subTitle,
  headerMenu,
}) => {
  const { setNotify } = useContext(NotifyContext)
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth <= 640

  useEffect(() => {
    window.addEventListener('offline', () => {
      setNotify({
        color: 'warning',
        isOpen: true,
        message: 'Kamu sepertinya sedang offline. Cek kembali koneksi internet',
      })
    })

    window.addEventListener('online', () => {
      setNotify({
        color: 'success',
        isOpen: true,
        message: 'Kembali terhubung ke internet',
      })
    })
  }, [setNotify])

  return (
    <div className={`${styles.container} ${styles.withSidebar}`}>
      <main
        className={`${styles.content} ${orderCard ? styles.orderCard : ''}`}
      >
        <Header
          headerMenu={headerMenu}
          orderCard={orderCard}
          subTitle={subTitle}
          title={title}
        />
        <div className="mt-32">{children}</div>
      </main>
      {isMobile ? <FloatingMenu /> : null}
      {orderCard ? <OrderSection /> : null}
      <Notify />
    </div>
  )
}
export { Layout }
