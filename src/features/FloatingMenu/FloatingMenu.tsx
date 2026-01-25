import ICONS from '@configs/icons'
import { clearStorage } from '@storage/index'
import { clsx } from '@utils/index'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

export const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const menuItems = [
    { icon: <ICONS.Home />, label: 'Beranda', path: '/' },
    {
      icon: <ICONS.Bags />,
      label: 'Daftar Pesanan',
      path: '/order',
    },
    {
      icon: <ICONS.Cart />,
      label: 'Keranjang',
      path: '/keranjang',
    },
    { icon: <ICONS.SingOut />, label: 'Keluar', path: '/login' },
  ]

  return (
    <div className={styles.container}>
      {/* Menu Items */}
      <div className={styles.wrapperMenu}>
        {menuItems.map((item, index) => (
          <div
            className={clsx([
              styles.menu,
              isOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none',
            ])}
            key={index}
            style={{
              transitionDelay: isOpen
                ? `${index * 50}ms`
                : `${(menuItems.length - index - 1) * 30}ms`,
            }}
          >
            {/* Label */}
            <div className={styles.title}>{item.label}</div>

            {/* Icon Button */}
            <button
              className={styles.icon}
              onClick={() => {
                navigate(item.path)
                if (item.path === '/login') {
                  clearStorage()
                }
              }}
            >
              {item.icon}
            </button>
          </div>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button className={styles.toggleMenu} onClick={() => setIsOpen(!isOpen)}>
        <div
          className={clsx([
            styles.toggleIcon,
            isOpen
              ? 'rotate-90 opacity-0 scale-0'
              : 'rotate-0 opacity-100 scale-100',
          ])}
        >
          <ICONS.Menu height={24} width={24} />
        </div>
        <div
          className={clsx([
            styles.toggleIcon,
            isOpen
              ? 'rotate-0 opacity-100 scale-100'
              : 'rotate-90 opacity-0 scale-0',
          ])}
        >
          <ICONS.Close height={32} width={32} />
        </div>
      </button>
    </div>
  )
}
