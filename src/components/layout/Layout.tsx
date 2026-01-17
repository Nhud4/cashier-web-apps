import Header from '@components/elements/Header'
import Notify from '@components/elements/Notify'
import Sidebar from '@components/elements/Sidebar'
import { NotifyContext } from '@contexts/NotifyContext'
import OrderSection from '@features/OrderSection'
// import { authProfile } from '@redux/slices/auth/action'
import { useContext, useEffect } from 'react'

import styles from './styles.module.css'

type Props = {
  children: React.ReactNode
  title?: string
  orderCard?: boolean
  subTitle?: string
  headerMenu?: boolean
  actionComponent?: React.ReactElement
}

const Layout: React.FC<Props> = ({
  children,
  title = 'Dashboard',
  orderCard = true,
  subTitle,
  headerMenu,
  actionComponent,
}) => {
  const { setNotify } = useContext(NotifyContext)
  // const dispatch = useAppDispatch()
  // const { data } = useAppSelector((state) => state.auth.profile)

  // useEffect(() => {
  //   if (!data.name) {
  //     dispatch(authProfile())
  //   }
  // }, [dispatch, data])

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
      <Sidebar />
      <main
        className={`${styles.content} ${orderCard ? styles.orderCard : ''}`}
      >
        <Header
          actionComponent={actionComponent}
          headerMenu={headerMenu}
          orderCard={orderCard}
          subTitle={subTitle}
          title={title}
        />
        <div className={orderCard ? 'mt-40' : 'mt-32'}>{children}</div>
      </main>
      {orderCard ? <OrderSection /> : null}
      <Notify />
    </div>
  )
}
export { Layout }
