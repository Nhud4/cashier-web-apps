import { useSearchParams } from 'react-router-dom'

import styles from './styles.module.css'

export const HeaderMenuCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const menuList = [
    { label: 'makanan', value: 'makanan' },
    { label: 'minuman', value: 'minuman' },
    { label: 'cemilan', value: 'cemilan' },
  ]

  const handleMenu = (val: string) => {
    setSearchParams({ cat: val })
  }

  const isActive = (val: string) => {
    const params = searchParams.get('cat')
    return params === val ? styles.active : ''
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {menuList.map((item, index) => (
          <button
            className={isActive(item.value)}
            key={index}
            onClick={() => handleMenu(item.value)}
          >
            <h1>{item.label}</h1>
          </button>
        ))}
      </div>
    </div>
  )
}
