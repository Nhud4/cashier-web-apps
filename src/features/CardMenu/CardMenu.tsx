import BaseCard from '@components/modules/BaseCard'
import IMAGES from '@configs/images'

import styles from './styles.module.css'

export const CardMenu = () => {
  return (
    <div className={styles.container}>
      <BaseCard className={styles.card}>
        <h1>Mie Goreng sambal mangga</h1>
        <h2>Rp. 12.000</h2>
        <p>Tersedia 20</p>
      </BaseCard>

      <div className={styles.images}>
        <img alt="foto" className={styles.photo} src={IMAGES.Food} />
      </div>
    </div>
  )
}
