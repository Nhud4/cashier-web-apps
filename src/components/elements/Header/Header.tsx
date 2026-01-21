import HeaderMenuCategory from '@features/HeaderMenuCategory'
import { clsx } from '@utils/index'

import Navbar from '../Navbar'
import styles from './styles.module.css'

type Props = {
  title?: string
  subTitle?: string
  headerMenu?: boolean
  orderCard?: boolean
}

export const Header: React.FC<Props> = ({
  title = 'Dashboard',
  subTitle,
  headerMenu,
  orderCard,
}) => {
  return (
    <header
      className={clsx([
        styles.header,
        orderCard ? styles.order : styles.notOrder,
      ])}
    >
      <Navbar headerMenu={headerMenu} subtitle={subTitle} title={title} />
      {headerMenu ? <HeaderMenuCategory /> : null}
    </header>
  )
}
