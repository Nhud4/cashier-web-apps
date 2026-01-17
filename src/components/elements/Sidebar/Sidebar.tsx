import ICONS from '@configs/icons'
import routes from '@routes/index'
import { clsx } from '@utils/index'
import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

export const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const navRef = useRef<HTMLUListElement | null>(null)

  const menus = routes.filter(({ isSidebar }) => isSidebar)

  const isActive = (path?: string) => {
    return pathname === path ? styles.active : ''
  }

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.brand}>
          <ICONS.Logo />
        </div>
        <ul className={styles.nav} ref={navRef}>
          {menus.map((menu, index) => {
            const menuPath = menu.path as string
            return (
              <li>
                <div className={styles.curved}>
                  <div className={styles.topCurved}>
                    <div />
                  </div>
                </div>
                <div
                  className={clsx([styles.menu, isActive(menu.path)])}
                  key={index}
                >
                  <button
                    disabled={menu.disabled}
                    onClick={() => navigate(menuPath)}
                  >
                    {menu.icon}
                  </button>
                </div>
                <div className={styles.curved}>
                  <div className={styles.bottomCurved}>
                    <div />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
