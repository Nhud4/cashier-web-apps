import HeaderMenuCategory from '@features/HeaderMenuCategory'

import Navbar from '../Navbar'
import styles from './styles.module.css'

type Props = {
  title?: string
}

const Header: React.FC<Props> = ({ title = 'Dashboard' }) => (
  <header className={styles.header}>
    <Navbar title={title} />
    <HeaderMenuCategory />
  </header>
)

export { Header }
