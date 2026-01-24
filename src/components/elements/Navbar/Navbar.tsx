import ICONS from '@configs/icons'
import IMAGES from '@configs/images'
import { clearStorage } from '@storage/index'
import { useWindowWidth } from '@utils/hooks'
import { clsx } from '@utils/index'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

type Props = {
  title?: string
  subtitle?: string
  headerMenu?: boolean
}

const Navbar: React.FC<Props> = ({
  title = 'Dasboard',
  subtitle,
  headerMenu,
}) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const splitPath = pathname
    .split('/')
    .filter((item) => ![''].includes(item))[0]
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth <= 640

  const handleSingOut = () => {
    clearStorage()
    window.location.href = '/login'
  }

  return (
    <nav className={clsx([styles.navbar, headerMenu ? '' : styles.menu])}>
      <div className="flex items-center space-x-4">
        <img
          alt="logo"
          className="bg-primary-3 w-14 h-14 object-cover rounded-lg"
          src={IMAGES.RestoLogo}
        />
        <div className={styles.title}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      {!isMobile ? (
        <div className="flex items-center space-x-4">
          <button
            className={clsx([
              styles.navMenu,
              pathname === '/' ? styles.active : '',
            ])}
            onClick={() => navigate('/')}
          >
            <ICONS.Home />
          </button>

          <button
            className={clsx([
              styles.navMenu,
              splitPath === 'order' ? styles.active : '',
            ])}
            onClick={() => navigate('/order')}
          >
            <ICONS.Bags />
          </button>

          <button className={styles.navMenu} onClick={handleSingOut}>
            <ICONS.SingOut />
          </button>
        </div>
      ) : null}
    </nav>
  )
}

export { Navbar }
