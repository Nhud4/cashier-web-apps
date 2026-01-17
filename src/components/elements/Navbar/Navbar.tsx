import Search from '@components/fields/Search'

import styles from './styles.module.css'

type Props = {
  title?: string
}

const Navbar: React.FC<Props> = ({ title = 'Dasboard' }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>
        <h1>{title}</h1>
        <p>Sabtu, 10 Januari 2026</p>
      </div>

      <Search placeholder="Cari menu disini..." />
    </nav>
  )
}

export { Navbar }
