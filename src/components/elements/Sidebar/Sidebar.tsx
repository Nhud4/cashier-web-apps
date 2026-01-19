import ICONS from '@configs/icons'
import { useAppDispatch } from '@redux/hooks'
import { clearAuth } from '@redux/slices/auth'
import routes from '@routes/index'
import { clearStorage } from '@storage/index'
import { clsx } from '@utils/index'
import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

export const Sidebar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const navRef = useRef<HTMLUListElement | null>(null)
  const dispatch = useAppDispatch()

  const menus = routes.filter(({ isSidebar }) => isSidebar)

  const isActive = (path?: string) => {
    return pathname === path ? styles.active : ''
  }

  const handleLogout = () => {
    clearStorage()
    dispatch(clearAuth('add'))
    window.location.href = '/login'
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
                <div className={clsx([styles.curved, isActive(menu.path)])}>
                  <div
                    className={clsx([styles.topCurved, isActive(menu.path)])}
                  >
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
                <div className={clsx([styles.curved, isActive(menu.path)])}>
                  <div
                    className={clsx([styles.bottomCurved, isActive(menu.path)])}
                  >
                    <div />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <button className="absolute bottom-10" onClick={handleLogout}>
          <ICONS.SingOut />
        </button>
      </div>
    </section>
  )
}
