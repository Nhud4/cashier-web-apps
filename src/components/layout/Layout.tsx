import Header from '@components/elements/Header'
import Notify from '@components/elements/Notify'
import Sidebar from '@components/elements/Sidebar'
import { NotifyContext } from '@contexts/NotifyContext'
// import { authProfile } from '@redux/slices/auth/action'
import { useContext, useEffect } from 'react'
import OrderSection from '@components/elements/OrderSection'

import styles from './styles.module.css'

type Props = {
  children: React.ReactNode
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = 'Dashboard' }) => {
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
      <main className={styles.content}>
        <Header title={title} />
        <div className={styles.mainContent}>{children}</div>
      </main>
      <OrderSection />
      <Notify />
    </div>
  )
}
export { Layout }
