import ICONS from '@configs/icons'
import IMAGES from '@configs/images'
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

      <div className="flex items-center space-x-4">
        {pathname === '/' ? (
          <button className={styles.report} onClick={() => navigate('/order')}>
            <ICONS.Report color="#EA7C69" />
          </button>
        ) : (
          <button className={styles.report} onClick={() => navigate('/')}>
            <ICONS.Home color="#EA7C69" />
          </button>
        )}

        <button className="flex items-center space-x-4 border border-neutral pl-6 pr-2 py-2 rounded-full">
          <div className="text-left">
            <h1 className="font-semibold text-orange">Wahyudin</h1>
            <p className="text-xs text-neutral-5">Kasir</p>
          </div>
          <img alt="avatar" src={IMAGES.Avatar} />
        </button>
      </div>
    </nav>
  )
}

export { Navbar }
