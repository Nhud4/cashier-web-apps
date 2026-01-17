import { clsx } from '@utils/index'

import styles from './styles.module.css'

type Props = {
  title?: string
  subtitle?: string
  headerMenu?: boolean
  actionComponent?: React.ReactElement
}

const Navbar: React.FC<Props> = ({
  title = 'Dasboard',
  subtitle,
  headerMenu,
  actionComponent,
}) => {
  return (
    <nav className={clsx([styles.navbar, headerMenu ? '' : styles.menu])}>
      <div className={styles.title}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {actionComponent}
    </nav>
  )
}

export { Navbar }
